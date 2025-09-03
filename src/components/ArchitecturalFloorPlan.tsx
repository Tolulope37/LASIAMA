"use client"

import { useState } from "react"

interface Room {
  id: string
  number: string
  name: string
  floor: number
  type: 'Ward' | 'Operating Theater' | 'Laboratory' | 'Office' | 'Storage' | 'Emergency' | 'Consultation' | 'Pharmacy' | 'Kitchen' | 'Utility'
  area: number
  capacity: number
  status: 'Active' | 'Under Maintenance' | 'Closed' | 'Renovation'
  position: {
    x: number
    y: number
    width: number
    height: number
  }
  equipment: Array<{
    id: string
    name: string
    type: string
    status: 'Working' | 'Maintenance' | 'Broken'
  }>
  occupancy: {
    current: number
    maximum: number
  }
}

interface Floor {
  number: number
  name: string
  rooms: Room[]
  totalArea: number
  totalRooms: number
  dimensions: {
    width: number
    height: number
  }
}

interface ArchitecturalFloorPlanProps {
  floors: Floor[]
  selectedFloor?: number
  onFloorSelect?: (floorNumber: number) => void
  onRoomSelect?: (room: Room) => void
  viewMode: 'building' | 'floor'
  onViewModeChange?: (mode: 'building' | 'floor') => void
}

