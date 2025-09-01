export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">LASIAMA</h1>
                <p className="text-sm text-green-600 font-medium">Lagos State Infrastructure & Asset Management</p>
              </div>
            </div>
            <a href="/dashboard" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 inline-block">
              Access Dashboard
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-6xl font-bold text-gray-900 mb-6">
              🏢 Professional Asset Management
            </h2>
            <h3 className="text-3xl font-semibold text-green-600 mb-4">
              for Lagos State Government
            </h3>
            <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
              <strong>Complete Infrastructure & Asset Management Platform</strong> - 
              Comprehensive tracking, maintenance scheduling, issue management, and analytics 
              for all Lagos State government properties and assets.
            </p>
          </div>

          {/* Success Badge */}
          <div className="inline-flex items-center bg-green-100 border border-green-300 rounded-full px-6 py-3 mb-12">
            <svg className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-green-800 font-semibold">✅ Application Successfully Rebuilt & Working!</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">🚀 Platform Features</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Asset Management */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-blue-200">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-blue-900 mb-3">🏢 Asset Management</h4>
              <p className="text-blue-800 mb-4">Complete tracking of buildings, properties, utilities, doors, windows, and infrastructure with detailed specifications.</p>
              <div className="text-sm text-blue-700">
                <div className="flex justify-between mb-1">
                  <span>Residential Buildings:</span>
                  <span className="font-semibold">456</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Commercial Properties:</span>
                  <span className="font-semibold">321</span>
                </div>
                <div className="flex justify-between">
                  <span>Infrastructure Assets:</span>
                  <span className="font-semibold">187</span>
                </div>
              </div>
            </div>

            {/* Interactive Maps */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-green-200">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-green-900 mb-3">🗺️ Interactive Maps</h4>
              <p className="text-green-800 mb-4">Visual representation of all assets on interactive maps with advanced filtering, location tracking, and geospatial analysis.</p>
              <div className="bg-green-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-800">1,247</div>
                <div className="text-sm text-green-700">Assets Mapped</div>
              </div>
            </div>

            {/* Issue Tracking */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-orange-200">
              <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-orange-900 mb-3">⚠️ Issue Management</h4>
              <p className="text-orange-800 mb-4">Complete tenant issue reporting system with priority management, photo uploads, and resolution tracking.</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-orange-700">Critical Issues:</span>
                  <span className="bg-red-200 text-red-800 px-2 py-1 rounded text-xs font-semibold">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-orange-700">In Progress:</span>
                  <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-xs font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-orange-700">Resolved This Month:</span>
                  <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs font-semibold">89</span>
                </div>
              </div>
            </div>

            {/* Maintenance Management */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-purple-200">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-purple-900 mb-3">🔧 Maintenance Scheduling</h4>
              <p className="text-purple-800 mb-4">Preventive and corrective maintenance scheduling with contractor management, cost tracking, and performance analytics.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center bg-purple-200 rounded-lg p-3">
                  <div className="text-lg font-bold text-purple-800">94%</div>
                  <div className="text-xs text-purple-700">Completion Rate</div>
                </div>
                <div className="text-center bg-purple-200 rounded-lg p-3">
                  <div className="text-lg font-bold text-purple-800">₦2.4M</div>
                  <div className="text-xs text-purple-700">Monthly Budget</div>
                </div>
              </div>
            </div>

            {/* User Management */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-red-200">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-red-900 mb-3">👥 User Management</h4>
              <p className="text-red-800 mb-4">Role-based access control with multiple user levels and permissions management for secure operations.</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-red-700">Super Admins:</span>
                  <span className="font-semibold text-red-900">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-700">Managers:</span>
                  <span className="font-semibold text-red-900">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-700">Officers:</span>
                  <span className="font-semibold text-red-900">45</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-700">Tenants:</span>
                  <span className="font-semibold text-red-900">1,284</span>
                </div>
              </div>
            </div>

            {/* Analytics & Reports */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
              <div className="w-12 h-12 bg-gray-600 rounded-xl flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">📊 Analytics & Reports</h4>
              <p className="text-gray-800 mb-4">Comprehensive reporting system with performance metrics, financial analysis, and custom dashboard creation.</p>
              <div className="bg-gray-200 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">₦45.6B</div>
                  <div className="text-sm text-gray-600">Total Asset Value</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Implementation */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">🚀 Built with Modern Technology</h3>
            <p className="text-green-100 text-lg">Professional-grade architecture for enterprise-level performance</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <h4 className="text-white font-semibold mb-2">Frontend</h4>
              <div className="text-green-100 text-sm space-y-1">
                <div>Next.js 14</div>
                <div>React 18</div>
                <div>TypeScript</div>
                <div>Tailwind CSS</div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <h4 className="text-white font-semibold mb-2">Backend</h4>
              <div className="text-green-100 text-sm space-y-1">
                <div>Node.js</div>
                <div>API Routes</div>
                <div>Authentication</div>
                <div>Database ORM</div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <h4 className="text-white font-semibold mb-2">Features</h4>
              <div className="text-green-100 text-sm space-y-1">
                <div>Interactive Maps</div>
                <div>Real-time Updates</div>
                <div>File Uploads</div>
                <div>Mobile Responsive</div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <h4 className="text-white font-semibold mb-2">Security</h4>
              <div className="text-green-100 text-sm space-y-1">
                <div>Role-based Access</div>
                <div>Secure Sessions</div>
                <div>Data Encryption</div>
                <div>Audit Logging</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold">LASIAMA</h4>
            </div>
            <p className="text-gray-400 mb-4">Lagos State Infrastructure & Asset Management Ministry</p>
            <p className="text-gray-500 text-sm">
              Professional asset management platform built for government excellence
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}