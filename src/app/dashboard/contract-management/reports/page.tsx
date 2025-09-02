"use client"

export default function ContractManagementReportsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Contract Management Reports</h1>
        <p className="text-gray-600 dark:text-gray-400">Generate reports and analytics for contract management</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Contract Management Reports</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Generate comprehensive reports and analytics for contract performance, payments, and compliance.
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors">
            Generate Reports
          </button>
        </div>
      </div>
    </div>
  )
}