export default function ArchitecturalFloorPlan({ 
  floors, 
  selectedFloor = 1, 
  onFloorSelect, 
  onRoomSelect, 
  viewMode,
  onViewModeChange 
}: ArchitecturalFloorPlanProps) {
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null)

  const getStatusColor = (status: Room['status']) => {
    switch (status) {
      case 'Active': return '#10b981' // green-500
      case 'Under Maintenance': return '#f59e0b' // amber-500
      case 'Closed': return '#ef4444' // red-500
      case 'Renovation': return '#3b82f6' // blue-500
      default: return '#6b7280' // gray-500
    }
  }

  // Building Overview - Stacked floors view
  const BuildingView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Building Overview</h3>
        <button
          onClick={() => onViewModeChange?.('floor')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          View Individual Floors
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="space-y-4">
          {floors.slice().reverse().map((floor, index) => (
            <div key={floor.number} className="relative">
              <div 
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                onClick={() => {
                  onFloorSelect?.(floor.number)
                  onViewModeChange?.('floor')
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🏢</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Floor {floor.number} - {floor.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {floor.totalRooms} rooms • {floor.totalArea} sqm
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 text-xs">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-400">
                        {floor.rooms.filter(r => r.status === 'Active').length} Active
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-400">
                        {floor.rooms.filter(r => r.status === 'Under Maintenance').length} Maintenance
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Architectural mini floor layout */}
                <div className="relative bg-white dark:bg-gray-800 rounded border h-20 overflow-hidden">
                  <svg width="100%" height="100%" viewBox="0 0 400 80" className="absolute inset-0">
                    {/* Building outline */}
                    <rect x={10} y={10} width={380} height={60} fill="none" stroke="#6b7280" strokeWidth={1}/>
                    
                    {/* Simplified room layout */}
                    {floor.rooms.slice(0, 6).map((room, roomIndex) => {
                      const roomWidth = 50
                      const roomHeight = 25
                      const startX = 20 + roomIndex * 60
                      const startY = 20
                      
                      return (
                        <g key={room.id}>
                          <rect
                            x={startX}
                            y={startY}
                            width={roomWidth}
                            height={roomHeight}
                            fill={getStatusColor(room.status)}
                            fillOpacity={0.6}
                            stroke="#4b5563"
                            strokeWidth={0.5}
                          />
                          <text
                            x={startX + roomWidth/2}
                            y={startY + roomHeight/2 + 2}
                            textAnchor="middle"
                            className="fill-white text-xs font-medium"
                            style={{ fontSize: '8px' }}
                          >
                            {room.number.split('-')[1]}
                          </text>
                        </g>
                      )
                    })}
                    
                    {/* Show more indicator */}
                    {floor.rooms.length > 6 && (
                      <text x="370" y="45" textAnchor="middle" className="fill-gray-500 text-xs">
                        +{floor.rooms.length - 6}
                      </text>
                    )}
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Individual Floor View with Architectural Layout
  const FloorView = () => {
    const currentFloor = floors.find(f => f.number === selectedFloor)
    if (!currentFloor) return null

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onViewModeChange?.('building')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Floor {currentFloor.number} - {currentFloor.name}
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            {floors.map((floor) => (
              <button
                key={floor.number}
                onClick={() => onFloorSelect?.(floor.number)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedFloor === floor.number
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Floor {floor.number}
              </button>
            ))}
          </div>
        </div>

        {/* Architectural Floor Plan */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Architectural Floor Plan</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {currentFloor.totalRooms} rooms • {currentFloor.totalArea} sqm
              </div>
            </div>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Active</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Maintenance</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Closed</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Renovation</span>
              </div>
            </div>
          </div>

          {/* Architectural SVG Floor Plan */}
          <div className="relative bg-white dark:bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-300" style={{ height: '600px' }}>
            <svg width="100%" height="100%" viewBox="0 0 800 600" className="absolute inset-0">
              <defs>
                {/* Patterns for different floor materials */}
                <pattern id="floorTile" patternUnits="userSpaceOnUse" width="4" height="4">
                  <rect width="4" height="4" fill="#f8f9fa"/>
                  <path d="m 0,4 l 4,0 l 0,-4" stroke="#e9ecef" strokeWidth="0.5"/>
                </pattern>
                <pattern id="carpet" patternUnits="userSpaceOnUse" width="2" height="2">
                  <rect width="2" height="2" fill="#f1f3f4"/>
                  <circle cx="1" cy="1" r="0.3" fill="#dee2e6"/>
                </pattern>
              </defs>

              {/* Building exterior walls */}
              <g stroke="#2d3748" strokeWidth="4" fill="none">
                <rect x={40} y={40} width={720} height={520} />
              </g>

              {/* Render different floor layouts */}
              {currentFloor.number === 1 && <GroundFloorLayout />}
              {currentFloor.number === 2 && <FirstFloorLayout />}
              {currentFloor.number === 3 && <SecondFloorLayout />}

              {/* Interactive room hover areas */}
              {currentFloor.rooms.map((room) => {
                const isHovered = hoveredRoom === room.id
                
                return (
                  <rect
                    key={`hover-${room.id}`}
                    x={room.position.x}
                    y={room.position.y}
                    width={room.position.width}
                    height={room.position.height}
                    fill="transparent"
                    stroke={isHovered ? "#3b82f6" : "transparent"}
                    strokeWidth={isHovered ? 3 : 0}
                    strokeDasharray={isHovered ? "5,5" : "0"}
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredRoom(room.id)}
                    onMouseLeave={() => setHoveredRoom(null)}
                    onClick={() => onRoomSelect?.(room)}
                  />
                )
              })}
            </svg>

            {/* Room tooltip */}
            {hoveredRoom && (
              <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3 max-w-xs z-10">
                {(() => {
                  const room = currentFloor.rooms.find(r => r.id === hoveredRoom)
                  if (!room) return null
                  return (
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div>
                          <h5 className="font-semibold text-gray-900 dark:text-white">{room.name}</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{room.number}</p>
                        </div>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Type:</span>
                          <span className="text-gray-900 dark:text-white">{room.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Area:</span>
                          <span className="text-gray-900 dark:text-white">{room.area} sqm</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Status:</span>
                          <span className={`font-medium ${
                            room.status === 'Active' ? 'text-green-600' :
                            room.status === 'Under Maintenance' ? 'text-yellow-600' :
                            room.status === 'Closed' ? 'text-red-600' : 'text-blue-600'
                          }`}>{room.status}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Occupancy:</span>
                          <span className="text-gray-900 dark:text-white">{room.occupancy.current}/{room.occupancy.maximum}</span>
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Ground Floor Architectural Layout
  const GroundFloorLayout = () => (
    <g>
      {/* Main corridor - horizontal */}
      <rect x={40} y={280} width={720} height={40} fill="url(#floorTile)" stroke="#6c757d" strokeWidth="2"/>
      <text x="400" y="305" textAnchor="middle" className="fill-gray-600 text-sm font-medium">MAIN CORRIDOR</text>
      
      {/* Reception Area */}
      <g>
        <rect x={60} y={60} width={180} height={120} fill={getStatusColor('Active')} fillOpacity="0.1" stroke="#2d3748" strokeWidth="3"/>
        <rect x={60} y={60} width={180} height={120} fill="url(#floorTile)" fillOpacity="0.8"/>
        {/* Reception desk */}
        <rect x={90} y={140} width={120} height={20} fill="#8b4513" stroke="#654321" strokeWidth="1"/>
        {/* Chairs */}
        <circle cx="120" cy="100" r="8" fill="#4a5568"/>
        <circle cx="150" cy="100" r="8" fill="#4a5568"/>
        <circle cx="180" cy="100" r="8" fill="#4a5568"/>
        <circle cx="210" cy="100" r="8" fill="#4a5568"/>
        {/* Door */}
        <path d="M 180 180 A 20 20 0 0 1 200 160" stroke="#2d3748" strokeWidth="2" fill="none"/>
        <line x1="180" y1="180" x2="200" y2="180" stroke="#2d3748" strokeWidth="2"/>
        
        <text x="150" y="95" textAnchor="middle" className="fill-gray-800 text-sm font-bold">RECEPTION</text>
        <text x="150" y="110" textAnchor="middle" className="fill-gray-600 text-xs">GF-001 • 150m²</text>
      </g>

      {/* Emergency Department */}
      <g>
        <rect x={260} y={60} width={200} height={120} fill={getStatusColor('Active')} fillOpacity="0.1" stroke="#2d3748" strokeWidth="3"/>
        <rect x={260} y={60} width={200} height={120} fill="url(#floorTile)" fillOpacity="0.8"/>
        {/* Medical equipment */}
        <rect x={280} y={90} width={30} height={15} fill="#ff6b6b" stroke="#e03131"/>
        <rect x={320} y={90} width={30} height={15} fill="#51cf66" stroke="#37b24d"/>
        <rect x={360} y={90} width={30} height={15} fill="#339af0" stroke="#1971c2"/>
        <rect x={400} y={90} width={30} height={15} fill="#ffd43b" stroke="#fab005"/>
        {/* Emergency beds */}
        <rect x={280} y={120} width={35} height={15} fill="#4a5568" stroke="#2d3748"/>
        <rect x={325} y={120} width={35} height={15} fill="#4a5568" stroke="#2d3748"/>
        <rect x={370} y={120} width={35} height={15} fill="#4a5568" stroke="#2d3748"/>
        <rect x={415} y={120} width={35} height={15} fill="#4a5568" stroke="#2d3748"/>
        {/* Door */}
        <path d="M 340 180 A 20 20 0 0 1 360 160" stroke="#2d3748" strokeWidth="3" fill="none"/>
        <line x1="340" y1="180" x2="360" y2="180" stroke="#2d3748" strokeWidth="3"/>
        
        <text x="360" y="85" textAnchor="middle" className="fill-gray-800 text-sm font-bold">EMERGENCY DEPT</text>
        <text x="360" y="100" textAnchor="middle" className="fill-gray-600 text-xs">GF-002 • 300m²</text>
      </g>

      {/* Laboratory */}
      <g>
        <rect x={480} y={60} width={140} height={120} fill={getStatusColor('Active')} fillOpacity="0.1" stroke="#2d3748" strokeWidth="3"/>
        <rect x={480} y={60} width={140} height={120} fill="url(#floorTile)" fillOpacity="0.8"/>
        {/* Lab benches */}
        <rect x={500} y={80} width={100} height={15} fill="#8b4513" stroke="#654321"/>
        <rect x={500} y={140} width={100} height={15} fill="#8b4513" stroke="#654321"/>
        {/* Lab equipment */}
        <circle cx="520" cy="110" r="6" fill="#708090"/>
        <circle cx="540" cy="110" r="6" fill="#708090"/>
        <circle cx="560" cy="110" r="6" fill="#708090"/>
        <circle cx="580" cy="110" r="6" fill="#708090"/>
        {/* Door */}
        <path d="M 520 180 A 20 20 0 0 1 540 160" stroke="#2d3748" strokeWidth="2" fill="none"/>
        <line x1="520" y1="180" x2="540" y2="180" stroke="#2d3748" strokeWidth="2"/>
        
        <text x="550" y="95" textAnchor="middle" className="fill-gray-800 text-sm font-bold">LABORATORY</text>
        <text x="550" y="110" textAnchor="middle" className="fill-gray-600 text-xs">GF-003 • 120m²</text>
      </g>

      {/* Pharmacy */}
      <g>
        <rect x={640} y={60} width={100} height={120} fill={getStatusColor('Active')} fillOpacity="0.1" stroke="#2d3748" strokeWidth="3"/>
        <rect x={640} y={60} width={100} height={120} fill="url(#floorTile)" fillOpacity="0.8"/>
        {/* Pharmacy shelving */}
        <rect x={650} y={80} width={8} height={50} fill="#a0522d"/>
        <rect x={665} y={80} width={8} height={50} fill="#a0522d"/>
        <rect x={680} y={80} width={8} height={50} fill="#a0522d"/>
        <rect x={695} y={80} width={8} height={50} fill="#a0522d"/>
        <rect x={710} y={80} width={8} height={50} fill="#a0522d"/>
        <rect x={725} y={80} width={8} height={50} fill="#a0522d"/>
        {/* Counter */}
        <rect x={660} y={140} width={60} height={15} fill="#8b4513" stroke="#654321"/>
        {/* Door */}
        <path d="M 680 180 A 20 20 0 0 1 700 160" stroke="#2d3748" strokeWidth="2" fill="none"/>
        <line x1="680" y1="180" x2="700" y2="180" stroke="#2d3748" strokeWidth="2"/>
        
        <text x="690" y="95" textAnchor="middle" className="fill-gray-800 text-sm font-bold">PHARMACY</text>
        <text x="690" y="110" textAnchor="middle" className="fill-gray-600 text-xs">GF-004 • 80m²</text>
      </g>

      {/* Interior walls */}
      <g stroke="#6c757d" strokeWidth="3">
        <line x1="240" y1="60" x2="240" y2="180"/>
        <line x1="460" y1="60" x2="460" y2="180"/>
        <line x1="620" y1="60" x2="620" y2="180"/>
      </g>
    </g>
  )

  // First Floor Layout
  const FirstFloorLayout = () => (
    <g>
      {/* Central corridor */}
      <rect x={40} y={280} width={720} height={40} fill="url(#floorTile)" stroke="#6c757d" strokeWidth="2"/>
      <text x="400" y="305" textAnchor="middle" className="fill-gray-600 text-sm font-medium">PATIENT CORRIDOR</text>
      
      {/* Ward A */}
      <g>
        <rect x={60} y={60} width={220} height={200} fill={getStatusColor('Active')} fillOpacity="0.1" stroke="#2d3748" strokeWidth="3"/>
        <rect x={60} y={60} width={220} height={200} fill="url(#carpet)" fillOpacity="0.6"/>
        {/* Patient beds in rows */}
        {Array.from({length: 10}, (_, i) => (
          <rect 
            key={i}
            x={80 + (i % 5) * 35} 
            y={80 + Math.floor(i / 5) * 60} 
            width={25} 
            height={12} 
            fill="#4a5568" 
            stroke="#2d3748"
          />
        ))}
        {/* Nurses station */}
        <rect x={160} y={180} width={40} height={20} fill="#87ceeb" stroke="#4682b4"/>
        {/* Door */}
        <path d="M 200 260 A 20 20 0 0 1 220 240" stroke="#2d3748" strokeWidth="3" fill="none"/>
        
        <text x="170" y="140" textAnchor="middle" className="fill-gray-800 text-lg font-bold">WARD A</text>
        <text x="170" y="155" textAnchor="middle" className="fill-gray-600 text-sm">FF-001 • 20 beds • 200m²</text>
      </g>

      {/* Ward B */}
      <g>
        <rect x={300} y={60} width={220} height={200} fill={getStatusColor('Active')} fillOpacity="0.1" stroke="#2d3748" strokeWidth="3"/>
        <rect x={300} y={60} width={220} height={200} fill="url(#carpet)" fillOpacity="0.6"/>
        {/* Patient beds */}
        {Array.from({length: 10}, (_, i) => (
          <rect 
            key={i}
            x={320 + (i % 5) * 35} 
            y={80 + Math.floor(i / 5) * 60} 
            width={25} 
            height={12} 
            fill="#4a5568" 
            stroke="#2d3748"
          />
        ))}
        {/* Nurses station */}
        <rect x={400} y={180} width={40} height={20} fill="#87ceeb" stroke="#4682b4"/>
        {/* Door */}
        <path d="M 400 260 A 20 20 0 0 1 420 240" stroke="#2d3748" strokeWidth="3" fill="none"/>
        
        <text x="410" y="140" textAnchor="middle" className="fill-gray-800 text-lg font-bold">WARD B</text>
        <text x="410" y="155" textAnchor="middle" className="fill-gray-600 text-sm">FF-002 • 20 beds • 200m²</text>
      </g>

      {/* Consultation Rooms */}
      <g>
        <rect x={540} y={60} width={100} height={80} fill={getStatusColor('Active')} fillOpacity="0.1" stroke="#2d3748" strokeWidth="2"/>
        <rect x={540} y={150} width={100} height={80} fill={getStatusColor('Active')} fillOpacity="0.1" stroke="#2d3748" strokeWidth="2"/>
        <rect x={660} y={60} width={100} height={80} fill={getStatusColor('Active')} fillOpacity="0.1" stroke="#2d3748" strokeWidth="2"/>
        <rect x={660} y={150} width={100} height={80} fill={getStatusColor('Active')} fillOpacity="0.1" stroke="#2d3748" strokeWidth="2"/>
        
        {/* Consultation furniture */}
        <rect x={560} y={100} width={25} height={15} fill="#8b4513"/>
        <rect x={590} y={85} width={15} height={15} fill="#654321"/>
        
        <text x="590" y="105" textAnchor="middle" className="fill-gray-800 text-sm font-semibold">CONSULT 1</text>
        <text x="590" y="195" textAnchor="middle" className="fill-gray-800 text-sm font-semibold">CONSULT 2</text>
        <text x="710" y="105" textAnchor="middle" className="fill-gray-800 text-sm font-semibold">CONSULT 3</text>
        <text x="710" y="195" textAnchor="middle" className="fill-gray-800 text-sm font-semibold">CONSULT 4</text>
      </g>

      {/* Interior walls */}
      <g stroke="#6c757d" strokeWidth="3">
        <line x1="280" y1="60" x2="280" y2="260"/>
        <line x1="520" y1="60" x2="520" y2="230"/>
        <line x1="640" y1="60" x2="640" y2="230"/>
        <line x1="540" y1="140" x2="760" y2="140"/>
      </g>
    </g>
  )

  // Second Floor Layout - Operating Theaters
  const SecondFloorLayout = () => (
    <g>
      {/* Sterile corridor */}
      <rect x={40} y={280} width={720} height={40} fill="#e8f4f8" stroke="#4a90a4" strokeWidth="3"/>
      <text x="400" y="305" textAnchor="middle" className="fill-gray-700 text-sm font-bold">STERILE CORRIDOR - AUTHORIZED PERSONNEL ONLY</text>
      
      {/* Operating Theater 1 */}
      <g>
        <rect x={120} y={120} width={180} height={140} fill={getStatusColor('Active')} fillOpacity="0.05" stroke="#2d3748" strokeWidth="4"/>
        <rect x={120} y={120} width={180} height={140} fill="#f0f8ff" fillOpacity="0.8"/>
        {/* Operating table */}
        <rect x={190} y={170} width={40} height={20} fill="#4a5568" stroke="#2d3748" strokeWidth="2"/>
        {/* Surgical lights */}
        <circle cx="180" cy="150" r="12" fill="#ffd700" stroke="#b8860b" strokeWidth="2"/>
        <circle cx="220" cy="150" r="12" fill="#ffd700" stroke="#b8860b" strokeWidth="2"/>
        {/* Equipment carts */}
        <rect x={140} y={140} width={15} height={25} fill="#708090"/>
        <rect x={245} y={140} width={15} height={25} fill="#708090"/>
        {/* Anesthesia machine */}
        <rect x={270} y={160} width={20} height={30} fill="#4682b4"/>
        {/* Scrub sink */}
        <rect x={125} y={240} width={25} height={15} fill="#87ceeb" stroke="#4682b4"/>
        
        <text x="210" y="140" textAnchor="middle" className="fill-gray-800 text-lg font-bold">OT-001</text>
        <text x="210" y="155" textAnchor="middle" className="fill-gray-600 text-sm">Operating Theater 1</text>
        <text x="210" y="200" textAnchor="middle" className="fill-green-600 text-sm font-semibold">ACTIVE • 150m²</text>
      </g>

      {/* Operating Theater 2 - Under Maintenance */}
      <g>
        <rect x={500} y={120} width={180} height={140} fill={getStatusColor('Under Maintenance')} fillOpacity="0.05" stroke="#2d3748" strokeWidth="4"/>
        <rect x={500} y={120} width={180} height={140} fill="#fff8dc" fillOpacity="0.8"/>
        {/* Operating table */}
        <rect x={570} y={170} width={40} height={20} fill="#4a5568" stroke="#2d3748" strokeWidth="2"/>
        {/* Surgical lights (one broken) */}
        <circle cx="560" cy="150" r="12" fill="#ffd700" stroke="#b8860b" strokeWidth="2"/>
        <circle cx="600" cy="150" r="12" fill="#ff6b6b" stroke="#e03131" strokeWidth="2"/>
        <path d="M 595 145 L 605 155 M 595 155 L 605 145" stroke="#e03131" strokeWidth="2"/>
        {/* Equipment (some broken) */}
        <rect x={520} y={140} width={15} height={25} fill="#ff6b6b" opacity="0.7"/>
        <rect x={625} y={140} width={15} height={25} fill="#708090"/>
        {/* Maintenance tools */}
        <rect x={650} y={200} width={20} height={10} fill="#ffd43b"/>
        <circle cx="645" cy="210" r="5" fill="#fab005"/>
        
        <text x="590" y="140" textAnchor="middle" className="fill-gray-800 text-lg font-bold">OT-002</text>
        <text x="590" y="155" textAnchor="middle" className="fill-gray-600 text-sm">Operating Theater 2</text>
        <text x="590" y="200" textAnchor="middle" className="fill-yellow-600 text-sm font-semibold">MAINTENANCE • 150m²</text>
      </g>

      {/* Preparation and Recovery rooms */}
      <rect x={120} y={340} width={80} height={60} fill="#f5f5f5" stroke="#2d3748" strokeWidth="2"/>
      <rect x={220} y={340} width={80} height={60} fill="#f5f5f5" stroke="#2d3748" strokeWidth="2"/>
      <rect x={500} y={340} width={80} height={60} fill="#f0f8f0" stroke="#2d3748" strokeWidth="2"/>
      <rect x={600} y={340} width={80} height={60} fill="#f0f8f0" stroke="#2d3748" strokeWidth="2"/>
      
      <text x="160" y="375" textAnchor="middle" className="fill-gray-800 text-sm">PREP 1</text>
      <text x="260" y="375" textAnchor="middle" className="fill-gray-800 text-sm">PREP 2</text>
      <text x="540" y="375" textAnchor="middle" className="fill-gray-800 text-sm">RECOVERY 1</text>
      <text x="640" y="375" textAnchor="middle" className="fill-gray-800 text-sm">RECOVERY 2</text>

      {/* Sterilization room */}
      <rect x={360} y={340} width={100} height={60} fill="#e6f3ff" stroke="#2d3748" strokeWidth="2"/>
      <text x="410" y="375" textAnchor="middle" className="fill-gray-800 text-sm">STERILIZATION</text>

      {/* Interior walls */}
      <g stroke="#6c757d" strokeWidth="3">
        <line x1="320" y1="120" x2="320" y2="260"/>
        <line x1="480" y1="120" x2="480" y2="260"/>
      </g>

      {/* HVAC indicators */}
      <g>
        <rect x="70" y="90" width="20" height="10" fill="#87ceeb" stroke="#4682b4"/>
        <text x="80" y="105" textAnchor="middle" className="fill-gray-600 text-xs">HVAC</text>
        <rect x="710" y="90" width="20" height="10" fill="#87ceeb" stroke="#4682b4"/>
        <text x="720" y="105" textAnchor="middle" className="fill-gray-600 text-xs">HVAC</text>
      </g>
    </g>
  )

  return (
    <div>
      {viewMode === 'building' ? <BuildingView /> : <FloorView />}
    </div>
  )
}
