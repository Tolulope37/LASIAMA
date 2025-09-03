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

interface FloorPlanProps {
  floors: Floor[]
  selectedFloor?: number
  onFloorSelect?: (floorNumber: number) => void
  onRoomSelect?: (room: Room) => void
  viewMode: 'building' | 'floor'
  onViewModeChange?: (mode: 'building' | 'floor') => void
}

export default function FloorPlan({ 
  floors, 
  selectedFloor = 1, 
  onFloorSelect, 
  onRoomSelect, 
  viewMode,
  onViewModeChange 
}: FloorPlanProps) {
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

  const getTypeIcon = (type: Room['type']) => {
    switch (type) {
      case 'Ward': return '🏥'
      case 'Operating Theater': return '🏥'
      case 'Laboratory': return '🔬'
      case 'Office': return '🏢'
      case 'Storage': return '📦'
      case 'Emergency': return '🚨'
      case 'Consultation': return '👨‍⚕️'
      case 'Pharmacy': return '💊'
      case 'Kitchen': return '🍽️'
      case 'Utility': return '🔧'
      default: return '🏠'
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
                
                {/* Mini floor layout */}
                <div className="relative bg-white dark:bg-gray-800 rounded border h-16 overflow-hidden">
                  <svg width="100%" height="100%" viewBox="0 0 400 60" className="absolute inset-0">
                    {floor.rooms.map((room, roomIndex) => {
                      // Simplified layout for mini view
                      const miniX = (roomIndex % 8) * 45 + 10
                      const miniY = Math.floor(roomIndex / 8) * 25 + 10
                      const miniWidth = 35
                      const miniHeight = 20
                      
                      return (
                        <rect
                          key={room.id}
                          x={miniX}
                          y={miniY}
                          width={miniWidth}
                          height={miniHeight}
                          fill={getStatusColor(room.status)}
                          fillOpacity={0.7}
                          stroke={getStatusColor(room.status)}
                          strokeWidth={1}
                          rx={2}
                          className="hover:opacity-80 cursor-pointer"
                          title={`${room.name} (${room.status})`}
                        />
                      )
                    })}
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Individual Floor View
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

        {/* Floor Plan */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Floor Plan</h4>
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

          <div className="relative bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden" style={{ height: '600px' }}>
            <svg width="100%" height="100%" viewBox="0 0 800 600" className="absolute inset-0">
              {/* Floor outline */}
              <rect
                x={20}
                y={20}
                width={760}
                height={560}
                fill="none"
                stroke="#374151"
                strokeWidth={3}
                rx={8}
              />
              
              {/* Grid lines */}
              <defs>
                <pattern id="grid" width={40} height={40} patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth={1} opacity={0.3} />
                </pattern>
              </defs>
              <rect x={20} y={20} width={760} height={560} fill="url(#grid)" />

              {/* Rooms */}
              {currentFloor.rooms.map((room, index) => {
                // Generate room positions based on floor layout
                const roomsPerRow = Math.ceil(Math.sqrt(currentFloor.rooms.length))
                const roomWidth = 120
                const roomHeight = 80
                const padding = 20
                const startX = 50
                const startY = 50
                
                const row = Math.floor(index / roomsPerRow)
                const col = index % roomsPerRow
                
                const x = startX + col * (roomWidth + padding)
                const y = startY + row * (roomHeight + padding)

                const isHovered = hoveredRoom === room.id

                return (
                  <g key={room.id}>
                    {/* Room rectangle */}
                    <rect
                      x={x}
                      y={y}
                      width={roomWidth}
                      height={roomHeight}
                      fill={getStatusColor(room.status)}
                      fillOpacity={isHovered ? 0.9 : 0.7}
                      stroke={getStatusColor(room.status)}
                      strokeWidth={isHovered ? 3 : 2}
                      rx={4}
                      className="cursor-pointer transition-all duration-200"
                      onMouseEnter={() => setHoveredRoom(room.id)}
                      onMouseLeave={() => setHoveredRoom(null)}
                      onClick={() => onRoomSelect?.(room)}
                    />
                    
                    {/* Room label */}
                    <text
                      x={x + roomWidth / 2}
                      y={y + roomHeight / 2 - 10}
                      textAnchor="middle"
                      className="fill-white text-xs font-semibold pointer-events-none"
                    >
                      {room.number}
                    </text>
                    <text
                      x={x + roomWidth / 2}
                      y={y + roomHeight / 2 + 5}
                      textAnchor="middle"
                      className="fill-white text-xs pointer-events-none"
                    >
                      {room.name.length > 15 ? room.name.substring(0, 12) + '...' : room.name}
                    </text>
                    <text
                      x={x + roomWidth / 2}
                      y={y + roomHeight / 2 + 20}
                      textAnchor="middle"
                      className="fill-white text-xs pointer-events-none"
                    >
                      {getTypeIcon(room.type)} {room.area}m²
                    </text>
                  </g>
                )
              })}
            </svg>

            {/* Room tooltip */}
            {hoveredRoom && (
              <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3 max-w-xs">
                {(() => {
                  const room = currentFloor.rooms.find(r => r.id === hoveredRoom)
                  if (!room) return null
                  return (
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg">{getTypeIcon(room.type)}</span>
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
                          <span className="text-gray-600 dark:text-gray-400">Capacity:</span>
                          <span className="text-gray-900 dark:text-white">{room.capacity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Occupancy:</span>
                          <span className="text-gray-900 dark:text-white">{room.occupancy.current}/{room.occupancy.maximum}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Equipment:</span>
                          <span className="text-gray-900 dark:text-white">{room.equipment.length} items</span>
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

  return (
    <div>
      {viewMode === 'building' ? <BuildingView /> : <FloorView />}
    </div>
  )
}
