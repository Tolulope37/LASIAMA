"use client"

import { useState } from "react"

interface Transfer {
  id: string
  itemCode: string
  itemName: string
  itemCategory: string
  fromLocation: string
  fromType: 'User' | 'Department' | 'Location'
  toLocation: string
  toType: 'User' | 'Department' | 'Location'
  transferDate: string
  requestedBy: string
  approvedBy: string
  status: 'Pending' | 'In Transit' | 'Completed' | 'Cancelled'
  reason: string
  notes: string
  estimatedDelivery: string
}

export default function ItemTransferPage() {
  const [transfers, setTransfers] = useState<Transfer[]>([
    {
      id: '1',
      itemCode: 'LAS-LAP-001',
      itemName: 'Dell Laptop - Inspiron 15',
      itemCategory: 'IT Equipment',
      fromLocation: 'IT Department - Lagos Office',
      fromType: 'Department',
      toLocation: 'John Adebayo',
      toType: 'User',
      transferDate: '15/08/2025',
      requestedBy: 'IT Manager',
      approvedBy: 'Admin User',
      status: 'Completed',
      reason: 'Field Assignment',
      notes: 'Laptop for field work assignments',
      estimatedDelivery: '16/08/2025'
    },
    {
      id: '2',
      itemCode: 'LAS-VEH-003',
      itemName: 'Toyota Hilux - Field Vehicle',
      itemCategory: 'Transportation',
      fromLocation: 'Main Garage - Victoria Island',
      fromType: 'Location',
      toLocation: 'Engineering Department',
      toType: 'Department',
      transferDate: '12/08/2025',
      requestedBy: 'Engineering Manager',
      approvedBy: 'Fleet Manager',
      status: 'In Transit',
      reason: 'Project Assignment',
      notes: 'Vehicle for infrastructure inspection project',
      estimatedDelivery: '13/08/2025'
    },
    {
      id: '3',
      itemCode: 'LAS-MED-015',
      itemName: 'Blood Pressure Monitor',
      itemCategory: 'Medical Equipment',
      fromLocation: 'Medical Store - Ikeja',
      fromType: 'Location',
      toLocation: 'General Hospital - Ward 3',
      toType: 'Location',
      transferDate: '10/08/2025',
      requestedBy: 'Medical Supervisor',
      approvedBy: 'Medical Director',
      status: 'Completed',
      reason: 'Equipment Redistribution',
      notes: 'Patient monitoring equipment for ward',
      estimatedDelivery: '11/08/2025'
    },
    {
      id: '4',
      itemCode: 'LAS-OFF-022',
      itemName: 'Office Chair - Executive',
      itemCategory: 'Office Furniture',
      fromLocation: 'Storage Facility - Apapa',
      fromType: 'Location',
      toLocation: 'Sarah Ogundimu',
      toType: 'User',
      transferDate: '08/08/2025',
      requestedBy: 'HR Manager',
      approvedBy: 'Admin User',
      status: 'Pending',
      reason: 'Office Setup',
      notes: 'Executive office furniture setup',
      estimatedDelivery: '10/08/2025'
    },
    {
      id: '5',
      itemCode: 'LAS-TAB-008',
      itemName: 'Samsung Galaxy Tab',
      itemCategory: 'IT Equipment',
      fromLocation: 'Ibrahim Musa',
      fromType: 'User',
      toLocation: 'IT Department - Lagos Office',
      toType: 'Department',
      transferDate: '05/08/2025',
      requestedBy: 'IT Manager',
      approvedBy: 'IT Manager',
      status: 'In Transit',
      reason: 'Return to Pool',
      notes: 'Returning tablet to equipment pool',
      estimatedDelivery: '06/08/2025'
    }
  ])

  const [showTransferModal, setShowTransferModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedTransfer, setSelectedTransfer] = useState<Transfer | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')

  const [newTransfer, setNewTransfer] = useState({
    itemCode: '',
    itemName: '',
    itemCategory: '',
    fromLocation: '',
    fromType: 'Department' as Transfer['fromType'],
    toLocation: '',
    toType: 'Department' as Transfer['toType'],
    reason: '',
    notes: '',
    estimatedDelivery: ''
  })

  const availableItems = [
    { code: 'LAS-LAP-002', name: 'HP Laptop - ProBook', category: 'IT Equipment' },
    { code: 'LAS-VEH-004', name: 'Honda Civic - Admin Vehicle', category: 'Transportation' },
    { code: 'LAS-MED-016', name: 'Stethoscope', category: 'Medical Equipment' },
    { code: 'LAS-OFF-023', name: 'Standing Desk', category: 'Office Furniture' },
    { code: 'LAS-TAB-009', name: 'iPad Pro', category: 'IT Equipment' },
    { code: 'LAS-PRI-010', name: 'Canon Printer - LaserJet', category: 'Office Equipment' }
  ]

  const filteredTransfers = transfers.filter(transfer => {
    const matchesSearch = transfer.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transfer.itemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transfer.fromLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transfer.toLocation.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'All' || transfer.status === statusFilter
    const matchesType = typeFilter === 'All' || transfer.fromType === typeFilter || transfer.toType === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const handleTransferItem = () => {
    if (!newTransfer.itemCode || !newTransfer.fromLocation || !newTransfer.toLocation) return

    const selectedItem = availableItems.find(item => item.code === newTransfer.itemCode)
    if (!selectedItem) return

    const transfer: Transfer = {
      id: (transfers.length + 1).toString(),
      itemCode: newTransfer.itemCode,
      itemName: selectedItem.name,
      itemCategory: selectedItem.category,
      fromLocation: newTransfer.fromLocation,
      fromType: newTransfer.fromType,
      toLocation: newTransfer.toLocation,
      toType: newTransfer.toType,
      transferDate: new Date().toLocaleDateString('en-GB'),
      requestedBy: 'Admin User',
      approvedBy: 'Pending Approval',
      status: 'Pending',
      reason: newTransfer.reason,
      notes: newTransfer.notes,
      estimatedDelivery: newTransfer.estimatedDelivery
    }

    setTransfers(prev => [...prev, transfer])
    setShowTransferModal(false)
    setNewTransfer({
      itemCode: '',
      itemName: '',
      itemCategory: '',
      fromLocation: '',
      fromType: 'Department',
      toLocation: '',
      toType: 'Department',
      reason: '',
      notes: '',
      estimatedDelivery: ''
    })
  }

  const handleUpdateStatus = (id: string, newStatus: Transfer['status']) => {
    if (confirm(`Update transfer status to ${newStatus}?`)) {
      setTransfers(prev => prev.map(transfer =>
        transfer.id === id
          ? { ...transfer, status: newStatus }
          : transfer
      ))
    }
  }

  const handleViewDetails = (transfer: Transfer) => {
    setSelectedTransfer(transfer)
    setShowDetailsModal(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'In Transit': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        )
      case 'Location':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0z" />
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Item Transfer</h1>
            <p className="text-gray-600 dark:text-gray-400">Transfer items between locations, users, or departments</p>
          </div>
          <button
            onClick={() => setShowTransferModal(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <span>Transfer Item</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search transfers..."
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
                <option value="Pending">Pending</option>
                <option value="In Transit">In Transit</option>
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
                <option value="User">Users</option>
                <option value="Department">Departments</option>
                <option value="Location">Locations</option>
              </select>
            </div>
          </div>
        </div>

        {/* Transfers Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    From
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Transfer Date
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
                {filteredTransfers.map((transfer) => (
                  <tr key={transfer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {transfer.itemName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {transfer.itemCode} • {transfer.itemCategory}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(transfer.fromType)}
                        <div>
                          <div className="text-sm text-gray-900 dark:text-white">{transfer.fromLocation}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{transfer.fromType}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(transfer.toType)}
                        <div>
                          <div className="text-sm text-gray-900 dark:text-white">{transfer.toLocation}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{transfer.toType}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{transfer.transferDate}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        ETA: {transfer.estimatedDelivery}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transfer.status)}`}>
                        {transfer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(transfer)}
                          className="text-orange-600 hover:text-orange-900 dark:text-orange-400 dark:hover:text-orange-300"
                        >
                          View
                        </button>
                        {transfer.status === 'Pending' && (
                          <button
                            onClick={() => handleUpdateStatus(transfer.id, 'In Transit')}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            Start
                          </button>
                        )}
                        {transfer.status === 'In Transit' && (
                          <button
                            onClick={() => handleUpdateStatus(transfer.id, 'Completed')}
                            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                          >
                            Complete
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
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{transfers.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Transfers</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-yellow-600">{transfers.filter(t => t.status === 'Pending').length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-blue-600">{transfers.filter(t => t.status === 'In Transit').length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">In Transit</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-green-600">{transfers.filter(t => t.status === 'Completed').length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
          </div>
        </div>
      </div>

      {/* Transfer Item Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Transfer Item</h3>
              <button
                onClick={() => setShowTransferModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Item *
                </label>
                <select
                  value={newTransfer.itemCode}
                  onChange={(e) => setNewTransfer(prev => ({ ...prev, itemCode: e.target.value }))}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    From Location *
                  </label>
                  <input
                    type="text"
                    value={newTransfer.fromLocation}
                    onChange={(e) => setNewTransfer(prev => ({ ...prev, fromLocation: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter source location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    From Type
                  </label>
                  <select
                    value={newTransfer.fromType}
                    onChange={(e) => setNewTransfer(prev => ({ ...prev, fromType: e.target.value as Transfer['fromType'] }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="User">User</option>
                    <option value="Department">Department</option>
                    <option value="Location">Location</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    To Location *
                  </label>
                  <input
                    type="text"
                    value={newTransfer.toLocation}
                    onChange={(e) => setNewTransfer(prev => ({ ...prev, toLocation: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter destination location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    To Type
                  </label>
                  <select
                    value={newTransfer.toType}
                    onChange={(e) => setNewTransfer(prev => ({ ...prev, toType: e.target.value as Transfer['toType'] }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="User">User</option>
                    <option value="Department">Department</option>
                    <option value="Location">Location</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Transfer Reason *
                  </label>
                  <input
                    type="text"
                    value={newTransfer.reason}
                    onChange={(e) => setNewTransfer(prev => ({ ...prev, reason: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter reason for transfer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Estimated Delivery
                  </label>
                  <input
                    type="date"
                    value={newTransfer.estimatedDelivery}
                    onChange={(e) => setNewTransfer(prev => ({ ...prev, estimatedDelivery: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Notes
                </label>
                <textarea
                  value={newTransfer.notes}
                  onChange={(e) => setNewTransfer(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Additional transfer notes or instructions"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowTransferModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTransferItem}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                >
                  Create Transfer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transfer Details Modal */}
      {showDetailsModal && selectedTransfer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Transfer Details</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Item Information */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Item Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Item Code:</span>
                    <div className="font-medium text-gray-900 dark:text-white">{selectedTransfer.itemCode}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Item Name:</span>
                    <div className="font-medium text-gray-900 dark:text-white">{selectedTransfer.itemName}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Category:</span>
                    <div className="font-medium text-gray-900 dark:text-white">{selectedTransfer.itemCategory}</div>
                  </div>
                </div>
              </div>

              {/* Transfer Details */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Transfer Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      {getTypeIcon(selectedTransfer.fromType)}
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">From:</span>
                    </div>
                    <div className="font-medium text-gray-900 dark:text-white">{selectedTransfer.fromLocation}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{selectedTransfer.fromType}</div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      {getTypeIcon(selectedTransfer.toType)}
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">To:</span>
                    </div>
                    <div className="font-medium text-gray-900 dark:text-white">{selectedTransfer.toLocation}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{selectedTransfer.toType}</div>
                  </div>
                </div>
              </div>

              {/* Transfer Information */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Transfer Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Transfer Date:</span>
                    <div className="font-medium text-gray-900 dark:text-white">{selectedTransfer.transferDate}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Estimated Delivery:</span>
                    <div className="font-medium text-gray-900 dark:text-white">{selectedTransfer.estimatedDelivery}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Requested By:</span>
                    <div className="font-medium text-gray-900 dark:text-white">{selectedTransfer.requestedBy}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Approved By:</span>
                    <div className="font-medium text-gray-900 dark:text-white">{selectedTransfer.approvedBy}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                    <div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedTransfer.status)}`}>
                        {selectedTransfer.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Reason:</span>
                    <div className="font-medium text-gray-900 dark:text-white">{selectedTransfer.reason}</div>
                  </div>
                </div>
              </div>

              {selectedTransfer.notes && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Notes</h4>
                  <p className="text-gray-600 dark:text-gray-400">{selectedTransfer.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
