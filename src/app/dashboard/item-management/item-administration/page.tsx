"use client"

import { useState } from "react"

interface AdminAction {
  id: string
  action: string
  description: string
  performedBy: string
  timestamp: string
  status: 'Completed' | 'In Progress' | 'Failed'
  details: string
}

export default function ItemAdministrationPage() {
  const [adminActions, setAdminActions] = useState<AdminAction[]>([
    {
      id: '1',
      action: 'Bulk Item Import',
      description: 'Imported 150 new items from CSV file',
      performedBy: 'Admin User',
      timestamp: '15/08/2025 14:30',
      status: 'Completed',
      details: 'Successfully imported IT equipment inventory'
    },
    {
      id: '2',
      action: 'Category Restructure',
      description: 'Reorganized medical equipment categories',
      performedBy: 'System Admin',
      timestamp: '12/08/2025 09:15',
      status: 'Completed',
      details: 'Updated category hierarchy for better organization'
    },
    {
      id: '3',
      action: 'Data Validation',
      description: 'Running validation checks on item database',
      performedBy: 'Admin User',
      timestamp: '10/08/2025 16:45',
      status: 'In Progress',
      details: 'Checking for duplicate codes and missing data'
    },
    {
      id: '4',
      action: 'Backup Creation',
      description: 'Creating full system backup',
      performedBy: 'System Admin',
      timestamp: '08/08/2025 02:00',
      status: 'Completed',
      details: 'Weekly automated backup completed successfully'
    }
  ])

  const [showBulkModal, setShowBulkModal] = useState(false)
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false)
  const [selectedOperation, setSelectedOperation] = useState('')

  const adminTools = [
    {
      title: 'Bulk Operations',
      description: 'Import/export items, bulk updates, and batch operations',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
      ),
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      action: () => setShowBulkModal(true)
    },
    {
      title: 'System Maintenance',
      description: 'Database cleanup, optimization, and system health checks',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      action: () => setShowMaintenanceModal(true)
    },
    {
      title: 'Data Validation',
      description: 'Check data integrity, find duplicates, and validate item information',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      action: () => handleValidation()
    },
    {
      title: 'Backup & Restore',
      description: 'Create backups, restore data, and manage system snapshots',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      ),
      color: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      action: () => handleBackup()
    },
    {
      title: 'User Management',
      description: 'Manage user permissions, roles, and access controls',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      action: () => handleUserManagement()
    },
    {
      title: 'System Configuration',
      description: 'Configure system settings, preferences, and global options',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100-4m0 4v2m0-6V4" />
        </svg>
      ),
      color: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
      bgColor: 'bg-gray-50 dark:bg-gray-800/20',
      action: () => handleSystemConfig()
    }
  ]

  const handleValidation = () => {
    const newAction: AdminAction = {
      id: (adminActions.length + 1).toString(),
      action: 'Data Validation',
      description: 'Running comprehensive data validation checks',
      performedBy: 'Admin User',
      timestamp: new Date().toLocaleString('en-GB'),
      status: 'In Progress',
      details: 'Validating item codes, categories, and data integrity'
    }
    setAdminActions(prev => [newAction, ...prev])
  }

  const handleBackup = () => {
    const newAction: AdminAction = {
      id: (adminActions.length + 1).toString(),
      action: 'System Backup',
      description: 'Creating full system backup',
      performedBy: 'Admin User',
      timestamp: new Date().toLocaleString('en-GB'),
      status: 'In Progress',
      details: 'Backing up database and system files'
    }
    setAdminActions(prev => [newAction, ...prev])
  }

  const handleUserManagement = () => {
    alert('User Management interface would open here')
  }

  const handleSystemConfig = () => {
    alert('System Configuration panel would open here')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'In Progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Failed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Item Administration</h1>
          <p className="text-gray-600 dark:text-gray-400">Administrative tools and functions for comprehensive item management</p>
        </div>

        {/* Admin Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {adminTools.map((tool, index) => (
            <div
              key={index}
              className={`${tool.bgColor} rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer`}
              onClick={tool.action}
            >
              <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center mb-4`}>
                {tool.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {tool.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {tool.description}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Admin Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Admin Actions</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Track recent administrative operations and their status</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Performed By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {adminActions.map((action) => (
                  <tr key={action.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {action.action}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {action.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {action.performedBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {action.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(action.status)}`}>
                        {action.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {action.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Health Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">98.5%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">System Uptime</div>
              </div>
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">1,247</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Items</div>
              </div>
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 1v6m6-6v6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">15</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
              </div>
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">2.1GB</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Database Size</div>
              </div>
              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Operations Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Bulk Operations</h3>
              <button
                onClick={() => setShowBulkModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Import Items</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Import from CSV/Excel</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Export Items</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Export to CSV/Excel</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Bulk Update</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Update multiple items</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Bulk Delete</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Delete multiple items</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* System Maintenance Modal */}
      {showMaintenanceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">System Maintenance</h3>
              <button
                onClick={() => setShowMaintenanceModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Database Optimization</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Optimize database performance</p>
                    </div>
                    <button className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700">
                      Run
                    </button>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Clear Cache</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Clear system cache and temporary files</p>
                    </div>
                    <button className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700">
                      Clear
                    </button>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">System Health Check</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Run comprehensive system diagnostics</p>
                    </div>
                    <button className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700">
                      Check
                    </button>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Log Cleanup</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Clean up old log files and entries</p>
                    </div>
                    <button className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700">
                      Clean
                    </button>
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
