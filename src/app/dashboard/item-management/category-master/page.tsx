"use client"

import { useState } from "react"

interface Category {
  id: string
  code: string
  name: string
  description: string
  parentCategory?: string
  status: 'Active' | 'Inactive'
  createdDate: string
  createdBy: string
  lastModified: string
}

export default function CategoryMasterPage() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      code: 'HLT',
      name: 'Healthcare Equipment',
      description: 'Medical and healthcare related equipment and supplies',
      status: 'Active',
      createdDate: '15/08/2025',
      createdBy: 'Admin User',
      lastModified: '15/08/2025'
    },
    {
      id: '2',
      code: 'INF',
      name: 'Infrastructure',
      description: 'Roads, bridges, and infrastructure items',
      status: 'Active',
      createdDate: '12/08/2025',
      createdBy: 'Admin User',
      lastModified: '12/08/2025'
    },
    {
      id: '3',
      code: 'EDU',
      name: 'Educational Equipment',
      description: 'School and educational facility equipment',
      status: 'Active',
      createdDate: '10/08/2025',
      createdBy: 'Admin User',
      lastModified: '10/08/2025'
    },
    {
      id: '4',
      code: 'TRA',
      name: 'Transportation',
      description: 'Vehicles and transportation equipment',
      status: 'Active',
      createdDate: '08/08/2025',
      createdBy: 'Admin User',
      lastModified: '08/08/2025'
    },
    {
      id: '5',
      code: 'SEC',
      name: 'Security Equipment',
      description: 'Security and safety equipment',
      status: 'Active',
      createdDate: '05/08/2025',
      createdBy: 'Admin User',
      lastModified: '05/08/2025'
    }
  ])

  const [showAddModal, setShowAddModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const [newCategory, setNewCategory] = useState({
    code: '',
    name: '',
    description: '',
    parentCategory: '',
    status: 'Active' as Category['status']
  })

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         category.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'All' || category.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleAddCategory = () => {
    if (!newCategory.code || !newCategory.name) return

    const category: Category = {
      id: (categories.length + 1).toString(),
      code: newCategory.code.toUpperCase(),
      name: newCategory.name,
      description: newCategory.description,
      parentCategory: newCategory.parentCategory || undefined,
      status: newCategory.status,
      createdDate: new Date().toLocaleDateString('en-GB'),
      createdBy: 'Admin User',
      lastModified: new Date().toLocaleDateString('en-GB')
    }

    setCategories(prev => [...prev, category])
    setShowAddModal(false)
    setNewCategory({
      code: '',
      name: '',
      description: '',
      parentCategory: '',
      status: 'Active'
    })
  }

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
    setNewCategory({
      code: category.code,
      name: category.name,
      description: category.description,
      parentCategory: category.parentCategory || '',
      status: category.status
    })
    setShowAddModal(true)
  }

  const handleUpdateCategory = () => {
    if (!editingCategory || !newCategory.code || !newCategory.name) return

    setCategories(prev => prev.map(cat => 
      cat.id === editingCategory.id 
        ? {
            ...cat,
            code: newCategory.code.toUpperCase(),
            name: newCategory.name,
            description: newCategory.description,
            parentCategory: newCategory.parentCategory || undefined,
            status: newCategory.status,
            lastModified: new Date().toLocaleDateString('en-GB')
          }
        : cat
    ))

    setShowAddModal(false)
    setEditingCategory(null)
    setNewCategory({
      code: '',
      name: '',
      description: '',
      parentCategory: '',
      status: 'Active'
    })
  }

  const handleDeleteCategory = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(prev => prev.filter(cat => cat.id !== id))
    }
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Category Master</h1>
            <p className="text-gray-600 dark:text-gray-400">Create and manage item categories with codes & descriptions</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Category</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search categories..."
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
          </div>
        </div>

        {/* Categories Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Created Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{category.code}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{category.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
                        {category.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        category.status === 'Active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {category.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {category.createdDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditCategory(category)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
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
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{categories.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Categories</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-green-600">{categories.filter(c => c.status === 'Active').length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Categories</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-red-600">{categories.filter(c => c.status === 'Inactive').length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Inactive Categories</div>
          </div>
        </div>
      </div>

      {/* Add/Edit Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingCategory(null)
                  setNewCategory({
                    code: '',
                    name: '',
                    description: '',
                    parentCategory: '',
                    status: 'Active'
                  })
                }}
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
                    Category Code *
                  </label>
                  <input
                    type="text"
                    value={newCategory.code}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, code: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="e.g., HLT, INF, EDU"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={newCategory.status}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, status: e.target.value as Category['status'] }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter category name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter category description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Parent Category (Optional)
                </label>
                <select
                  value={newCategory.parentCategory}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, parentCategory: e.target.value }))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">No Parent Category</option>
                  {categories
                    .filter(cat => cat.id !== editingCategory?.id)
                    .map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingCategory(null)
                    setNewCategory({
                      code: '',
                      name: '',
                      description: '',
                      parentCategory: '',
                      status: 'Active'
                    })
                  }}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  {editingCategory ? 'Update Category' : 'Add Category'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
