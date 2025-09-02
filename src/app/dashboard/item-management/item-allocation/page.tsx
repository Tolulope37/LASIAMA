"use client"

import { useState } from "react"

interface Allocation {
  id: string
  itemCode: string
  itemName: string
  itemCategory: string
  allocationType: 'Project' | 'Budget' | 'Cost Center' | 'Department'
  allocationTarget: string
  allocationCode: string
  allocatedBy: string
  allocationDate: string
  budgetAmount: number
  actualCost: number
  percentage: number
  status: 'Active' | 'Completed' | 'Cancelled'
  notes: string
}

export default function ItemAllocationPage() {
  const [allocations, setAllocations] = useState<Allocation[]>([
    {
      id: '1',
      itemCode: 'LAS-INF-001',
      itemName: 'Road Construction Equipment Set',
      itemCategory: 'Infrastructure',
      allocationType: 'Project',
      allocationTarget: 'Lagos-Badagry Expressway Expansion',
      allocationCode: 'PROJ-2025-001',
      allocatedBy: 'Project Manager',
      allocationDate: '15/08/2025',
      budgetAmount: 50000000,
      actualCost: 45000000,
      percentage: 100,
      status: 'Active',
      notes: 'Primary construction equipment for highway expansion'
    },
    {
      id: '2',
      itemCode: 'LAS-MED-020',
      itemName: 'Hospital ICU Equipment',
      itemCategory: 'Medical Equipment',
      allocationType: 'Budget',
      allocationTarget: 'Healthcare Infrastructure Budget 2025',
      allocationCode: 'BUD-HLT-2025',
      allocatedBy: 'Budget Controller',
      allocationDate: '12/08/2025',
      budgetAmount: 25000000,
      actualCost: 23500000,
      percentage: 75,
      status: 'Active',
      notes: 'ICU equipment procurement for general hospitals'
    },
    {
      id: '3',
      itemCode: 'LAS-IT-015',
      itemName: 'Government IT Infrastructure',
      itemCategory: 'IT Equipment',
      allocationType: 'Cost Center',
      allocationTarget: 'IT Services Department',
      allocationCode: 'CC-IT-001',
      allocatedBy: 'IT Director',
      allocationDate: '10/08/2025',
      budgetAmount: 15000000,
      actualCost: 14200000,
      percentage: 90,
      status: 'Completed',
      notes: 'Network infrastructure upgrade project'
    },
    {
      id: '4',
      itemCode: 'LAS-EDU-008',
      itemName: 'School Laboratory Equipment',
      itemCategory: 'Educational Equipment',
      allocationType: 'Department',
      allocationTarget: 'Ministry of Education',
      allocationCode: 'DEPT-EDU-2025',
      allocatedBy: 'Education Secretary',
      allocationDate: '08/08/2025',
      budgetAmount: 8000000,
      actualCost: 7500000,
      percentage: 60,
      status: 'Active',
      notes: 'Science laboratory equipment for secondary schools'
    },
    {
      id: '5',
      itemCode: 'LAS-SEC-003',
      itemName: 'CCTV Monitoring System',
      itemCategory: 'Security Equipment',
      allocationType: 'Project',
      allocationTarget: 'Smart City Security Initiative',
      allocationCode: 'PROJ-SEC-2025',
      allocatedBy: 'Security Coordinator',
      allocationDate: '05/08/2025',
      budgetAmount: 12000000,
      actualCost: 0,
      percentage: 25,
      status: 'Active',
      notes: 'City-wide CCTV surveillance network'
    }
  ])

  const [showAllocateModal, setShowAllocateModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedAllocation, setSelectedAllocation] = useState<Allocation | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')

  const [newAllocation, setNewAllocation] = useState({
    itemCode: '',
    itemName: '',
    itemCategory: '',
    allocationType: 'Project' as Allocation['allocationType'],
    allocationTarget: '',
    allocationCode: '',
    budgetAmount: 0,
    percentage: 100,
    notes: ''
  })

  const availableItems = [
    { code: 'LAS-VEH-005', name: 'Emergency Response Vehicles', category: 'Transportation' },
    { code: 'LAS-MED-021', name: 'Diagnostic Equipment Set', category: 'Medical Equipment' },
    { code: 'LAS-IT-016', name: 'Data Center Infrastructure', category: 'IT Equipment' },
    { code: 'LAS-EDU-009', name: 'Digital Learning Tools', category: 'Educational Equipment' }
  ]

  const filteredAllocations = allocations.filter(allocation => {
    const matchesSearch = allocation.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         allocation.allocationTarget.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         allocation.allocationCode.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'All' || allocation.status === statusFilter
    const matchesType = typeFilter === 'All' || allocation.allocationType === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const handleAllocateItem = () => {
    if (!newAllocation.itemCode || !newAllocation.allocationTarget) return

    const selectedItem = availableItems.find(item => item.code === newAllocation.itemCode)
    if (!selectedItem) return

    const allocation: Allocation = {
      id: (allocations.length + 1).toString(),
      itemCode: newAllocation.itemCode,
      itemName: selectedItem.name,
      itemCategory: selectedItem.category,
      allocationType: newAllocation.allocationType,
      allocationTarget: newAllocation.allocationTarget,
      allocationCode: newAllocation.allocationCode,
      allocatedBy: 'Admin User',
      allocationDate: new Date().toLocaleDateString('en-GB'),
      budgetAmount: newAllocation.budgetAmount,
      actualCost: 0,
      percentage: newAllocation.percentage,
      status: 'Active',
      notes: newAllocation.notes
    }

    setAllocations(prev => [...prev, allocation])
    setShowAllocateModal(false)
    setNewAllocation({
      itemCode: '',
      itemName: '',
      itemCategory: '',
      allocationType: 'Project',
      allocationTarget: '',
      allocationCode: '',
      budgetAmount: 0,
      percentage: 100,
      notes: ''
    })
  }

  const handleViewDetails = (allocation: Allocation) => {
    setSelectedAllocation(allocation)
    setShowDetailsModal(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Project':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        )
      case 'Budget':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'Cost Center':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        )
      case 'Department':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        )
      default:
        return null
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Item Allocation</h1>
            <p className="text-gray-600 dark:text-gray-400">Allocate items to projects, budgets, or cost centers</p>
          </div>
          <button
            onClick={() => setShowAllocateModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Allocate Item</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search allocations..."
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
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="All">All Types</option>
                <option value="Project">Projects</option>
                <option value="Budget">Budgets</option>
                <option value="Cost Center">Cost Centers</option>
                <option value="Department">Departments</option>
              </select>
            </div>
          </div>
        </div>

        {/* Allocations Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Allocation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Progress
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
                {filteredAllocations.map((allocation) => (
                  <tr key={allocation.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {allocation.itemName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {allocation.itemCode} • {allocation.itemCategory}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(allocation.allocationType)}
                        <div>
                          <div className="text-sm text-gray-900 dark:text-white">{allocation.allocationTarget}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {allocation.allocationType} • {allocation.allocationCode}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {formatCurrency(allocation.budgetAmount)}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Spent: {formatCurrency(allocation.actualCost)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full"
                            style={{ width: `${allocation.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{allocation.percentage}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(allocation.status)}`}>
                        {allocation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(allocation)}
                        className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300"
                      >
                        View Details
                      </button>
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
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{allocations.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Allocations</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-green-600">{allocations.filter(a => a.status === 'Active').length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-purple-600">
              {formatCurrency(allocations.reduce((sum, a) => sum + a.budgetAmount, 0))}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Budget</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(allocations.reduce((sum, a) => sum + a.actualCost, 0))}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Spent</div>
          </div>
        </div>
      </div>

      {/* Allocate Item Modal */}
      {showAllocateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Allocate Item</h3>
              <button
                onClick={() => setShowAllocateModal(false)}
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
                    value={newAllocation.itemCode}
                    onChange={(e) => setNewAllocation(prev => ({ ...prev, itemCode: e.target.value }))}
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
                    Allocation Type
                  </label>
                  <select
                    value={newAllocation.allocationType}
                    onChange={(e) => setNewAllocation(prev => ({ ...prev, allocationType: e.target.value as Allocation['allocationType'] }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="Project">Project</option>
                    <option value="Budget">Budget</option>
                    <option value="Cost Center">Cost Center</option>
                    <option value="Department">Department</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Allocation Target *
                  </label>
                  <input
                    type="text"
                    value={newAllocation.allocationTarget}
                    onChange={(e) => setNewAllocation(prev => ({ ...prev, allocationTarget: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter project/budget/department name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Allocation Code
                  </label>
                  <input
                    type="text"
                    value={newAllocation.allocationCode}
                    onChange={(e) => setNewAllocation(prev => ({ ...prev, allocationCode: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter allocation code"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Budget Amount (₦)
                  </label>
                  <input
                    type="number"
                    value={newAllocation.budgetAmount}
                    onChange={(e) => setNewAllocation(prev => ({ ...prev, budgetAmount: Number(e.target.value) }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter budget amount"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Allocation Percentage
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newAllocation.percentage}
                    onChange={(e) => setNewAllocation(prev => ({ ...prev, percentage: Number(e.target.value) }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter percentage"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Notes
                </label>
                <textarea
                  value={newAllocation.notes}
                  onChange={(e) => setNewAllocation(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Allocation notes or purpose"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowAllocateModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAllocateItem}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  Allocate Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Allocation Details Modal */}
      {showDetailsModal && selectedAllocation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Allocation Details</h3>
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
                      <span className="text-sm text-gray-600 dark:text-gray-400">Item:</span>
                      <div className="font-medium text-gray-900 dark:text-white">{selectedAllocation.itemName}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Code:</span>
                      <div className="font-medium text-gray-900 dark:text-white">{selectedAllocation.itemCode}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Category:</span>
                      <div className="font-medium text-gray-900 dark:text-white">{selectedAllocation.itemCategory}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Allocation Details</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Type:</span>
                      <div className="font-medium text-gray-900 dark:text-white">{selectedAllocation.allocationType}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Target:</span>
                      <div className="font-medium text-gray-900 dark:text-white">{selectedAllocation.allocationTarget}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Code:</span>
                      <div className="font-medium text-gray-900 dark:text-white">{selectedAllocation.allocationCode}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Budget Amount:</span>
                  <div className="font-medium text-gray-900 dark:text-white">{formatCurrency(selectedAllocation.budgetAmount)}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Actual Cost:</span>
                  <div className="font-medium text-gray-900 dark:text-white">{formatCurrency(selectedAllocation.actualCost)}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Progress:</span>
                  <div className="font-medium text-gray-900 dark:text-white">{selectedAllocation.percentage}%</div>
                </div>
              </div>

              {selectedAllocation.notes && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Notes</h4>
                  <p className="text-gray-600 dark:text-gray-400">{selectedAllocation.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
