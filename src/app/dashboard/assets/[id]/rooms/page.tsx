"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"

interface Room {
  id: string
  number: string
  name: string
  floor: number
  type: 'Ward' | 'Operating Theater' | 'Laboratory' | 'Office' | 'Storage' | 'Emergency' | 'Consultation' | 'Pharmacy' | 'Kitchen' | 'Utility'
  area: number
  capacity: number
  status: 'Active' | 'Under Maintenance' | 'Closed' | 'Renovation'
  equipment: {
    id: string
    name: string
    type: string
    status: 'Working' | 'Maintenance' | 'Broken'
  }[]
  occupancy: {
    current: number
    maximum: number
  }
  lastInspection: string
  nextMaintenance: string
}

interface Floor {
  number: number
  name: string
  rooms: Room[]
  totalArea: number
  totalRooms: number
}

export default function AssetRoomsPage() {
  const router = useRouter()
  const params = useParams()
  const assetId = params.id as string

  const [selectedFloor, setSelectedFloor] = useState<number>(1)
  const [showAddRoomModal, setShowAddRoomModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  // Sample room data for Lagos State General Hospital
  const floors: Floor[] = [
    {
      number: 1,
      name: "Ground Floor",
      totalArea: 2000,
      totalRooms: 35,
      rooms: [
        {
          id: "GF-001",
          number: "GF-001",
          name: "Main Reception",
          floor: 1,
          type: "Office",
          area: 150,
          capacity: 50,
          status: "Active",
          equipment: [
            { id: "eq-001", name: "Reception Desk", type: "Furniture", status: "Working" },
            { id: "eq-002", name: "Computer Terminal", type: "IT Equipment", status: "Working" },
            { id: "eq-003", name: "Printer", type: "Office Equipment", status: "Working" }
          ],
          occupancy: { current: 25, maximum: 50 },
          lastInspection: "10/08/2025",
          nextMaintenance: "10/11/2025"
        },
        {
          id: "GF-002",
          number: "GF-002",
          name: "Emergency Department",
          floor: 1,
          type: "Emergency",
          area: 300,
          capacity: 20,
          status: "Active",
          equipment: [
            { id: "eq-004", name: "Defibrillator", type: "Medical Equipment", status: "Working" },
            { id: "eq-005", name: "ECG Machine", type: "Medical Equipment", status: "Working" },
            { id: "eq-006", name: "Emergency Trolley", type: "Medical Equipment", status: "Working" },
            { id: "eq-007", name: "Oxygen Tank", type: "Medical Equipment", status: "Working" }
          ],
          occupancy: { current: 8, maximum: 20 },
          lastInspection: "15/08/2025",
          nextMaintenance: "15/09/2025"
        },
        {
          id: "GF-003",
          number: "GF-003",
          name: "Laboratory 1",
          floor: 1,
          type: "Laboratory",
          area: 120,
          capacity: 15,
          status: "Active",
          equipment: [
            { id: "eq-008", name: "Microscope", type: "Medical Equipment", status: "Working" },
            { id: "eq-009", name: "Centrifuge", type: "Medical Equipment", status: "Maintenance" },
            { id: "eq-010", name: "Blood Analyzer", type: "Medical Equipment", status: "Working" }
          ],
          occupancy: { current: 10, maximum: 15 },
          lastInspection: "12/08/2025",
          nextMaintenance: "12/10/2025"
        },
        {
          id: "GF-004",
          number: "GF-004",
          name: "Pharmacy",
          floor: 1,
          type: "Pharmacy",
          area: 80,
          capacity: 10,
          status: "Active",
          equipment: [
            { id: "eq-011", name: "Medicine Cabinet", type: "Storage", status: "Working" },
            { id: "eq-012", name: "Refrigerator", type: "Storage", status: "Working" },
            { id: "eq-013", name: "Dispensing Counter", type: "Furniture", status: "Working" }
          ],
          occupancy: { current: 5, maximum: 10 },
          lastInspection: "08/08/2025",
          nextMaintenance: "08/11/2025"
        }
      ]
    },
    {
      number: 2,
      name: "First Floor",
      totalArea: 1800,
      totalRooms: 30,
      rooms: [
        {
          id: "FF-001",
          number: "FF-001",
          name: "General Ward A",
          floor: 2,
          type: "Ward",
          area: 200,
          capacity: 20,
          status: "Active",
          equipment: [
            { id: "eq-014", name: "Hospital Beds", type: "Medical Equipment", status: "Working" },
            { id: "eq-015", name: "IV Stands", type: "Medical Equipment", status: "Working" },
            { id: "eq-016", name: "Bedside Monitors", type: "Medical Equipment", status: "Working" }
          ],
          occupancy: { current: 18, maximum: 20 },
          lastInspection: "14/08/2025",
          nextMaintenance: "14/10/2025"
        },
        {
          id: "FF-002",
          number: "FF-002",
          name: "General Ward B",
          floor: 2,
          type: "Ward",
          area: 200,
          capacity: 20,
          status: "Active",
          equipment: [
            { id: "eq-017", name: "Hospital Beds", type: "Medical Equipment", status: "Working" },
            { id: "eq-018", name: "IV Stands", type: "Medical Equipment", status: "Working" },
            { id: "eq-019", name: "Bedside Monitors", type: "Medical Equipment", status: "Maintenance" }
          ],
          occupancy: { current: 15, maximum: 20 },
          lastInspection: "13/08/2025",
          nextMaintenance: "13/10/2025"
        },
        {
          id: "FF-003",
          number: "FF-003",
          name: "Consultation Room 1",
          floor: 2,
          type: "Consultation",
          area: 25,
          capacity: 5,
          status: "Active",
          equipment: [
            { id: "eq-020", name: "Examination Table", type: "Medical Equipment", status: "Working" },
            { id: "eq-021", name: "Blood Pressure Monitor", type: "Medical Equipment", status: "Working" },
            { id: "eq-022", name: "Stethoscope", type: "Medical Equipment", status: "Working" }
          ],
          occupancy: { current: 2, maximum: 5 },
          lastInspection: "11/08/2025",
          nextMaintenance: "11/11/2025"
        }
      ]
    },
    {
      number: 3,
      name: "Second Floor - Operating Theaters",
      totalArea: 1500,
      totalRooms: 12,
      rooms: [
        {
          id: "SF-001",
          number: "OT-001",
          name: "Operating Theater 1",
          floor: 3,
          type: "Operating Theater",
          area: 150,
          capacity: 10,
          status: "Active",
          equipment: [
            { id: "eq-023", name: "Operating Table", type: "Medical Equipment", status: "Working" },
            { id: "eq-024", name: "Anesthesia Machine", type: "Medical Equipment", status: "Working" },
            { id: "eq-025", name: "Surgical Lights", type: "Medical Equipment", status: "Working" },
            { id: "eq-026", name: "Heart Monitor", type: "Medical Equipment", status: "Working" }
          ],
          occupancy: { current: 6, maximum: 10 },
          lastInspection: "16/08/2025",
          nextMaintenance: "16/09/2025"
        },
        {
          id: "SF-002",
          number: "OT-002",
          name: "Operating Theater 2",
          floor: 3,
          type: "Operating Theater",
          area: 150,
          capacity: 10,
          status: "Under Maintenance",
          equipment: [
            { id: "eq-027", name: "Operating Table", type: "Medical Equipment", status: "Maintenance" },
            { id: "eq-028", name: "Anesthesia Machine", type: "Medical Equipment", status: "Working" },
            { id: "eq-029", name: "Surgical Lights", type: "Medical Equipment", status: "Broken" }
          ],
          occupancy: { current: 0, maximum: 10 },
          lastInspection: "09/08/2025",
          nextMaintenance: "25/08/2025"
        }
      ]
    }
  ]

  const [newRoom, setNewRoom] = useState({
    number: '',
    name: '',
    floor: selectedFloor,
    type: 'Office' as Room['type'],
    area: 0,
    capacity: 0,
    status: 'Active' as Room['status']
  })

  const currentFloor = floors.find(f => f.number === selectedFloor)
  const filteredRooms = currentFloor?.rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         room.number.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || room.type === filterType
    const matchesStatus = filterStatus === 'all' || room.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  }) || []

  const handleAddRoom = () => {
    // In a real app, this would make an API call
    console.log('Adding room:', newRoom)
    setShowAddRoomModal(false)
    setNewRoom({
      number: '',
      name: '',
      floor: selectedFloor,
      type: 'Office',
      area: 0,
      capacity: 0,
      status: 'Active'
    })
  }

  const getStatusColor = (status: Room['status']) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Under Maintenance': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Closed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'Renovation': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
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

  const roomTypes = ['Ward', 'Operating Theater', 'Laboratory', 'Office', 'Storage', 'Emergency', 'Consultation', 'Pharmacy', 'Kitchen', 'Utility']

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Room Management</h1>
              <p className="text-gray-600 dark:text-gray-400">Lagos State General Hospital - Building Layout</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddRoomModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Room</span>
          </button>
        </div>

        {/* Floor Navigation */}
        <div className="mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Select Floor</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {floors.map((floor) => (
              <div
                key={floor.number}
                onClick={() => setSelectedFloor(floor.number)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedFloor === floor.number
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Floor {floor.number}</h3>
                  <span className="text-2xl">🏢</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{floor.name}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Rooms:</span>
                    <span className="ml-1 font-medium text-gray-900 dark:text-white">{floor.totalRooms}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Area:</span>
                    <span className="ml-1 font-medium text-gray-900 dark:text-white">{floor.totalArea} sqm</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search rooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Types</option>
                {roomTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Under Maintenance">Under Maintenance</option>
                <option value="Closed">Closed</option>
                <option value="Renovation">Renovation</option>
              </select>
            </div>
          </div>
        </div>

        {/* Current Floor Info */}
        {currentFloor && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 mb-6 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Floor {currentFloor.number} - {currentFloor.name}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Total Rooms:</span>
                    <span className="ml-2 font-semibold text-gray-900 dark:text-white">{currentFloor.totalRooms}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Total Area:</span>
                    <span className="ml-2 font-semibold text-gray-900 dark:text-white">{currentFloor.totalArea} sqm</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Active Rooms:</span>
                    <span className="ml-2 font-semibold text-green-600">{currentFloor.rooms.filter(r => r.status === 'Active').length}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Under Maintenance:</span>
                    <span className="ml-2 font-semibold text-yellow-600">{currentFloor.rooms.filter(r => r.status === 'Under Maintenance').length}</span>
                  </div>
                </div>
              </div>
              <div className="text-4xl">🏢</div>
            </div>
          </div>
        )}

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all cursor-pointer"
              onClick={() => router.push(`/dashboard/assets/${assetId}/rooms/${room.id}`)}
            >
              {/* Room Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getTypeIcon(room.type)}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{room.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{room.number}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(room.status)}`}>
                  {room.status}
                </span>
              </div>

              {/* Room Details */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Type:</span>
                    <span className="ml-1 text-gray-900 dark:text-white">{room.type}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Area:</span>
                    <span className="ml-1 text-gray-900 dark:text-white">{room.area} sqm</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Capacity:</span>
                    <span className="ml-1 text-gray-900 dark:text-white">{room.capacity}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Equipment:</span>
                    <span className="ml-1 text-gray-900 dark:text-white">{room.equipment.length}</span>
                  </div>
                </div>

                {/* Occupancy Bar */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Occupancy</span>
                    <span className="text-gray-900 dark:text-white">{room.occupancy.current}/{room.occupancy.maximum}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(room.occupancy.current / room.occupancy.maximum) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Equipment Status */}
                <div className="flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-400">Working: {room.equipment.filter(e => e.status === 'Working').length}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-400">Maintenance: {room.equipment.filter(e => e.status === 'Maintenance').length}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-400">Broken: {room.equipment.filter(e => e.status === 'Broken').length}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Rooms Found</h3>
            <p className="text-gray-600 dark:text-gray-400">No rooms match your current filters.</p>
          </div>
        )}
      </div>

      {/* Add Room Modal */}
      {showAddRoomModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Room</h3>
              <button
                onClick={() => setShowAddRoomModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Room Number *
                  </label>
                  <input
                    type="text"
                    value={newRoom.number}
                    onChange={(e) => setNewRoom(prev => ({ ...prev, number: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="e.g., GF-005"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Room Name *
                  </label>
                  <input
                    type="text"
                    value={newRoom.name}
                    onChange={(e) => setNewRoom(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="e.g., Consultation Room 5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Floor
                  </label>
                  <select
                    value={newRoom.floor}
                    onChange={(e) => setNewRoom(prev => ({ ...prev, floor: Number(e.target.value) }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {floors.map(floor => (
                      <option key={floor.number} value={floor.number}>Floor {floor.number}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Room Type
                  </label>
                  <select
                    value={newRoom.type}
                    onChange={(e) => setNewRoom(prev => ({ ...prev, type: e.target.value as Room['type'] }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {roomTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Area (sqm)
                  </label>
                  <input
                    type="number"
                    value={newRoom.area}
                    onChange={(e) => setNewRoom(prev => ({ ...prev, area: Number(e.target.value) }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Capacity
                  </label>
                  <input
                    type="number"
                    value={newRoom.capacity}
                    onChange={(e) => setNewRoom(prev => ({ ...prev, capacity: Number(e.target.value) }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowAddRoomModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddRoom}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Add Room
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
