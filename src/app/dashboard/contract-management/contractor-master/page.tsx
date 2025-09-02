"use client"

import { useState } from "react"

interface Contractor {
  id: string
  companyName: string
  contactPerson: string
  email: string
  phone: string
  address: string
  registrationNumber: string
  taxNumber: string
  specializations: string[]
  status: 'Active' | 'Inactive' | 'Blacklisted'
  rating: number
  totalContracts: number
  activeContracts: number
  createdDate: string
  createdBy: string
}

export default function ContractorMasterPage() {
  const [contractors, setContractors] = useState<Contractor[]>([
    {
      id: '1',
      companyName: 'Lagos Construction Ltd',
      contactPerson: 'Adebayo Johnson',
      email: 'info@lagosconstruction.com',
      phone: '+234 803 123 4567',
      address: '15 Victoria Island, Lagos State',
      registrationNumber: 'RC123456',
      taxNumber: 'TIN-987654321',
      specializations: ['Infrastructure', 'Buildings', 'Roads'],
      status: 'Active',
      rating: 4.5,
      totalContracts: 15,
      activeContracts: 3,
      createdDate: '15/08/2025',
      createdBy: 'Admin User'
    },
    {
      id: '2',
      companyName: 'Excel Engineering Services',
      contactPerson: 'Sarah Okafor',
      email: 'contracts@exceleng.ng',
      phone: '+234 807 234 5678',
      address: '28 Allen Avenue, Ikeja, Lagos State',
      registrationNumber: 'RC234567',
      taxNumber: 'TIN-876543210',
      specializations: ['Electrical', 'HVAC', 'Maintenance'],
      status: 'Active',
      rating: 4.2,
      totalContracts: 8,
      activeContracts: 2,
      createdDate: '12/08/2025',
      createdBy: 'Admin User'
    },
    {
      id: '3',
      companyName: 'Metro Security Solutions',
      contactPerson: 'Ibrahim Musa',
      email: 'security@metrosolutions.ng',
      phone: '+234 809 345 6789',
      address: '42 Ikorodu Road, Lagos State',
      registrationNumber: 'RC345678',
      taxNumber: 'TIN-765432109',
      specializations: ['Security Systems', 'CCTV', 'Access Control'],
      status: 'Active',
      rating: 4.8,
      totalContracts: 12,
      activeContracts: 4,
      createdDate: '10/08/2025',
      createdBy: 'Admin User'
    },
    {
      id: '4',
      companyName: 'Green Clean Services',
      contactPerson: 'Fatima Bello',
      email: 'admin@greenclean.ng',
      phone: '+234 805 456 7890',
      address: '67 Surulere, Lagos State',
      registrationNumber: 'RC456789',
      taxNumber: 'TIN-654321098',
      specializations: ['Cleaning', 'Waste Management', 'Landscaping'],
      status: 'Inactive',
      rating: 3.8,
      totalContracts: 5,
      activeContracts: 0,
      createdDate: '08/08/2025',
      createdBy: 'Admin User'
    }
  ])

  const [showAddModal, setShowAddModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedContractor, setSelectedContractor] = useState<Contractor | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const [newContractor, setNewContractor] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    registrationNumber: '',
    taxNumber: '',
    specializations: [] as string[],
    status: 'Active' as Contractor['status']
  })

  const availableSpecializations = [
    'Infrastructure', 'Buildings', 'Roads', 'Electrical', 'HVAC', 'Maintenance',
    'Security Systems', 'CCTV', 'Access Control', 'Cleaning', 'Waste Management',
    'Landscaping', 'IT Services', 'Consulting', 'Engineering'
  ]

  const filteredContractors = contractors.filter(contractor => {
    const matchesSearch = contractor.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contractor.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contractor.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'All' || contractor.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleAddContractor = () => {
    if (!newContractor.companyName || !newContractor.contactPerson || !newContractor.email) return

    const contractor: Contractor = {
      id: (contractors.length + 1).toString(),
      companyName: newContractor.companyName,
      contactPerson: newContractor.contactPerson,
      email: newContractor.email,
      phone: newContractor.phone,
      address: newContractor.address,
      registrationNumber: newContractor.registrationNumber,
      taxNumber: newContractor.taxNumber,
      specializations: newContractor.specializations,
      status: newContractor.status,
      rating: 0,
      totalContracts: 0,
      activeContracts: 0,
      createdDate: new Date().toLocaleDateString('en-GB'),
      createdBy: 'Admin User'
    }

    setContractors(prev => [...prev, contractor])
    setShowAddModal(false)
    setNewContractor({
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      address: '',
      registrationNumber: '',
      taxNumber: '',
      specializations: [],
      status: 'Active'
    })
  }

  const handleViewContractor = (contractor: Contractor) => {
    setSelectedContractor(contractor)
    setShowDetailsModal(true)
  }

  const toggleSpecialization = (spec: string) => {
    setNewContractor(prev => ({
      ...prev,
      specializations: prev.specializations.includes(spec)
        ? prev.specializations.filter(s => s !== spec)
        : [...prev.specializations, spec]
    }))
  }

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Contractor Master</h1>
            <p className="text-gray-600 dark:text-gray-400">Registry of vendors (company details, contacts, docs)</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Contractor</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search contractors..."
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
                <option value="Blacklisted">Blacklisted</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contractors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {filteredContractors.map((contractor) => (
            <div
              key={contractor.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleViewContractor(contractor)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
                    {contractor.companyName}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{contractor.contactPerson}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  contractor.status === 'Active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : contractor.status === 'Inactive'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {contractor.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{contractor.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{contractor.phone}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {getRatingStars(contractor.rating)}
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                    {contractor.rating.toFixed(1)}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {contractor.activeContracts} Active
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {contractor.totalContracts} Total
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1">
                {contractor.specializations.slice(0, 3).map((spec) => (
                  <span
                    key={spec}
                    className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full"
                  >
                    {spec}
                  </span>
                ))}
                {contractor.specializations.length > 3 && (
                  <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full">
                    +{contractor.specializations.length - 3} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{contractors.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Contractors</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-green-600">{contractors.filter(c => c.status === 'Active').length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-blue-600">{contractors.reduce((sum, c) => sum + c.activeContracts, 0)}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Contracts</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-yellow-600">
              {(contractors.reduce((sum, c) => sum + c.rating, 0) / contractors.length).toFixed(1)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
          </div>
        </div>
      </div>

      {/* Add Contractor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Contractor</h3>
              <button
                onClick={() => setShowAddModal(false)}
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
                <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">Company Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      value={newContractor.companyName}
                      onChange={(e) => setNewContractor(prev => ({ ...prev, companyName: e.target.value }))}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      value={newContractor.contactPerson}
                      onChange={(e) => setNewContractor(prev => ({ ...prev, contactPerson: e.target.value }))}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter contact person name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={newContractor.email}
                      onChange={(e) => setNewContractor(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={newContractor.phone}
                      onChange={(e) => setNewContractor(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
              </div>

              {/* Specializations */}
              <div>
                <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">Specializations</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {availableSpecializations.map((spec) => (
                    <label key={spec} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newContractor.specializations.includes(spec)}
                        onChange={() => toggleSpecialization(spec)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{spec}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddContractor}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Add Contractor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contractor Details Modal */}
      {showDetailsModal && selectedContractor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedContractor.companyName}
              </h3>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Company Details</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Contact Person:</span>
                      <div className="font-medium text-gray-900 dark:text-white">{selectedContractor.contactPerson}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Email:</span>
                      <div className="font-medium text-gray-900 dark:text-white">{selectedContractor.email}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Phone:</span>
                      <div className="font-medium text-gray-900 dark:text-white">{selectedContractor.phone}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Registration:</span>
                      <div className="font-medium text-gray-900 dark:text-white">{selectedContractor.registrationNumber}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Performance</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Rating:</span>
                      <div className="flex items-center space-x-1">
                        {getRatingStars(selectedContractor.rating)}
                        <span className="font-medium text-gray-900 dark:text-white ml-1">
                          {selectedContractor.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Total Contracts:</span>
                      <div className="font-medium text-gray-900 dark:text-white">{selectedContractor.totalContracts}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Active Contracts:</span>
                      <div className="font-medium text-gray-900 dark:text-white">{selectedContractor.activeContracts}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Specializations</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedContractor.specializations.map((spec) => (
                    <span
                      key={spec}
                      className="inline-flex px-3 py-1 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
