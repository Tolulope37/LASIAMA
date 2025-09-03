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
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
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
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
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
    </div>
  )
}
