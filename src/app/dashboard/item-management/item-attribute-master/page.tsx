"use client"

import { useState } from "react"

interface Attribute {
  id: string
  name: string
  dataType: 'Text' | 'Number' | 'Date' | 'Boolean' | 'List'
  description: string
  isRequired: boolean
  defaultValue?: string
  listValues?: string[]
  applicableCategories: string[]
  status: 'Active' | 'Inactive'
  createdDate: string
  createdBy: string
}

export default function ItemAttributeMasterPage() {
  const [attributes, setAttributes] = useState<Attribute[]>([
    {
      id: '1',
      name: 'Serial Number',
      dataType: 'Text',
      description: 'Unique serial number for the item',
      isRequired: true,
      applicableCategories: ['IT Equipment', 'Medical Equipment', 'Vehicles'],
      status: 'Active',
      createdDate: '15/08/2025',
      createdBy: 'Admin User'
    },
    {
      id: '2',
      name: 'Warranty Period',
      dataType: 'Number',
      description: 'Warranty period in months',
      isRequired: false,
      defaultValue: '12',
      applicableCategories: ['IT Equipment', 'Medical Equipment', 'Office Equipment'],
      status: 'Active',
      createdDate: '14/08/2025',
      createdBy: 'Admin User'
    },
    {
      id: '3',
      name: 'Purchase Date',
      dataType: 'Date',
      description: 'Date when the item was purchased',
      isRequired: true,
      applicableCategories: ['All Categories'],
      status: 'Active',
      createdDate: '13/08/2025',
      createdBy: 'Admin User'
    },
    {
      id: '4',
      name: 'Condition',
      dataType: 'List',
      description: 'Current condition of the item',
      isRequired: true,
      listValues: ['Excellent', 'Good', 'Fair', 'Poor', 'Damaged'],
      defaultValue: 'Good',
      applicableCategories: ['All Categories'],
      status: 'Active',
      createdDate: '12/08/2025',
      createdBy: 'Admin User'
    },
    {
      id: '5',
      name: 'Is Calibrated',
      dataType: 'Boolean',
      description: 'Whether the equipment requires calibration',
      isRequired: false,
      defaultValue: 'false',
      applicableCategories: ['Medical Equipment', 'Laboratory Equipment'],
      status: 'Active',
      createdDate: '11/08/2025',
      createdBy: 'Admin User'
    }
  ])

  const [showAddModal, setShowAddModal] = useState(false)
  const [editingAttribute, setEditingAttribute] = useState<Attribute | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')

  const [newAttribute, setNewAttribute] = useState({
    name: '',
    dataType: 'Text' as Attribute['dataType'],
    description: '',
    isRequired: false,
    defaultValue: '',
    listValues: [] as string[],
    applicableCategories: [] as string[],
    status: 'Active' as Attribute['status']
  })

  const [listValueInput, setListValueInput] = useState('')

  const availableCategories = [
    'All Categories', 'IT Equipment', 'Medical Equipment', 'Office Equipment',
    'Vehicles', 'Laboratory Equipment', 'Furniture', 'Infrastructure'
  ]

  const filteredAttributes = attributes.filter(attribute => {
    const matchesSearch = attribute.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         attribute.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'All' || attribute.status === statusFilter
    const matchesType = typeFilter === 'All' || attribute.dataType === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const handleAddAttribute = () => {
    if (!newAttribute.name || !newAttribute.description) return

    const attribute: Attribute = {
      id: (attributes.length + 1).toString(),
      name: newAttribute.name,
      dataType: newAttribute.dataType,
      description: newAttribute.description,
      isRequired: newAttribute.isRequired,
      defaultValue: newAttribute.defaultValue || undefined,
      listValues: newAttribute.dataType === 'List' ? newAttribute.listValues : undefined,
      applicableCategories: newAttribute.applicableCategories,
      status: newAttribute.status,
      createdDate: new Date().toLocaleDateString('en-GB'),
      createdBy: 'Admin User'
    }

    setAttributes(prev => [...prev, attribute])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditAttribute = (attribute: Attribute) => {
    setEditingAttribute(attribute)
    setNewAttribute({
      name: attribute.name,
      dataType: attribute.dataType,
      description: attribute.description,
      isRequired: attribute.isRequired,
      defaultValue: attribute.defaultValue || '',
      listValues: attribute.listValues || [],
      applicableCategories: attribute.applicableCategories,
      status: attribute.status
    })
    setShowAddModal(true)
  }

  const handleUpdateAttribute = () => {
    if (!editingAttribute || !newAttribute.name || !newAttribute.description) return

    setAttributes(prev => prev.map(attr =>
      attr.id === editingAttribute.id
        ? {
            ...attr,
            name: newAttribute.name,
            dataType: newAttribute.dataType,
            description: newAttribute.description,
            isRequired: newAttribute.isRequired,
            defaultValue: newAttribute.defaultValue || undefined,
            listValues: newAttribute.dataType === 'List' ? newAttribute.listValues : undefined,
            applicableCategories: newAttribute.applicableCategories,
            status: newAttribute.status
          }
        : attr
    ))

    setShowAddModal(false)
    setEditingAttribute(null)
    resetForm()
  }

  const handleDeleteAttribute = (id: string) => {
    if (confirm('Are you sure you want to delete this attribute?')) {
      setAttributes(prev => prev.filter(attr => attr.id !== id))
    }
  }

  const resetForm = () => {
    setNewAttribute({
      name: '',
      dataType: 'Text',
      description: '',
      isRequired: false,
      defaultValue: '',
      listValues: [],
      applicableCategories: [],
      status: 'Active'
    })
    setListValueInput('')
  }

  const addListValue = () => {
    if (listValueInput.trim()) {
      setNewAttribute(prev => ({
        ...prev,
        listValues: [...prev.listValues, listValueInput.trim()]
      }))
      setListValueInput('')
    }
  }

  const removeListValue = (index: number) => {
    setNewAttribute(prev => ({
      ...prev,
      listValues: prev.listValues.filter((_, i) => i !== index)
    }))
  }

  const toggleCategory = (category: string) => {
    setNewAttribute(prev => ({
      ...prev,
      applicableCategories: prev.applicableCategories.includes(category)
        ? prev.applicableCategories.filter(c => c !== category)
        : [...prev.applicableCategories, category]
    }))
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Item Attribute Master</h1>
            <p className="text-gray-600 dark:text-gray-400">Define custom attributes for different item categories</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Attribute</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search attributes..."
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
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="All">All Types</option>
                <option value="Text">Text</option>
                <option value="Number">Number</option>
                <option value="Date">Date</option>
                <option value="Boolean">Boolean</option>
                <option value="List">List</option>
              </select>
            </div>
          </div>
        </div>

        {/* Attributes Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Attribute Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Data Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Required
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Categories
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
                {filteredAttributes.map((attribute) => (
                  <tr key={attribute.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{attribute.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{attribute.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {attribute.dataType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {attribute.isRequired ? (
                        <span className="text-red-600 dark:text-red-400">Required</span>
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400">Optional</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {attribute.applicableCategories.slice(0, 2).map((category) => (
                          <span
                            key={category}
                            className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded"
                          >
                            {category}
                          </span>
                        ))}
                        {attribute.applicableCategories.length > 2 && (
                          <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded">
                            +{attribute.applicableCategories.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        attribute.status === 'Active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {attribute.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditAttribute(attribute)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteAttribute(attribute.id)}
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
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{attributes.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Attributes</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-green-600">{attributes.filter(a => a.status === 'Active').length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-red-600">{attributes.filter(a => a.isRequired).length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Required</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-blue-600">{attributes.filter(a => a.dataType === 'List').length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">List Types</div>
          </div>
        </div>
      </div>

      {/* Add/Edit Attribute Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {editingAttribute ? 'Edit Attribute' : 'Add New Attribute'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingAttribute(null)
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Attribute Name *
                  </label>
                  <input
                    type="text"
                    value={newAttribute.name}
                    onChange={(e) => setNewAttribute(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter attribute name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Data Type
                  </label>
                  <select
                    value={newAttribute.dataType}
                    onChange={(e) => setNewAttribute(prev => ({ ...prev, dataType: e.target.value as Attribute['dataType'] }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="Text">Text</option>
                    <option value="Number">Number</option>
                    <option value="Date">Date</option>
                    <option value="Boolean">Boolean</option>
                    <option value="List">List</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  value={newAttribute.description}
                  onChange={(e) => setNewAttribute(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Describe what this attribute is for"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Default Value
                  </label>
                  <input
                    type="text"
                    value={newAttribute.defaultValue}
                    onChange={(e) => setNewAttribute(prev => ({ ...prev, defaultValue: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Optional default value"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={newAttribute.status}
                    onChange={(e) => setNewAttribute(prev => ({ ...prev, status: e.target.value as Attribute['status'] }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={newAttribute.isRequired}
                  onChange={(e) => setNewAttribute(prev => ({ ...prev, isRequired: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  This attribute is required
                </label>
              </div>

              {newAttribute.dataType === 'List' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    List Values
                  </label>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={listValueInput}
                      onChange={(e) => setListValueInput(e.target.value)}
                      className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter a list value"
                      onKeyPress={(e) => e.key === 'Enter' && addListValue()}
                    />
                    <button
                      type="button"
                      onClick={addListValue}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {newAttribute.listValues.map((value, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full"
                      >
                        {value}
                        <button
                          type="button"
                          onClick={() => removeListValue(index)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Applicable Categories
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {availableCategories.map((category) => (
                    <label key={category} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newAttribute.applicableCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingAttribute(null)
                    resetForm()
                  }}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={editingAttribute ? handleUpdateAttribute : handleAddAttribute}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  {editingAttribute ? 'Update Attribute' : 'Add Attribute'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}