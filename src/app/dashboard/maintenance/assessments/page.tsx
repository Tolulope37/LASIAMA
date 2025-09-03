"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface MaintenanceTask {
  id: string
  title: string
  description: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  status: 'pending' | 'in_progress' | 'completed' | 'on_hold'
  category: 'STRUCTURAL' | 'ELECTRICAL' | 'MECHANICAL'
  location: string
  floor: string
  estimatedCost: number
  estimatedDuration: string
  assignedTo: string
  dueDate: string
  createdFrom: string // Assessment ID
  materials: string[]
  notes: string
}

export default function MaintenanceAssessmentsPage() {
  const router = useRouter()
  
  // Sample maintenance tasks generated from assessments
  const [tasks, setTasks] = useState<MaintenanceTask[]>([
    {
      id: 'task_1',
      title: 'Complete Toilet Replacement - Block F',
      description: 'Replace entire toilet system including 5 water closets, taps, sinks, and connectors',
      priority: 'critical',
      status: 'pending',
      category: 'MECHANICAL',
      location: 'GENERAL TOILET MALE(BLOCK F)',
      floor: 'GROUND FLOOR',
      estimatedCost: 850000,
      estimatedDuration: '5-7 days',
      assignedTo: 'ATUGEGE S.E',
      dueDate: '2025-09-15',
      createdFrom: 'assessment_4',
      materials: ['Water closets (5 units)', 'Toilet tanks (5 units)', 'Taps (5 units)', 'Sinks (5 units)', 'Connectors', 'Plumbing fittings'],
      notes: 'Critical priority - toilet completely unusable. Requires immediate attention.'
    },
    {
      id: 'task_2',
      title: 'Replace Lighting Fixtures - ICT Room',
      description: 'Replace 2 non-functioning 18W round surface panel lighting fittings',
      priority: 'high',
      status: 'pending',
      category: 'ELECTRICAL',
      location: 'ICT ROOM(BLOCK A)',
      floor: 'FIRST FLOOR',
      estimatedCost: 45000,
      estimatedDuration: '1-2 days',
      assignedTo: 'OJERINDE ADEYEMI',
      dueDate: '2025-09-10',
      createdFrom: 'assessment_3',
      materials: ['18W round surface panel lights (2 units)', 'Electrical wiring', 'Switches'],
      notes: 'Affects ICT room functionality. Should be completed before next term.'
    },
    {
      id: 'task_3',
      title: 'Wall Repair and Painting - VP Academic Office',
      description: 'Repair cracked walls and repaint VP Academic 2 office',
      priority: 'high',
      status: 'pending',
      category: 'STRUCTURAL',
      location: 'V.P ACADEMICS 2/TOILET(BLOCK A)',
      floor: 'FIRST FLOOR',
      estimatedCost: 75000,
      estimatedDuration: '3-4 days',
      assignedTo: 'EDOGA JAMES C',
      dueDate: '2025-09-20',
      createdFrom: 'assessment_2',
      materials: ['Cement', 'Paint', 'Primer', 'Brushes', 'Sandpaper'],
      notes: 'Wall cracks affecting structural integrity. Door handle also needs replacement.'
    },
    {
      id: 'task_4',
      title: 'Floor Rail Replacement - Corridor Block A',
      description: 'Replace all damaged rails in corridor to classroom Block A',
      priority: 'medium',
      status: 'pending',
      category: 'STRUCTURAL',
      location: 'CORRIDOR TO CLASSROOM(BLOCK A)',
      floor: 'FIRST FLOOR',
      estimatedCost: 120000,
      estimatedDuration: '2-3 days',
      assignedTo: 'EDOGA JAMES C',
      dueDate: '2025-09-25',
      createdFrom: 'assessment_1',
      materials: ['Metal rails', 'Mounting brackets', 'Screws', 'Paint'],
      notes: 'Safety concern for student movement. Schedule during break time.'
    }
  ])

  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  // Modal states
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false)
  const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false)
  const [showEditTaskModal, setShowEditTaskModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState<MaintenanceTask | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success')
  
  // New task form
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as MaintenanceTask['priority'],
    category: 'STRUCTURAL' as MaintenanceTask['category'],
    location: '',
    floor: '',
    estimatedCost: '',
    estimatedDuration: '',
    assignedTo: '',
    dueDate: '',
    materials: '',
    notes: ''
  })

  const getPriorityColor = (priority: MaintenanceTask['priority']) => {
    switch (priority) {
      case 'critical': return 'text-red-800 bg-red-200 border-red-300'
      case 'high': return 'text-orange-800 bg-orange-200 border-orange-300'
      case 'medium': return 'text-yellow-800 bg-yellow-200 border-yellow-300'
      case 'low': return 'text-green-800 bg-green-200 border-green-300'
      default: return 'text-gray-800 bg-gray-200 border-gray-300'
    }
  }

  const getStatusColor = (status: MaintenanceTask['status']) => {
    switch (status) {
      case 'pending': return 'text-gray-600 bg-gray-100'
      case 'in_progress': return 'text-blue-600 bg-blue-100'
      case 'completed': return 'text-green-600 bg-green-100'
      case 'on_hold': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getCategoryIcon = (category: MaintenanceTask['category']) => {
    switch (category) {
      case 'STRUCTURAL': return '🏗️'
      case 'ELECTRICAL': return '⚡'
      case 'MECHANICAL': return '🔧'
      default: return '📋'
    }
  }

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus
    const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory
    return matchesStatus && matchesPriority && matchesCategory
  })

  const stats = {
    total: tasks.length,
    critical: tasks.filter(t => t.priority === 'critical').length,
    high: tasks.filter(t => t.priority === 'high').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    totalCost: tasks.reduce((sum, t) => sum + t.estimatedCost, 0)
  }

  // Toast notification function
  const showToastNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage(message)
    setToastType(type)
    setShowToast(true)
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setShowToast(false)
    }, 3000)
  }

  // Button handlers
  const handleCreateTask = () => {
    setShowCreateTaskModal(true)
  }

  const handleExportPlan = () => {
    // Create CSV content
    const headers = ['Title', 'Priority', 'Status', 'Category', 'Location', 'Estimated Cost', 'Duration', 'Assigned To', 'Due Date']
    const csvContent = [
      headers.join(','),
      ...filteredTasks.map(task => [
        `"${task.title}"`,
        task.priority,
        task.status,
        task.category,
        `"${task.location}"`,
        task.estimatedCost,
        `"${task.estimatedDuration}"`,
        `"${task.assignedTo}"`,
        task.dueDate
      ].join(','))
    ].join('\n')
    
    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'maintenance-plan.csv'
    a.click()
    window.URL.revokeObjectURL(url)
    
    // Show success notification
    showToastNotification(`Maintenance plan exported successfully! (${filteredTasks.length} tasks)`, 'success')
  }

  const handleEditTask = (task: MaintenanceTask) => {
    setSelectedTask(task)
    setNewTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
      category: task.category,
      location: task.location,
      floor: task.floor,
      estimatedCost: task.estimatedCost.toString(),
      estimatedDuration: task.estimatedDuration,
      assignedTo: task.assignedTo,
      dueDate: task.dueDate,
      materials: task.materials.join(', '),
      notes: task.notes
    })
    setShowEditTaskModal(true)
  }

  const handleStartWork = (task: MaintenanceTask) => {
    const updatedTasks = tasks.map(t => 
      t.id === task.id 
        ? { ...t, status: 'in_progress' as MaintenanceTask['status'] }
        : t
    )
    setTasks(updatedTasks)
    
    // Show success notification
    showToastNotification(`Work started on: ${task.title}`, 'success')
  }

  const handleCompleteWork = (task: MaintenanceTask) => {
    const updatedTasks = tasks.map(t => 
      t.id === task.id 
        ? { ...t, status: 'completed' as MaintenanceTask['status'] }
        : t
    )
    setTasks(updatedTasks)
    
    // Show success notification
    showToastNotification(`Task completed: ${task.title}`, 'success')
  }

  const handleViewDetails = (task: MaintenanceTask) => {
    setSelectedTask(task)
    setShowTaskDetailsModal(true)
  }

  const handleSaveTask = () => {
    if (selectedTask) {
      // Update existing task
      const updatedTasks = tasks.map(t => 
        t.id === selectedTask.id 
          ? {
              ...t,
              title: newTask.title,
              description: newTask.description,
              priority: newTask.priority,
              category: newTask.category,
              location: newTask.location,
              floor: newTask.floor,
              estimatedCost: parseInt(newTask.estimatedCost) || 0,
              estimatedDuration: newTask.estimatedDuration,
              assignedTo: newTask.assignedTo,
              dueDate: newTask.dueDate,
              materials: newTask.materials.split(',').map(m => m.trim()),
              notes: newTask.notes
            }
          : t
      )
      setTasks(updatedTasks)
      showToastNotification(`Task "${newTask.title}" updated successfully!`, 'success')
    } else {
      // Create new task
      const task: MaintenanceTask = {
        id: `task_${Date.now()}`,
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        status: 'pending',
        category: newTask.category,
        location: newTask.location,
        floor: newTask.floor,
        estimatedCost: parseInt(newTask.estimatedCost) || 0,
        estimatedDuration: newTask.estimatedDuration,
        assignedTo: newTask.assignedTo,
        dueDate: newTask.dueDate,
        createdFrom: 'manual',
        materials: newTask.materials.split(',').map(m => m.trim()),
        notes: newTask.notes
      }
      setTasks([...tasks, task])
      showToastNotification(`New task "${newTask.title}" created successfully!`, 'success')
    }
    
    // Reset form and close modal
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      category: 'STRUCTURAL',
      location: '',
      floor: '',
      estimatedCost: '',
      estimatedDuration: '',
      assignedTo: '',
      dueDate: '',
      materials: '',
      notes: ''
    })
    setSelectedTask(null)
    setShowCreateTaskModal(false)
    setShowEditTaskModal(false)
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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Maintenance Tasks from Assessments</h1>
              <p className="text-gray-600 dark:text-gray-400">Generated maintenance work orders based on condition assessments</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleCreateTask}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Create Task</span>
            </button>
            <button 
              onClick={handleExportPlan}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Export Plan</span>
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</p>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">High Priority</p>
                <p className="text-2xl font-bold text-orange-600">{stats.high}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-gray-600">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Cost</p>
                <p className="text-lg font-bold text-green-600">₦{stats.totalCost.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on_hold">On Hold</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="STRUCTURAL">Structural</option>
                <option value="ELECTRICAL">Electrical</option>
                <option value="MECHANICAL">Mechanical</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedStatus('all')
                  setSelectedPriority('all')
                  setSelectedCategory('all')
                }}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div key={task.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{getCategoryIcon(task.category)}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{task.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{task.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">📍 {task.location}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">🏢 {task.floor}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">👤 {task.assignedTo}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(task.priority)}`}>
                    {task.priority.toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                    {task.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Estimated Cost</div>
                  <div className="text-lg font-bold text-green-600">₦{task.estimatedCost.toLocaleString()}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Duration</div>
                  <div className="text-lg font-bold text-blue-600">{task.estimatedDuration}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Due Date</div>
                  <div className="text-lg font-bold text-orange-600">{task.dueDate}</div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Required Materials:</h4>
                <div className="flex flex-wrap gap-2">
                  {task.materials.map((material, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>

              {task.notes && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Notes:</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    {task.notes}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Generated from assessment: {task.createdFrom}
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleEditTask(task)}
                    className="px-3 py-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 rounded text-sm font-medium transition-colors"
                  >
                    Edit Task
                  </button>
                  
                  {task.status === 'pending' ? (
                    <button 
                      onClick={() => handleStartWork(task)}
                      className="px-3 py-1 bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-green-700 dark:text-green-300 rounded text-sm font-medium transition-colors"
                    >
                      Start Work
                    </button>
                  ) : task.status === 'in_progress' ? (
                    <button 
                      onClick={() => handleCompleteWork(task)}
                      className="px-3 py-1 bg-purple-100 hover:bg-purple-200 dark:bg-purple-900 dark:hover:bg-purple-800 text-purple-700 dark:text-purple-300 rounded text-sm font-medium transition-colors"
                    >
                      Mark Complete
                    </button>
                  ) : task.status === 'completed' ? (
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded text-sm font-medium">
                      ✓ Completed
                    </span>
                  ) : (
                    <button 
                      onClick={() => handleStartWork(task)}
                      className="px-3 py-1 bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900 dark:hover:bg-yellow-800 text-yellow-700 dark:text-yellow-300 rounded text-sm font-medium transition-colors"
                    >
                      Resume Work
                    </button>
                  )}
                  
                  <button 
                    onClick={() => handleViewDetails(task)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded text-sm font-medium transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="text-lg font-medium">No maintenance tasks found</h3>
              <p className="text-sm">Try adjusting your filters or create a new task</p>
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Task Modal */}
      {(showCreateTaskModal || showEditTaskModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {selectedTask ? 'Edit Task' : 'Create New Task'}
              </h3>
              <button 
                onClick={() => {
                  setShowCreateTaskModal(false)
                  setShowEditTaskModal(false)
                  setSelectedTask(null)
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Task title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value as MaintenanceTask['priority']})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Task description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                  <select
                    value={newTask.category}
                    onChange={(e) => setNewTask({...newTask, category: e.target.value as MaintenanceTask['category']})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="STRUCTURAL">Structural</option>
                    <option value="ELECTRICAL">Electrical</option>
                    <option value="MECHANICAL">Mechanical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                  <input
                    type="text"
                    value={newTask.location}
                    onChange={(e) => setNewTask({...newTask, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Location"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Floor</label>
                  <input
                    type="text"
                    value={newTask.floor}
                    onChange={(e) => setNewTask({...newTask, floor: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Floor"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Estimated Cost (₦)</label>
                  <input
                    type="number"
                    value={newTask.estimatedCost}
                    onChange={(e) => setNewTask({...newTask, estimatedCost: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Duration</label>
                  <input
                    type="text"
                    value={newTask.estimatedDuration}
                    onChange={(e) => setNewTask({...newTask, estimatedDuration: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 2-3 days"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Due Date</label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Assigned To</label>
                <input
                  type="text"
                  value={newTask.assignedTo}
                  onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Assignee name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Materials (comma-separated)</label>
                <textarea
                  value={newTask.materials}
                  onChange={(e) => setNewTask({...newTask, materials: e.target.value})}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Material 1, Material 2, Material 3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
                <textarea
                  value={newTask.notes}
                  onChange={(e) => setNewTask({...newTask, notes: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Additional notes"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6">
              <button 
                onClick={() => {
                  setShowCreateTaskModal(false)
                  setShowEditTaskModal(false)
                  setSelectedTask(null)
                }}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveTask}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                {selectedTask ? 'Update Task' : 'Create Task'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Task Details Modal */}
      {showTaskDetailsModal && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Task Details</h3>
              <button 
                onClick={() => setShowTaskDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-lg">{selectedTask.title}</h4>
                <div className="flex items-center space-x-2 mt-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(selectedTask.priority)}`}>
                    {selectedTask.priority.toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedTask.status)}`}>
                    {selectedTask.status.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className="text-2xl">{getCategoryIcon(selectedTask.category)}</span>
                </div>
              </div>

              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">Description</h5>
                <p className="text-gray-600 dark:text-gray-400">{selectedTask.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-1">Location</h5>
                  <p className="text-gray-600 dark:text-gray-400">{selectedTask.location}</p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-1">Floor</h5>
                  <p className="text-gray-600 dark:text-gray-400">{selectedTask.floor}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-1">Estimated Cost</h5>
                  <p className="text-green-600 font-semibold">₦{selectedTask.estimatedCost.toLocaleString()}</p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-1">Duration</h5>
                  <p className="text-blue-600">{selectedTask.estimatedDuration}</p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-1">Due Date</h5>
                  <p className="text-orange-600">{selectedTask.dueDate}</p>
                </div>
              </div>

              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-1">Assigned To</h5>
                <p className="text-gray-600 dark:text-gray-400">{selectedTask.assignedTo}</p>
              </div>

              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">Required Materials</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedTask.materials.map((material, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm">
                      {material}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-1">Notes</h5>
                <p className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">{selectedTask.notes}</p>
              </div>

              <div className="text-sm text-gray-500 dark:text-gray-400">
                Generated from assessment: {selectedTask.createdFrom}
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6">
              <button 
                onClick={() => setShowTaskDetailsModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  setShowTaskDetailsModal(false)
                  handleEditTask(selectedTask)
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Edit Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed top-20 right-6 z-50 transform transition-all duration-300 ${showToast ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
          <div className={`rounded-lg p-4 shadow-lg border-l-4 ${
            toastType === 'success' ? 'bg-green-50 dark:bg-green-900/20 border-green-400 text-green-800 dark:text-green-200' :
            toastType === 'error' ? 'bg-red-50 dark:bg-red-900/20 border-red-400 text-red-800 dark:text-red-200' :
            'bg-blue-50 dark:bg-blue-900/20 border-blue-400 text-blue-800 dark:text-blue-200'
          }`}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {toastType === 'success' && (
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
                {toastType === 'error' && (
                  <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
                {toastType === 'info' && (
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{toastMessage}</p>
              </div>
              <div className="ml-auto pl-3">
                <button
                  onClick={() => setShowToast(false)}
                  className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    toastType === 'success' ? 'text-green-500 hover:bg-green-100 focus:ring-green-600 dark:hover:bg-green-800' :
                    toastType === 'error' ? 'text-red-500 hover:bg-red-100 focus:ring-red-600 dark:hover:bg-red-800' :
                    'text-blue-500 hover:bg-blue-100 focus:ring-blue-600 dark:hover:bg-blue-800'
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
