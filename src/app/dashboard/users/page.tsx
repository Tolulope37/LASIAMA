"use client"

import { useState } from "react"

interface User {
  id: number
  name: string
  email: string
  role: string
  department: string
  status: string
  lastLogin: string
  avatar: string
  permissions?: string[]
  accessExpiry?: string
  createdDate?: string
  activities?: Activity[]
}

interface Activity {
  id: string
  action: string
  description: string
  timestamp: string
  ipAddress?: string
  location?: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Admin User",
      email: "admin@lasiama.lg.ng",
      role: "Super Admin",
      department: "IT Administration",
      status: "Active",
      lastLogin: "15/01/2024 09:30",
      avatar: "AU",
      permissions: ["all"],
      createdDate: "01/01/2023",
      activities: [
        { id: "1", action: "Login", description: "Logged into the system", timestamp: "15/01/2024 09:30", ipAddress: "192.168.1.1", location: "Lagos, Nigeria" },
        { id: "2", action: "Create Asset", description: "Created new asset: Lagos General Hospital", timestamp: "15/01/2024 09:45", ipAddress: "192.168.1.1", location: "Lagos, Nigeria" },
        { id: "3", action: "Update User", description: "Updated user permissions for John Manager", timestamp: "14/01/2024 16:20", ipAddress: "192.168.1.1", location: "Lagos, Nigeria" }
      ]
    },
    {
      id: 2,
      name: "John Manager",
      email: "manager@lasiama.lg.ng",
      role: "Manager",
      department: "Asset Management",
      status: "Active",
      lastLogin: "14/01/2024 14:22",
      avatar: "JM",
      permissions: ["assets.view", "assets.edit", "maintenance.view", "reports.view"],
      createdDate: "15/06/2023",
      activities: [
        { id: "1", action: "Login", description: "Logged into the system", timestamp: "14/01/2024 14:22", ipAddress: "192.168.1.5", location: "Lagos, Nigeria" },
        { id: "2", action: "View Asset", description: "Viewed Third Mainland Bridge details", timestamp: "14/01/2024 14:30", ipAddress: "192.168.1.5", location: "Lagos, Nigeria" },
        { id: "3", action: "Schedule Maintenance", description: "Scheduled maintenance for Lagos General Hospital", timestamp: "14/01/2024 15:45", ipAddress: "192.168.1.5", location: "Lagos, Nigeria" }
      ]
    },
    {
      id: 3,
      name: "Sarah Officer",
      email: "officer@lasiama.lg.ng",
      role: "Officer",
      department: "Field Operations",
      status: "Active",
      lastLogin: "13/01/2024 11:15",
      avatar: "SO"
    },

    {
      id: 5,
      name: "Lisa Inactive",
      email: "lisa@lasiama.lg.ng",
      role: "Officer",
      department: "Maintenance",
      status: "Inactive",
      lastLogin: "20/12/2023 10:30",
      avatar: "LI"
    }
  ])

  // Modal states
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  
  // New user form data
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    permissions: [] as string[],
    temporaryAccess: false,
    accessExpiry: ''
  })

  const availablePermissions = [
    { id: 'assets.view', label: 'View Assets', category: 'Assets' },
    { id: 'assets.create', label: 'Create Assets', category: 'Assets' },
    { id: 'assets.edit', label: 'Edit Assets', category: 'Assets' },
    { id: 'assets.delete', label: 'Delete Assets', category: 'Assets' },
    { id: 'maintenance.view', label: 'View Maintenance', category: 'Maintenance' },
    { id: 'maintenance.create', label: 'Create Maintenance', category: 'Maintenance' },
    { id: 'maintenance.edit', label: 'Edit Maintenance', category: 'Maintenance' },
    { id: 'projects.view', label: 'View Projects', category: 'Projects' },
    { id: 'projects.create', label: 'Create Projects', category: 'Projects' },
    { id: 'projects.edit', label: 'Edit Projects', category: 'Projects' },
    { id: 'reports.view', label: 'View Reports', category: 'Reports' },
    { id: 'reports.generate', label: 'Generate Reports', category: 'Reports' },
    { id: 'users.view', label: 'View Users', category: 'User Management' },
    { id: 'users.create', label: 'Create Users', category: 'User Management' },
    { id: 'users.edit', label: 'Edit Users', category: 'User Management' },
    { id: 'vault.view', label: 'View Vault', category: 'Vault' },
    { id: 'vault.upload', label: 'Upload Files', category: 'Vault' },
    { id: 'vault.manage', label: 'Manage Folders', category: 'Vault' }
  ]

  const handleAddUser = () => {
    const user: User = {
      id: Math.max(...users.map(u => u.id)) + 1,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      department: newUser.department,
      status: 'Active',
      lastLogin: 'Never',
      avatar: newUser.name.split(' ').map(n => n[0]).join('').toUpperCase(),
      permissions: newUser.permissions,
      accessExpiry: newUser.temporaryAccess ? newUser.accessExpiry : undefined,
      createdDate: new Date().toLocaleDateString('en-GB'),
      activities: [
        {
          id: '1',
          action: 'Account Created',
          description: 'User account was created',
          timestamp: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString('en-GB', { hour12: false }),
          location: 'Lagos, Nigeria'
        }
      ]
    }
    
    setUsers([...users, user])
    setShowAddUserModal(false)
    setNewUser({
      name: '',
      email: '',
      role: '',
      department: '',
      permissions: [],
      temporaryAccess: false,
      accessExpiry: ''
    })
  }

  const handleViewUser = (user: User) => {
    setSelectedUser(user)
    setShowUserDetailsModal(true)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Super Admin': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'Admin': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'Manager': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Officer': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Tenant': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      case 'Suspended': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage users, roles, and permissions</p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setShowAddUserModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                + Add User
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">5</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">4</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
                <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Inactive Users</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">1</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Admin Users</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option>All Roles</option>
                <option>Super Admin</option>
                <option>Admin</option>
                <option>Manager</option>
                <option>Officer</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Suspended</option>
              </select>
              <input
                type="text"
                placeholder="Search users..."
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Export Users
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">All Users</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {users.map((user) => (
                  <tr 
                    key={user.id} 
                    onClick={() => handleViewUser(user)}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            {user.avatar}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {user.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {user.lastLogin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                          {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Role Permissions */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Role Permissions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Super Admin</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>✅ Full system access</li>
                  <li>✅ User management</li>
                  <li>✅ System settings</li>
                  <li>✅ All reports</li>
                </ul>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Manager</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>✅ Asset management</li>
                  <li>✅ Maintenance scheduling</li>
                  <li>✅ Reports generation</li>
                  <li>❌ User management</li>
                </ul>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Officer</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>✅ Asset viewing</li>
                  <li>✅ Issue reporting</li>
                  <li>✅ Basic reports</li>
                  <li>❌ Asset creation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New User</h2>
                <button 
                  onClick={() => setShowAddUserModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="user@lasiama.lg.ng"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Role *
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Role</option>
                    <option value="Super Admin">Super Admin</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Officer">Officer</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Department *
                  </label>
                  <select
                    value={newUser.department}
                    onChange={(e) => setNewUser({...newUser, department: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Department</option>
                    <option value="IT Administration">IT Administration</option>
                    <option value="Asset Management">Asset Management</option>
                    <option value="Field Operations">Field Operations</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Finance">Finance</option>
                    <option value="Legal">Legal</option>
                    <option value="External">External</option>
                  </select>
                </div>
              </div>
              
              {/* Temporary Access */}
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="temporaryAccess"
                    checked={newUser.temporaryAccess}
                    onChange={(e) => setNewUser({...newUser, temporaryAccess: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="temporaryAccess" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Grant Temporary Access
                  </label>
                </div>
                
                {newUser.temporaryAccess && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Access Expiry Date
                    </label>
                    <input
                      type="datetime-local"
                      value={newUser.accessExpiry}
                      onChange={(e) => setNewUser({...newUser, accessExpiry: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>
              
              {/* Permissions */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Permissions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(
                    availablePermissions.reduce((acc, perm) => {
                      if (!acc[perm.category]) acc[perm.category] = []
                      acc[perm.category].push(perm)
                      return acc
                    }, {} as Record<string, typeof availablePermissions>)
                  ).map(([category, perms]) => (
                    <div key={category} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">{category}</h4>
                      <div className="space-y-2">
                        {perms.map((perm) => (
                          <div key={perm.id} className="flex items-center">
                            <input
                              type="checkbox"
                              id={perm.id}
                              checked={newUser.permissions.includes(perm.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setNewUser({...newUser, permissions: [...newUser.permissions, perm.id]})
                                } else {
                                  setNewUser({...newUser, permissions: newUser.permissions.filter(p => p !== perm.id)})
                                }
                              }}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor={perm.id} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                              {perm.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-4">
                <button
                  onClick={() => setShowAddUserModal(false)}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUser}
                  disabled={!newUser.name || !newUser.email || !newUser.role || !newUser.department}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                >
                  Create User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {showUserDetailsModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-lg font-medium text-gray-700 dark:text-gray-200">
                      {selectedUser.avatar}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedUser.name}</h2>
                    <p className="text-gray-600 dark:text-gray-400">{selectedUser.email}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowUserDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* User Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Role</label>
                    <p className="mt-1">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getRoleColor(selectedUser.role)}`}>
                        {selectedUser.role}
                      </span>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Department</label>
                    <p className="mt-1 text-gray-900 dark:text-white">{selectedUser.department}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
                    <p className="mt-1">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedUser.status)}`}>
                        {selectedUser.status}
                      </span>
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Login</label>
                    <p className="mt-1 text-gray-900 dark:text-white">{selectedUser.lastLogin}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Created</label>
                    <p className="mt-1 text-gray-900 dark:text-white">{selectedUser.createdDate || 'N/A'}</p>
                  </div>
                  {selectedUser.accessExpiry && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Access Expires</label>
                      <p className="mt-1 text-red-600 dark:text-red-400 font-medium">{selectedUser.accessExpiry}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Permissions */}
              {selectedUser.permissions && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Permissions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {selectedUser.permissions.map((permission) => (
                      <span key={permission} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                        {availablePermissions.find(p => p.id === permission)?.label || permission}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Activity Log */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {selectedUser.activities?.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</h4>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{activity.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{activity.description}</p>
                        {(activity.ipAddress || activity.location) && (
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                            {activity.ipAddress && <span>IP: {activity.ipAddress}</span>}
                            {activity.location && <span>Location: {activity.location}</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  )) || (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">No activity recorded yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
