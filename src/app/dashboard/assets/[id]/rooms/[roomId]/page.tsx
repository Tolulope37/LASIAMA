"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"

interface RoomEquipment {
  id: string
  name: string
  type: string
  status: 'Working' | 'Maintenance' | 'Broken'
}

interface Room {
  id: string
  number: string
  name: string
  floor: number
  type: 'Ward' | 'Operating Theater' | 'Laboratory' | 'Office' | 'Storage' | 'Emergency' | 'Consultation' | 'Pharmacy' | 'Kitchen' | 'Utility'
  area: number
  capacity: number
  status: 'Active' | 'Under Maintenance' | 'Closed' | 'Renovation'
  equipment: RoomEquipment[]
  occupancy: {
    current: number
    maximum: number
  }
  lastInspection: string
  nextMaintenance: string
  description?: string
  temperature?: string
  humidity?: string
  airQuality?: string
}

export default function RoomDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const assetId = params.id as string
  const roomId = params.roomId as string

  // Sample room data - in a real app, this would be fetched from an API
  const room: Room = {
    id: roomId,
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
      { id: "eq-026", name: "Heart Monitor", type: "Medical Equipment", status: "Working" },
      { id: "eq-027", name: "Ventilator", type: "Medical Equipment", status: "Working" },
      { id: "eq-028", name: "Suction Unit", type: "Medical Equipment", status: "Maintenance" }
    ],
    occupancy: { current: 6, maximum: 10 },
    lastInspection: "16/08/2025",
    nextMaintenance: "16/09/2025",
    description: "Primary operating theater equipped with state-of-the-art surgical equipment. Maintains sterile environment with HEPA filtration system.",
    temperature: "18-22°C",
    humidity: "45-55%",
    airQuality: "Excellent"
  }

  const [activeTab, setActiveTab] = useState('overview')
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editFormData, setEditFormData] = useState<Room>(room)
  const [newMaintenanceTask, setNewMaintenanceTask] = useState({
    title: '',
    type: 'Preventive',
    priority: 'Medium',
    description: '',
    scheduledDate: '',
    estimatedDuration: '',
    assignedTo: '',
    category: '',
    cost: '',
    notes: ''
  })

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

  const getEquipmentStatusColor = (status: RoomEquipment['status']) => {
    switch (status) {
      case 'Working': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Broken': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'equipment', label: 'Equipment', icon: '📦' },
    { id: 'environment', label: 'Environment', icon: '🌡️' },
    { id: 'maintenance', label: 'Maintenance', icon: '🔧' }
  ]

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{getTypeIcon(room.type)}</span>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{room.name}</h1>
                  <p className="text-gray-600 dark:text-gray-400">{room.number} • Floor {room.floor}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(room.status)}`}>
                {room.status}
              </span>
              <button 
                onClick={() => {
                  setEditFormData(room)
                  setShowEditModal(true)
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Edit Room
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Room Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Room Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Type</div>
                  <div className="font-medium text-gray-900 dark:text-white">{room.type}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Area</div>
                  <div className="font-medium text-gray-900 dark:text-white">{room.area} sqm</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Capacity</div>
                  <div className="font-medium text-gray-900 dark:text-white">{room.capacity} people</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Floor</div>
                  <div className="font-medium text-gray-900 dark:text-white">Floor {room.floor}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            {room.description && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{room.description}</p>
              </div>
            )}

            {/* Occupancy */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Current Occupancy</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {room.occupancy.current} of {room.occupancy.maximum} people
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {Math.round((room.occupancy.current / room.occupancy.maximum) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(room.occupancy.current / room.occupancy.maximum) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {room.equipment.filter(e => e.status === 'Working').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Working Equipment</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                  {room.equipment.filter(e => e.status === 'Maintenance').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Under Maintenance</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
                  {room.equipment.filter(e => e.status === 'Broken').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Broken Equipment</div>
              </div>
            </div>
          </div>
        )}

        {/* Equipment Tab */}
        {activeTab === 'equipment' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Equipment Inventory</h3>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Add Equipment
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {room.equipment.map((equipment) => (
                <div
                  key={equipment.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900 dark:text-white">{equipment.name}</h4>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getEquipmentStatusColor(equipment.status)}`}>
                      {equipment.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span>{equipment.type}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>ID:</span>
                      <span>{equipment.id}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Environment Tab */}
        {activeTab === 'environment' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Environmental Conditions</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">🌡️</span>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Temperature</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Current range</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{room.temperature}</div>
                <div className="text-sm text-green-600 dark:text-green-400 mt-1">Optimal</div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">💧</span>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Humidity</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Current range</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{room.humidity}</div>
                <div className="text-sm text-green-600 dark:text-green-400 mt-1">Optimal</div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">🌬️</span>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Air Quality</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Current status</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{room.airQuality}</div>
                <div className="text-sm text-green-600 dark:text-green-400 mt-1">HEPA Filtered</div>
              </div>
            </div>
          </div>
        )}

        {/* Maintenance Tab */}
        {activeTab === 'maintenance' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Maintenance Schedule</h3>
              <button 
                onClick={() => setShowScheduleModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Schedule Maintenance
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">Last Inspection</h4>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{room.lastInspection}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Passed all safety checks</div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">Next Maintenance</h4>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🔧</span>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{room.nextMaintenance}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Preventive maintenance scheduled</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Room Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Edit Room</h3>
                <button
                  onClick={() => {
                    setShowEditModal(false)
                    setEditFormData(room)
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                console.log('Room updated:', editFormData)
                alert(`Room "${editFormData.name}" has been updated successfully!`)
                setShowEditModal(false)
              }}
              className="p-6 space-y-6"
            >
              {/* Basic Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Room Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Room Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={editFormData.number}
                      onChange={(e) => setEditFormData({...editFormData, number: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Room Type *
                    </label>
                    <select
                      required
                      value={editFormData.type}
                      onChange={(e) => setEditFormData({...editFormData, type: e.target.value as Room['type']})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Ward">Ward</option>
                      <option value="Operating Theater">Operating Theater</option>
                      <option value="Laboratory">Laboratory</option>
                      <option value="Office">Office</option>
                      <option value="Storage">Storage</option>
                      <option value="Emergency">Emergency</option>
                      <option value="Consultation">Consultation</option>
                      <option value="Pharmacy">Pharmacy</option>
                      <option value="Kitchen">Kitchen</option>
                      <option value="Utility">Utility</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Floor *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={editFormData.floor}
                      onChange={(e) => setEditFormData({...editFormData, floor: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Area (sqm) *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={editFormData.area}
                      onChange={(e) => setEditFormData({...editFormData, area: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Capacity (people) *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={editFormData.capacity}
                      onChange={(e) => setEditFormData({...editFormData, capacity: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      value={editFormData.status}
                      onChange={(e) => setEditFormData({...editFormData, status: e.target.value as Room['status']})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Active">Active</option>
                      <option value="Under Maintenance">Under Maintenance</option>
                      <option value="Closed">Closed</option>
                      <option value="Renovation">Renovation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Maximum Occupancy
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={editFormData.occupancy.maximum}
                      onChange={(e) => setEditFormData({
                        ...editFormData, 
                        occupancy: {...editFormData.occupancy, maximum: parseInt(e.target.value)}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editFormData.description || ''}
                  onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
                  placeholder="Room description and special features..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Environmental Settings */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Environmental Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Temperature Range
                    </label>
                    <input
                      type="text"
                      value={editFormData.temperature || ''}
                      onChange={(e) => setEditFormData({...editFormData, temperature: e.target.value})}
                      placeholder="e.g., 18-22°C"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Humidity Range
                    </label>
                    <input
                      type="text"
                      value={editFormData.humidity || ''}
                      onChange={(e) => setEditFormData({...editFormData, humidity: e.target.value})}
                      placeholder="e.g., 45-55%"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Air Quality
                    </label>
                    <select
                      value={editFormData.airQuality || 'Good'}
                      onChange={(e) => setEditFormData({...editFormData, airQuality: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false)
                    setEditFormData(room)
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Schedule Maintenance Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Schedule Room Maintenance</h3>
                <button
                  onClick={() => {
                    setShowScheduleModal(false)
                    setNewMaintenanceTask({
                      title: '',
                      type: 'Preventive',
                      priority: 'Medium',
                      description: '',
                      scheduledDate: '',
                      estimatedDuration: '',
                      assignedTo: '',
                      category: '',
                      cost: '',
                      notes: ''
                    })
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                const newTask = {
                  id: `maint-${Date.now()}`,
                  title: newMaintenanceTask.title,
                  type: newMaintenanceTask.type,
                  status: 'Scheduled',
                  priority: newMaintenanceTask.priority,
                  description: newMaintenanceTask.description,
                  scheduledDate: newMaintenanceTask.scheduledDate,
                  completedDate: null,
                  duration: newMaintenanceTask.estimatedDuration,
                  cost: newMaintenanceTask.cost ? `₦${parseInt(newMaintenanceTask.cost).toLocaleString()}` : 'TBD',
                  workOrder: `WO-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
                  technician: newMaintenanceTask.assignedTo || 'TBD',
                  contractor: 'Internal Team',
                  category: newMaintenanceTask.category || 'Room Maintenance',
                  notes: newMaintenanceTask.notes,
                  createdAt: new Date().toISOString(),
                  createdBy: 'Admin User',
                  room: room.name,
                  roomId: room.id
                }
                console.log('New room maintenance task scheduled:', newTask)
                alert(`Maintenance task "${newTask.title}" has been scheduled for ${room.name}!\nWork Order: ${newTask.workOrder}`)
                setShowScheduleModal(false)
                setNewMaintenanceTask({
                  title: '',
                  type: 'Preventive',
                  priority: 'Medium',
                  description: '',
                  scheduledDate: '',
                  estimatedDuration: '',
                  assignedTo: '',
                  category: '',
                  cost: '',
                  notes: ''
                })
              }}
              className="p-6 space-y-6"
            >
              {/* Room Information */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getTypeIcon(room.type)}</span>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{room.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{room.number} • Floor {room.floor} • {room.type}</div>
                  </div>
                </div>
              </div>

              {/* Task Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Task Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newMaintenanceTask.title}
                    onChange={(e) => setNewMaintenanceTask({...newMaintenanceTask, title: e.target.value})}
                    placeholder="e.g., HVAC System Check"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Maintenance Type
                  </label>
                  <select
                    value={newMaintenanceTask.type}
                    onChange={(e) => setNewMaintenanceTask({...newMaintenanceTask, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Preventive">Preventive</option>
                    <option value="Corrective">Corrective</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Inspection">Inspection</option>
                    <option value="Cleaning">Cleaning</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priority Level
                  </label>
                  <select
                    value={newMaintenanceTask.priority}
                    onChange={(e) => setNewMaintenanceTask({...newMaintenanceTask, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={newMaintenanceTask.category}
                    onChange={(e) => setNewMaintenanceTask({...newMaintenanceTask, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    <option value="HVAC">HVAC</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Medical Equipment">Medical Equipment</option>
                    <option value="Structural">Structural</option>
                    <option value="Safety Systems">Safety Systems</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Scheduled Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newMaintenanceTask.scheduledDate}
                    onChange={(e) => setNewMaintenanceTask({...newMaintenanceTask, scheduledDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Estimated Duration
                  </label>
                  <input
                    type="text"
                    value={newMaintenanceTask.estimatedDuration}
                    onChange={(e) => setNewMaintenanceTask({...newMaintenanceTask, estimatedDuration: e.target.value})}
                    placeholder="e.g., 2 hours"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Assigned To
                  </label>
                  <input
                    type="text"
                    value={newMaintenanceTask.assignedTo}
                    onChange={(e) => setNewMaintenanceTask({...newMaintenanceTask, assignedTo: e.target.value})}
                    placeholder="Technician name"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Estimated Cost (₦)
                  </label>
                  <input
                    type="number"
                    value={newMaintenanceTask.cost}
                    onChange={(e) => setNewMaintenanceTask({...newMaintenanceTask, cost: e.target.value})}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={newMaintenanceTask.description}
                  onChange={(e) => setNewMaintenanceTask({...newMaintenanceTask, description: e.target.value})}
                  placeholder="Describe the maintenance task..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Additional Notes
                </label>
                <textarea
                  rows={2}
                  value={newMaintenanceTask.notes}
                  onChange={(e) => setNewMaintenanceTask({...newMaintenanceTask, notes: e.target.value})}
                  placeholder="Any additional notes or special instructions..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => {
                    setShowScheduleModal(false)
                    setNewMaintenanceTask({
                      title: '',
                      type: 'Preventive',
                      priority: 'Medium',
                      description: '',
                      scheduledDate: '',
                      estimatedDuration: '',
                      assignedTo: '',
                      category: '',
                      cost: '',
                      notes: ''
                    })
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 011-1h3z" />
                  </svg>
                  <span>Schedule Maintenance</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
