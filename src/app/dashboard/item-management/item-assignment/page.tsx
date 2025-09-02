"use client"

import { useState } from "react"

interface Assignment {
  id: string
  itemCode: string
  itemName: string
  itemCategory: string
  assignedTo: string
  assignedToType: 'User' | 'Department' | 'Location'
  assignedBy: string
  assignmentDate: string
  dueDate: string
  status: 'Active' | 'Returned' | 'Overdue' | 'Lost'
  condition: 'Excellent' | 'Good' | 'Fair' | 'Poor'
  notes: string
}

export default function ItemAssignmentPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: '1',
      itemCode: 'LAS-LAP-001',
      itemName: 'Dell Laptop - Inspiron 15',
      itemCategory: 'IT Equipment',
      assignedTo: 'John Adebayo',
      assignedToType: 'User',
      assignedBy: 'Admin User',
      assignmentDate: '15/08/2025',
      dueDate: '15/02/2026',
      status: 'Active',
      condition: 'Excellent',
      notes: 'For field work assignments'
    },
    {
      id: '2',
      itemCode: 'LAS-VEH-003',
      itemName: 'Toyota Hilux - Field Vehicle',
      itemCategory: 'Transportation',
      assignedTo: 'Engineering Department',
      assignedToType: 'Department',
      assignedBy: 'Fleet Manager',
      assignmentDate: '12/08/2025',
      dueDate: '12/11/2025',
      status: 'Active',
      condition: 'Good',
      notes: 'Infrastructure inspection vehicle'
    },
    {
      id: '3',
      itemCode: 'LAS-MED-015',
      itemName: 'Blood Pressure Monitor',
      itemCategory: 'Medical Equipment',
      assignedTo: 'General Hospital - Ward 3',
      assignedToType: 'Location',
      assignedBy: 'Medical Supervisor',
      assignmentDate: '10/08/2025',
      dueDate: '10/08/2026',
      status: 'Active',
      condition: 'Excellent',
      notes: 'Patient monitoring equipment'
    },
    {
      id: '4',
      itemCode: 'LAS-OFF-022',
      itemName: 'Office Chair - Executive',
      itemCategory: 'Office Furniture',
      assignedTo: 'Sarah Ogundimu',
      assignedToType: 'User',
      assignedBy: 'HR Manager',
      assignmentDate: '08/08/2025',
      dueDate: '08/08/2027',
      status: 'Active',
      condition: 'Good',
      notes: 'Executive office setup'
    },
    {
      id: '5',
      itemCode: 'LAS-TAB-008',
      itemName: 'Samsung Galaxy Tab',
      itemCategory: 'IT Equipment',
      assignedTo: 'Ibrahim Musa',
      assignedToType: 'User',
      assignedBy: 'IT Manager',
      assignmentDate: '05/08/2025',
      dueDate: '05/07/2025',
      status: 'Overdue',
      condition: 'Good',
      notes: 'Mobile data collection'
    }
  ])

  const [showAssignModal, setShowAssignModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')

  const [newAssignment, setNewAssignment] = useState({
    itemCode: '',
    itemName: '',
    itemCategory: '',
    assignedTo: '',
    assignedToType: 'User' as Assignment['assignedToType'],
    dueDate: '',
    condition: 'Excellent' as Assignment['condition'],
    notes: ''
  })

  const availableItems = [
    { code: 'LAS-LAP-002', name: 'HP Laptop - ProBook', category: 'IT Equipment' },
    { code: 'LAS-VEH-004', name: 'Honda Civic - Admin Vehicle', category: 'Transportation' },
    { code: 'LAS-MED-016', name: 'Stethoscope', category: 'Medical Equipment' },
    { code: 'LAS-OFF-023', name: 'Standing Desk', category: 'Office Furniture' },
    { code: 'LAS-TAB-009', name: 'iPad Pro', category: 'IT Equipment' }
  ]

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         assignment.itemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         assignment.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'All' || assignment.status === statusFilter
    const matchesType = typeFilter === 'All' || assignment.assignedToType === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const handleAssignItem = () => {
    if (!newAssignment.itemCode || !newAssignment.assignedTo) return

    const selectedItem = availableItems.find(item => item.code === newAssignment.itemCode)
    if (!selectedItem) return

    const assignment: Assignment = {
      id: (assignments.length + 1).toString(),
      itemCode: newAssignment.itemCode,
      itemName: selectedItem.name,
      itemCategory: selectedItem.category,
      assignedTo: newAssignment.assignedTo,
      assignedToType: newAssignment.assignedToType,
      assignedBy: 'Admin User',
      assignmentDate: new Date().toLocaleDateString('en-GB'),
      dueDate: newAssignment.dueDate,
      status: 'Active',
      condition: newAssignment.condition,
      notes: newAssignment.notes
    }

    setAssignments(prev => [...prev, assignment])
    setShowAssignModal(false)
    setNewAssignment({
      itemCode: '',
      itemName: '',
      itemCategory: '',
      assignedTo: '',
      assignedToType: 'User',
      dueDate: '',
      condition: 'Excellent',
      notes: ''
    })
  }

  const handleReturnItem = (id: string) => {
    if (confirm('Mark this item as returned?')) {
      setAssignments(prev => prev.map(assignment =>
        assignment.id === id
          ? { ...assignment, status: 'Returned' as Assignment['status'] }
          : assignment
      ))
    }
  }

  const handleViewDetails = (assignment: Assignment) => {
    setSelectedAssignment(assignment)
    setShowDetailsModal(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Returned': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Overdue': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'Lost': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'User':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )
      case 'Department':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        )
      case 'Location':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Item Assignment</h1>
            <p className="text-gray-600 dark:text-gray-400">Assign items to users, departments, or locations</p>
          </div>
          <button
            onClick={() => setShowAssignModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Assign Item</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search assignments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Returned">Returned</option>
                <option value="Overdue">Overdue</option>
                <option value="Lost">Lost</option>
              </select>
            </div>
            <div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="All">All Types</option>
                <option value="User">Users</option>
                <option value="Department">Departments</option>
                <option value="Location">Locations</option>
              </select>
            </div>
          </div>
        </div>

        {/* Assignments Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Assignment Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredAssignments.map((assignment) => (
                  <tr key={assignment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div className="flex items-start">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {assignment.itemName}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {assignment.itemCode} • {assignment.itemCategory}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(assignment.assignedToType)}
                        <div>
                          <div className="text-sm text-gray-900 dark:text-white">{assignment.assignedTo}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{assignment.assignedToType}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {assignment.assignmentDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {assignment.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(assignment.status)}`}>
                        {assignment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(assignment)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          View
                        </button>
                        {assignment.status === 'Active' && (
                          <button
                            onClick={() => handleReturnItem(assignment.id)}
                            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                          >
                            Return
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{assignments.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Assignments</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-green-600">{assignments.filter(a => a.status === 'Active').length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-red-600">{assignments.filter(a => a.status === 'Overdue').length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Overdue</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-blue-600">{assignments.filter(a => a.status === 'Returned').length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Returned</div>
          </div>
        </div>
      </div>

      {/* Assign Item Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Assign Item</h3>
              <button
                onClick={() => setShowAssignModal(false)}
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
                    Select Item *
                  </label>
                  <select
                    value={newAssignment.itemCode}
                    onChange={(e) => setNewAssignment(prev => ({ ...prev, itemCode: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Select an item...</option>
                    {availableItems.map(item => (
                      <option key={item.code} value={item.code}>
                        {item.code} - {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Assignment Type
                  </label>
                  <select
                    value={newAssignment.assignedToType}
                    onChange={(e) => setNewAssignment(prev => ({ ...prev, assignedToType: e.target.value as Assignment['assignedToType'] }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="User">User</option>
                    <option value="Department">Department</option>
                    <option value="Location">Location</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Assign To *
                </label>
                <input
                  type="text"
                  value={newAssignment.assignedTo}
                  onChange={(e) => setNewAssignment(prev => ({ ...prev, assignedTo: e.target.value }))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter name, department, or location"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Condition
                  </label>
                  <select
                    value={newAssignment.condition}
                    onChange={(e) => setNewAssignment(prev => ({ ...prev, condition: e.target.value as Assignment['condition'] }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Notes
                </label>
                <textarea
                  value={newAssignment.notes}
                  onChange={(e) => setNewAssignment(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Assignment notes or special instructions"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssignItem}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  Assign Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assignment Details Modal */}
      {showDetailsModal && selectedAssignment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Assignment Details</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Item Information</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Item Code:</span>
                      <div className="font-medium text-gray-900 dark:text-white">{selectedAssignment.itemCode}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Item Name:</span>
                      <div className="font-medium text-gray-900 dark:text-white">{selectedAssignment.itemName}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Category:</span>
                      <div className="font-medium text-gray-900 dark:text-white">{selectedAssignment.itemCategory}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Assignment Details</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Assigned To:</span>
                      <div className="font-medium text-gray-900 dark:text-white">{selectedAssignment.assignedTo}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Assignment Type:</span>
                      <div className="font-medium text-gray-900 dark:text-white">{selectedAssignment.assignedToType}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Assigned By:</span>
                      <div className="font-medium text-gray-900 dark:text-white">{selectedAssignment.assignedBy}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Assignment Date:</span>
                      <div className="font-medium text-gray-900 dark:text-white">{selectedAssignment.assignmentDate}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Due Date:</span>
                      <div className="font-medium text-gray-900 dark:text-white">{selectedAssignment.dueDate}</div>
                    </div>
                  </div>
                </div>
              </div>

              {selectedAssignment.notes && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Notes</h4>
                  <p className="text-gray-600 dark:text-gray-400">{selectedAssignment.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
