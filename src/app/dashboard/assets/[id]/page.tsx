"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import ArchitecturalFloorPlan from "@/components/ArchitecturalFloorPlan"

// Condition Assessment Component
interface Assessment {
  id: string
  serial_number: number
  location_type: string
  floor_level: string
  room_name: string
  room_dimension: string
  category: 'STRUCTURAL' | 'ELECTRICAL' | 'MECHANICAL'
  item_type: string
  sub_type: string
  description: string
  item_dimension: string
  brand_name: string
  total_qty: number
  total_qty_not_functioning: number
  damages_defects: string
  damage_dimension: string
  comments: string
  assessor_name: string
  assessment_date: string
  status: 'good' | 'needs_attention' | 'needs_repair' | 'needs_replacement' | 'critical'
  priority: 'low' | 'medium' | 'high' | 'critical'
}

const ConditionAssessmentContent = ({ assetId }: { assetId: string }) => {
  const router = useRouter()
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedFloor, setSelectedFloor] = useState('all')
  const [selectedRoom, setSelectedRoom] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'list' | 'floor' | 'room'>('list')
  const [expandedFloors, setExpandedFloors] = useState<Set<string>>(new Set())
  const [expandedRooms, setExpandedRooms] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Load assessment data
    fetch('/src/data/lasiama_assessments.json')
      .then(res => res.json())
      .then(data => {
        setAssessments(data)
        setLoading(false)
      })
      .catch(() => {
        // Fallback sample data
        const sampleData: Assessment[] = [
          {
            id: 'assessment_1',
            serial_number: 1,
            location_type: 'INTERNAL',
            floor_level: 'FIRST FLOOR',
            room_name: 'CORRIDOR TO CLASSROOM(BLOCK A)',
            room_dimension: '52.4X1.8',
            category: 'STRUCTURAL',
            item_type: 'FLOOR',
            sub_type: 'TERRAZO',
            description: '1.2X1.2 TERRAZO',
            item_dimension: '52.4X1.8',
            brand_name: '',
            total_qty: 1,
            total_qty_not_functioning: 0,
            damages_defects: '',
            damage_dimension: '',
            comments: 'REPLACE ALL THE RAILS',
            assessor_name: 'EDOGA JAMES C',
            assessment_date: '2025-09-03',
            status: 'needs_attention',
            priority: 'high'
          },
          {
            id: 'assessment_2',
            serial_number: 2,
            location_type: 'INTERNAL',
            floor_level: 'FIRST FLOOR',
            room_name: 'V.P ACADEMICS 2/TOILET(BLOCK A)',
            room_dimension: '3.5X3.4',
            category: 'STRUCTURAL',
            item_type: 'DOOR',
            sub_type: 'PANELED',
            description: 'FIBER MATERIAL',
            item_dimension: '0.9X2.1',
            brand_name: '',
            total_qty: 1,
            total_qty_not_functioning: 1,
            damages_defects: 'BAD HANDLE',
            damage_dimension: '',
            comments: 'THE WALL FOR THE V.P ACADEMIC 2 IS CRACKED',
            assessor_name: 'EDOGA JAMES C',
            assessment_date: '2025-09-03',
            status: 'needs_repair',
            priority: 'high'
          },
          {
            id: 'assessment_3',
            serial_number: 3,
            location_type: 'INTERNAL',
            floor_level: 'FIRST FLOOR',
            room_name: 'ICT ROOM(BLOCK A)',
            room_dimension: '7.1X7.1',
            category: 'ELECTRICAL',
            item_type: 'LIGHT FIXTURES/FITTINGS',
            sub_type: '18W ROUND SURFACE PANEL',
            description: '18W ROUND SURFACE PANEL',
            item_dimension: '',
            brand_name: '',
            total_qty: 4,
            total_qty_not_functioning: 2,
            damages_defects: 'NOT FUNCTIONING',
            damage_dimension: '',
            comments: 'REPLACE 2NOS OF 18W ROUND SURFACE PANEL LIGHTING FITTINGS',
            assessor_name: 'OJERINDE ADEYEMI',
            assessment_date: '2025-09-03',
            status: 'needs_replacement',
            priority: 'high'
          },
          {
            id: 'assessment_4',
            serial_number: 4,
            location_type: 'INTERNAL',
            floor_level: 'GROUND FLOOR',
            room_name: 'GENERAL TOILET MALE(BLOCK F)',
            room_dimension: '1.3X0.9',
            category: 'MECHANICAL',
            item_type: 'WATER CLOSET',
            sub_type: 'TOILET TANK',
            description: 'TOILET TANK',
            item_dimension: '1.3X0.9',
            brand_name: 'TWYFORD',
            total_qty: 5,
            total_qty_not_functioning: 5,
            damages_defects: 'THE TOILET ROOF IS COMPLETELY BAD',
            damage_dimension: '1.3X0.9',
            comments: 'THE WHOLE TOILET NEEDS TO BE REPLACED(5).TAP,SINK AND CONNECTOR NEEDS TO BE REPLACED',
            assessor_name: 'ATUGEGE S.E',
            assessment_date: '2025-09-03',
            status: 'critical',
            priority: 'critical'
          }
        ]
        setAssessments(sampleData)
        setLoading(false)
      })
  }, [])

  const getStatusColor = (status: Assessment['status']) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300'
      case 'needs_attention': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300'
      case 'needs_repair': return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300'
      case 'needs_replacement': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300'
      case 'critical': return 'text-red-800 bg-red-200 dark:bg-red-800 dark:text-red-100'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getPriorityColor = (priority: Assessment['priority']) => {
    switch (priority) {
      case 'low': return 'text-green-600'
      case 'medium': return 'text-yellow-600'
      case 'high': return 'text-orange-600'
      case 'critical': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getCategoryIcon = (category: Assessment['category']) => {
    switch (category) {
      case 'STRUCTURAL': return '🏗️'
      case 'ELECTRICAL': return '⚡'
      case 'MECHANICAL': return '🔧'
      default: return '📋'
    }
  }

  // Filter assessments
  const filteredAssessments = assessments.filter(assessment => {
    const matchesCategory = selectedCategory === 'all' || assessment.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || assessment.status === selectedStatus
    const matchesFloor = selectedFloor === 'all' || assessment.floor_level === selectedFloor
    const matchesRoom = selectedRoom === 'all' || assessment.room_name === selectedRoom
    const matchesSearch = !searchQuery || 
      assessment.room_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assessment.item_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assessment.damages_defects.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesStatus && matchesFloor && matchesRoom && matchesSearch
  })

  // Get unique values for filters
  const categories = Array.from(new Set(assessments.map(a => a.category)))
  const statuses = Array.from(new Set(assessments.map(a => a.status)))
  const floors = Array.from(new Set(assessments.map(a => a.floor_level))).sort()
  const rooms = Array.from(new Set(assessments.map(a => a.room_name))).sort()

  // Group assessments by floor and room
  const assessmentsByFloor = filteredAssessments.reduce((acc, assessment) => {
    if (!acc[assessment.floor_level]) {
      acc[assessment.floor_level] = []
    }
    acc[assessment.floor_level].push(assessment)
    return acc
  }, {} as Record<string, Assessment[]>)

  const assessmentsByRoom = filteredAssessments.reduce((acc, assessment) => {
    const key = `${assessment.floor_level}|${assessment.room_name}`
    if (!acc[key]) {
      acc[key] = {
        floor: assessment.floor_level,
        room: assessment.room_name,
        assessments: []
      }
    }
    acc[key].assessments.push(assessment)
    return acc
  }, {} as Record<string, { floor: string, room: string, assessments: Assessment[] }>)

  // Helper functions for expand/collapse
  const toggleFloorExpansion = (floor: string) => {
    const newExpanded = new Set(expandedFloors)
    if (newExpanded.has(floor)) {
      newExpanded.delete(floor)
    } else {
      newExpanded.add(floor)
    }
    setExpandedFloors(newExpanded)
  }

  const toggleRoomExpansion = (roomKey: string) => {
    const newExpanded = new Set(expandedRooms)
    if (newExpanded.has(roomKey)) {
      newExpanded.delete(roomKey)
    } else {
      newExpanded.add(roomKey)
    }
    setExpandedRooms(newExpanded)
  }

  // Calculate floor and room statistics
  const getFloorStats = (floorAssessments: Assessment[]) => {
    return {
      total: floorAssessments.length,
      critical: floorAssessments.filter(a => a.status === 'critical').length,
      needsRepair: floorAssessments.filter(a => a.status === 'needs_repair' || a.status === 'needs_replacement').length,
      needsAttention: floorAssessments.filter(a => a.status === 'needs_attention').length,
      good: floorAssessments.filter(a => a.status === 'good').length,
    }
  }

  const getRoomStats = (roomAssessments: Assessment[]) => {
    return {
      total: roomAssessments.length,
      critical: roomAssessments.filter(a => a.status === 'critical').length,
      needsRepair: roomAssessments.filter(a => a.status === 'needs_repair' || a.status === 'needs_replacement').length,
      needsAttention: roomAssessments.filter(a => a.status === 'needs_attention').length,
      good: roomAssessments.filter(a => a.status === 'good').length,
    }
  }

  // Calculate statistics
  const stats = {
    total: assessments.length,
    critical: assessments.filter(a => a.status === 'critical').length,
    needsRepair: assessments.filter(a => a.status === 'needs_repair' || a.status === 'needs_replacement').length,
    needsAttention: assessments.filter(a => a.status === 'needs_attention').length,
    good: assessments.filter(a => a.status === 'good').length,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading assessments...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Asset Condition Assessment</h3>
          <p className="text-gray-600 dark:text-gray-400">Comprehensive building condition assessment based on Lasiama standards</p>
        </div>
        <div className="flex items-center space-x-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              📋 List View
            </button>
            <button
              onClick={() => setViewMode('floor')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'floor'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              🏢 By Floor
            </button>
            <button
              onClick={() => setViewMode('room')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'room'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              🚪 By Room
            </button>
          </div>
          
          <button 
            onClick={() => router.push('/dashboard/maintenance/assessments')}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>View Maintenance Tasks</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Items</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Critical</p>
              <p className="text-2xl font-bold text-red-600">{stats.critical}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Needs Repair</p>
              <p className="text-2xl font-bold text-orange-600">{stats.needsRepair}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Needs Attention</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.needsAttention}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Good Condition</p>
              <p className="text-2xl font-bold text-green-600">{stats.good}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filter Assessments</h4>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search rooms, items, or issues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status.replace('_', ' ').toUpperCase()}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Floor</label>
            <select
              value={selectedFloor}
              onChange={(e) => setSelectedFloor(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Floors</option>
              {floors.map(floor => (
                <option key={floor} value={floor}>{floor}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Room</label>
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Rooms</option>
              {rooms.map(room => (
                <option key={room} value={room}>{room}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Assessment Views */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            Assessment Items ({filteredAssessments.length})
          </h4>
        </div>

        {/* List View */}
        {viewMode === 'list' && (
          <div className="grid gap-4">
            {filteredAssessments.map((assessment) => (
              <div key={assessment.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getCategoryIcon(assessment.category)}</span>
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white">{assessment.room_name}</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{assessment.floor_level}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(assessment.status)}`}>
                      {assessment.status.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className={`text-xs font-medium ${getPriorityColor(assessment.priority)}`}>
                      {assessment.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Item Details</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {assessment.category} - {assessment.item_type}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {assessment.sub_type} - {assessment.description}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Quantity</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Total: {assessment.total_qty} | Not Functioning: {assessment.total_qty_not_functioning}
                    </p>
                  </div>
                </div>
                
                {assessment.damages_defects && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Damages/Defects</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{assessment.damages_defects}</p>
                  </div>
                )}
                
                {assessment.comments && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Comments</p>
                    <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">{assessment.comments}</p>
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Assessed by: {assessment.assessor_name}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Date: {assessment.assessment_date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Floor View */}
        {viewMode === 'floor' && (
          <div className="space-y-6">
            {Object.entries(assessmentsByFloor).map(([floor, floorAssessments]) => {
              const floorStats = getFloorStats(floorAssessments)
              const isExpanded = expandedFloors.has(floor)
              
              return (
                <div key={floor} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <div 
                    className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => toggleFloorExpansion(floor)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">🏢</span>
                          <h5 className="text-lg font-semibold text-gray-900 dark:text-white">{floor}</h5>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {floorStats.total} items
                          </span>
                          {floorStats.critical > 0 && (
                            <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs font-medium rounded-full">
                              {floorStats.critical} Critical
                            </span>
                          )}
                          {floorStats.needsRepair > 0 && (
                            <span className="px-2 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 text-xs font-medium rounded-full">
                              {floorStats.needsRepair} Need Repair
                            </span>
                          )}
                        </div>
                      </div>
                      <svg 
                        className={`w-5 h-5 text-gray-400 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="border-t border-gray-200 dark:border-gray-700">
                      <div className="p-6 space-y-4">
                        {floorAssessments.map((assessment) => (
                          <div key={assessment.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <span className="text-xl">{getCategoryIcon(assessment.category)}</span>
                                <div>
                                  <h6 className="font-medium text-gray-900 dark:text-white">{assessment.room_name}</h6>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {assessment.category} - {assessment.item_type}
                                  </p>
                                </div>
                              </div>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(assessment.status)}`}>
                                {assessment.status.replace('_', ' ').toUpperCase()}
                              </span>
                            </div>
                            
                            {assessment.damages_defects && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                <span className="font-medium">Issue:</span> {assessment.damages_defects}
                              </p>
                            )}
                            
                            {assessment.comments && (
                              <p className="text-sm text-orange-600 dark:text-orange-400">
                                <span className="font-medium">Action:</span> {assessment.comments}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Room View */}
        {viewMode === 'room' && (
          <div className="space-y-6">
            {Object.entries(assessmentsByRoom).map(([roomKey, roomData]) => {
              const roomStats = getRoomStats(roomData.assessments)
              const isExpanded = expandedRooms.has(roomKey)
              
              return (
                <div key={roomKey} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <div 
                    className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => toggleRoomExpansion(roomKey)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">🚪</span>
                          <div>
                            <h5 className="text-lg font-semibold text-gray-900 dark:text-white">{roomData.room}</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{roomData.floor}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {roomStats.total} items
                          </span>
                          {roomStats.critical > 0 && (
                            <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs font-medium rounded-full">
                              {roomStats.critical} Critical
                            </span>
                          )}
                          {roomStats.needsRepair > 0 && (
                            <span className="px-2 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 text-xs font-medium rounded-full">
                              {roomStats.needsRepair} Need Repair
                            </span>
                          )}
                        </div>
                      </div>
                      <svg 
                        className={`w-5 h-5 text-gray-400 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="border-t border-gray-200 dark:border-gray-700">
                      <div className="p-6 space-y-4">
                        {roomData.assessments.map((assessment) => (
                          <div key={assessment.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <span className="text-xl">{getCategoryIcon(assessment.category)}</span>
                                <div>
                                  <h6 className="font-medium text-gray-900 dark:text-white">
                                    {assessment.item_type} - {assessment.sub_type}
                                  </h6>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{assessment.description}</p>
                                  <p className="text-sm text-gray-500 dark:text-gray-500">
                                    Qty: {assessment.total_qty} | Not Working: {assessment.total_qty_not_functioning}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-col items-end space-y-1">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(assessment.status)}`}>
                                  {assessment.status.replace('_', ' ').toUpperCase()}
                                </span>
                                <span className={`text-xs font-medium ${getPriorityColor(assessment.priority)}`}>
                                  {assessment.priority.toUpperCase()} PRIORITY
                                </span>
                              </div>
                            </div>
                            
                            {assessment.damages_defects && (
                              <div className="mb-2">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Damages/Defects:</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{assessment.damages_defects}</p>
                              </div>
                            )}
                            
                            {assessment.comments && (
                              <div className="mb-2">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Recommended Action:</p>
                                <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">{assessment.comments}</p>
                              </div>
                            )}
                            
                            <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-600">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                By: {assessment.assessor_name}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {assessment.assessment_date}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
        
        {filteredAssessments.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-600 dark:text-gray-400">No assessments found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Function to generate comprehensive asset data for any asset
const generateAssetData = (baseAsset: Record<string, unknown>) => {
  // Generate contextual data based on asset type
  const getContextualSpecs = () => {
    switch (baseAsset.category) {
      case 'Healthcare':
        return {
          floors: 8,
          rooms: 200,
          capacity: '500 beds',
          specialFeatures: ['ICU', 'Operating Theaters', 'Emergency Ward', 'Diagnostic Center'],
          equipment: ['MRI Machine', 'CT Scanner', 'X-Ray Units', 'Ventilators']
        }
      case 'Government':
        return {
          floors: 12,
          rooms: 150,
          capacity: '2000 staff',
          specialFeatures: ['Council Chambers', 'Conference Halls', 'Public Service Areas'],
          equipment: ['Backup Generators', 'Security Systems', 'Communication Networks']
        }
      case 'Education':
        return {
          floors: 6,
          rooms: 100,
          capacity: '5000 students',
          specialFeatures: ['Lecture Halls', 'Laboratories', 'Library', 'Auditorium'],
          equipment: ['Projectors', 'Lab Equipment', 'Library Systems', 'Sports Facilities']
        }
      case 'Recreation':
        return {
          floors: 4,
          rooms: 50,
          capacity: '10000 visitors',
          specialFeatures: ['Event Spaces', 'Exhibition Areas', 'Performance Venues'],
          equipment: ['Sound Systems', 'Lighting Rigs', 'Stage Equipment']
        }
      case 'Commercial':
        return {
          floors: 6,
          rooms: 80,
          capacity: '200 shops',
          specialFeatures: ['Retail Spaces', 'Food Court', 'Parking Garage', 'Loading Docks'],
          equipment: ['Escalators', 'HVAC Systems', 'Security Cameras', 'POS Systems']
        }
      case 'Transportation':
        return {
          floors: 2,
          rooms: 20,
          capacity: '50000 vehicles/day',
          specialFeatures: ['Toll Gates', 'Control Room', 'Maintenance Bay'],
          equipment: ['Toll Collection Systems', 'Traffic Management', 'Barrier Gates']
        }
      case 'Culture':
        return {
          floors: 5,
          rooms: 60,
          capacity: '2000 seats',
          specialFeatures: ['Main Theater', 'Rehearsal Rooms', 'Exhibition Spaces', 'VIP Areas'],
          equipment: ['Stage Lighting', 'Sound Systems', 'Projection Equipment', 'Seating']
        }
      default:
        return {
          floors: 4,
          rooms: 50,
          capacity: '1000 occupants',
          specialFeatures: ['Main Areas', 'Service Areas', 'Storage'],
          equipment: ['Basic Systems', 'Security', 'Utilities']
        }
    }
  }

  const contextualSpecs = getContextualSpecs()

  return {
    id: baseAsset.id,
    name: baseAsset.name,
    number: `#LAS-${baseAsset.category.substring(0,3).toUpperCase()}-${baseAsset.id.toString().padStart(3, '0')}`,
    location: baseAsset.location,
    category: baseAsset.category,
    subcategory: baseAsset.subcategory,
    status: baseAsset.status,
    openFaults: baseAsset.openFaults,
    maintenance: baseAsset.maintenance,
    updated: baseAsset.updated,
    value: baseAsset.value,
    yearBuilt: baseAsset.yearBuilt,
    size: baseAsset.size,
    condition: baseAsset.condition,
    department: baseAsset.department,
    description: `${baseAsset.name} is a ${baseAsset.type} located in ${baseAsset.location}. Built in ${baseAsset.yearBuilt}, this ${baseAsset.size.toLowerCase()}-scale ${baseAsset.category.toLowerCase()} facility serves the ${baseAsset.department} department of Lagos State.`,
    
    // Asset Details
    assetDetails: {
      type: baseAsset.type,
      value: baseAsset.value,
      size: baseAsset.size,
      condition: baseAsset.condition,
      yearBuilt: baseAsset.yearBuilt,
      department: baseAsset.department,
      lastInspection: "15/07/2025",
      nextInspection: "15/10/2025",
      insurance: "Active - Lagos State Insurance",
      ownership: "Lagos State Government"
    },

    // Financial Information
    financialInfo: {
      purchasePrice: baseAsset.value,
      currentValue: baseAsset.value,
      depreciationRate: "3% per annum",
      maintenanceBudget: "₦2.5M annually",
      insuranceValue: baseAsset.value,
      lastValuation: "15/01/2025"
    },

    // Annual Maintenance by Year (Default for non-healthcare assets)
    annualMaintenanceByYear: {
      "2025": {
        budgeted: "₦2.5M",
        actual: "₦2.3M",
        variance: "-₦200K",
        projects: [
          { name: "General Maintenance", cost: "₦1.5M", status: "Completed" },
          { name: "System Updates", cost: "₦800K", status: "Completed" }
        ]
      },
      "2024": {
        budgeted: "₦2.2M",
        actual: "₦2.4M",
        variance: "+₦200K",
        projects: [
          { name: "Annual Inspection", cost: "₦1.2M", status: "Completed" },
          { name: "Equipment Service", cost: "₦1.2M", status: "Completed" }
        ]
      },
      "2023": {
        budgeted: "₦2.0M",
        actual: "₦1.9M",
        variance: "-₦100K",
        projects: [
          { name: "Preventive Maintenance", cost: "₦1.0M", status: "Completed" },
          { name: "Minor Repairs", cost: "₦900K", status: "Completed" }
        ]
      },
      "2022": {
        budgeted: "₦1.8M",
        actual: "₦1.7M",
        variance: "-₦100K",
        projects: [
          { name: "Routine Service", cost: "₦900K", status: "Completed" },
          { name: "Safety Checks", cost: "₦800K", status: "Completed" }
        ]
      }
    },

    // Building Specifications (adapted based on asset type)
    specifications: {
      totalArea: baseAsset.size === "Large" ? "15,000 sq m" : baseAsset.size === "Medium" ? "8,000 sq m" : "3,000 sq m",
      floors: contextualSpecs.floors,
      rooms: contextualSpecs.rooms,
      capacity: contextualSpecs.capacity,
      parkingSpaces: baseAsset.size === "Large" ? 300 : baseAsset.size === "Medium" ? 150 : 50,
      elevators: contextualSpecs.floors > 6 ? 4 : contextualSpecs.floors > 3 ? 2 : 1,
      emergencyExits: Math.ceil(contextualSpecs.floors / 2) * 2,
      hvacSystem: "Central Air Conditioning",
      electricalSystem: "3-Phase 415V",
      waterSupply: "Municipal + Backup",
      fireSystem: "Sprinkler + Alarm System",
      securitySystem: "CCTV + Access Control",
      backupPower: "Diesel Generators",
      specialFeatures: contextualSpecs.specialFeatures
    },

    // Construction and Utilities (for UI compatibility)
    construction: {
      foundationType: "Reinforced Concrete",
      structuralSystem: "Steel Frame with Concrete",
      exteriorWalls: "Brick and Glass Facade",
      roofing: "Metal Roofing System",
      flooring: baseAsset.category === 'Healthcare' ? "Medical Grade Vinyl" : 
                baseAsset.category === 'Government' ? "Marble and Carpet" : "Ceramic Tiles"
    },

    utilities: {
      electricalLoad: baseAsset.size === "Large" ? "2000 KVA" : "1000 KVA",
      waterConsumption: baseAsset.size === "Large" ? "50,000 L/day" : "25,000 L/day", 
      wasteGeneration: baseAsset.size === "Large" ? "2 tons/day" : "1 ton/day",
      internetConnectivity: "Fiber Optic - 1 Gbps",
      phoneLines: contextualSpecs.rooms,
      emergencyPower: "Diesel Generator - 500 KVA"
    },

    // Financial data (for UI compatibility)
    financial: {
      acquisitionCost: baseAsset.value,
      currentValue: baseAsset.value,
      annualOperatingCost: baseAsset.size === "Large" ? "₦500M" : "₦250M",
      maintenanceBudget: "₦50M annually",
      insurancePremium: "₦25M annually",
      propertyTax: "₦10M annually"
    },

    // Maintenance History
    maintenanceHistory: [
      {
        id: "MH-001",
        date: "10/08/2025",
        type: "Preventive",
        title: `${baseAsset.category} system maintenance`,
        description: `Comprehensive maintenance of ${baseAsset.name} including system checks, cleaning, and performance optimization.`,
        cost: "₦1.5M",
        contractor: {
          name: "Lagos State Maintenance Ltd",
          contact: "+234-803-555-0789",
          license: "MAINT-LG-2019-067",
          address: "23 Industrial Avenue, Ikeja, Lagos"
        },
        technician: {
          name: "Engr. Adebayo Johnson",
          certification: "Certified Maintenance Professional",
          experience: "10 years",
          phone: "+234-806-555-0234"
        },
        workOrder: `WO-2025-${baseAsset.id.toString().padStart(4, '0')}`,
        duration: "6 hours",
        priority: "Medium",
        status: "Completed",
        completionNotes: "All systems operating within normal parameters. Next service recommended in 3 months.",
        partsUsed: [
          { item: "General Maintenance Supplies", quantity: "Various", cost: "₦200K" },
          { item: "Cleaning Materials", quantity: "5L", cost: "₦50K" }
        ],
        laborCost: "₦1.25M",
        documents: [
          {
            name: "Maintenance Report.pdf",
            type: "Report",
            size: "1.8 MB",
            uploadDate: "08/10/2025",
            url: `/documents/maintenance/MH-${baseAsset.id}-report.pdf`
          },
          {
            name: "Work Photos.zip",
            type: "Photos",
            size: "8.3 MB",
            uploadDate: "08/10/2025",
            url: `/documents/maintenance/MH-${baseAsset.id}-photos.zip`
          }
        ],
        nextMaintenanceDate: "08/01/2026",
        warranty: "3 months on parts and labor",
        approvedBy: "Engr. Adebayo Ogundimu - Facility Manager",
        rating: 4.5
      }
    ],

    // Audit Trail
    auditTrail: [
      {
        id: "AT-001",
        timestamp: "15/12/2025T14:30:22Z",
        action: "Asset Created",
        user: {
          name: "Engr. Adebayo Ogundimu",
          role: "Facility Manager",
          department: "Infrastructure Management",
          userId: "EMP-2018-045",
          email: "a.ogundimu@lasiama.lg.gov.ng"
        },
        changes: {
          summary: `Initial asset registration for ${baseAsset.name}`,
          fields: [
            { field: "Asset Name", oldValue: null, newValue: baseAsset.name },
            { field: "Asset Type", oldValue: null, newValue: baseAsset.type },
            { field: "Location", oldValue: null, newValue: baseAsset.location },
            { field: "Status", oldValue: null, newValue: baseAsset.status },
            { field: "Value", oldValue: null, newValue: baseAsset.value }
          ]
        },
        ipAddress: "192.168.1.45",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        sessionId: `sess_2025121514302${baseAsset.id}`,
        approvalRequired: false,
        notes: "Asset migrated from legacy system during digital transformation initiative"
      }
    ],

    // Documents
    documents: [
      { name: "Building Plan Approval", type: "PDF", date: `${baseAsset.yearBuilt}-03-15`, size: "2.4MB" },
      { name: "Structural Drawings", type: "DWG", date: `${baseAsset.yearBuilt}-05-20`, size: "15.2MB" },
      { name: "Insurance Policy", type: "PDF", date: "01/01/2025", size: "3.2MB" }
    ],

    // Images
    images: [
      {
        id: 1,
        url: "/api/placeholder/800/600",
        title: `${baseAsset.name} - Main View`,
        type: "exterior",
        date: "01/08/2025",
        description: `Primary exterior view of ${baseAsset.name}`
      },
      {
        id: 2,
        url: "/api/placeholder/800/600", 
        title: `${baseAsset.name} - Interior`,
        type: "interior",
        date: "01/08/2025",
        description: `Interior view showing main areas`
      }
    ],

    // Equipment Inventory (contextual based on asset type)
    detailedInventory: {
      airConditioning: [
        {
          id: "AC-001",
          type: baseAsset.category === 'Healthcare' ? "Medical Grade HVAC" : 
                baseAsset.category === 'Government' ? "Commercial HVAC System" : "Standard HVAC System",
          brand: "Carrier",
          model: "Commercial Series",
          capacity: baseAsset.size === "Large" ? "200 TR" : baseAsset.size === "Medium" ? "100 TR" : "50 TR",
          location: "Main Building",
          yearInstalled: baseAsset.yearBuilt + 5,
          installedBy: "HVAC Systems Ltd",
          condition: baseAsset.condition,
          category: "Air Conditioning"
        }
      ],
      doors: contextualSpecs.rooms > 100 ? Array.from({length: Math.min(50, contextualSpecs.rooms)}, (_, i) => ({
        id: `DR-${(i + 1).toString().padStart(3, '0')}`,
        type: i < 5 ? "Main Entrance Door" : i < 10 ? "Fire Exit Door" : "Internal Door",
        material: baseAsset.category === 'Healthcare' ? "Medical Grade Steel" : 
                  baseAsset.category === 'Government' ? "Security Steel" : "Standard Steel",
        dimensions: i < 5 ? "3m x 2.5m" : "2m x 2.1m",
        brand: "SecureDoor Systems",
        yearInstalled: baseAsset.yearBuilt,
        installedBy: "Door Installation Co",
        condition: baseAsset.condition,
        category: "Doors",
        accessLevel: i < 5 ? "Public" : i < 20 ? "Restricted" : "Internal"
      })) : [],
      windows: contextualSpecs.floors > 2 ? Array.from({length: Math.min(30, contextualSpecs.floors * 6)}, (_, i) => ({
        id: `WN-${(i + 1).toString().padStart(3, '0')}`,
        type: "Double Glazed Window",
        material: "Aluminum Frame with Glass",
        dimensions: "1.5m x 1.2m",
        brand: "WindowTech",
        floor: Math.ceil((i + 1) / 6),
        yearInstalled: baseAsset.yearBuilt,
        installedBy: "Window Systems Ltd",
        condition: baseAsset.condition,
        category: "Windows"
      })) : [],
      lighting: Array.from({length: Math.min(20, Math.ceil(contextualSpecs.rooms / 5))}, (_, i) => ({
        id: `LT-${(i + 1).toString().padStart(3, '0')}`,
        type: i < 3 ? "LED Panel Lighting" : i < 8 ? "Fluorescent Lighting" : "Emergency Lighting",
        brand: "Philips",
        wattage: i < 3 ? "40W" : i < 8 ? "36W" : "8W",
        location: i < 3 ? "Main Areas" : i < 8 ? "Offices" : "Emergency Routes",
        yearInstalled: baseAsset.yearBuilt + 10,
        installedBy: "Electrical Solutions",
        condition: "Good",
        category: "Lighting"
      })),
      electrical: [
        {
          id: "EL-001",
          type: "Main Distribution Board",
          brand: "Schneider Electric",
          capacity: baseAsset.size === "Large" ? "2000A" : "1000A",
          voltage: "415V/240V",
          yearInstalled: baseAsset.yearBuilt + 2,
          installedBy: "Power Systems Engineering",
          condition: baseAsset.condition,
          category: "Electrical"
        },
        {
          id: "EL-002",
          type: "UPS System",
          brand: "APC",
          model: "Galaxy Series",
          capacity: baseAsset.size === "Large" ? "200 KVA" : "100 KVA",
          batteryBackup: "30 minutes",
          location: baseAsset.category === 'Healthcare' ? "Critical Care Areas" : "Main Operations",
          yearInstalled: baseAsset.yearBuilt + 8,
          installedBy: "Uninterrupted Power Ltd",
          condition: "Excellent",
          category: "Electrical"
        }
      ],
      plumbing: Array.from({length: Math.min(10, Math.ceil(contextualSpecs.floors / 2))}, (_, i) => ({
        id: `PL-${(i + 1).toString().padStart(3, '0')}`,
        type: i < 2 ? "Main Water Supply" : i < 5 ? "Drainage System" : "Fire Suppression",
        material: i < 5 ? "PVC Pipes" : "Steel Pipes",
        diameter: i < 2 ? "200mm" : "150mm",
        brand: "JM Eagle",
        yearInstalled: baseAsset.yearBuilt,
        lastUpgrade: baseAsset.yearBuilt + 20,
        upgradedBy: "Lagos Plumbing Works",
        pressure: "4.5 bar",
        condition: baseAsset.condition,
        category: "Plumbing"
      })),
      security: [
        {
          id: "SEC-001",
          type: "CCTV System",
          brand: "Hikvision",
          cameras: baseAsset.size === "Large" ? 64 : baseAsset.size === "Medium" ? 32 : 16,
          resolution: "4K Ultra HD",
          yearInstalled: 2020,
          installedBy: "Security Solutions Ltd",
          condition: "Good",
          category: "Security"
        },
        {
          id: "SEC-002",
          type: "Access Control System",
          brand: "HID Global",
          model: "VertX Series",
          cardReaders: contextualSpecs.floors * 4,
          users: contextualSpecs.capacity,
          yearInstalled: 2021,
          installedBy: "Access Control Systems",
          condition: "Excellent",
          category: "Security"
        }
      ]
    }
  }
}

// Mock asset data with comprehensive details - Dynamic approach
const getAssetById = (id: string) => {
  // This would normally come from an API or database
  // For now, we'll create a basic asset structure and generate comprehensive details dynamically
  const assetId = parseInt(id)
  if (isNaN(assetId) || assetId < 1 || assetId > 43) return null
  
  // Create a base asset structure with common properties
  const baseAsset = {
    id: assetId,
    name: `Asset ${assetId}`,
    number: `#LAS-AST-${assetId.toString().padStart(3, '0')}`,
    location: "Lagos State",
    category: "Government Asset",
    subcategory: "General Asset",
    status: "ACTIVE",
    openFaults: Math.floor(Math.random() * 3),
    maintenance: Math.floor(Math.random() * 3),
    updated: "01/09/2025",
    department: "Lagos State Government",
    yearBuilt: 1990 + Math.floor(Math.random() * 30),
    value: "₦1.5B",
    valueRange: "over-1b",
    size: "10,000 sqm",
    sizeRange: "large",
    condition: ["Excellent", "Good", "Fair"][Math.floor(Math.random() * 3)]
  }

  // Generate comprehensive asset data based on the base asset
  const assets = {
    "1": {
      id: 1,
      name: "Lagos State General Hospital Main Building",
      number: "#LAS-HLT-001",
      location: "Ikeja, Lagos State",
      category: "Healthcare Facilities",
      subcategory: "General Hospitals",
      status: "ACTIVE",
      openFaults: 0,
      maintenance: 1,
      updated: "15/08/2025",
      department: "Ministry of Health",
      yearBuilt: 1978,
      value: "₦2.5B",
      valueRange: "over-1b",
      size: "15,000 sqm",
      sizeRange: "large",
      condition: "Good",
      floors: 8,
      rooms: 250,
      
      // Comprehensive Details
      description: "Main healthcare facility serving the Ikeja metropolis and surrounding areas. Provides comprehensive medical services including emergency care, surgery, maternity services, and specialized treatments.",
      
      // Physical Specifications
      specifications: {
        totalArea: "15,000 sqm",
        builtUpArea: "12,500 sqm",
        floors: 8,
        rooms: 250,
        beds: 400,
        operatingTheaters: 8,
        laboratories: 6,
        parking: "200 vehicles",
        emergencyBays: 12,
        elevators: 4,
        generators: 3,
        waterTanks: "50,000 liters capacity"
      },

      // Detailed Equipment Inventory
      detailedInventory: {
        airConditioning: [
          {
            id: "AC-001",
            type: "Central Chiller System",
            subType: "Water-Cooled Centrifugal Chiller",
            brand: "Carrier",
            model: "30XA-1502",
            serialNumber: "CRR-2018-XA1502-001",
            capacity: "500 TR (1,758 kW)",
            coolingType: "Water-Cooled",
            refrigerant: "R-134a (HFC)",
            refrigerantCharge: "450 kg",
            powerConsumption: "320 kW",
            energyRating: "A++",
            voltageRating: "415V/3Ph/50Hz",
            currentRating: "580A",
            location: "Main Building - Floors 1-4",
            roomsServed: ["General Wards 1-4", "Outpatient Clinics", "Administration", "Pharmacy"],
            controlSystem: "Carrier ComfortLink II",
            thermostatType: "Digital Programmable",
            airFlowRate: "85,000 CFM",
            soundLevel: "78 dB(A)",
            dimensions: "4.2m x 2.8m x 2.1m",
            weight: "3,200 kg",
            yearInstalled: 2018,
            installedBy: "Cool Tech Engineering Ltd",
            contractor: {
              name: "Cool Tech Engineering Ltd",
              license: "HVAC-LG-2018-045",
              contact: "+234-803-555-0123",
              address: "45 Industrial Estate, Ikeja, Lagos"
            },
            lastService: "15/07/2025",
            nextService: "15/10/2025",
            serviceInterval: "3 months",
            serviceTechnician: "Engr. Adebayo Ogundimu",
            condition: "Excellent",
            warrantyExpiry: "30/06/2028",
            warrantyProvider: "Carrier Nigeria Ltd",
            maintenanceContract: "Annual Service Contract - ₦2.5M/year",
            operatingHours: "8,760 hours/year",
            totalOperatingHours: "52,560 hours",
            efficiency: "6.8 kW/TR",
            costPerHour: "₦850/hour"
          },
          {
            id: "AC-002", 
            type: "Central Chiller System",
            subType: "Water-Cooled Centrifugal Chiller",
            brand: "Carrier",
            model: "30XA-1502",
            serialNumber: "CRR-2018-XA1502-002",
            capacity: "500 TR (1,758 kW)",
            coolingType: "Water-Cooled",
            refrigerant: "R-134a (HFC)",
            refrigerantCharge: "450 kg",
            powerConsumption: "320 kW",
            energyRating: "A++",
            voltageRating: "415V/3Ph/50Hz",
            currentRating: "580A",
            location: "Main Building - Floors 5-8",
            roomsServed: ["ICU", "Special Care Units", "Surgical Wards", "Recovery Rooms"],
            controlSystem: "Carrier ComfortLink II",
            thermostatType: "Digital Programmable",
            airFlowRate: "85,000 CFM",
            soundLevel: "78 dB(A)",
            dimensions: "4.2m x 2.8m x 2.1m",
            weight: "3,200 kg",
            yearInstalled: 2018,
            installedBy: "Cool Tech Engineering Ltd",
            contractor: {
              name: "Cool Tech Engineering Ltd",
              license: "HVAC-LG-2018-045",
              contact: "+234-803-555-0123",
              address: "45 Industrial Estate, Ikeja, Lagos"
            },
            lastService: "15/07/2025",
            nextService: "15/10/2025",
            serviceInterval: "3 months",
            serviceTechnician: "Engr. Adebayo Ogundimu",
            condition: "Excellent",
            warrantyExpiry: "30/06/2028",
            warrantyProvider: "Carrier Nigeria Ltd",
            maintenanceContract: "Annual Service Contract - ₦2.5M/year",
            operatingHours: "8,760 hours/year",
            totalOperatingHours: "52,560 hours",
            efficiency: "6.8 kW/TR",
            costPerHour: "₦850/hour"
          },
          {
            id: "AC-003",
            type: "VRF System",
            subType: "Variable Refrigerant Flow Multi-Split",
            brand: "Daikin",
            model: "VRV IV-S RXYSQ28T",
            serialNumber: "DKN-2020-VRV-003",
            capacity: "28 HP (78.4 kW)",
            coolingType: "Air-Cooled",
            refrigerant: "R-410A (HFC)",
            refrigerantCharge: "32 kg",
            powerConsumption: "26.8 kW",
            energyRating: "A+++",
            voltageRating: "415V/3Ph/50Hz",
            currentRating: "45A",
            location: "Operating Theater Complex",
            roomsServed: ["8 Operating Theaters", "Pre-op Rooms", "Recovery Areas", "Sterilization Room"],
            controlSystem: "Daikin Intelligent Touch Manager",
            thermostatType: "Individual Room Control",
            airFlowRate: "12,500 CFM",
            soundLevel: "58 dB(A)",
            dimensions: "1.8m x 0.9m x 1.7m",
            weight: "485 kg",
            indoorUnits: 16,
            indoorUnitTypes: "Ceiling Cassette (8), Wall Mount (4), Concealed Ceiling (4)",
            yearInstalled: 2020,
            installedBy: "Precision Climate Control",
            contractor: {
              name: "Precision Climate Control Ltd",
              license: "HVAC-LG-2020-089",
              contact: "+234-807-555-0456",
              address: "12 Climate Street, Victoria Island, Lagos"
            },
            lastService: "01/08/2025",
            nextService: "01/11/2025",
            serviceInterval: "3 months",
            serviceTechnician: "Engr. Fatima Abdullahi",
            condition: "Excellent",
            warrantyExpiry: "15/03/2030",
            warrantyProvider: "Daikin Nigeria",
            maintenanceContract: "Premium Service Plan - ₦1.8M/year",
            operatingHours: "6,570 hours/year",
            totalOperatingHours: "32,850 hours",
            efficiency: "4.2 COP",
            costPerHour: "₦420/hour",
            specialFeatures: ["Inverter Technology", "Heat Recovery", "Fresh Air Integration", "Hospital Grade Filtration"]
          },
          {
            id: "AC-004",
            type: "Split Unit",
            subType: "Wall-Mounted Split Air Conditioner",
            brand: "LG",
            model: "LS-C2465CL",
            serialNumber: "LG-2019-LSC-004",
            capacity: "2.5 HP (24,000 BTU/hr)",
            coolingType: "Air-Cooled",
            refrigerant: "R-32 (HFC)",
            refrigerantCharge: "2.8 kg",
            powerConsumption: "2.1 kW",
            energyRating: "A++",
            voltageRating: "230V/1Ph/50Hz",
            currentRating: "9.5A",
            location: "Emergency Department",
            roomsServed: ["Emergency Reception", "Triage Area", "Treatment Rooms 1-3"],
            controlSystem: "LG ThinQ Wi-Fi",
            thermostatType: "Digital Remote Control",
            airFlowRate: "850 CFM",
            soundLevel: "42 dB(A)",
            dimensions: "Indoor: 1.2m x 0.3m x 0.2m, Outdoor: 0.9m x 0.7m x 0.3m",
            weight: "Indoor: 15 kg, Outdoor: 45 kg",
            yearInstalled: 2019,
            installedBy: "Lagos Cooling Solutions",
            contractor: {
              name: "Lagos Cooling Solutions",
              license: "HVAC-LG-2019-156",
              contact: "+234-809-555-0789",
              address: "78 Cooling Avenue, Surulere, Lagos"
            },
            lastService: "20/06/2025",
            nextService: "20/09/2025",
            serviceInterval: "3 months",
            serviceTechnician: "Tech. Ibrahim Musa",
            condition: "Good",
            warrantyExpiry: "10/08/2026",
            warrantyProvider: "LG Electronics Nigeria",
            maintenanceContract: "Basic Service Plan - ₦180K/year",
            operatingHours: "8,760 hours/year",
            totalOperatingHours: "52,560 hours",
            efficiency: "3.8 COP",
            costPerHour: "₦95/hour",
            specialFeatures: ["Dual Inverter", "Gold Fin Anti-Corrosion", "Wi-Fi Control"]
          },
          {
            id: "AC-005",
            type: "Cassette Unit",
            subType: "4-Way Ceiling Cassette Air Conditioner",
            brand: "Samsung",
            model: "AC071RN4PKG",
            serialNumber: "SAM-2021-AC071-005",
            capacity: "3 HP (36,000 BTU/hr)",
            coolingType: "Air-Cooled",
            refrigerant: "R-32 (HFC)",
            refrigerantCharge: "3.2 kg",
            powerConsumption: "2.8 kW",
            energyRating: "A+++",
            voltageRating: "230V/1Ph/50Hz",
            currentRating: "12.5A",
            location: "Laboratory Wing",
            roomsServed: ["Pathology Lab", "Microbiology Lab", "Blood Bank", "Research Lab"],
            controlSystem: "Samsung SmartThings",
            thermostatType: "Wireless Remote + App Control",
            airFlowRate: "1,200 CFM",
            soundLevel: "38 dB(A)",
            dimensions: "Indoor: 0.84m x 0.84m x 0.3m, Outdoor: 1.0m x 0.7m x 0.3m",
            weight: "Indoor: 28 kg, Outdoor: 52 kg",
            yearInstalled: 2021,
            installedBy: "Arctic Air Systems",
            contractor: {
              name: "Arctic Air Systems Ltd",
              license: "HVAC-LG-2021-203",
              contact: "+234-812-555-0234",
              address: "25 Arctic Plaza, Lekki Phase 1, Lagos"
            },
            lastService: "30/07/2025",
            nextService: "30/10/2025",
            serviceInterval: "3 months",
            serviceTechnician: "Engr. Chioma Okwu",
            condition: "Excellent",
            warrantyExpiry: "20/01/2031",
            warrantyProvider: "Samsung Electronics Nigeria",
            maintenanceContract: "Premium Care - ₦250K/year",
            operatingHours: "6,570 hours/year",
            totalOperatingHours: "26,280 hours",
            efficiency: "4.5 COP",
            costPerHour: "₦125/hour",
            specialFeatures: ["Digital Inverter", "Wind-Free Cooling", "Easy Filter Plus", "Good Sleep Mode"],
            filterType: "HEPA + Carbon Filter",
            filterChangeInterval: "6 months",
            lastFilterChange: "15/06/2025"
          },
          {
            id: "AC-006",
            type: "Precision Air Conditioner",
            subType: "Computer Room Air Conditioner (CRAC)",
            brand: "Stulz",
            model: "CyberAir 3PRO CW",
            serialNumber: "STZ-2020-CA3-006",
            capacity: "15 kW",
            coolingType: "Chilled Water",
            refrigerant: "N/A (Water-based)",
            powerConsumption: "4.2 kW",
            energyRating: "A++",
            voltageRating: "415V/3Ph/50Hz",
            currentRating: "8.5A",
            location: "IT Server Room",
            roomsServed: ["Main Server Room", "Network Equipment Room", "UPS Room"],
            controlSystem: "Stulz C7000 Controller",
            thermostatType: "Precision Digital Control ±1°C",
            airFlowRate: "5,500 CFM",
            soundLevel: "65 dB(A)",
            dimensions: "2.0m x 0.6m x 1.9m",
            weight: "280 kg",
            temperatureRange: "18°C - 27°C",
            humidityControl: "45% - 55% RH",
            yearInstalled: 2020,
            installedBy: "Data Center Solutions Ltd",
            contractor: {
              name: "Data Center Solutions Ltd",
              license: "HVAC-DC-2020-078",
              contact: "+234-815-555-0567",
              address: "88 Tech Hub, Computer Village, Ikeja"
            },
            lastService: "10/08/2025",
            nextService: "10/09/2025",
            serviceInterval: "1 month",
            serviceTechnician: "Engr. Olumide Adeyemi",
            condition: "Excellent",
            warrantyExpiry: "31/12/2030",
            warrantyProvider: "Stulz Nigeria",
            maintenanceContract: "Critical Systems Plan - ₦850K/year",
            operatingHours: "8,760 hours/year (24/7)",
            totalOperatingHours: "43,800 hours",
            efficiency: "3.6 EER",
            costPerHour: "₦180/hour",
            specialFeatures: ["Precision Temperature Control", "Humidity Management", "Hot Gas Reheat", "Free Cooling"],
            redundancy: "N+1 Configuration",
            alarmSystem: "SMS + Email Alerts"
          },
          {
            id: "AC-007",
            type: "Package Unit",
            subType: "Rooftop Package Air Conditioner",
            brand: "Trane",
            model: "Precedent WCD180",
            serialNumber: "TRN-2017-WCD-007",
            capacity: "15 TR (180,000 BTU/hr)",
            coolingType: "Air-Cooled",
            refrigerant: "R-410A (HFC)",
            refrigerantCharge: "28 kg",
            powerConsumption: "52 kW",
            energyRating: "A+",
            voltageRating: "415V/3Ph/50Hz",
            currentRating: "85A",
            location: "Rooftop - East Wing",
            roomsServed: ["Cafeteria", "Conference Halls", "Training Rooms", "Staff Lounge"],
            controlSystem: "Trane Tracer SC+",
            thermostatType: "Building Management System",
            airFlowRate: "8,500 CFM",
            soundLevel: "72 dB(A)",
            dimensions: "4.5m x 2.2m x 1.8m",
            weight: "1,850 kg",
            yearInstalled: 2017,
            installedBy: "Climate Masters Ltd",
            contractor: {
              name: "Climate Masters Ltd",
              license: "HVAC-LG-2017-234",
              contact: "+234-806-555-0890",
              address: "156 Climate Road, Yaba, Lagos"
            },
            lastService: "25/05/2025",
            nextService: "25/08/2025",
            serviceInterval: "3 months",
            serviceTechnician: "Engr. Kemi Adebisi",
            condition: "Good",
            warrantyExpiry: "15/04/2027",
            warrantyProvider: "Trane Nigeria",
            maintenanceContract: "Standard Service - ₦680K/year",
            operatingHours: "4,380 hours/year",
            totalOperatingHours: "35,040 hours",
            efficiency: "11.5 EER",
            costPerHour: "₦285/hour",
            specialFeatures: ["Economizer", "Variable Speed Drive", "Weather Protection"],
            weatherResistance: "IP54 Rated",
            vibrationIsolation: "Spring Isolators"
          }
        ],
        
        doors: [
          {
            id: "DR-001",
            type: "Main Entrance Door",
            material: "Aluminum & Glass",
            brand: "Dorma",
            model: "ES 200 Easy",
            dimensions: "3.0m x 2.5m",
            features: "Automatic Sliding, Access Control",
            yearInstalled: 2018,
            installedBy: "Access Control Systems Ltd",
            lastMaintenance: "15/06/2025",
            condition: "Excellent",
            accessLevel: "Public"
          },
          {
            id: "DR-002",
            type: "Emergency Exit Door",
            material: "Steel Fire-Rated",
            brand: "Guardian",
            model: "FD-90",
            dimensions: "2.1m x 0.9m",
            features: "Fire-rated 90 minutes, Panic Bar",
            yearInstalled: 1978,
            installedBy: "Original Construction",
            lastMaintenance: "20/05/2025",
            condition: "Good",
            accessLevel: "Emergency Only"
          },
          {
            id: "DR-003",
            type: "Operating Theater Doors",
            material: "Stainless Steel",
            brand: "Hermetic",
            model: "HT-2000",
            dimensions: "2.0m x 1.2m",
            features: "Hermetic Seal, Automatic",
            yearInstalled: 2020,
            installedBy: "Medical Equipment Solutions",
            lastMaintenance: "05/08/2025",
            condition: "Excellent",
            accessLevel: "Authorized Personnel"
          }
        ],
        
        windows: [
          {
            id: "WN-001",
            type: "Curtain Wall Windows",
            material: "Aluminum Frame, Double Glazed",
            brand: "Guardian Glass",
            model: "SunGuard SuperNeutral 68",
            dimensions: "Various sizes",
            quantity: 180,
            yearInstalled: 2018,
            installedBy: "Lagos Glass & Aluminum",
            features: "UV Protection, Energy Efficient",
            lastMaintenance: "10/04/2025",
            condition: "Excellent"
          },
          {
            id: "WN-002",
            type: "Operable Windows",
            material: "UPVC Frame, Single Glazed",
            brand: "Rehau",
            model: "Euro-Design 70",
            dimensions: "1.5m x 1.2m",
            quantity: 95,
            yearInstalled: 1978,
            installedBy: "Original Construction",
            features: "Manual Operation, Security Locks",
            lastMaintenance: "25/03/2025",
            condition: "Fair"
          }
        ],

        lighting: [
          {
            id: "LT-001",
            type: "LED Panel Lights",
            brand: "Philips",
            model: "CoreLine RC120B",
            quantity: 450,
            wattage: "36W each",
            location: "General Areas",
            yearInstalled: 2019,
            installedBy: "Bright Light Electrical",
            lastReplacement: "14/02/2025",
            condition: "Excellent",
            lifespan: "50,000 hours"
          },
          {
            id: "LT-002",
            type: "Surgical Lights",
            brand: "Steris",
            model: "Harmony",
            quantity: 16,
            wattage: "160W each",
            location: "Operating Theaters",
            yearInstalled: 2020,
            installedBy: "Medical Equipment Solutions",
            lastMaintenance: "20/07/2025",
            condition: "Excellent",
            features: "Shadow-free, Color Temperature Control"
          },
          {
            id: "LT-003",
            type: "Emergency Lighting",
            brand: "Cooper",
            model: "Sure-Lites APX",
            quantity: 85,
            wattage: "8W each",
            location: "All Floors",
            yearInstalled: 2018,
            installedBy: "Emergency Systems Ltd",
            batteryLife: "3 hours",
            lastTest: "01/08/2025",
            condition: "Good"
          }
        ],

        plumbing: [
          {
            id: "PL-001",
            type: "Main Water Supply",
            material: "PVC Pipes",
            diameter: "200mm main, 150mm branch",
            brand: "JM Eagle",
            yearInstalled: 1978,
            lastUpgrade: 2018,
            upgradedBy: "Lagos Plumbing Works",
            pressure: "4.5 bar",
            condition: "Good"
          },
          {
            id: "PL-002",
            type: "Medical Gas Pipeline",
            gases: "Oxygen, Vacuum, Compressed Air",
            material: "Copper Pipes",
            brand: "Mueller Industries",
            yearInstalled: 2020,
            installedBy: "Medical Gas Systems Ltd",
            pressure: "Oxygen: 4.1 bar, Vacuum: -0.4 bar",
            lastInspection: "30/06/2025",
            condition: "Excellent",
            certification: "HTM 02-01 Compliant"
          }
        ],

        electrical: [
          {
            id: "EL-001",
            type: "Main Distribution Board",
            brand: "Schneider Electric",
            model: "Prisma Plus P",
            capacity: "2000A",
            voltage: "415V/240V",
            yearInstalled: 2018,
            installedBy: "Power Systems Engineering",
            lastInspection: "10/07/2025",
            condition: "Excellent",
            certificationDate: "10/07/2025"
          },
          {
            id: "EL-002",
            type: "UPS System",
            brand: "APC",
            model: "Galaxy 7000",
            capacity: "200 KVA",
            batteryBackup: "30 minutes",
            location: "Critical Care Areas",
            yearInstalled: 2019,
            installedBy: "Uninterrupted Power Ltd",
            lastBatteryChange: "15/11/2024",
            condition: "Excellent"
          }
        ],

        security: [
          {
            id: "SC-001",
            type: "CCTV Cameras",
            brand: "Hikvision",
            model: "DS-2CD2385FWD-I",
            quantity: 48,
            resolution: "8MP 4K",
            storage: "30 days recording",
            yearInstalled: 2021,
            installedBy: "SecureVision Systems",
            lastUpgrade: "01/12/2024",
            condition: "Excellent"
          },
          {
            id: "SC-002",
            type: "Access Control System",
            brand: "HID Global",
            model: "VertX V1000",
            cardReaders: 25,
            location: "All Entry Points",
            yearInstalled: 2020,
            installedBy: "Access Solutions Ltd",
            lastUpdate: "15/03/2025",
            condition: "Excellent",
            users: 1250
          }
        ]
      },
      
      // Construction Details
      construction: {
        yearBuilt: 1978,
        lastRenovation: 2018,
        contractor: "Julius Berger Nigeria PLC",
        architect: "Godwin Austen Johnson & Partners",
        structuralEngineer: "Ove Arup & Partners",
        foundationType: "Reinforced Concrete",
        roofType: "Concrete Slab with Waterproofing",
        wallType: "Reinforced Concrete Block"
      },
      
      // Financial Information
      financial: {
        originalCost: "₦450M (1978)",
        currentValue: "₦2.5B",
        insuranceValue: "₦3.2B",
        annualMaintenance: "₦85M",
        lastValuation: "December 2024",
        depreciationRate: "2.5% annually"
      },
      
      // Utilities & Systems
      utilities: {
        powerSupply: "PHCN + 3 Backup Generators (500KVA each)",
        waterSupply: "State Water Corporation + Borehole",
        internetConnectivity: "Fiber Optic - 100Mbps",
        fireSuppressionSystem: "Sprinkler System + Fire Extinguishers",
        securitySystem: "24/7 CCTV + Access Control",
        hvacSystem: "Central Air Conditioning",
        medicalGasSystem: "Oxygen, Vacuum, Compressed Air"
      },
      
      // Maintenance History
      maintenanceHistory: [
        {
          id: "MH-001",
          date: "10/08/2025",
          type: "Preventive",
          title: "HVAC system maintenance and filter replacement",
          description: "Comprehensive maintenance of central HVAC system including filter replacement, coil cleaning, refrigerant level check, and system performance optimization. Replaced 24 HEPA filters, cleaned evaporator coils, checked refrigerant levels (R-134a), calibrated thermostats, and performed electrical connection inspections.",
          cost: "₦2.5M",
          contractor: {
            name: "Cool Breeze Engineering",
            contact: "+234-803-555-0789",
            license: "HVAC-LG-2019-067",
            address: "23 Industrial Avenue, Ikeja, Lagos"
          },
          technician: {
            name: "Engr. Ibrahim Suleiman",
            certification: "HVAC Certified Professional (HCP)",
            experience: "12 years",
            phone: "+234-806-555-0234"
          },
          workOrder: "WO-2025-1008",
          duration: "8 hours",
          priority: "Medium",
          status: "Completed",
          completionNotes: "All systems operating within normal parameters. Next service recommended in 3 months. Minor refrigerant top-up required on Unit AC-002.",
          partsUsed: [
            { item: "HEPA Filters (24x24x12)", quantity: 24, cost: "₦180K" },
            { item: "Refrigerant R-134a", quantity: "15kg", cost: "₦75K" },
            { item: "Thermostat Calibration Kit", quantity: 1, cost: "₦25K" },
            { item: "Cleaning Chemicals", quantity: "5L", cost: "₦15K" }
          ],
          laborCost: "₦2.2M",
          documents: [
            {
              name: "Maintenance Report.pdf",
              type: "Report",
              size: "2.3 MB",
              uploadDate: "08/10/2025",
              url: "/documents/maintenance/MH-001-report.pdf"
            },
            {
              name: "Before Photos.zip",
              type: "Photos",
              size: "15.7 MB", 
              uploadDate: "08/10/2025",
              url: "/documents/maintenance/MH-001-before.zip"
            },
            {
              name: "After Photos.zip",
              type: "Photos",
              size: "12.4 MB",
              uploadDate: "08/10/2025",
              url: "/documents/maintenance/MH-001-after.zip"
            },
            {
              name: "Parts Invoice.pdf",
              type: "Invoice",
              size: "856 KB",
              uploadDate: "08/10/2025", 
              url: "/documents/maintenance/MH-001-invoice.pdf"
            },
            {
              name: "System Performance Test.pdf",
              type: "Test Results",
              size: "1.2 MB",
              uploadDate: "08/10/2025",
              url: "/documents/maintenance/MH-001-test.pdf"
            }
          ],
          nextMaintenanceDate: "08/01/2026",
          warranty: "6 months on parts and labor",
          approvedBy: "Engr. Adebayo Ogundimu - Facility Manager",
          rating: 4.8
        },
        {
          id: "MH-002", 
          date: "25/07/2025",
          type: "Corrective",
          title: "Generator 2 fuel pump replacement",
          description: "Emergency replacement of faulty fuel pump on backup generator unit 2. Pump was showing signs of cavitation and irregular fuel flow causing generator performance issues. Replaced with OEM Caterpillar fuel pump, tested system under load, and verified proper fuel pressure and flow rates.",
          cost: "₦850K",
          contractor: {
            name: "Power Solutions Ltd",
            contact: "+234-807-555-0456", 
            license: "GEN-LG-2020-123",
            address: "78 Power Street, Mushin, Lagos"
          },
          technician: {
            name: "Engr. Fatima Abdullahi",
            certification: "Caterpillar Certified Technician",
            experience: "8 years",
            phone: "+234-809-555-0567"
          },
          workOrder: "WO-2025-0725",
          duration: "6 hours",
          priority: "High",
          status: "Completed",
          completionNotes: "Generator restored to full operational capacity. Fuel system pressure normalized at 45 PSI. Load test passed at 100% capacity for 2 hours continuous operation.",
          partsUsed: [
            { item: "Caterpillar Fuel Pump (Part# 326-1644)", quantity: 1, cost: "₦450K" },
            { item: "Fuel Filter", quantity: 2, cost: "₦25K" },
            { item: "Gaskets & Seals Kit", quantity: 1, cost: "₦15K" },
            { item: "Engine Oil (15W-40)", quantity: "20L", cost: "₦35K" }
          ],
          laborCost: "₦325K",
          documents: [
            {
              name: "Emergency Work Order.pdf",
              type: "Work Order",
              size: "1.1 MB",
              uploadDate: "25/07/2025",
              url: "/documents/maintenance/MH-002-workorder.pdf"
            },
            {
              name: "Diagnostic Report.pdf", 
              type: "Diagnostic",
              size: "3.2 MB",
              uploadDate: "25/07/2025",
              url: "/documents/maintenance/MH-002-diagnostic.pdf"
            },
            {
              name: "Load Test Results.pdf",
              type: "Test Results", 
              size: "2.1 MB",
              uploadDate: "25/07/2025",
              url: "/documents/maintenance/MH-002-loadtest.pdf"
            },
            {
              name: "Parts Receipt.pdf",
              type: "Receipt",
              size: "654 KB",
              uploadDate: "25/07/2025",
              url: "/documents/maintenance/MH-002-receipt.pdf"
            }
          ],
          nextMaintenanceDate: "25/10/2025",
          warranty: "12 months on pump, 3 months on labor",
          approvedBy: "Engr. Kemi Adebayo - Chief Engineer",
          rating: 4.9
        },
        {
          id: "MH-003",
          date: "15/07/2025",
          type: "Preventive",
          title: "Fire safety system inspection and testing",
          description: "Annual comprehensive inspection and testing of fire safety systems including fire alarms, sprinkler systems, fire extinguishers, emergency lighting, and smoke detection systems. Conducted flow tests on sprinkler heads, battery backup tests on alarms, and pressure tests on fire pumps.",
          cost: "₦1.2M",
          contractor: {
            name: "SafeGuard Fire Systems",
            contact: "+234-805-555-0321",
            license: "FIRE-LG-2018-089",
            address: "156 Safety Boulevard, Victoria Island, Lagos"
          },
          technician: {
            name: "Engr. Michael Okafor",
            certification: "NFPA Certified Fire Protection Specialist",
            experience: "15 years",
            phone: "+234-808-555-0432"
          },
          workOrder: "WO-2025-0715",
          duration: "12 hours",
          priority: "High",
          status: "Completed",
          completionNotes: "All fire safety systems passed inspection. 3 smoke detectors required battery replacement. Fire pump pressure within acceptable range. Emergency lighting systems functional. Certificate of compliance issued.",
          partsUsed: [
            { item: "Smoke Detector Batteries (9V)", quantity: 3, cost: "₦15K" },
            { item: "Fire Extinguisher Refill (CO2)", quantity: 5, cost: "₦75K" },
            { item: "Emergency Light Bulbs", quantity: 8, cost: "₦12K" },
            { item: "Sprinkler Head Replacement", quantity: 2, cost: "₦18K" }
          ],
          laborCost: "₦1.08M",
          documents: [
            {
              name: "Fire Safety Inspection Report.pdf",
              type: "Inspection Report",
              size: "4.7 MB",
              uploadDate: "15/07/2025",
              url: "/documents/maintenance/MH-003-inspection.pdf"
            },
            {
              name: "Compliance Certificate.pdf",
              type: "Certificate",
              size: "1.8 MB",
              uploadDate: "15/07/2025", 
              url: "/documents/maintenance/MH-003-certificate.pdf"
            },
            {
              name: "Test Results Summary.pdf",
              type: "Test Results",
              size: "2.9 MB",
              uploadDate: "15/07/2025",
              url: "/documents/maintenance/MH-003-tests.pdf"
            },
            {
              name: "System Photos.zip",
              type: "Photos",
              size: "18.3 MB",
              uploadDate: "15/07/2025",
              url: "/documents/maintenance/MH-003-photos.zip"
            },
            {
              name: "Deficiency List.pdf",
              type: "Report",
              size: "967 KB",
              uploadDate: "15/07/2025",
              url: "/documents/maintenance/MH-003-deficiencies.pdf"
            }
          ],
          nextMaintenanceDate: "15/07/2026",
          warranty: "12 months on parts and services",
          approvedBy: "Engr. Adebayo Ogundimu - Facility Manager",
          rating: 4.7
        }
      ],
      
      // Audit Trail / Change History
      auditTrail: [
        {
          id: "AT-001",
          timestamp: "15/12/2025T14:30:22Z",
          action: "Asset Created",
          user: {
            name: "Engr. Adebayo Ogundimu",
            role: "Facility Manager",
            department: "Infrastructure Management",
            userId: "EMP-2018-045",
            email: "a.ogundimu@lasiama.lg.gov.ng"
          },
          changes: {
            summary: "Initial asset registration in LASIAMA system",
            fields: [
              { field: "Asset Name", oldValue: null, newValue: "Lagos State University Teaching Hospital (LASUTH)" },
              { field: "Asset Type", oldValue: null, newValue: "Healthcare Facility" },
              { field: "Location", oldValue: null, newValue: "Ikeja, Lagos State" },
              { field: "Status", oldValue: null, newValue: "Active" },
              { field: "Value", oldValue: null, newValue: "₦45.2 Billion" }
            ]
          },
          ipAddress: "192.168.1.45",
          userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          sessionId: "sess_2025121514302245",
          approvalRequired: false,
          notes: "Asset migrated from legacy system during digital transformation initiative"
        },
        {
          id: "AT-002",
          timestamp: "2025-12-10T09:15:33Z",
          action: "Equipment Added",
          user: {
            name: "Dr. Kemi Adebayo",
            role: "Chief Medical Officer",
            department: "Medical Services",
            userId: "EMP-2019-089",
            email: "k.adebayo@lasuth.lg.gov.ng"
          },
          changes: {
            summary: "Added new MRI equipment to inventory",
            fields: [
              { field: "Equipment Type", oldValue: null, newValue: "MRI Scanner" },
              { field: "Brand", oldValue: null, newValue: "Siemens Healthineers" },
              { field: "Model", oldValue: null, newValue: "MAGNETOM Vida 3T" },
              { field: "Serial Number", oldValue: null, newValue: "SMN-2025-VIDA-001" },
              { field: "Purchase Cost", oldValue: null, newValue: "₦2.8 Billion" },
              { field: "Installation Date", oldValue: null, newValue: "05/12/2025" }
            ]
          },
          ipAddress: "192.168.1.78",
          userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
          sessionId: "sess_2025121009153378",
          approvalRequired: true,
          approvedBy: {
            name: "Engr. Adebayo Ogundimu",
            role: "Facility Manager",
            approvalDate: "2025-12-10T11:22:15Z",
            approvalNotes: "Equipment addition approved. High-value asset requires quarterly inspection."
          },
          notes: "Equipment procured under Federal Government Healthcare Modernization Program"
        },
        {
          id: "AT-003",
          timestamp: "2025-11-28T16:45:12Z",
          action: "Maintenance Scheduled",
          user: {
            name: "Engr. Ibrahim Suleiman",
            role: "HVAC Technician",
            department: "Maintenance",
            userId: "EMP-2020-156",
            email: "i.suleiman@lasiama.lg.gov.ng"
          },
          changes: {
            summary: "Scheduled preventive maintenance for HVAC systems",
            fields: [
              { field: "Maintenance Type", oldValue: null, newValue: "Preventive" },
              { field: "Scheduled Date", oldValue: null, newValue: "15/12/2025" },
              { field: "Estimated Cost", oldValue: null, newValue: "₦2.5M" },
              { field: "Contractor", oldValue: null, newValue: "Cool Breeze Engineering" },
              { field: "Work Order", oldValue: null, newValue: "WO-2025-1215" }
            ]
          },
          ipAddress: "192.168.1.92",
          userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          sessionId: "sess_2025112816451292",
          approvalRequired: true,
          approvedBy: {
            name: "Engr. Adebayo Ogundimu",
            role: "Facility Manager",
            approvalDate: "2025-11-29T08:15:33Z",
            approvalNotes: "Maintenance approved. Schedule during low-occupancy hours."
          },
          notes: "Routine quarterly maintenance as per manufacturer recommendations"
        },
        {
          id: "AT-004",
          timestamp: "20/11/2025T11:30:45Z",
          action: "Asset Value Updated",
          user: {
            name: "Mrs. Folake Adeniyi",
            role: "Asset Valuer",
            department: "Finance & Valuation",
            userId: "EMP-2017-234",
            email: "f.adeniyi@lasiama.lg.gov.ng"
          },
          changes: {
            summary: "Annual asset revaluation completed",
            fields: [
              { field: "Asset Value", oldValue: "₦42.8 Billion", newValue: "₦45.2 Billion" },
              { field: "Valuation Date", oldValue: "20/11/2024", newValue: "20/11/2025" },
              { field: "Valuation Method", oldValue: "Depreciated Replacement Cost", newValue: "Market Comparison Approach" },
              { field: "Depreciation Rate", oldValue: "5% per annum", newValue: "4.5% per annum" }
            ]
          },
          ipAddress: "192.168.1.67",
          userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          sessionId: "sess_2025112011304567",
          approvalRequired: true,
          approvedBy: {
            name: "Mr. Babatunde Olatunji",
            role: "Director, Asset Management",
            approvalDate: "2025-11-21T14:20:18Z",
            approvalNotes: "Revaluation approved. Reflects current market conditions and infrastructure improvements."
          },
          notes: "Annual revaluation conducted by certified asset valuers in compliance with IFRS standards"
        },
        {
          id: "AT-005",
          timestamp: "15/10/2025T13:22:18Z",
          action: "Security Update",
          user: {
            name: "CSP Adamu Garba",
            role: "Security Coordinator",
            department: "Security Services",
            userId: "EMP-2021-098",
            email: "a.garba@lasiama.lg.gov.ng"
          },
          changes: {
            summary: "Updated security systems and protocols",
            fields: [
              { field: "CCTV Cameras", oldValue: "48 units", newValue: "64 units" },
              { field: "Access Control Points", oldValue: "12 points", newValue: "18 points" },
              { field: "Security Personnel", oldValue: "24/7 - 6 guards", newValue: "24/7 - 8 guards" },
              { field: "Perimeter Sensors", oldValue: "Basic motion sensors", newValue: "Advanced thermal + motion sensors" }
            ]
          },
          ipAddress: "192.168.1.134",
          userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          sessionId: "sess_2025101513221834",
          approvalRequired: true,
          approvedBy: {
            name: "Mr. Babatunde Olatunji",
            role: "Director, Asset Management",
            approvalDate: "2025-10-16T09:45:22Z",
            approvalNotes: "Security upgrade approved. Critical for high-value medical equipment protection."
          },
          notes: "Security enhancement following risk assessment recommendations"
        },
        {
          id: "AT-006",
          timestamp: "2025-09-08T10:15:30Z",
          action: "Condition Assessment",
          user: {
            name: "Engr. Fatima Abdullahi",
            role: "Structural Engineer",
            department: "Engineering Services",
            userId: "EMP-2019-167",
            email: "f.abdullahi@lasiama.lg.gov.ng"
          },
          changes: {
            summary: "Quarterly structural condition assessment completed",
            fields: [
              { field: "Overall Condition", oldValue: "Good", newValue: "Excellent" },
              { field: "Structural Rating", oldValue: "8.2/10", newValue: "8.7/10" },
              { field: "Maintenance Priority", oldValue: "Medium", newValue: "Low" },
              { field: "Next Inspection", oldValue: "08/12/2025", newValue: "08/03/2026" }
            ]
          },
          ipAddress: "192.168.1.89",
          userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
          sessionId: "sess_2025090810153089",
          approvalRequired: false,
          notes: "Routine assessment shows improved condition following recent renovations"
        }
      ],
      
      // Documents & Certificates
      documents: [
        { name: "Building Plan Approval", type: "PDF", date: "15/03/1977", size: "2.4MB" },
        { name: "Structural Drawings", type: "DWG", date: "20/05/1977", size: "15.2MB" },
        { name: "Electrical Drawings", type: "DWG", date: "10/06/1977", size: "8.7MB" },
        { name: "Plumbing Drawings", type: "DWG", date: "15/06/1977", size: "6.3MB" },
        { name: "Fire Certificate", type: "PDF", date: "20/11/2024", size: "1.1MB" },
        { name: "Insurance Policy", type: "PDF", date: "01/01/2025", size: "3.2MB" },
        { name: "Environmental Impact Assessment", type: "PDF", date: "10/03/2018", size: "12.8MB" },
        { name: "Medical Equipment Inventory", type: "XLSX", date: "01/08/2025", size: "4.5MB" }
      ],
      
      // Images and Media
      images: [
        {
          id: 1,
          url: "/api/placeholder/800/600",
          title: "Hospital Main Entrance",
          type: "exterior",
          date: "10/08/2025",
          description: "Main entrance with patient drop-off area"
        },
        {
          id: 2,
          url: "/api/placeholder/800/600",
          title: "Emergency Department",
          type: "interior",
          date: "10/08/2025",
          description: "24/7 emergency care facility"
        },
        {
          id: 3,
          url: "/api/placeholder/800/600",
          title: "Operating Theater Complex",
          type: "interior",
          date: "10/08/2025",
          description: "State-of-the-art surgical facilities"
        },
        {
          id: 4,
          url: "/api/placeholder/800/600",
          title: "Medical Equipment Room",
          type: "interior",
          date: "10/08/2025",
          description: "Advanced medical diagnostic equipment"
        },
        {
          id: 5,
          url: "/api/placeholder/800/600",
          title: "Hospital Aerial View",
          type: "aerial",
          date: "25/07/2025",
          description: "Complete hospital complex from above"
        },
        {
          id: 6,
          url: "/api/placeholder/800/600",
          title: "Architectural Floor Plan - Ground Floor",
          type: "drawing",
          date: "20/05/1977",
          description: "Original architectural drawings - Ground floor layout"
        },
        {
          id: 7,
          url: "/api/placeholder/800/600",
          title: "Electrical System Diagram",
          type: "drawing",
          date: "10/06/1977",
          description: "Complete electrical system layout and specifications"
        },
        {
          id: 8,
          url: "/api/placeholder/800/600",
          title: "Plumbing & Medical Gas Layout",
          type: "drawing",
          date: "15/06/1977",
          description: "Water supply, drainage, and medical gas distribution"
        }
      ],

      // Annual Maintenance by Year
      annualMaintenanceByYear: {
        "2025": {
          budgeted: "₦85M",
          actual: "₦78.5M",
          variance: "-₦6.5M",
          projects: [
            { name: "HVAC System Overhaul", cost: "₦25M", status: "Completed" },
            { name: "Electrical System Upgrade", cost: "₦18M", status: "Completed" },
            { name: "Medical Equipment Calibration", cost: "₦12M", status: "Completed" },
            { name: "Building Exterior Maintenance", cost: "₦15M", status: "Completed" },
            { name: "Generator Maintenance", cost: "₦8.5M", status: "Completed" }
          ]
        },
        "2024": {
          budgeted: "₦80M",
          actual: "₦82.3M",
          variance: "+₦2.3M",
          projects: [
            { name: "Roof Waterproofing", cost: "₦22M", status: "Completed" },
            { name: "Fire Safety System Upgrade", cost: "₦20M", status: "Completed" },
            { name: "Plumbing System Overhaul", cost: "₦15M", status: "Completed" },
            { name: "ICU Equipment Maintenance", cost: "₦12.3M", status: "Completed" },
            { name: "Parking Lot Resurfacing", cost: "₦13M", status: "Completed" }
          ]
        },
        "2023": {
          budgeted: "₦75M",
          actual: "₦71.8M",
          variance: "-₦3.2M",
          projects: [
            { name: "Central Air Conditioning Upgrade", cost: "₦28M", status: "Completed" },
            { name: "Security System Enhancement", cost: "₦18M", status: "Completed" },
            { name: "Laboratory Equipment Service", cost: "₦12.8M", status: "Completed" },
            { name: "Elevator Modernization", cost: "₦13M", status: "Completed" }
          ]
        },
        "2022": {
          budgeted: "₦70M",
          actual: "₦68.5M",
          variance: "-₦1.5M",
          projects: [
            { name: "Medical Gas System Maintenance", cost: "₦20M", status: "Completed" },
            { name: "Backup Generator Installation", cost: "₦25M", status: "Completed" },
            { name: "IT Infrastructure Upgrade", cost: "₦15M", status: "Completed" },
            { name: "Floor Renovation (Ward 3)", cost: "₦8.5M", status: "Completed" }
          ]
        }
      }
    }
  }
  
  // For asset ID 1, return the full detailed data we already have
  if (id === "1") {
    return assets["1"]
  }
  
  // For other assets, generate comprehensive data dynamically
  return generateAssetData(baseAsset)
}

export default function AssetDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedImage, setSelectedImage] = useState<{ id: string; url: string; title: string; description: string } | null>(null)
  const [expandedMaintenance, setExpandedMaintenance] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editFormData, setEditFormData] = useState<Record<string, unknown> | null>(null)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
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
  
  // Equipment filtering state
  const [equipmentFilters, setEquipmentFilters] = useState({
    search: '',
    type: 'all',
    condition: 'all',
    brand: 'all',
    yearFrom: '',
    yearTo: '',
    location: 'all'
  })

  // Room management state
  const [selectedFloor, setSelectedFloor] = useState<number>(1)
  const [showAddRoomModal, setShowAddRoomModal] = useState(false)
  const [roomSearchQuery, setRoomSearchQuery] = useState('')
  const [roomFilterType, setRoomFilterType] = useState('all')
  const [roomFilterStatus, setRoomFilterStatus] = useState('all')
  const [roomViewMode, setRoomViewMode] = useState<'list' | 'floorplan'>('list')
  const [floorPlanMode, setFloorPlanMode] = useState<'building' | 'floor'>('building')
  const [showTabDropdown, setShowTabDropdown] = useState(false)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (showTabDropdown && !target.closest('.tab-dropdown')) {
        setShowTabDropdown(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showTabDropdown])

  // Annual maintenance filter state
  const [selectedMaintenanceYear, setSelectedMaintenanceYear] = useState<string>('2025')

  // Edit functions
  const handleEditAsset = () => {
    setEditFormData({ ...asset })
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditFormData(null)
  }

  const handleSaveEdit = () => {
    if (!editFormData || !asset) return

    // Create audit trail entry
    const auditEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      action: 'Asset Updated',
      user: {
        name: 'Admin User',
        role: 'Administrator',
        department: 'Asset Management',
        userId: 'admin-001',
        email: 'admin@lasiama.gov.ng'
      },
      changes: {
        summary: getChanges(asset, editFormData),
        fields: getFieldChanges(asset, editFormData)
      },
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (compatible)',
      sessionId: 'sess-' + Date.now(),
      notes: 'Asset information updated via web interface'
    }

    // Add to audit trail
    if (asset.auditTrail) {
      asset.auditTrail = [auditEntry, ...asset.auditTrail]
    }
    
    // Update asset data
    Object.assign(asset, editFormData)
    asset.updated = new Date().toLocaleDateString('en-GB')

    setIsEditing(false)
    setEditFormData(null)
    
    // Show success message
    alert('Asset updated successfully!')
  }

  const getChanges = (original: Record<string, unknown>, updated: Record<string, unknown>) => {
    const changes: string[] = []
    
    // Simple fields
    const simpleFields = [
      'name', 'number', 'description', 'status', 'condition', 'location', 
      'department', 'category', 'subcategory', 'value', 'yearBuilt'
    ]

    // Nested object fields
    const nestedFields = {
      specifications: ['totalArea', 'builtUpArea', 'floors', 'rooms', 'beds', 'operatingTheaters', 'laboratories', 'parking', 'emergencyBays', 'elevators', 'generators', 'waterTanks'],
      construction: ['yearBuilt', 'lastRenovation', 'contractor', 'architect', 'structuralEngineer', 'foundationType', 'roofType', 'wallType'],
      financial: ['originalCost', 'currentValue', 'insuranceValue', 'annualMaintenance', 'lastValuation', 'depreciationRate'],
      utilities: ['powerSupply', 'waterSupply', 'internetConnectivity', 'fireSuppressionSystem', 'securitySystem', 'hvacSystem', 'medicalGasSystem']
    }

    // Check simple fields
    simpleFields.forEach(field => {
      if (original[field] !== updated[field]) {
        changes.push(`${field}: "${original[field]}" → "${updated[field]}"`)
      }
    })

    // Check nested object fields
    Object.entries(nestedFields).forEach(([objectKey, fields]) => {
      fields.forEach(field => {
        const originalValue = original[objectKey]?.[field]
        const updatedValue = updated[objectKey]?.[field]
        if (originalValue !== updatedValue) {
          changes.push(`${objectKey}.${field}: "${originalValue}" → "${updatedValue}"`)
        }
      })
    })

    return changes.join(', ')
  }

  const getFieldChanges = (original: Record<string, unknown>, updated: Record<string, unknown>) => {
    const fields: Array<{ field: string; oldValue: unknown; newValue: unknown }> = []
    
    // Simple fields
    const simpleFields = [
      'name', 'number', 'description', 'status', 'condition', 'location', 
      'department', 'category', 'subcategory', 'value', 'yearBuilt'
    ]

    // Nested object fields
    const nestedFields = {
      specifications: ['totalArea', 'builtUpArea', 'floors', 'rooms', 'beds', 'operatingTheaters', 'laboratories', 'parking', 'emergencyBays', 'elevators', 'generators', 'waterTanks'],
      construction: ['yearBuilt', 'lastRenovation', 'contractor', 'architect', 'structuralEngineer', 'foundationType', 'roofType', 'wallType'],
      financial: ['originalCost', 'currentValue', 'insuranceValue', 'annualMaintenance', 'lastValuation', 'depreciationRate'],
      utilities: ['powerSupply', 'waterSupply', 'internetConnectivity', 'fireSuppressionSystem', 'securitySystem', 'hvacSystem', 'medicalGasSystem']
    }

    // Check simple fields
    simpleFields.forEach(field => {
      if (original[field] !== updated[field]) {
        fields.push({
          field: field,
          oldValue: original[field],
          newValue: updated[field]
        })
      }
    })

    // Check nested object fields
    Object.entries(nestedFields).forEach(([objectKey, fieldList]) => {
      fieldList.forEach(field => {
        const originalValue = original[objectKey]?.[field]
        const updatedValue = updated[objectKey]?.[field]
        if (originalValue !== updatedValue) {
          fields.push({
            field: `${objectKey}.${field}`,
            oldValue: originalValue,
            newValue: updatedValue
          })
        }
      })
    })

    return fields
  }

  const handleInputChange = (field: string, value: unknown) => {
    setEditFormData((prev: Record<string, unknown> | null) => ({
      ...prev,
      [field]: value
    }))
  }
  
  const handleEquipmentFilterChange = (key: string, value: string) => {
    setEquipmentFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }
  
  const clearEquipmentFilters = () => {
    setEquipmentFilters({
      search: '',
      type: 'all',
      condition: 'all',
      brand: 'all',
      yearFrom: '',
      yearTo: '',
      location: 'all'
    })
  }
  
  const asset = getAssetById(params.id)
  
  // Room data for the asset (sample data for Lagos State General Hospital)
  const floors = [
    {
      number: 1,
      name: "Ground Floor",
      totalArea: 2000,
      totalRooms: 35,
      dimensions: { width: 800, height: 600 },
      rooms: [
        {
          id: "GF-001",
          number: "GF-001",
          name: "Main Reception",
          floor: 1,
          type: "Office" as const,
          area: 150,
          capacity: 50,
          status: "Active" as const,
          position: { x: 50, y: 50, width: 120, height: 80 },
          equipment: [
            { id: "eq-001", name: "Reception Desk", type: "Furniture", status: "Working" as const },
            { id: "eq-002", name: "Computer Terminal", type: "IT Equipment", status: "Working" as const },
            { id: "eq-003", name: "Printer", type: "Office Equipment", status: "Working" as const }
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
          type: "Emergency" as const,
          area: 300,
          capacity: 20,
          status: "Active" as const,
          position: { x: 190, y: 50, width: 150, height: 80 },
          equipment: [
            { id: "eq-004", name: "Defibrillator", type: "Medical Equipment", status: "Working" as const },
            { id: "eq-005", name: "ECG Machine", type: "Medical Equipment", status: "Working" as const },
            { id: "eq-006", name: "Emergency Trolley", type: "Medical Equipment", status: "Working" as const },
            { id: "eq-007", name: "Oxygen Tank", type: "Medical Equipment", status: "Working" as const }
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
          type: "Laboratory" as const,
          area: 120,
          capacity: 15,
          status: "Active" as const,
          position: { x: 360, y: 50, width: 120, height: 80 },
          equipment: [
            { id: "eq-008", name: "Microscope", type: "Medical Equipment", status: "Working" as const },
            { id: "eq-009", name: "Centrifuge", type: "Medical Equipment", status: "Maintenance" as const },
            { id: "eq-010", name: "Blood Analyzer", type: "Medical Equipment", status: "Working" as const }
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
          type: "Pharmacy" as const,
          area: 80,
          capacity: 10,
          status: "Active" as const,
          position: { x: 500, y: 50, width: 100, height: 80 },
          equipment: [
            { id: "eq-011", name: "Medicine Cabinet", type: "Storage", status: "Working" as const },
            { id: "eq-012", name: "Refrigerator", type: "Storage", status: "Working" as const },
            { id: "eq-013", name: "Dispensing Counter", type: "Furniture", status: "Working" as const }
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
      dimensions: { width: 800, height: 600 },
      rooms: [
        {
          id: "FF-001",
          number: "FF-001",
          name: "General Ward A",
          floor: 2,
          type: "Ward" as const,
          area: 200,
          capacity: 20,
          status: "Active" as const,
          position: { x: 50, y: 50, width: 180, height: 120 },
          equipment: [
            { id: "eq-014", name: "Hospital Beds", type: "Medical Equipment", status: "Working" as const },
            { id: "eq-015", name: "IV Stands", type: "Medical Equipment", status: "Working" as const },
            { id: "eq-016", name: "Bedside Monitors", type: "Medical Equipment", status: "Working" as const }
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
          type: "Ward" as const,
          area: 200,
          capacity: 20,
          status: "Active" as const,
          position: { x: 250, y: 50, width: 180, height: 120 },
          equipment: [
            { id: "eq-017", name: "Hospital Beds", type: "Medical Equipment", status: "Working" as const },
            { id: "eq-018", name: "IV Stands", type: "Medical Equipment", status: "Working" as const },
            { id: "eq-019", name: "Bedside Monitors", type: "Medical Equipment", status: "Maintenance" as const }
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
          type: "Consultation" as const,
          area: 25,
          capacity: 5,
          status: "Active" as const,
          position: { x: 450, y: 50, width: 80, height: 60 },
          equipment: [
            { id: "eq-020", name: "Examination Table", type: "Medical Equipment", status: "Working" as const },
            { id: "eq-021", name: "Blood Pressure Monitor", type: "Medical Equipment", status: "Working" as const },
            { id: "eq-022", name: "Stethoscope", type: "Medical Equipment", status: "Working" as const }
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
      dimensions: { width: 800, height: 600 },
      rooms: [
        {
          id: "SF-001",
          number: "OT-001",
          name: "Operating Theater 1",
          floor: 3,
          type: "Operating Theater" as const,
          area: 150,
          capacity: 10,
          status: "Active" as const,
          position: { x: 100, y: 100, width: 160, height: 100 },
          equipment: [
            { id: "eq-023", name: "Operating Table", type: "Medical Equipment", status: "Working" as const },
            { id: "eq-024", name: "Anesthesia Machine", type: "Medical Equipment", status: "Working" as const },
            { id: "eq-025", name: "Surgical Lights", type: "Medical Equipment", status: "Working" as const },
            { id: "eq-026", name: "Heart Monitor", type: "Medical Equipment", status: "Working" as const }
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
          type: "Operating Theater" as const,
          area: 150,
          capacity: 10,
          status: "Under Maintenance" as const,
          position: { x: 300, y: 100, width: 160, height: 100 },
          equipment: [
            { id: "eq-027", name: "Operating Table", type: "Medical Equipment", status: "Maintenance" as const },
            { id: "eq-028", name: "Anesthesia Machine", type: "Medical Equipment", status: "Working" as const },
            { id: "eq-029", name: "Surgical Lights", type: "Medical Equipment", status: "Broken" as const }
          ],
          occupancy: { current: 0, maximum: 10 },
          lastInspection: "09/08/2025",
          nextMaintenance: "25/08/2025"
        }
      ]
    }
  ]

  // Room helper functions
  const currentFloor = floors.find(f => f.number === selectedFloor)
  const filteredRooms = currentFloor?.rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(roomSearchQuery.toLowerCase()) ||
                         room.number.toLowerCase().includes(roomSearchQuery.toLowerCase())
    const matchesType = roomFilterType === 'all' || room.type === roomFilterType
    const matchesStatus = roomFilterStatus === 'all' || room.status === roomFilterStatus
    return matchesSearch && matchesType && matchesStatus
  }) || []

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Under Maintenance': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Closed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'Renovation': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getTypeIcon = (type: string) => {
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
  
  // Handle case when asset is not found
  if (!asset) {
    return (
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Asset Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The asset with ID "{params.id}" could not be found or may have been removed.
            </p>
            <button
              onClick={() => router.push('/dashboard/assets')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Back to Assets
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  // Get all equipment for filtering
  const getAllEquipment = () => {
    if (!asset) return []
    
    const allEquipment = [
      ...asset.detailedInventory.airConditioning.map(item => ({ ...item, category: 'Air Conditioning' })),
      ...asset.detailedInventory.doors.map(item => ({ ...item, category: 'Doors' })),
      ...asset.detailedInventory.windows.map(item => ({ ...item, category: 'Windows' })),
      ...asset.detailedInventory.lighting.map(item => ({ ...item, category: 'Lighting' })),
      ...asset.detailedInventory.electrical.map(item => ({ ...item, category: 'Electrical' })),
      ...asset.detailedInventory.plumbing.map(item => ({ ...item, category: 'Plumbing' })),
      ...asset.detailedInventory.security.map(item => ({ ...item, category: 'Security' }))
    ]
    
    return allEquipment
  }
  
  // Filter equipment based on current filters
  const getFilteredEquipment = () => {
    const allEquipment = getAllEquipment()
    
    return allEquipment.filter(item => {
      const matchesSearch = !equipmentFilters.search || 
        item.id?.toLowerCase().includes(equipmentFilters.search.toLowerCase()) ||
        item.type?.toLowerCase().includes(equipmentFilters.search.toLowerCase()) ||
        item.brand?.toLowerCase().includes(equipmentFilters.search.toLowerCase())
      
      const matchesType = equipmentFilters.type === 'all' || item.category === equipmentFilters.type
      const matchesCondition = equipmentFilters.condition === 'all' || item.condition?.toLowerCase() === equipmentFilters.condition.toLowerCase()
      const matchesBrand = equipmentFilters.brand === 'all' || item.brand === equipmentFilters.brand
      
      const matchesYear = (!equipmentFilters.yearFrom || item.yearInstalled >= parseInt(equipmentFilters.yearFrom)) &&
                         (!equipmentFilters.yearTo || item.yearInstalled <= parseInt(equipmentFilters.yearTo))
      
      const matchesLocation = equipmentFilters.location === 'all' || 
        ('location' in item && (item as any).location?.toLowerCase().includes(equipmentFilters.location.toLowerCase()))
      
      return matchesSearch && matchesType && matchesCondition && matchesBrand && matchesYear && matchesLocation
    })
  }
  
  // Get unique values for filter dropdowns
  const getEquipmentFilterOptions = () => {
    const allEquipment = getAllEquipment()
    
    const types = Array.from(new Set(allEquipment.map(item => item.category))).sort()
    const brands = Array.from(new Set(allEquipment.map(item => item.brand))).filter(Boolean).sort()
    const conditions = Array.from(new Set(allEquipment.map(item => item.condition))).filter(Boolean).sort()
    const locations = Array.from(new Set(allEquipment.map(item => 'location' in item ? (item as any).location : ''))).filter(Boolean).sort()
    
    return { types, brands, conditions, locations }
  }
  
  if (!asset) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Asset Not Found</h2>
          <button 
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'specifications', label: 'Specifications', icon: '📐' },
    { id: 'rooms', label: 'Room Management', icon: '🏠' },
    { id: 'assessments', label: 'Condition Assessment', icon: '🔍' },
    { id: 'inventory', label: 'Equipment Inventory', icon: '📦' },
    { id: 'financial', label: 'Financial', icon: '💰' },
    { id: 'maintenance', label: 'Maintenance', icon: '🔧' },
    { id: 'documents', label: 'Documents', icon: '📄' },
    { id: 'images', label: 'Images & Drawings', icon: '🖼️' },
    { id: 'audit', label: 'Audit Trail', icon: '📊' }
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
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{asset.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">{asset.number}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                {asset.status}
              </span>
              <button 
                onClick={handleEditAsset}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Asset
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Asset</h2>
              <button
                onClick={handleCancelEdit}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form className="space-y-8">
              {/* Basic Information */}
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Asset Name
                    </label>
                    <input
                      type="text"
                      value={editFormData?.name || ''}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Asset Number
                    </label>
                    <input
                      type="text"
                      value={editFormData?.number || ''}
                      onChange={(e) => handleInputChange('number', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={editFormData?.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      value={editFormData?.status || ''}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="MAINTENANCE">Under Maintenance</option>
                      <option value="INACTIVE">Inactive</option>
                      <option value="DECOMMISSIONED">Decommissioned</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Condition
                    </label>
                    <select
                      value={editFormData?.condition || ''}
                      onChange={(e) => handleInputChange('condition', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={editFormData?.category || ''}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Government">Government</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Recreation">Recreation</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subcategory
                    </label>
                    <input
                      type="text"
                      value={editFormData?.subcategory || ''}
                      onChange={(e) => handleInputChange('subcategory', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Physical Specifications - ALL FIELDS FROM SPECIFICATIONS OBJECT */}
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Physical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Total Area
                    </label>
                    <input
                      type="text"
                      value={(editFormData?.specifications as Record<string, unknown>)?.totalArea as string || ''}
                      onChange={(e) => handleInputChange('specifications', { ...(editFormData?.specifications as Record<string, unknown>), totalArea: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Built Up Area
                    </label>
                    <input
                      type="text"
                      value={editFormData?.specifications?.builtUpArea || ''}
                      onChange={(e) => handleInputChange('specifications', { ...editFormData?.specifications, builtUpArea: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Floors
                    </label>
                    <input
                      type="number"
                      value={editFormData?.specifications?.floors || ''}
                      onChange={(e) => handleInputChange('specifications', { ...editFormData?.specifications, floors: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Rooms
                    </label>
                    <input
                      type="number"
                      value={editFormData?.specifications?.rooms || ''}
                      onChange={(e) => handleInputChange('specifications', { ...editFormData?.specifications, rooms: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Beds
                    </label>
                    <input
                      type="number"
                      value={editFormData?.specifications?.beds || ''}
                      onChange={(e) => handleInputChange('specifications', { ...editFormData?.specifications, beds: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Operating Theaters
                    </label>
                    <input
                      type="number"
                      value={editFormData?.specifications?.operatingTheaters || ''}
                      onChange={(e) => handleInputChange('specifications', { ...editFormData?.specifications, operatingTheaters: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Laboratories
                    </label>
                    <input
                      type="number"
                      value={editFormData?.specifications?.laboratories || ''}
                      onChange={(e) => handleInputChange('specifications', { ...editFormData?.specifications, laboratories: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Parking
                    </label>
                    <input
                      type="text"
                      value={editFormData?.specifications?.parking || ''}
                      onChange={(e) => handleInputChange('specifications', { ...editFormData?.specifications, parking: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Emergency Bays
                    </label>
                    <input
                      type="number"
                      value={editFormData?.specifications?.emergencyBays || ''}
                      onChange={(e) => handleInputChange('specifications', { ...editFormData?.specifications, emergencyBays: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Elevators
                    </label>
                    <input
                      type="number"
                      value={editFormData?.specifications?.elevators || ''}
                      onChange={(e) => handleInputChange('specifications', { ...editFormData?.specifications, elevators: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Generators
                    </label>
                    <input
                      type="number"
                      value={editFormData?.specifications?.generators || ''}
                      onChange={(e) => handleInputChange('specifications', { ...editFormData?.specifications, generators: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Water Tanks
                    </label>
                    <input
                      type="text"
                      value={editFormData?.specifications?.waterTanks || ''}
                      onChange={(e) => handleInputChange('specifications', { ...editFormData?.specifications, waterTanks: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Location & Administrative */}
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Location & Administrative</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={editFormData?.location || ''}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Department
                    </label>
                    <input
                      type="text"
                      value={editFormData?.department || ''}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Year Built
                    </label>
                    <input
                      type="number"
                      value={editFormData?.yearBuilt || ''}
                      onChange={(e) => handleInputChange('yearBuilt', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Financial Information - ALL FIELDS FROM FINANCIAL OBJECT */}
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Financial Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Original Cost
                    </label>
                    <input
                      type="text"
                      value={editFormData?.financial?.originalCost || ''}
                      onChange={(e) => handleInputChange('financial', { ...editFormData?.financial, originalCost: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Current Value
                    </label>
                    <input
                      type="text"
                      value={editFormData?.financial?.currentValue || ''}
                      onChange={(e) => handleInputChange('financial', { ...editFormData?.financial, currentValue: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Insurance Value
                    </label>
                    <input
                      type="text"
                      value={editFormData?.financial?.insuranceValue || ''}
                      onChange={(e) => handleInputChange('financial', { ...editFormData?.financial, insuranceValue: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Annual Maintenance
                    </label>
                    <input
                      type="text"
                      value={editFormData?.financial?.annualMaintenance || ''}
                      onChange={(e) => handleInputChange('financial', { ...editFormData?.financial, annualMaintenance: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Valuation
                    </label>
                    <input
                      type="text"
                      value={editFormData?.financial?.lastValuation || ''}
                      onChange={(e) => handleInputChange('financial', { ...editFormData?.financial, lastValuation: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Depreciation Rate
                    </label>
                    <input
                      type="text"
                      value={editFormData?.financial?.depreciationRate || ''}
                      onChange={(e) => handleInputChange('financial', { ...editFormData?.financial, depreciationRate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Construction Details - ALL FIELDS FROM CONSTRUCTION OBJECT */}
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Construction Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Year Built
                    </label>
                    <input
                      type="number"
                      value={editFormData?.construction?.yearBuilt || ''}
                      onChange={(e) => handleInputChange('construction', { ...editFormData?.construction, yearBuilt: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Renovation
                    </label>
                    <input
                      type="number"
                      value={editFormData?.construction?.lastRenovation || ''}
                      onChange={(e) => handleInputChange('construction', { ...editFormData?.construction, lastRenovation: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Contractor
                    </label>
                    <input
                      type="text"
                      value={editFormData?.construction?.contractor || ''}
                      onChange={(e) => handleInputChange('construction', { ...editFormData?.construction, contractor: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Architect
                    </label>
                    <input
                      type="text"
                      value={editFormData?.construction?.architect || ''}
                      onChange={(e) => handleInputChange('construction', { ...editFormData?.construction, architect: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Structural Engineer
                    </label>
                    <input
                      type="text"
                      value={editFormData?.construction?.structuralEngineer || ''}
                      onChange={(e) => handleInputChange('construction', { ...editFormData?.construction, structuralEngineer: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Foundation Type
                    </label>
                    <input
                      type="text"
                      value={editFormData?.construction?.foundationType || ''}
                      onChange={(e) => handleInputChange('construction', { ...editFormData?.construction, foundationType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Roof Type
                    </label>
                    <input
                      type="text"
                      value={editFormData?.construction?.roofType || ''}
                      onChange={(e) => handleInputChange('construction', { ...editFormData?.construction, roofType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Wall Type
                    </label>
                    <input
                      type="text"
                      value={editFormData?.construction?.wallType || ''}
                      onChange={(e) => handleInputChange('construction', { ...editFormData?.construction, wallType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Equipment Inventory */}
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Equipment Inventory</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Total Windows
                    </label>
                    <input
                      type="number"
                      value={editFormData?.totalWindows || ''}
                      onChange={(e) => handleInputChange('totalWindows', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Total Doors
                    </label>
                    <input
                      type="number"
                      value={editFormData?.totalDoors || ''}
                      onChange={(e) => handleInputChange('totalDoors', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Elevators
                    </label>
                    <input
                      type="number"
                      value={editFormData?.elevators || ''}
                      onChange={(e) => handleInputChange('elevators', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Staircases
                    </label>
                    <input
                      type="number"
                      value={editFormData?.staircases || ''}
                      onChange={(e) => handleInputChange('staircases', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Utilities & Systems - ALL FIELDS FROM UTILITIES OBJECT */}
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Utilities & Systems</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Power Supply
                    </label>
                    <textarea
                      value={editFormData?.utilities?.powerSupply || ''}
                      onChange={(e) => handleInputChange('utilities', { ...editFormData?.utilities, powerSupply: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Water Supply
                    </label>
                    <textarea
                      value={editFormData?.utilities?.waterSupply || ''}
                      onChange={(e) => handleInputChange('utilities', { ...editFormData?.utilities, waterSupply: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Internet Connectivity
                    </label>
                    <input
                      type="text"
                      value={editFormData?.utilities?.internetConnectivity || ''}
                      onChange={(e) => handleInputChange('utilities', { ...editFormData?.utilities, internetConnectivity: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Fire Suppression System
                    </label>
                    <textarea
                      value={editFormData?.utilities?.fireSuppressionSystem || ''}
                      onChange={(e) => handleInputChange('utilities', { ...editFormData?.utilities, fireSuppressionSystem: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Security System
                    </label>
                    <textarea
                      value={editFormData?.utilities?.securitySystem || ''}
                      onChange={(e) => handleInputChange('utilities', { ...editFormData?.utilities, securitySystem: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      HVAC System
                    </label>
                    <textarea
                      value={editFormData?.utilities?.hvacSystem || ''}
                      onChange={(e) => handleInputChange('utilities', { ...editFormData?.utilities, hvacSystem: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Medical Gas System
                    </label>
                    <textarea
                      value={editFormData?.utilities?.medicalGasSystem || ''}
                      onChange={(e) => handleInputChange('utilities', { ...editFormData?.utilities, medicalGasSystem: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Safety & Security */}
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Safety & Security</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Security System
                    </label>
                    <textarea
                      value={editFormData?.securitySystem || ''}
                      onChange={(e) => handleInputChange('securitySystem', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Emergency Exits
                    </label>
                    <input
                      type="number"
                      value={editFormData?.emergencyExits || ''}
                      onChange={(e) => handleInputChange('emergencyExits', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Compliance & Certifications */}
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Compliance & Certifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Building Permits
                    </label>
                    <textarea
                      value={editFormData?.buildingPermits || ''}
                      onChange={(e) => handleInputChange('buildingPermits', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Environmental Compliance
                    </label>
                    <textarea
                      value={editFormData?.environmentalCompliance || ''}
                      onChange={(e) => handleInputChange('environmentalCompliance', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Accessibility Features
                    </label>
                    <textarea
                      value={editFormData?.accessibilityFeatures || ''}
                      onChange={(e) => handleInputChange('accessibilityFeatures', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Energy Efficiency Rating
                    </label>
                    <select
                      value={editFormData?.energyRating || ''}
                      onChange={(e) => handleInputChange('energyRating', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Rating</option>
                      <option value="A+">A+</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="F">F</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Maintenance & Operations */}
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Maintenance & Operations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Major Renovation
                    </label>
                    <input
                      type="text"
                      value={editFormData?.lastRenovation || ''}
                      onChange={(e) => handleInputChange('lastRenovation', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Maintenance Schedule
                    </label>
                    <select
                      value={editFormData?.maintenanceSchedule || ''}
                      onChange={(e) => handleInputChange('maintenanceSchedule', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Schedule</option>
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Semi-Annual">Semi-Annual</option>
                      <option value="Annual">Annual</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Operating Hours
                    </label>
                    <input
                      type="text"
                      value={editFormData?.operatingHours || ''}
                      onChange={(e) => handleInputChange('operatingHours', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Annual Operating Cost
                    </label>
                    <input
                      type="text"
                      value={editFormData?.annualOperatingCost || ''}
                      onChange={(e) => handleInputChange('annualOperatingCost', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Special Features */}
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Special Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Parking Spaces
                    </label>
                    <input
                      type="number"
                      value={editFormData?.parkingSpaces || ''}
                      onChange={(e) => handleInputChange('parkingSpaces', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Backup Generator
                    </label>
                    <select
                      value={editFormData?.backupGenerator || ''}
                      onChange={(e) => handleInputChange('backupGenerator', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Solar Panels
                    </label>
                    <select
                      value={editFormData?.solarPanels || ''}
                      onChange={(e) => handleInputChange('solarPanels', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Water Treatment System
                    </label>
                    <select
                      value={editFormData?.waterTreatment || ''}
                      onChange={(e) => handleInputChange('waterTreatment', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    value={editFormData?.additionalNotes || ''}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any additional information about this asset..."
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Asset Value</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{asset.value}</p>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Year Built</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{asset.yearBuilt}</p>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Area</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{asset.size}</p>
              </div>
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Condition</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{asset.condition}</p>
              </div>
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700 px-6 pb-4">
            <div className="flex items-center justify-between">
              <div className="relative tab-dropdown">
                <button
                  onClick={() => setShowTabDropdown(!showTabDropdown)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <span className="text-lg">{tabs.find(t => t.id === activeTab)?.icon}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{tabs.find(t => t.id === activeTab)?.label}</span>
                  <svg className={`w-4 h-4 transition-transform ${showTabDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showTabDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                    <div className="py-1">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveTab(tab.id)
                            setShowTabDropdown(false)
                          }}
                          className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                            activeTab === tab.id
                              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                              : 'text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <span className="text-lg">{tab.icon}</span>
                          <div>
                            <div className="font-medium">{tab.label}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {tab.id === 'overview' && 'Asset summary and key information'}
                              {tab.id === 'specifications' && 'Technical details and dimensions'}
                              {tab.id === 'rooms' && 'Floor plans and room management'}
                              {tab.id === 'assessments' && 'Condition reports and issues'}
                              {tab.id === 'inventory' && 'Equipment and asset inventory'}
                              {tab.id === 'financial' && 'Costs, valuation, and budget'}
                              {tab.id === 'maintenance' && 'Maintenance history and schedules'}
                              {tab.id === 'documents' && 'Files, certificates, and records'}
                              {tab.id === 'images' && 'Photos, drawings, and plans'}
                              {tab.id === 'audit' && 'Change history and audit logs'}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Quick Action Buttons */}
              <div className="flex items-center space-x-2">
                {activeTab === 'assessments' && (
                  <button 
                    onClick={() => router.push(`/dashboard/assets/${params.id}/assessments`)}
                    className="px-3 py-1 bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span>1 Critical Issue</span>
                  </button>
                )}
                {activeTab === 'rooms' && (
                  <button 
                    className="px-3 py-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>{floors.reduce((sum, floor) => sum + floor.totalRooms, 0)} Rooms</span>
                  </button>
                )}
                <button className="px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 overflow-visible">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Asset Description</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{asset.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Location Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Address:</span>
                        <span className="text-gray-900 dark:text-white">{asset.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">LGA:</span>
                        <span className="text-gray-900 dark:text-white">Ikeja</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Zone:</span>
                        <span className="text-gray-900 dark:text-white">Central Lagos</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">GPS:</span>
                        <span className="text-gray-900 dark:text-white">6.6018°N, 3.3478°E</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Administrative</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Department:</span>
                        <span className="text-gray-900 dark:text-white">{asset.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Category:</span>
                        <span className="text-gray-900 dark:text-white">{asset.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Type:</span>
                        <span className="text-gray-900 dark:text-white">{asset.subcategory}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Last Updated:</span>
                        <span className="text-gray-900 dark:text-white">{asset.updated}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <button
                  onClick={() => setActiveTab('rooms')}
                  className="flex items-center justify-center space-x-2 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <span className="text-2xl">🏠</span>
                  <div className="text-left">
                    <div className="font-medium text-blue-900 dark:text-blue-100">View Rooms</div>
                    <div className="text-sm text-blue-600 dark:text-blue-300">{floors.reduce((sum, floor) => sum + floor.totalRooms, 0)} rooms across {floors.length} floors</div>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('assessments')}
                  className="flex items-center justify-center space-x-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                >
                  <span className="text-2xl">🔍</span>
                  <div className="text-left">
                    <div className="font-medium text-red-900 dark:text-red-100">Condition Assessment</div>
                    <div className="text-sm text-red-600 dark:text-red-300">1 critical issue requiring attention</div>
                  </div>
                </button>
                    <button
                      onClick={() => setActiveTab('inventory')}
                      className="flex items-center justify-center space-x-2 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                    >
                      <span className="text-2xl">📦</span>
                      <div className="text-left">
                        <div className="font-medium text-green-900 dark:text-green-100">Equipment</div>
                        <div className="text-sm text-green-600 dark:text-green-300">View all equipment</div>
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveTab('maintenance')}
                      className="flex items-center justify-center space-x-2 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
                    >
                      <span className="text-2xl">🔧</span>
                      <div className="text-left">
                        <div className="font-medium text-orange-900 dark:text-orange-100">Maintenance</div>
                        <div className="text-sm text-orange-600 dark:text-orange-300">Schedule & history</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === 'specifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Physical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(asset.specifications).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div className="font-medium text-gray-900 dark:text-white">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Construction Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(asset.construction).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div className="font-medium text-gray-900 dark:text-white">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Utilities & Systems</h3>
                  <div className="space-y-3">
                    {Object.entries(asset.utilities).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600 last:border-0">
                        <span className="text-gray-600 dark:text-gray-400 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white text-right max-w-md">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Room Management Tab */}
            {activeTab === 'rooms' && (
              <div className="space-y-6">
                {/* Room Management Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Room Management</h3>
                    <p className="text-gray-600 dark:text-gray-400">Manage individual rooms and floors within this building</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                      <button
                        onClick={() => setRoomViewMode('list')}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          roomViewMode === 'list'
                            ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        📋 List View
                      </button>
                      <button
                        onClick={() => setRoomViewMode('floorplan')}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          roomViewMode === 'floorplan'
                            ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        🏗️ Floor Plan
                      </button>
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
                </div>

                {/* Floor Plan View */}
                {roomViewMode === 'floorplan' && (
                  <ArchitecturalFloorPlan
                    floors={floors}
                    selectedFloor={selectedFloor}
                    onFloorSelect={setSelectedFloor}
                    onRoomSelect={(room) => router.push(`/dashboard/assets/${params.id}/rooms/${room.id}`)}
                    viewMode={floorPlanMode}
                    onViewModeChange={setFloorPlanMode}
                  />
                )}

                {/* List View */}
                {roomViewMode === 'list' && (
                  <>
                    {/* Floor Navigation */}
                    <div className="mb-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Select Floor</h4>
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
                              <h5 className="font-semibold text-gray-900 dark:text-white">Floor {floor.number}</h5>
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

                    {/* Room Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Search rooms..."
                        value={roomSearchQuery}
                        onChange={(e) => setRoomSearchQuery(e.target.value)}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <select
                        value={roomFilterType}
                        onChange={(e) => setRoomFilterType(e.target.value)}
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
                        value={roomFilterStatus}
                        onChange={(e) => setRoomFilterStatus(e.target.value)}
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
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          Floor {currentFloor.number} - {currentFloor.name}
                        </h4>
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
                      onClick={() => router.push(`/dashboard/assets/${params.id}/rooms/${room.id}`)}
                    >
                      {/* Room Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{getTypeIcon(room.type)}</span>
                          <div>
                            <h5 className="font-semibold text-gray-900 dark:text-white">{room.name}</h5>
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
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Rooms Found</h4>
                    <p className="text-gray-600 dark:text-gray-400">No rooms match your current filters.</p>
                  </div>
                )}

                {/* Quick Stats Summary */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Building Summary</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{floors.reduce((sum, floor) => sum + floor.totalRooms, 0)}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Total Rooms</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">{floors.reduce((sum, floor) => sum + floor.rooms.filter(r => r.status === 'Active').length, 0)}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Active Rooms</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{floors.reduce((sum, floor) => sum + floor.rooms.filter(r => r.status === 'Under Maintenance').length, 0)}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Under Maintenance</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">{floors.length}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Total Floors</div>
                    </div>
                  </div>
                </div>
                </>
                )}
              </div>
            )}

            {/* Condition Assessment Tab */}
            {activeTab === 'assessments' && (
              <ConditionAssessmentContent assetId={params.id as string} />
            )}

            {/* Equipment Inventory Tab */}
            {activeTab === 'inventory' && (
              <div className="space-y-8">
                {/* Equipment Filters */}
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🔍 Filter Equipment</h3>
                    <button
                      onClick={clearEquipmentFilters}
                      className="px-3 py-1 text-sm text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 border border-gray-300 dark:border-gray-600 rounded"
                    >
                      Clear All
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search</label>
                      <input
                        type="text"
                        placeholder="Search by ID, type, or brand..."
                        value={equipmentFilters.search}
                        onChange={(e) => handleEquipmentFilterChange('search', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Equipment Type</label>
                      <select
                        value={equipmentFilters.type}
                        onChange={(e) => handleEquipmentFilterChange('type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      >
                        <option value="all">All Types</option>
                        {getEquipmentFilterOptions().types.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Condition</label>
                      <select
                        value={equipmentFilters.condition}
                        onChange={(e) => handleEquipmentFilterChange('condition', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      >
                        <option value="all">All Conditions</option>
                        {getEquipmentFilterOptions().conditions.map(condition => (
                          <option key={condition} value={condition}>{condition}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Brand</label>
                      <select
                        value={equipmentFilters.brand}
                        onChange={(e) => handleEquipmentFilterChange('brand', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      >
                        <option value="all">All Brands</option>
                        {getEquipmentFilterOptions().brands.map(brand => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Installation Year</label>
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          placeholder="From"
                          min="1970"
                          max="2025"
                          value={equipmentFilters.yearFrom}
                          onChange={(e) => handleEquipmentFilterChange('yearFrom', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                        />
                        <input
                          type="number"
                          placeholder="To"
                          min="1970"
                          max="2025"
                          value={equipmentFilters.yearTo}
                          onChange={(e) => handleEquipmentFilterChange('yearTo', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                      <select
                        value={equipmentFilters.location}
                        onChange={(e) => handleEquipmentFilterChange('location', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      >
                        <option value="all">All Locations</option>
                        {getEquipmentFilterOptions().locations.map(location => (
                          <option key={location} value={location}>{location}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>
                      Showing {getFilteredEquipment().length} of {getAllEquipment().length} equipment items
                    </span>
                    <span>
                      Active filters: {Object.values(equipmentFilters).filter(v => v && v !== 'all').length}
                    </span>
                  </div>
                </div>
                
                {/* Filtered Equipment Results */}
                {getFilteredEquipment().length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 dark:text-gray-500 mb-4">
                      <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No equipment found</h3>
                    <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters to see more results</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Display filtered equipment by category */}
                    {['Air Conditioning', 'Doors', 'Windows', 'Lighting', 'Electrical', 'Plumbing', 'Security'].map(category => {
                      const categoryEquipment = getFilteredEquipment().filter(item => item.category === category)
                      if (categoryEquipment.length === 0) return null
                      
                      return (
                        <div key={category}>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            {category === 'Air Conditioning' && '❄️'} 
                            {category === 'Doors' && '🚪'} 
                            {category === 'Windows' && '🪟'} 
                            {category === 'Lighting' && '💡'} 
                            {category === 'Electrical' && '⚡'} 
                            {category === 'Plumbing' && '🔧'} 
                            {category === 'Security' && '🔒'} 
                            {' '}{category} Systems ({categoryEquipment.length} units)
                          </h3>
                          <div className="grid gap-4">
                            {categoryEquipment.map((item, index) => (
                              <div key={`${category}-${index}`} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="font-medium text-gray-900 dark:text-white">{item.id} - {item.type}</h4>
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    item.condition === 'Excellent' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                    item.condition === 'Good' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                  }`}>
                                    {item.condition}
                                  </span>
                                </div>
                                {/* Detailed AC Information */}
                                {item.category === 'Air Conditioning' && 'serialNumber' in item ? (
                                  <div className="space-y-4">
                                    {/* Primary AC Info */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                      <div>
                                        <span className="text-gray-600 dark:text-gray-400">Brand/Model:</span>
                                        <p className="font-medium text-gray-900 dark:text-white">{item.brand} {'model' in item ? item.model : ''}</p>
                                      </div>
                                      <div>
                                        <span className="text-gray-600 dark:text-gray-400">Serial Number:</span>
                                        <p className="font-medium text-gray-900 dark:text-white">{(item as any).serialNumber}</p>
                                      </div>
                                      <div>
                                        <span className="text-gray-600 dark:text-gray-400">Sub Type:</span>
                                        <p className="font-medium text-gray-900 dark:text-white">{(item as any).subType}</p>
                                      </div>
                                      <div>
                                        <span className="text-gray-600 dark:text-gray-400">Capacity:</span>
                                        <p className="font-medium text-gray-900 dark:text-white">{(item as any).capacity}</p>
                                      </div>
                                    </div>
                                    
                                    {/* Technical Specs */}
                                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">Technical Specifications</h5>
                                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Refrigerant:</span>
                                          <p className="font-medium text-gray-900 dark:text-white">{(item as any).refrigerant}</p>
                                        </div>
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Refrigerant Charge:</span>
                                          <p className="font-medium text-gray-900 dark:text-white">{(item as any).refrigerantCharge}</p>
                                        </div>
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Power Consumption:</span>
                                          <p className="font-medium text-gray-900 dark:text-white">{(item as any).powerConsumption}</p>
                                        </div>
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Energy Rating:</span>
                                          <p className="font-medium text-gray-900 dark:text-white">{(item as any).energyRating}</p>
                                        </div>
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Voltage Rating:</span>
                                          <p className="font-medium text-gray-900 dark:text-white">{(item as any).voltageRating}</p>
                                        </div>
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Air Flow Rate:</span>
                                          <p className="font-medium text-gray-900 dark:text-white">{(item as any).airFlowRate}</p>
                                        </div>
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Sound Level:</span>
                                          <p className="font-medium text-gray-900 dark:text-white">{(item as any).soundLevel}</p>
                                        </div>
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Efficiency:</span>
                                          <p className="font-medium text-gray-900 dark:text-white">{(item as any).efficiency}</p>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    {/* Installation & Service */}
                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">Installation & Service</h5>
                                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Installed:</span>
                                          <p className="font-medium text-gray-900 dark:text-white">{item.yearInstalled}</p>
                                        </div>
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Installed By:</span>
                                          <p className="font-medium text-gray-900 dark:text-white">{item.installedBy}</p>
                                        </div>
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Service Technician:</span>
                                          <p className="font-medium text-gray-900 dark:text-white">{(item as any).serviceTechnician}</p>
                                        </div>
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Service Interval:</span>
                                          <p className="font-medium text-gray-900 dark:text-white">{(item as any).serviceInterval}</p>
                                        </div>
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Last Service:</span>
                                          <p className="font-medium text-gray-900 dark:text-white">{(item as any).lastService}</p>
                                        </div>
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Next Service:</span>
                                          <p className="font-medium text-gray-900 dark:text-white">{(item as any).nextService}</p>
                                        </div>
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Warranty:</span>
                                          <p className="font-medium text-gray-900 dark:text-white">{(item as any).warrantyExpiry}</p>
                                        </div>
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Maintenance Cost:</span>
                                          <p className="font-medium text-gray-900 dark:text-white">{(item as any).maintenanceContract}</p>
                                        </div>
                                      </div>
                                    </div>
                                    

                                    
                                    {/* Rooms Served */}
                                    {(item as any).roomsServed && (
                                      <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                                        <h5 className="font-medium text-gray-900 dark:text-white mb-2">Rooms Served</h5>
                                        <div className="flex flex-wrap gap-2">
                                          {(item as any).roomsServed.map((room: string, idx: number) => (
                                            <span key={idx} className="px-2 py-1 bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 rounded text-xs">
                                              {room}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                    
                                    {/* Special Features */}
                                    {(item as any).specialFeatures && (
                                      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                                        <h5 className="font-medium text-gray-900 dark:text-white mb-2">Special Features</h5>
                                        <div className="flex flex-wrap gap-2">
                                          {(item as any).specialFeatures.map((feature: string, idx: number) => (
                                            <span key={idx} className="px-2 py-1 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 rounded text-xs">
                                              {feature}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                    
                                    {/* Contractor Details */}
                                    {(item as any).contractor && (
                                      <div className="bg-gray-100 dark:bg-gray-600 p-3 rounded-lg">
                                        <h5 className="font-medium text-gray-900 dark:text-white mb-2">Contractor Information</h5>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                          <div>
                                            <span className="text-gray-600 dark:text-gray-400">Company:</span>
                                            <p className="font-medium text-gray-900 dark:text-white">{(item as any).contractor.name}</p>
                                          </div>
                                          <div>
                                            <span className="text-gray-600 dark:text-gray-400">License:</span>
                                            <p className="font-medium text-gray-900 dark:text-white">{(item as any).contractor.license}</p>
                                          </div>
                                          <div>
                                            <span className="text-gray-600 dark:text-gray-400">Contact:</span>
                                            <p className="font-medium text-gray-900 dark:text-white">{(item as any).contractor.contact}</p>
                                          </div>
                                          <div>
                                            <span className="text-gray-600 dark:text-gray-400">Address:</span>
                                            <p className="font-medium text-gray-900 dark:text-white">{(item as any).contractor.address}</p>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  /* Standard equipment display for non-AC items */
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                      <span className="text-gray-600 dark:text-gray-400">Brand/Model:</span>
                                      <p className="font-medium text-gray-900 dark:text-white">{item.brand} {'model' in item ? (item as any).model : ''}</p>
                                    </div>
                                    {'capacity' in item && (item as any).capacity && (
                                      <div>
                                        <span className="text-gray-600 dark:text-gray-400">Capacity:</span>
                                        <p className="font-medium text-gray-900 dark:text-white">{(item as any).capacity}</p>
                                      </div>
                                    )}
                                    {'quantity' in item && (item as any).quantity && (
                                      <div>
                                        <span className="text-gray-600 dark:text-gray-400">Quantity:</span>
                                        <p className="font-medium text-gray-900 dark:text-white">{(item as any).quantity}</p>
                                      </div>
                                    )}
                                    <div>
                                      <span className="text-gray-600 dark:text-gray-400">Location:</span>
                                      <p className="font-medium text-gray-900 dark:text-white">{'location' in item ? (item as any).location : 'N/A'}</p>
                                    </div>
                                    <div>
                                      <span className="text-gray-600 dark:text-gray-400">Installed:</span>
                                      <p className="font-medium text-gray-900 dark:text-white">{item.yearInstalled}</p>
                                    </div>
                                    <div>
                                      <span className="text-gray-600 dark:text-gray-400">Installed By:</span>
                                      <p className="font-medium text-gray-900 dark:text-white">{item.installedBy}</p>
                                    </div>
                                    {'lastService' in item && (item as any).lastService && (
                                      <div>
                                        <span className="text-gray-600 dark:text-gray-400">Last Service:</span>
                                        <p className="font-medium text-gray-900 dark:text-white">{(item as any).lastService}</p>
                                      </div>
                                    )}
                                    {'warrantyExpiry' in item && (item as any).warrantyExpiry && (
                                      <div>
                                        <span className="text-gray-600 dark:text-gray-400">Warranty:</span>
                                        <p className="font-medium text-gray-900 dark:text-white">{(item as any).warrantyExpiry}</p>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
                
                {/* Original Equipment Sections - Hidden when filters are active */}
                {Object.values(equipmentFilters).every(v => !v || v === 'all') && (
                  <div className="space-y-8">
                    {/* Air Conditioning Systems */}
                    <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    ❄️ Air Conditioning Systems ({asset.detailedInventory.airConditioning.length} units)
                  </h3>
                  <div className="grid gap-4">
                    {asset.detailedInventory.airConditioning.map((ac, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900 dark:text-white">{ac.id} - {ac.type}</h4>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            ac.condition === 'Excellent' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            ac.condition === 'Good' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}>
                            {ac.condition}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Brand/Model:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{ac.brand} {ac.model}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Capacity:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{ac.capacity}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Location:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{ac.location}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Installed:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{ac.yearInstalled}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Installed By:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{ac.installedBy}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Last Service:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{ac.lastService}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Warranty:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{ac.warrantyExpiry}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Doors */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    🚪 Doors & Access Points ({asset.detailedInventory.doors.length} units)
                  </h3>
                  <div className="grid gap-4">
                    {asset.detailedInventory.doors.map((door, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900 dark:text-white">{door.id} - {door.type}</h4>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-xs font-medium">
                            {door.accessLevel}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Material:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{door.material}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Brand/Model:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{door.brand} {door.model}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Dimensions:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{door.dimensions}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Features:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{door.features}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Installed:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{door.yearInstalled}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Installed By:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{door.installedBy}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Last Maintenance:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{door.lastMaintenance}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Condition:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{door.condition}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Windows */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    🪟 Windows & Glass Systems ({asset.detailedInventory.windows.reduce((sum, w) => sum + w.quantity, 0)} units)
                  </h3>
                  <div className="grid gap-4">
                    {asset.detailedInventory.windows.map((window, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900 dark:text-white">{window.id} - {window.type}</h4>
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded text-xs font-medium">
                            {window.quantity} units
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Material:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{window.material}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Brand/Model:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{window.brand} {window.model}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Dimensions:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{window.dimensions}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Features:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{window.features}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Installed:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{window.yearInstalled}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Installed By:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{window.installedBy}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Last Maintenance:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{window.lastMaintenance}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Condition:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{window.condition}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lighting Systems */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    💡 Lighting Systems ({asset.detailedInventory.lighting.reduce((sum, l) => sum + l.quantity, 0)} units)
                  </h3>
                  <div className="grid gap-4">
                    {asset.detailedInventory.lighting.map((light, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900 dark:text-white">{light.id} - {light.type}</h4>
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded text-xs font-medium">
                            {light.quantity} units
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Brand/Model:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{light.brand} {light.model}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Wattage:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{light.wattage}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Location:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{light.location}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Installed:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{light.yearInstalled}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Installed By:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{light.installedBy}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Condition:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{light.condition}</p>
                          </div>
                          {light.features && (
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Features:</span>
                              <p className="font-medium text-gray-900 dark:text-white">{light.features}</p>
                            </div>
                          )}
                          {light.lifespan && (
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Lifespan:</span>
                              <p className="font-medium text-gray-900 dark:text-white">{light.lifespan}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Electrical Systems */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    ⚡ Electrical Systems ({asset.detailedInventory.electrical.length} systems)
                  </h3>
                  <div className="grid gap-4">
                    {asset.detailedInventory.electrical.map((electrical, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900 dark:text-white">{electrical.id} - {electrical.type}</h4>
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 rounded text-xs font-medium">
                            {electrical.condition}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Brand/Model:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{electrical.brand} {electrical.model}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Capacity:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{electrical.capacity}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Installed:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{electrical.yearInstalled}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Installed By:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{electrical.installedBy}</p>
                          </div>
                          {electrical.voltage && (
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Voltage:</span>
                              <p className="font-medium text-gray-900 dark:text-white">{electrical.voltage}</p>
                            </div>
                          )}
                          {electrical.batteryBackup && (
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Battery Backup:</span>
                              <p className="font-medium text-gray-900 dark:text-white">{electrical.batteryBackup}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plumbing Systems */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    🔧 Plumbing & Gas Systems ({asset.detailedInventory.plumbing.length} systems)
                  </h3>
                  <div className="grid gap-4">
                    {asset.detailedInventory.plumbing.map((plumbing, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900 dark:text-white">{plumbing.id} - {plumbing.type}</h4>
                          <span className="px-2 py-1 bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200 rounded text-xs font-medium">
                            {plumbing.condition}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Material:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{plumbing.material}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Brand:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{plumbing.brand}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Installed:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{plumbing.yearInstalled}</p>
                          </div>
                          {plumbing.diameter && (
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Diameter:</span>
                              <p className="font-medium text-gray-900 dark:text-white">{plumbing.diameter}</p>
                            </div>
                          )}
                          {plumbing.gases && (
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Gases:</span>
                              <p className="font-medium text-gray-900 dark:text-white">{plumbing.gases}</p>
                            </div>
                          )}
                          {plumbing.pressure && (
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Pressure:</span>
                              <p className="font-medium text-gray-900 dark:text-white">{plumbing.pressure}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security Systems */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    🔒 Security Systems ({asset.detailedInventory.security.length} systems)
                  </h3>
                  <div className="grid gap-4">
                    {asset.detailedInventory.security.map((security, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900 dark:text-white">{security.id} - {security.type}</h4>
                          <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded text-xs font-medium">
                            {security.condition}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Brand/Model:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{security.brand} {security.model}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Installed:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{security.yearInstalled}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Installed By:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{security.installedBy}</p>
                          </div>
                          {security.quantity && (
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Quantity:</span>
                              <p className="font-medium text-gray-900 dark:text-white">{security.quantity}</p>
                            </div>
                          )}
                          {security.resolution && (
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Resolution:</span>
                              <p className="font-medium text-gray-900 dark:text-white">{security.resolution}</p>
                            </div>
                          )}
                          {security.cardReaders && (
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Card Readers:</span>
                              <p className="font-medium text-gray-900 dark:text-white">{security.cardReaders}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                  </div>
                )}
              </div>
            )}

            {/* Financial Tab */}
            {activeTab === 'financial' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Financial Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(asset.financial).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400 capitalize mb-1">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Annual Maintenance Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Annual Maintenance</h3>
                    <select
                      value={selectedMaintenanceYear}
                      onChange={(e) => setSelectedMaintenanceYear(e.target.value)}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {Object.keys((asset as any).annualMaintenanceByYear || {}).sort((a, b) => parseInt(b) - parseInt(a)).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  {(asset as any).annualMaintenanceByYear && (asset as any).annualMaintenanceByYear[selectedMaintenanceYear] && (
                    <div className="space-y-4">
                      {/* Summary Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                          <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">Budgeted</div>
                          <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                            {(asset as any).annualMaintenanceByYear[selectedMaintenanceYear].budgeted}
                          </div>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                          <div className="text-sm text-green-600 dark:text-green-400 mb-1">Actual</div>
                          <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                            {(asset as any).annualMaintenanceByYear[selectedMaintenanceYear].actual}
                          </div>
                        </div>
                        <div className={`p-4 rounded-lg border ${
                          (asset as any).annualMaintenanceByYear[selectedMaintenanceYear].variance.startsWith('+')
                            ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                            : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                        }`}>
                          <div className={`text-sm mb-1 ${
                            (asset as any).annualMaintenanceByYear[selectedMaintenanceYear].variance.startsWith('+')
                              ? 'text-red-600 dark:text-red-400'
                              : 'text-green-600 dark:text-green-400'
                          }`}>
                            Variance
                          </div>
                          <div className={`text-2xl font-bold ${
                            (asset as any).annualMaintenanceByYear[selectedMaintenanceYear].variance.startsWith('+')
                              ? 'text-red-900 dark:text-red-100'
                              : 'text-green-900 dark:text-green-100'
                          }`}>
                            {(asset as any).annualMaintenanceByYear[selectedMaintenanceYear].variance}
                          </div>
                        </div>
                      </div>

                      {/* Projects List */}
                      <div>
                        <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">Maintenance Projects ({selectedMaintenanceYear})</h4>
                        <div className="space-y-2">
                          {(asset as any).annualMaintenanceByYear[selectedMaintenanceYear].projects.map((project: any, index: number) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <div className="flex-1">
                                <div className="font-medium text-gray-900 dark:text-white">{project.name}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Status: {project.status}</div>
                              </div>
                              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                {project.cost}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Maintenance Tab */}
            {activeTab === 'maintenance' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Maintenance History</h3>
                  <button 
                    onClick={() => setShowScheduleModal(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Schedule Maintenance</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  {asset.maintenanceHistory.map((maintenance, index) => (
                    <div key={maintenance.id || index} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                      {/* Header - Clickable */}
                      <div className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700" onClick={() => setExpandedMaintenance(expandedMaintenance === maintenance.id ? null : maintenance.id)}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                              maintenance.type === 'Preventive' ? 'bg-blue-500' :
                              maintenance.type === 'Corrective' ? 'bg-orange-500' :
                              'bg-gray-500'
                            }`}>
                              {maintenance.type === 'Preventive' ? '🔧' : '⚡'}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">{maintenance.title || maintenance.description}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{maintenance.date} • Work Order: {maintenance.workOrder}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              maintenance.status === 'Completed' 
                                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                                : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                            }`}>
                              {maintenance.status}
                            </span>
                            <svg className={`w-5 h-5 text-gray-400 transition-transform ${expandedMaintenance === maintenance.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        
                        {/* Quick Info - Always Visible */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Type:</span>
                            <span className="ml-2 font-medium text-gray-900 dark:text-white">{maintenance.type}</span>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Cost:</span>
                            <span className="ml-2 font-medium text-gray-900 dark:text-white">{maintenance.cost}</span>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                            <span className="ml-2 font-medium text-gray-900 dark:text-white">{maintenance.duration || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Priority:</span>
                            <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                              maintenance.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                              maintenance.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                              'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            }`}>
                              {maintenance.priority || 'Low'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {expandedMaintenance === maintenance.id && (
                        <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6 space-y-6">
                          
                          {/* Description */}
                          <div>
                            <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Work Description</h5>
                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{maintenance.description}</p>
                          </div>

                          {/* Documents */}
                          {maintenance.documents && maintenance.documents.length > 0 && (
                            <div>
                              <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Documents & Reports</h5>
                              <div className="grid md:grid-cols-2 gap-3">
                                {maintenance.documents.map((doc, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                                    <div className="flex items-center gap-3">
                                      <div className={`w-8 h-8 rounded flex items-center justify-center text-white text-xs font-bold ${
                                        doc.type === 'Report' ? 'bg-blue-500' :
                                        doc.type === 'Photos' ? 'bg-green-500' :
                                        doc.type === 'Invoice' ? 'bg-orange-500' :
                                        doc.type === 'Certificate' ? 'bg-purple-500' :
                                        doc.type === 'Test Results' ? 'bg-teal-500' :
                                        'bg-gray-500'
                                      }`}>
                                        {doc.type === 'Photos' ? '📸' :
                                         doc.type === 'Invoice' ? '💳' :
                                         doc.type === 'Certificate' ? '🏆' :
                                         doc.type === 'Test Results' ? '📊' : '📄'}
                                      </div>
                                      <div>
                                        <p className="font-medium text-gray-900 dark:text-white text-sm">{doc.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{doc.size} • {doc.uploadDate}</p>
                                      </div>
                                    </div>
                                    <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                                      Download
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Technician & Contractor Info */}
                          {(maintenance.technician || (maintenance.contractor && typeof maintenance.contractor === 'object')) && (
                            <div className="grid md:grid-cols-2 gap-6">
                              {/* Technician */}
                              {maintenance.technician && (
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                  <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Technician</h5>
                                  <div className="space-y-1 text-sm">
                                    <p><span className="text-gray-600 dark:text-gray-400">Name:</span> <span className="font-medium text-gray-900 dark:text-white">{maintenance.technician.name}</span></p>
                                    <p><span className="text-gray-600 dark:text-gray-400">Certification:</span> <span className="text-gray-900 dark:text-white">{maintenance.technician.certification}</span></p>
                                    <p><span className="text-gray-600 dark:text-gray-400">Experience:</span> <span className="text-gray-900 dark:text-white">{maintenance.technician.experience}</span></p>
                                    <p><span className="text-gray-600 dark:text-gray-400">Phone:</span> <span className="text-gray-900 dark:text-white">{maintenance.technician.phone}</span></p>
                                  </div>
                                </div>
                              )}

                              {/* Contractor */}
                              {maintenance.contractor && typeof maintenance.contractor === 'object' && (
                                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                                  <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Contractor</h5>
                                  <div className="space-y-1 text-sm">
                                    <p><span className="text-gray-600 dark:text-gray-400">Company:</span> <span className="font-medium text-gray-900 dark:text-white">{maintenance.contractor.name}</span></p>
                                    <p><span className="text-gray-600 dark:text-gray-400">License:</span> <span className="text-gray-900 dark:text-white">{maintenance.contractor.license}</span></p>
                                    <p><span className="text-gray-600 dark:text-gray-400">Contact:</span> <span className="text-gray-900 dark:text-white">{maintenance.contractor.contact}</span></p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{maintenance.contractor.address}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Documents & Certificates</h3>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Upload Document
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {asset.documents.map((doc, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                          <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">{doc.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                            <span>{doc.type}</span>
                            <span>{doc.size}</span>
                            <span>{doc.date}</span>
                          </div>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Images & Drawings Tab */}
            {activeTab === 'images' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Images & Technical Drawings</h3>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Upload Images
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {asset.images.map((image) => (
                    <div key={image.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                         onClick={() => setSelectedImage(image)}>
                      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                        {image.type === 'drawing' ? (
                          <div className="text-center">
                            <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            <p className="text-xs text-gray-500">Technical Drawing</p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-xs text-gray-500">Photo</p>
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">{image.title}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{image.description}</p>
                        <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <span className="capitalize">{image.type}</span>
                          <span>{image.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'audit' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Audit Trail & Change History</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{asset.auditTrail.length} records</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {asset.auditTrail.map((record, index) => (
                    <div key={record.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                            record.action === 'Asset Created' ? 'bg-green-500' :
                            record.action === 'Equipment Added' ? 'bg-blue-500' :
                            record.action === 'Maintenance Scheduled' ? 'bg-orange-500' :
                            record.action === 'Asset Value Updated' ? 'bg-purple-500' :
                            record.action === 'Security Update' ? 'bg-red-500' :
                            record.action === 'Condition Assessment' ? 'bg-teal-500' : 'bg-gray-500'
                          }`}>
                            {record.action === 'Asset Created' ? '🆕' :
                             record.action === 'Equipment Added' ? '➕' :
                             record.action === 'Maintenance Scheduled' ? '🔧' :
                             record.action === 'Asset Value Updated' ? '💰' :
                             record.action === 'Security Update' ? '🔒' :
                             record.action === 'Condition Assessment' ? '📋' : '📝'}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{record.action}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{record.changes.summary}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                              <span>{new Date(record.timestamp).toLocaleString()}</span>
                              <span>•</span>
                              <span>ID: {record.id}</span>
                              <span>•</span>
                              <span>Session: {record.sessionId.slice(-8)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            record.approvalRequired ? 
                            (record.approvedBy ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200') :
                            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          }`}>
                            {record.approvalRequired ? 
                             (record.approvedBy ? 'Approved' : 'Pending Approval') : 
                             'Auto-Approved'}
                          </span>
                        </div>
                      </div>

                      {/* User Information */}
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">User:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{record.user.name}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Role:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{record.user.role}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Department:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{record.user.department}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Employee ID:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{record.user.userId}</p>
                          </div>
                        </div>
                      </div>

                      {/* Changes Made */}
                      <div className="mb-4">
                        <h5 className="font-medium text-gray-900 dark:text-white mb-3">Changes Made</h5>
                        <div className="space-y-2">
                          {record.changes.fields.map((change, idx) => (
                            <div key={idx} className="flex items-center justify-between py-2 px-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                              <span className="font-medium text-gray-900 dark:text-white">{change.field}</span>
                              <div className="flex items-center gap-2 text-sm">
                                {change.oldValue && (
                                  <>
                                    <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded">
                                      {change.oldValue}
                                    </span>
                                    <span className="text-gray-400">→</span>
                                  </>
                                )}
                                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded">
                                  {change.newValue}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Approval Information */}
                      {record.approvedBy && (
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-4">
                          <h5 className="font-medium text-gray-900 dark:text-white mb-2">Approval Details</h5>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Approved By:</span>
                              <p className="font-medium text-gray-900 dark:text-white">{record.approvedBy.name}</p>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Role:</span>
                              <p className="font-medium text-gray-900 dark:text-white">{record.approvedBy.role}</p>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Approval Date:</span>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {new Date(record.approvedBy.approvalDate).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          {record.approvedBy.approvalNotes && (
                            <div className="mt-3">
                              <span className="text-gray-600 dark:text-gray-400">Notes:</span>
                              <p className="text-gray-900 dark:text-white mt-1">{record.approvedBy.approvalNotes}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Technical Details */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <div>
                          <span>IP Address:</span>
                          <p className="font-mono">{record.ipAddress}</p>
                        </div>
                        <div>
                          <span>Browser:</span>
                          <p className="truncate">{record.userAgent.split(' ')[0]}</p>
                        </div>
                        <div>
                          <span>Session ID:</span>
                          <p className="font-mono">{record.sessionId.slice(-12)}</p>
                        </div>
                        <div>
                          <span>User Email:</span>
                          <p>{record.user.email}</p>
                        </div>
                      </div>

                      {/* Notes */}
                      {record.notes && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                          <span className="text-gray-600 dark:text-gray-400 text-sm">Additional Notes:</span>
                          <p className="text-gray-900 dark:text-white text-sm mt-1">{record.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Export Options */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Export Audit Trail</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Download complete audit history for compliance</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                        Export PDF
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                        Export Excel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
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
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="e.g., Consultation Room 5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Floor
                  </label>
                  <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    {floors.map(floor => (
                      <option key={floor.number} value={floor.number}>Floor {floor.number}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Room Type
                  </label>
                  <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
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
                  onClick={() => {
                    // In a real app, this would make an API call
                    console.log('Adding room...')
                    setShowAddRoomModal(false)
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Add Room
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedImage.title}</h3>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center mb-4">
                {selectedImage.type === 'drawing' ? (
                  <div className="text-center">
                    <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Technical Drawing</p>
                    <p className="text-sm text-gray-500">High-resolution architectural/engineering drawing</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Asset Photo</p>
                    <p className="text-sm text-gray-500">High-resolution asset photograph</p>
                  </div>
                )}
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">{selectedImage.title}</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-3">{selectedImage.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span className="capitalize">Type: {selectedImage.type}</span>
                  <span>Date: {selectedImage.date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Maintenance Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Schedule Maintenance</h3>
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
                // Create new maintenance task
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
                  category: newMaintenanceTask.category || 'General',
                  notes: newMaintenanceTask.notes,
                  createdAt: new Date().toISOString(),
                  createdBy: 'Admin User'
                }

                // Add to maintenance history (in a real app, this would be an API call)
                console.log('New maintenance task scheduled:', newTask)
                
                // Show success message
                alert(`Maintenance task "${newTask.title}" has been scheduled successfully!\nWork Order: ${newTask.workOrder}`)
                
                // Close modal and reset form
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
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Task Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newMaintenanceTask.title}
                    onChange={(e) => setNewMaintenanceTask(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., HVAC System Maintenance"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Maintenance Type *
                  </label>
                  <select
                    required
                    value={newMaintenanceTask.type}
                    onChange={(e) => setNewMaintenanceTask(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Preventive">Preventive</option>
                    <option value="Corrective">Corrective</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Inspection">Inspection</option>
                    <option value="Calibration">Calibration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priority *
                  </label>
                  <select
                    required
                    value={newMaintenanceTask.priority}
                    onChange={(e) => setNewMaintenanceTask(prev => ({ ...prev, priority: e.target.value }))}
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
                    onChange={(e) => setNewMaintenanceTask(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    <option value="HVAC">HVAC</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Structural">Structural</option>
                    <option value="Medical Equipment">Medical Equipment</option>
                    <option value="Fire Safety">Fire Safety</option>
                    <option value="Security">Security</option>
                    <option value="General">General</option>
                  </select>
                </div>
              </div>

              {/* Scheduling Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Scheduled Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newMaintenanceTask.scheduledDate}
                    onChange={(e) => setNewMaintenanceTask(prev => ({ ...prev, scheduledDate: e.target.value }))}
                    min={new Date().toISOString().split('T')[0]}
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
                    onChange={(e) => setNewMaintenanceTask(prev => ({ ...prev, estimatedDuration: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 4 hours, 2 days"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Assigned To
                  </label>
                  <input
                    type="text"
                    value={newMaintenanceTask.assignedTo}
                    onChange={(e) => setNewMaintenanceTask(prev => ({ ...prev, assignedTo: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Technician name or team"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Estimated Cost (₦)
                  </label>
                  <input
                    type="number"
                    value={newMaintenanceTask.cost}
                    onChange={(e) => setNewMaintenanceTask(prev => ({ ...prev, cost: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Work Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={newMaintenanceTask.description}
                  onChange={(e) => setNewMaintenanceTask(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Detailed description of the maintenance work to be performed..."
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Additional Notes
                </label>
                <textarea
                  rows={3}
                  value={newMaintenanceTask.notes}
                  onChange={(e) => setNewMaintenanceTask(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any special instructions, safety requirements, or additional information..."
                />
              </div>

              {/* Action Buttons */}
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
