"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"

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

export default function AssetAssessmentsPage() {
  const router = useRouter()
  const params = useParams()
  const assetId = params.id as string

  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedFloor, setSelectedFloor] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

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
    const matchesSearch = !searchQuery || 
      assessment.room_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assessment.item_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assessment.damages_defects.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesStatus && matchesFloor && matchesSearch
  })

  // Get unique values for filters
  const categories = Array.from(new Set(assessments.map(a => a.category)))
  const statuses = Array.from(new Set(assessments.map(a => a.status)))
  const floors = Array.from(new Set(assessments.map(a => a.floor_level)))

  // Calculate statistics
  const stats = {
    total: assessments.length,
    critical: assessments.filter(a => a.status === 'critical').length,
    needsRepair: assessments.filter(a => a.status === 'needs_repair' || a.status === 'needs_replacement').length,
    needsAttention: assessments.filter(a => a.status === 'needs_attention').length,
    good: assessments.filter(a => a.status === 'good').length,
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'assessments', label: 'Detailed Assessments', icon: '📋' },
    { id: 'rooms', label: 'Room Analysis', icon: '🏠' },
    { id: 'maintenance', label: 'Maintenance Plan', icon: '🔧' }
  ]

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading assessments...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Asset Condition Assessment</h1>
              <p className="text-gray-600 dark:text-gray-400">Lagos State General Hospital - Building Assessment Report</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
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
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>New Assessment</span>
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

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Assessment Summary Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Assessment Summary by Category</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categories.map((category) => {
                  const categoryItems = assessments.filter(a => a.category === category)
                  const criticalItems = categoryItems.filter(a => a.status === 'critical').length
                  const repairItems = categoryItems.filter(a => a.status === 'needs_repair' || a.status === 'needs_replacement').length
                  const attentionItems = categoryItems.filter(a => a.status === 'needs_attention').length
                  
                  return (
                    <div key={category} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-2">{getCategoryIcon(category)}</span>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{category}</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Total Items:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{categoryItems.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-red-600">Critical:</span>
                          <span className="font-medium text-red-600">{criticalItems}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-orange-600">Needs Repair:</span>
                          <span className="font-medium text-orange-600">{repairItems}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-yellow-600">Needs Attention:</span>
                          <span className="font-medium text-yellow-600">{attentionItems}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Recent Critical Issues */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Critical Issues Requiring Immediate Attention</h3>
              <div className="space-y-3">
                {assessments.filter(a => a.status === 'critical' || a.priority === 'critical').slice(0, 5).map((assessment) => (
                  <div key={assessment.id} className="flex items-start space-x-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="p-1 bg-red-100 dark:bg-red-900 rounded">
                      <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900 dark:text-white">{assessment.room_name}</h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{assessment.floor_level}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {assessment.category} - {assessment.item_type}: {assessment.damages_defects}
                      </p>
                      <p className="text-sm text-red-600 dark:text-red-400 mt-1 font-medium">
                        {assessment.comments}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'assessments' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search</label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search rooms, items, damages..."
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
                    <option value="all">All Statuses</option>
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
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory('all')
                      setSelectedStatus('all')
                      setSelectedFloor('all')
                    }}
                    className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Assessment List */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Room/Item</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Condition</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Issues</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Recommendations</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Assessor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredAssessments.map((assessment) => (
                      <tr key={assessment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{assessment.room_name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{assessment.item_type} - {assessment.sub_type}</div>
                            <div className="text-xs text-gray-400 dark:text-gray-500">{assessment.floor_level}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-lg mr-2">{getCategoryIcon(assessment.category)}</span>
                            <span className="text-sm text-gray-900 dark:text-white">{assessment.category}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(assessment.status)}`}>
                            {assessment.status.replace('_', ' ').toUpperCase()}
                          </span>
                          <div className={`text-xs font-medium mt-1 ${getPriorityColor(assessment.priority)}`}>
                            {assessment.priority.toUpperCase()} PRIORITY
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          <div>Total: {assessment.total_qty}</div>
                          {assessment.total_qty_not_functioning > 0 && (
                            <div className="text-red-600">Faulty: {assessment.total_qty_not_functioning}</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-white max-w-xs">
                            {assessment.damages_defects && (
                              <div className="text-red-600 font-medium mb-1">{assessment.damages_defects}</div>
                            )}
                            {assessment.damage_dimension && (
                              <div className="text-xs text-gray-500">Damage size: {assessment.damage_dimension}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-white max-w-xs">
                            {assessment.comments}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          <div>{assessment.assessor_name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{assessment.assessment_date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                            <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rooms' && (
          <div className="space-y-6">
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <h3 className="text-lg font-medium">Room Analysis Coming Soon</h3>
                <p className="text-sm">Room-by-room breakdown and floor plan integration</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'maintenance' && (
          <div className="space-y-6">
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="text-lg font-medium">Maintenance Planning Coming Soon</h3>
                <p className="text-sm">Automated maintenance schedules and work orders</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
