"use client"

import { useState } from "react"

interface Item {
  id: string
  code: string
  name: string
  description: string
  category: string
  unit: string
  manufacturer: string
  model: string
  serialNumber: string
  purchasePrice: number
  currentValue: number
  status: 'Active' | 'Inactive' | 'Retired'
  location: string
  purchaseDate: string
  warrantyExpiry: string
  condition: 'Excellent' | 'Good' | 'Fair' | 'Poor'
  createdDate: string
  createdBy: string
  lastModified: string
  attachments: string[]
}

export default function ItemMasterPage() {
  const [items, setItems] = useState<Item[]>([
    {
      id: '1',
      code: 'LAS-LAP-001',
      name: 'Dell Laptop - Inspiron 15',
      description: 'High-performance laptop for office work',
      category: 'IT Equipment',
      unit: 'Each',
      manufacturer: 'Dell',
      model: 'Inspiron 15 3000',
      serialNumber: 'DL2025001',
      purchasePrice: 450000,
      currentValue: 350000,
      status: 'Active',
      location: 'IT Department - Lagos Office',
      purchaseDate: '15/01/2025',
      warrantyExpiry: '15/01/2027',
      condition: 'Excellent',
      createdDate: '15/08/2025',
      createdBy: 'Admin User',
      lastModified: '15/08/2025',
      attachments: ['warranty.pdf', 'manual.pdf']
    },
    {
      id: '2',
      code: 'LAS-VEH-003',
      name: 'Toyota Hilux - Field Vehicle',
      description: 'Heavy-duty pickup truck for field operations',
      category: 'Transportation',
      unit: 'Each',
      manufacturer: 'Toyota',
      model: 'Hilux 2024',
      serialNumber: 'TY2024003',
      purchasePrice: 15000000,
      currentValue: 13500000,
      status: 'Active',
      location: 'Main Garage - Victoria Island',
      purchaseDate: '10/03/2024',
      warrantyExpiry: '10/03/2027',
      condition: 'Good',
      createdDate: '12/08/2025',
      createdBy: 'Admin User',
      lastModified: '12/08/2025',
      attachments: ['registration.pdf', 'insurance.pdf']
    },
    {
      id: '3',
      code: 'LAS-MED-015',
      name: 'Blood Pressure Monitor',
      description: 'Digital blood pressure monitoring device',
      category: 'Medical Equipment',
      unit: 'Each',
      manufacturer: 'Omron',
      model: 'BP-7200',
      serialNumber: 'OM2025015',
      purchasePrice: 85000,
      currentValue: 70000,
      status: 'Active',
      location: 'General Hospital - Ward 3',
      purchaseDate: '05/02/2025',
      warrantyExpiry: '05/02/2027',
      condition: 'Excellent',
      createdDate: '10/08/2025',
      createdBy: 'Medical Supervisor',
      lastModified: '10/08/2025',
      attachments: ['calibration.pdf']
    },
    {
      id: '4',
      code: 'LAS-OFF-022',
      name: 'Office Chair - Executive',
      description: 'Ergonomic executive office chair',
      category: 'Office Furniture',
      unit: 'Each',
      manufacturer: 'Herman Miller',
      model: 'Aeron Chair',
      serialNumber: 'HM2025022',
      purchasePrice: 320000,
      currentValue: 280000,
      status: 'Active',
      location: 'Executive Office - Lagos',
      purchaseDate: '20/01/2025',
      warrantyExpiry: '20/01/2030',
      condition: 'Good',
      createdDate: '08/08/2025',
      createdBy: 'HR Manager',
      lastModified: '08/08/2025',
      attachments: ['assembly.pdf']
    },
    {
      id: '5',
      code: 'LAS-EDU-008',
      name: 'Interactive Whiteboard',
      description: 'Smart interactive whiteboard for classrooms',
      category: 'Educational Equipment',
      unit: 'Each',
      manufacturer: 'Smart Technologies',
      model: 'SMART Board 7000R',
      serialNumber: 'ST2025008',
      purchasePrice: 850000,
      currentValue: 750000,
      status: 'Active',
      location: 'Government College - Ikeja',
      purchaseDate: '15/02/2025',
      warrantyExpiry: '15/02/2028',
      condition: 'Excellent',
      createdDate: '05/08/2025',
      createdBy: 'Education Coordinator',
      lastModified: '05/08/2025',
      attachments: ['installation.pdf', 'training.pdf']
    }
  ])

  const [showAddModal, setShowAddModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [editingItem, setEditingItem] = useState<Item | null>(null)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  const [newItem, setNewItem] = useState({
    code: '',
    name: '',
    description: '',
    category: '',
    unit: 'Each',
    manufacturer: '',
    model: '',
    serialNumber: '',
    purchasePrice: 0,
    currentValue: 0,
    status: 'Active' as Item['status'],
    location: '',
    purchaseDate: '',
    warrantyExpiry: '',
    condition: 'Excellent' as Item['condition']
  })

  const categories = ['IT Equipment', 'Transportation', 'Medical Equipment', 'Office Furniture', 'Educational Equipment', 'Security Equipment']
  const units = ['Each', 'Set', 'Pair', 'Dozen', 'Box', 'Package']

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.model.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleAddItem = () => {
    if (!newItem.code || !newItem.name || !newItem.category) return

    const item: Item = {
      id: (items.length + 1).toString(),
      code: newItem.code.toUpperCase(),
      name: newItem.name,
      description: newItem.description,
      category: newItem.category,
      unit: newItem.unit,
      manufacturer: newItem.manufacturer,
      model: newItem.model,
      serialNumber: newItem.serialNumber,
      purchasePrice: newItem.purchasePrice,
      currentValue: newItem.currentValue || newItem.purchasePrice,
      status: newItem.status,
      location: newItem.location,
      purchaseDate: newItem.purchaseDate,
      warrantyExpiry: newItem.warrantyExpiry,
      condition: newItem.condition,
      createdDate: new Date().toLocaleDateString('en-GB'),
      createdBy: 'Admin User',
      lastModified: new Date().toLocaleDateString('en-GB'),
      attachments: []
    }

    setItems(prev => [...prev, item])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditItem = (item: Item) => {
    setEditingItem(item)
    setNewItem({
      code: item.code,
      name: item.name,
      description: item.description,
      category: item.category,
      unit: item.unit,
      manufacturer: item.manufacturer,
      model: item.model,
      serialNumber: item.serialNumber,
      purchasePrice: item.purchasePrice,
      currentValue: item.currentValue,
      status: item.status,
      location: item.location,
      purchaseDate: item.purchaseDate,
      warrantyExpiry: item.warrantyExpiry,
      condition: item.condition
    })
    setShowAddModal(true)
  }

  const handleUpdateItem = () => {
    if (!editingItem || !newItem.code || !newItem.name || !newItem.category) return

    setItems(prev => prev.map(item => 
      item.id === editingItem.id 
        ? {
            ...item,
            code: newItem.code.toUpperCase(),
            name: newItem.name,
            description: newItem.description,
            category: newItem.category,
            unit: newItem.unit,
            manufacturer: newItem.manufacturer,
            model: newItem.model,
            serialNumber: newItem.serialNumber,
            purchasePrice: newItem.purchasePrice,
            currentValue: newItem.currentValue,
            status: newItem.status,
            location: newItem.location,
            purchaseDate: newItem.purchaseDate,
            warrantyExpiry: newItem.warrantyExpiry,
            condition: newItem.condition,
            lastModified: new Date().toLocaleDateString('en-GB')
          }
        : item
    ))

    setShowAddModal(false)
    setEditingItem(null)
    resetForm()
  }

  const handleDeleteItem = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setItems(prev => prev.filter(item => item.id !== id))
    }
  }

  const handleViewDetails = (item: Item) => {
    setSelectedItem(item)
    setShowDetailsModal(true)
  }

  const resetForm = () => {
    setNewItem({
      code: '',
      name: '',
      description: '',
      category: '',
      unit: 'Each',
      manufacturer: '',
      model: '',
      serialNumber: '',
      purchasePrice: 0,
      currentValue: 0,
      status: 'Active',
      location: '',
      purchaseDate: '',
      warrantyExpiry: '',
      condition: 'Excellent'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Inactive': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Retired': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Excellent': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Good': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Fair': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Poor': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Item Master</h1>
            <p className="text-gray-600 dark:text-gray-400">Register items (name, code, attributes), link to category/unit; attach documents</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Item</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="All">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Retired">Retired</option>
              </select>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Manufacturer/Model
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Condition
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {item.code}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{item.category}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{item.unit}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">{item.manufacturer}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{item.model}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{formatCurrency(item.currentValue)}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Purchase: {formatCurrency(item.purchasePrice)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getConditionColor(item.condition)}`}>
                        {item.condition}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(item)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleEditItem(item)}
                          className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Delete
                        </button>
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
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{items.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Items</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-green-600">{items.filter(i => i.status === 'Active').length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Items</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(items.reduce((sum, i) => sum + i.currentValue, 0))}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Value</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-purple-600">{categories.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
          </div>
        </div>
      </div>

      {/* Add/Edit Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {editingItem ? 'Edit Item' : 'Add New Item'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingItem(null)
                  resetForm()
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Basic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Item Code *
                    </label>
                    <input
                      type="text"
                      value={newItem.code}
                      onChange={(e) => setNewItem(prev => ({ ...prev, code: e.target.value }))}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="e.g., LAS-LAP-001"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Item Name *
                    </label>
                    <input
                      type="text"
                      value={newItem.name}
                      onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter item name"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newItem.description}
                      onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter item description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category *
                    </label>
                    <select
                      value={newItem.category}
                      onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Unit
                    </label>
                    <select
                      value={newItem.unit}
                      onChange={(e) => setNewItem(prev => ({ ...prev, unit: e.target.value }))}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {units.map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Technical Details */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Technical Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Manufacturer
                    </label>
                    <input
                      type="text"
                      value={newItem.manufacturer}
                      onChange={(e) => setNewItem(prev => ({ ...prev, manufacturer: e.target.value }))}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter manufacturer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Model
                    </label>
                    <input
                      type="text"
                      value={newItem.model}
                      onChange={(e) => setNewItem(prev => ({ ...prev, model: e.target.value }))}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter model"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Serial Number
                    </label>
                    <input
                      type="text"
                      value={newItem.serialNumber}
                      onChange={(e) => setNewItem(prev => ({ ...prev, serialNumber: e.target.value }))}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter serial number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={newItem.location}
                      onChange={(e) => setNewItem(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter current location"
                    />
                  </div>
                </div>
              </div>

              {/* Financial & Status */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Financial & Status</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Purchase Price (₦)
                    </label>
                    <input
                      type="number"
                      value={newItem.purchasePrice}
                      onChange={(e) => setNewItem(prev => ({ ...prev, purchasePrice: Number(e.target.value) }))}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter purchase price"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Current Value (₦)
                    </label>
                    <input
                      type="number"
                      value={newItem.currentValue}
                      onChange={(e) => setNewItem(prev => ({ ...prev, currentValue: Number(e.target.value) }))}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter current value"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Purchase Date
                    </label>
                    <input
                      type="date"
                      value={newItem.purchaseDate}
                      onChange={(e) => setNewItem(prev => ({ ...prev, purchaseDate: e.target.value }))}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Warranty Expiry
                    </label>
                    <input
                      type="date"
                      value={newItem.warrantyExpiry}
                      onChange={(e) => setNewItem(prev => ({ ...prev, warrantyExpiry: e.target.value }))}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      value={newItem.status}
                      onChange={(e) => setNewItem(prev => ({ ...prev, status: e.target.value as Item['status'] }))}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Retired">Retired</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Condition
                    </label>
                    <select
                      value={newItem.condition}
                      onChange={(e) => setNewItem(prev => ({ ...prev, condition: e.target.value as Item['condition'] }))}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingItem(null)
                    resetForm()
                  }}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={editingItem ? handleUpdateItem : handleAddItem}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  {editingItem ? 'Update Item' : 'Add Item'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Item Details Modal */}
      {showDetailsModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Item Details</h3>
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
              {/* Basic Information */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Basic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Item Code:</span>
                    <div className="font-medium text-gray-900 dark:text-white">{selectedItem.code}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Item Name:</span>
                    <div className="font-medium text-gray-900 dark:text-white">{selectedItem.name}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Category:</span>
                    <div className="font-medium text-gray-900 dark:text-white">{selectedItem.category}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Unit:</span>
                    <div className="font-medium text-gray-900 dark:text-white">{selectedItem.unit}</div>
                  </div>
                  {selectedItem.description && (
                    <div className="md:col-span-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Description:</span>
                      <div className="font-medium text-gray-900 dark:text-white">{selectedItem.description}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Technical Details */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Technical Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Manufacturer:</span>
                    <div className="font-medium text-gray-900 dark:text-white">{selectedItem.manufacturer || 'N/A'}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Model:</span>
                    <div className="font-medium text-gray-900 dark:text-white">{selectedItem.model || 'N/A'}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Serial Number:</span>
                    <div className="font-medium text-gray-900 dark:text-white">{selectedItem.serialNumber || 'N/A'}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Location:</span>
                    <div className="font-medium text-gray-900 dark:text-white">{selectedItem.location}</div>
                  </div>
                </div>
              </div>

              {/* Financial & Status */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Financial & Status</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Purchase Price:</span>
                    <div className="font-medium text-gray-900 dark:text-white">{formatCurrency(selectedItem.purchasePrice)}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Current Value:</span>
                    <div className="font-medium text-gray-900 dark:text-white">{formatCurrency(selectedItem.currentValue)}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Purchase Date:</span>
                    <div className="font-medium text-gray-900 dark:text-white">{selectedItem.purchaseDate}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Warranty Expiry:</span>
                    <div className="font-medium text-gray-900 dark:text-white">{selectedItem.warrantyExpiry}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                    <div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedItem.status)}`}>
                        {selectedItem.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Condition:</span>
                    <div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getConditionColor(selectedItem.condition)}`}>
                        {selectedItem.condition}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Attachments */}
              {selectedItem.attachments.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Attachments</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.attachments.map((attachment, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        {attachment}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Audit Info */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Audit Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Created Date:</span>
                    <div className="font-medium text-gray-900 dark:text-white">{selectedItem.createdDate}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Created By:</span>
                    <div className="font-medium text-gray-900 dark:text-white">{selectedItem.createdBy}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Last Modified:</span>
                    <div className="font-medium text-gray-900 dark:text-white">{selectedItem.lastModified}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
