"use client"

import { useState } from "react"

interface ReportTemplate {
  id: string
  name: string
  description: string
  category: string
  icon: JSX.Element
  color: string
  bgColor: string
  lastGenerated?: string
  parameters: string[]
}

interface GeneratedReport {
  id: string
  name: string
  type: string
  generatedBy: string
  generatedDate: string
  status: 'Generated' | 'Processing' | 'Failed'
  downloadUrl?: string
  recordCount: number
}

export default function ItemManagementReportsPage() {
  const [generatedReports, setGeneratedReports] = useState<GeneratedReport[]>([
    {
      id: '1',
      name: 'Asset Inventory Summary - August 2025',
      type: 'Asset Inventory',
      generatedBy: 'Admin User',
      generatedDate: '15/08/2025 14:30',
      status: 'Generated',
      downloadUrl: '/reports/asset-inventory-aug-2025.pdf',
      recordCount: 1247
    },
    {
      id: '2',
      name: 'Transfer Activity Report - Q3 2025',
      type: 'Transfer Activity',
      generatedBy: 'Manager',
      generatedDate: '12/08/2025 09:15',
      status: 'Generated',
      downloadUrl: '/reports/transfer-activity-q3-2025.xlsx',
      recordCount: 89
    },
    {
      id: '3',
      name: 'Maintenance Schedule Report',
      type: 'Maintenance Overview',
      generatedBy: 'Admin User',
      generatedDate: '10/08/2025 16:45',
      status: 'Processing',
      recordCount: 0
    },
    {
      id: '4',
      name: 'Category Utilization Analysis',
      type: 'Category Analysis',
      generatedBy: 'Analyst',
      generatedDate: '08/08/2025 11:20',
      status: 'Generated',
      downloadUrl: '/reports/category-analysis-aug-2025.pdf',
      recordCount: 156
    }
  ])

  const [showGenerateModal, setShowGenerateModal] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null)
  const [reportParameters, setReportParameters] = useState<Record<string, string>>({})

  const reportTemplates: ReportTemplate[] = [
    {
      id: '1',
      name: 'Asset Inventory Report',
      description: 'Complete inventory of all assets with current status, location, and value',
      category: 'Inventory',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 1v6m6-6v6" />
        </svg>
      ),
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      lastGenerated: '15/08/2025',
      parameters: ['Date Range', 'Category Filter', 'Location Filter', 'Status Filter']
    },
    {
      id: '2',
      name: 'Transfer Activity Report',
      description: 'Track all item transfers between locations, users, and departments',
      category: 'Operations',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      lastGenerated: '12/08/2025',
      parameters: ['Date Range', 'Transfer Type', 'Source Location', 'Destination Location']
    },
    {
      id: '3',
      name: 'Assignment Report',
      description: 'View all current and historical item assignments to users and departments',
      category: 'Operations',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      lastGenerated: '10/08/2025',
      parameters: ['Date Range', 'Assignment Type', 'User/Department', 'Status Filter']
    },
    {
      id: '4',
      name: 'Category Analysis Report',
      description: 'Analyze item distribution, utilization, and value across categories',
      category: 'Analytics',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      lastGenerated: '08/08/2025',
      parameters: ['Date Range', 'Category Selection', 'Analysis Type', 'Include Subcategories']
    },
    {
      id: '5',
      name: 'Financial Summary Report',
      description: 'Asset valuation, depreciation, and financial overview of inventory',
      category: 'Financial',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
      lastGenerated: '05/08/2025',
      parameters: ['Date Range', 'Valuation Method', 'Currency', 'Include Depreciation']
    },
    {
      id: '6',
      name: 'Maintenance Overview Report',
      description: 'Maintenance schedules, history, and upcoming maintenance requirements',
      category: 'Maintenance',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      lastGenerated: '03/08/2025',
      parameters: ['Date Range', 'Maintenance Type', 'Priority Level', 'Equipment Category']
    }
  ]

  const handleGenerateReport = (template: ReportTemplate) => {
    setSelectedTemplate(template)
    setReportParameters({})
    setShowGenerateModal(true)
  }

  const handleConfirmGenerate = () => {
    if (!selectedTemplate) return

    const newReport: GeneratedReport = {
      id: (generatedReports.length + 1).toString(),
      name: `${selectedTemplate.name} - ${new Date().toLocaleDateString('en-GB')}`,
      type: selectedTemplate.name,
      generatedBy: 'Admin User',
      generatedDate: new Date().toLocaleString('en-GB'),
      status: 'Processing',
      recordCount: 0
    }

    setGeneratedReports(prev => [newReport, ...prev])
    setShowGenerateModal(false)
    setSelectedTemplate(null)

    // Simulate report generation completion
    setTimeout(() => {
      setGeneratedReports(prev => prev.map(report => 
        report.id === newReport.id 
          ? { 
              ...report, 
              status: 'Generated' as const, 
              recordCount: Math.floor(Math.random() * 1000) + 50,
              downloadUrl: `/reports/${selectedTemplate.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.pdf`
            }
          : report
      ))
    }, 3000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Generated': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Failed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const handleDownload = (report: GeneratedReport) => {
    if (report.downloadUrl) {
      // In a real app, this would trigger the actual download
      alert(`Downloading: ${report.name}`)
    }
  }

  return (
    <div className="flex-1 overflow-auto">
    <div className="p-6">
        {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Item Management Reports</h1>
          <p className="text-gray-600 dark:text-gray-400">Generate comprehensive reports and analytics for item inventory, usage, and management insights</p>
        </div>

        {/* Report Templates */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Report Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportTemplates.map((template) => (
              <div
                key={template.id}
                className={`${template.bgColor} rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer`}
                onClick={() => handleGenerateReport(template)}
              >
                <div className={`w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4 ${template.color}`}>
                  {template.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {template.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {template.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-2 py-1 rounded">
                    {template.category}
                  </span>
                  {template.lastGenerated && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Last: {template.lastGenerated}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Generated Reports */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Generated Reports</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">View and download previously generated reports</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Report Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Generated By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Records
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
                {generatedReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {report.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {report.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {report.generatedBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {report.generatedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {report.recordCount > 0 ? report.recordCount.toLocaleString() : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        {report.status === 'Generated' && (
                          <button
                            onClick={() => handleDownload(report)}
                            className="text-teal-600 hover:text-teal-900 dark:text-teal-400 dark:hover:text-teal-300 flex items-center space-x-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>Download</span>
                          </button>
                        )}
                        {report.status === 'Processing' && (
                          <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400">
                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Processing</span>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
      
        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-teal-600">{generatedReports.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Reports</div>
              </div>
              <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{generatedReports.filter(r => r.status === 'Generated').length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Available</div>
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
                <div className="text-2xl font-bold text-blue-600">{generatedReports.filter(r => r.status === 'Processing').length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Processing</div>
              </div>
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg className="animate-spin w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">{reportTemplates.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Templates</div>
              </div>
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Generate Report Modal */}
      {showGenerateModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Generate Report</h3>
              <button
                onClick={() => setShowGenerateModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className={`${selectedTemplate.bgColor} rounded-lg p-4`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center ${selectedTemplate.color}`}>
                    {selectedTemplate.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{selectedTemplate.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedTemplate.description}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Report Parameters</h4>
                <div className="space-y-3">
                  {selectedTemplate.parameters.map((param, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {param}
                      </label>
                      <input
                        type="text"
                        value={reportParameters[param] || ''}
                        onChange={(e) => setReportParameters(prev => ({ ...prev, [param]: e.target.value }))}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder={`Enter ${param.toLowerCase()}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Output Format
                </label>
                <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel (XLSX)</option>
                  <option value="csv">CSV</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowGenerateModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmGenerate}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
                >
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
