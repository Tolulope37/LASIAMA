"use client"

import { useState } from "react"

interface Unit {
  id: string
  code: string
  name: string
  description: string
  unitType: 'Quantity' | 'Weight' | 'Volume' | 'Length' | 'Area' | 'Time'
  baseUnit?: string
  conversionFactor?: number
  status: 'Active' | 'Inactive'
  createdDate: string
  createdBy: string
}

export default function UnitMasterPage() {
  const [units, setUnits] = useState<Unit[]>([
    {
      id: '1',
      code: 'PCS',
      name: 'Pieces',
      description: 'Individual items or units',
      unitType: 'Quantity',
      status: 'Active',
      createdDate: '15/08/2025',
      createdBy: 'Admin User'
    },
    {
      id: '2',
      code: 'KG',
      name: 'Kilograms',
      description: 'Weight measurement in kilograms',
      unitType: 'Weight',
      status: 'Active',
      createdDate: '15/08/2025',
      createdBy: 'Admin User'
    },
    {
      id: '3',
      code: 'LTR',
      name: 'Liters',
      description: 'Volume measurement in liters',
      unitType: 'Volume',
      status: 'Active',
      createdDate: '15/08/2025',
      createdBy: 'Admin User'
    },
    {
      id: '4',
      code: 'MTR',
      name: 'Meters',
      description: 'Length measurement in meters',
      unitType: 'Length',
      status: 'Active',
      createdDate: '15/08/2025',
      createdBy: 'Admin User'
    },
    {
      id: '5',
      code: 'SQM',
      name: 'Square Meters',
      description: 'Area measurement in square meters',
      unitType: 'Area',
      status: 'Active',
      createdDate: '15/08/2025',
      createdBy: 'Admin User'
    }
  ])

  const [showAddModal, setShowAddModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')

  const [newUnit, setNewUnit] = useState({
    code: '',
    name: '',
    description: '',
    unitType: 'Quantity' as Unit['unitType'],
    baseUnit: '',
    conversionFactor: '',
    status: 'Active' as Unit['status']
  })

  const filteredUnits = units.filter(unit => {
    const matchesSearch = unit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         unit.code.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === 'All' || unit.unitType === typeFilter
    return matchesSearch && matchesType
  })

  const handleAddUnit = () => {
    if (!newUnit.code || !newUnit.name) return

    const unit: Unit = {
      id: (units.length + 1).toString(),
      code: newUnit.code.toUpperCase(),
      name: newUnit.name,
      description: newUnit.description,
      unitType: newUnit.unitType,
      baseUnit: newUnit.baseUnit || undefined,
      conversionFactor: newUnit.conversionFactor ? parseFloat(newUnit.conversionFactor) : undefined,
      status: newUnit.status,
      createdDate: new Date().toLocaleDateString('en-GB'),
      createdBy: 'Admin User'
    }

    setUnits(prev => [...prev, unit])
    setShowAddModal(false)
    setNewUnit({
      code: '',
      name: '',
      description: '',
      unitType: 'Quantity',
      baseUnit: '',
      conversionFactor: '',
      status: 'Active'
    })
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Unit Master</h1>
            <p className="text-gray-600 dark:text-gray-400">Define measurement units (unit, box, metre) used by items</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Unit</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search units..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="All">All Types</option>
                <option value="Quantity">Quantity</option>
                <option value="Weight">Weight</option>
                <option value="Volume">Volume</option>
                <option value="Length">Length</option>
                <option value="Area">Area</option>
                <option value="Time">Time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Units Table */}
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
                    Type
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
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredUnits.map((unit) => (
                  <tr key={unit.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{unit.code}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{unit.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {unit.unitType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
                        {unit.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        unit.status === 'Active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {unit.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {unit.createdDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-lg font-bold text-gray-900 dark:text-white">{units.length}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Total Units</div>
          </div>
          {['Quantity', 'Weight', 'Volume', 'Length', 'Area'].map(type => (
            <div key={type} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-lg font-bold text-blue-600">{units.filter(u => u.unitType === type).length}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{type}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Unit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Unit</h3>
              <button
                onClick={() => setShowAddModal(false)}
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
                    Unit Code *
                  </label>
                  <input
                    type="text"
                    value={newUnit.code}
                    onChange={(e) => setNewUnit(prev => ({ ...prev, code: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="e.g., PCS, KG, MTR"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Unit Type
                  </label>
                  <select
                    value={newUnit.unitType}
                    onChange={(e) => setNewUnit(prev => ({ ...prev, unitType: e.target.value as Unit['unitType'] }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="Quantity">Quantity</option>
                    <option value="Weight">Weight</option>
                    <option value="Volume">Volume</option>
                    <option value="Length">Length</option>
                    <option value="Area">Area</option>
                    <option value="Time">Time</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Unit Name *
                </label>
                <input
                  type="text"
                  value={newUnit.name}
                  onChange={(e) => setNewUnit(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter unit name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newUnit.description}
                  onChange={(e) => setNewUnit(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter unit description"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUnit}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Add Unit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
