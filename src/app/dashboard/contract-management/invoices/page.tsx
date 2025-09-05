"use client"

import { useState } from 'react'

interface Invoice {
  id: string
  invoiceNumber: string
  contractId: string
  contractTitle: string
  vendor: string
  amount: number
  issueDate: string
  dueDate: string
  status: 'paid' | 'pending' | 'overdue' | 'received' | 'processing'
  description: string
  paymentDate?: string
  paymentMethod?: string
  category: string
  attachments: number
  assetId?: string
  assetName?: string
  assetLocation?: string
  receivedDate: string
  approvedBy?: string
  paymentReference?: string
  receiptUploaded?: boolean
  receiptFileName?: string
}

export default function ContractInvoicesPage() {
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [showReceiptUpload, setShowReceiptUpload] = useState(false)
  const [uploadingReceipt, setUploadingReceipt] = useState(false)
  const [showRecordModal, setShowRecordModal] = useState(false)
  const [newInvoice, setNewInvoice] = useState({
    invoiceNumber: '',
    vendor: '',
    contractId: '',
    contractTitle: '',
    amount: '',
    issueDate: '',
    dueDate: '',
    description: '',
    category: 'Maintenance',
    assetId: '',
    assetName: '',
    assetLocation: ''
  })

  // Sample invoice data - Invoices received by Lasiama for payment
  const invoices: Invoice[] = [
    {
      id: '1',
      invoiceNumber: 'INV-2025-001',
      contractId: 'CT-2025-001',
      contractTitle: 'Hospital Equipment Maintenance',
      vendor: 'MedTech Solutions Ltd',
      amount: 2500000,
      issueDate: '2025-01-15',
      dueDate: '2025-02-15',
      status: 'paid',
      description: 'Monthly maintenance service for medical equipment',
      paymentDate: '2025-01-20',
      paymentMethod: 'Bank Transfer',
      paymentReference: 'PAY-2025-001',
      category: 'Maintenance',
      attachments: 3,
      assetId: 'LAS-HLT-001',
      assetName: 'Lagos State General Hospital Main Building',
      assetLocation: 'Ikeja, Lagos State',
      receivedDate: '2025-01-16',
      approvedBy: 'Dr. Adebayo Johnson',
      receiptUploaded: true,
      receiptFileName: 'payment_receipt_INV-2025-001.pdf'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2025-002',
      contractId: 'CT-2025-002',
      contractTitle: 'HVAC System Upgrade',
      vendor: 'Climate Control Systems',
      amount: 15000000,
      issueDate: '2025-01-20',
      dueDate: '2025-02-20',
      status: 'pending',
      description: 'Installation of new HVAC units in Block A',
      category: 'Infrastructure',
      attachments: 5,
      assetId: 'LAS-HLT-001',
      assetName: 'Lagos State General Hospital Main Building',
      assetLocation: 'Ikeja, Lagos State',
      receivedDate: '2025-01-22',
      approvedBy: 'Eng. Fatima Okafor'
    },
    {
      id: '3',
      invoiceNumber: 'INV-2025-003',
      contractId: 'CT-2025-003',
      contractTitle: 'Security System Installation',
      vendor: 'SecureGuard Technologies',
      amount: 8750000,
      issueDate: '2024-12-15',
      dueDate: '2025-01-15',
      status: 'overdue',
      description: 'Installation of CCTV and access control systems',
      category: 'Security',
      attachments: 2,
      assetId: 'LAS-GOV-001',
      assetName: 'Lagos State Secretariat Complex',
      assetLocation: 'Alausa, Ikeja',
      receivedDate: '2024-12-16',
      approvedBy: 'Mr. Tunde Adebisi'
    },
    {
      id: '4',
      invoiceNumber: 'INV-2025-004',
      contractId: 'CT-2025-004',
      contractTitle: 'Cleaning Services Contract',
      vendor: 'CleanPro Services',
      amount: 450000,
      issueDate: '2025-01-25',
      dueDate: '2025-02-25',
      status: 'processing',
      description: 'Monthly cleaning services for all hospital floors',
      category: 'Services',
      attachments: 1,
      assetId: 'LAS-HLT-001',
      assetName: 'Lagos State General Hospital Main Building',
      assetLocation: 'Ikeja, Lagos State',
      receivedDate: '2025-01-26',
      approvedBy: 'Mrs. Kemi Adeyemi'
    },
    {
      id: '5',
      invoiceNumber: 'INV-2025-005',
      contractId: 'CT-2025-005',
      contractTitle: 'Medical Supplies Contract',
      vendor: 'HealthSupply Nigeria',
      amount: 12000000,
      issueDate: '2025-01-10',
      dueDate: '2025-02-10',
      status: 'paid',
      description: 'Quarterly medical supplies and consumables',
      paymentDate: '2025-01-25',
      paymentMethod: 'Electronic Transfer',
      paymentReference: 'PAY-2025-002',
      category: 'Supplies',
      attachments: 4,
      assetId: 'LAS-HLT-001',
      assetName: 'Lagos State General Hospital Main Building',
      assetLocation: 'Ikeja, Lagos State',
      receivedDate: '2025-01-12',
      approvedBy: 'Dr. Adebayo Johnson',
      receiptUploaded: true,
      receiptFileName: 'payment_receipt_INV-2025-005.pdf'
    },
    {
      id: '6',
      invoiceNumber: 'INV-2025-006',
      contractId: 'CT-2025-006',
      contractTitle: 'IT Support Services',
      vendor: 'TechSupport Pro',
      amount: 1200000,
      issueDate: '2025-01-28',
      dueDate: '2025-02-28',
      status: 'received',
      description: 'Monthly IT support and network maintenance',
      category: 'IT Services',
      attachments: 2,
      assetId: 'LAS-EDU-003',
      assetName: 'Lagos State University Main Campus',
      assetLocation: 'Ojo, Lagos State',
      receivedDate: '2025-01-29'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'overdue': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'received': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'processing': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return '✅'
      case 'pending': return '⏳'
      case 'overdue': return '🚨'
      case 'received': return '📨'
      case 'processing': return '⚙️'
      default: return '📄'
    }
  }

  const filteredInvoices = invoices.filter(invoice => {
    const matchesStatus = selectedStatus === 'all' || invoice.status === selectedStatus
    const matchesSearch = !searchQuery || 
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.contractTitle.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesStatus && matchesSearch
  })

  const stats = {
    total: invoices.length,
    paid: invoices.filter(inv => inv.status === 'paid').length,
    pending: invoices.filter(inv => inv.status === 'pending' || inv.status === 'processing').length,
    overdue: invoices.filter(inv => inv.status === 'overdue').length,
    received: invoices.filter(inv => inv.status === 'received').length,
    totalAmount: invoices.reduce((sum, inv) => sum + inv.amount, 0),
    paidAmount: invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0),
    pendingAmount: invoices.filter(inv => inv.status === 'pending' || inv.status === 'processing').reduce((sum, inv) => sum + inv.amount, 0),
    overdueAmount: invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const handleMarkAsPaid = (invoice: Invoice) => {
    // In a real app, this would make an API call
    console.log('Marking invoice as paid:', invoice.invoiceNumber)
    setSelectedInvoice(invoice)
    setShowReceiptUpload(true)
  }

  const handleUploadReceipt = (file: File) => {
    setUploadingReceipt(true)
    
    // Simulate file upload
    setTimeout(() => {
      console.log('Receipt uploaded:', file.name)
      alert(`Payment processed successfully!\nInvoice: ${selectedInvoice?.invoiceNumber}\nReceipt: ${file.name}`)
      setUploadingReceipt(false)
      setShowReceiptUpload(false)
      setSelectedInvoice(null)
    }, 2000)
  }

  const handleRecordInvoice = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!newInvoice.invoiceNumber || !newInvoice.vendor || !newInvoice.amount || !newInvoice.dueDate) {
      alert('Please fill in all required fields')
      return
    }

    // Create new invoice object
    const invoiceToRecord = {
      id: Date.now().toString(),
      invoiceNumber: newInvoice.invoiceNumber,
      contractId: newInvoice.contractId || `CT-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999)).padStart(3, '0')}`,
      contractTitle: newInvoice.contractTitle || `${newInvoice.category} Contract`,
      vendor: newInvoice.vendor,
      amount: parseInt(newInvoice.amount),
      issueDate: newInvoice.issueDate || new Date().toISOString().split('T')[0],
      dueDate: newInvoice.dueDate,
      status: 'received' as const,
      description: newInvoice.description || `${newInvoice.category} services`,
      category: newInvoice.category,
      attachments: 1,
      assetId: newInvoice.assetId || undefined,
      assetName: newInvoice.assetName || undefined,
      assetLocation: newInvoice.assetLocation || undefined,
      receivedDate: new Date().toISOString().split('T')[0],
      approvedBy: undefined,
      paymentReference: undefined,
      receiptUploaded: false
    }

    console.log('Recording new invoice:', invoiceToRecord)
    alert(`Invoice ${newInvoice.invoiceNumber} has been recorded successfully!\nVendor: ${newInvoice.vendor}\nAmount: ${formatCurrency(parseInt(newInvoice.amount))}`)
    
    // Reset form and close modal
    setNewInvoice({
      invoiceNumber: '',
      vendor: '',
      contractId: '',
      contractTitle: '',
      amount: '',
      issueDate: '',
      dueDate: '',
      description: '',
      category: 'Maintenance',
      assetId: '',
      assetName: '',
      assetLocation: ''
    })
    setShowRecordModal(false)
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Received Invoices</h1>
            <p className="text-gray-600 dark:text-gray-400">Track and process invoices received from contractors and vendors</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowRecordModal(true)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Record Invoice</span>
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Invoices</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {formatCurrency(stats.totalAmount)}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Paid</p>
                <p className="text-3xl font-bold text-green-600">{stats.paid}</p>
                <p className="text-sm text-green-600 mt-1">
                  {formatCurrency(stats.paidAmount)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                <p className="text-sm text-yellow-600 mt-1">
                  {formatCurrency(stats.pendingAmount)}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Overdue</p>
                <p className="text-3xl font-bold text-red-600">{stats.overdue}</p>
                <p className="text-sm text-red-600 mt-1">
                  {formatCurrency(stats.overdueAmount)}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filter Invoices</h3>
            <button
              onClick={() => {
                setSelectedStatus('all')
                setSearchQuery('')
              }}
              className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Clear All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search invoices, vendors, contracts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="received">Received</option>
                <option value="processing">Processing</option>
                <option value="pending">Pending Payment</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date Range</label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Invoice List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Invoices ({filteredInvoices.length})
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Vendor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Asset
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {invoice.invoiceNumber}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Received: {new Date(invoice.receivedDate).toLocaleDateString('en-GB')}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {invoice.vendor}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {invoice.category}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {invoice.assetName || 'Multiple Assets'}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {invoice.assetLocation || invoice.contractTitle}
                      </div>
                      {invoice.assetId && (
                        <div className="text-xs text-blue-600 dark:text-blue-400">
                          {invoice.assetId}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-gray-900 dark:text-white">
                        {formatCurrency(invoice.amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900 dark:text-white">
                        {new Date(invoice.dueDate).toLocaleDateString('en-GB')}
                      </div>
                      {invoice.status === 'overdue' && (
                        <div className="text-sm text-red-600 dark:text-red-400">
                          {Math.floor((new Date().getTime() - new Date(invoice.dueDate).getTime()) / (1000 * 60 * 60 * 24))} days overdue
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                        <span className="mr-1">{getStatusIcon(invoice.status)}</span>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedInvoice(invoice)
                            setShowInvoiceModal(true)
                          }}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 font-medium text-sm"
                        >
                          View
                        </button>
                        {invoice.status !== 'paid' && (
                          <button
                            onClick={() => handleMarkAsPaid(invoice)}
                            className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 font-medium text-sm"
                          >
                            Mark as Paid
                          </button>
                        )}
                        {invoice.status === 'paid' && invoice.receiptUploaded && (
                          <span className="text-green-600 dark:text-green-400 text-xs">
                            ✅ Receipt Uploaded
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredInvoices.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-600 dark:text-gray-400">No invoices found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Invoice Details Modal */}
      {showInvoiceModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Invoice Details</h3>
                <button
                  onClick={() => setShowInvoiceModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Invoice Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Invoice Number:</strong> {selectedInvoice.invoiceNumber}</div>
                    <div><strong>Issue Date:</strong> {new Date(selectedInvoice.issueDate).toLocaleDateString('en-GB')}</div>
                    <div><strong>Received Date:</strong> {new Date(selectedInvoice.receivedDate).toLocaleDateString('en-GB')}</div>
                    <div><strong>Due Date:</strong> {new Date(selectedInvoice.dueDate).toLocaleDateString('en-GB')}</div>
                    <div><strong>Amount:</strong> {formatCurrency(selectedInvoice.amount)}</div>
                    <div><strong>Status:</strong> 
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedInvoice.status)}`}>
                        {getStatusIcon(selectedInvoice.status)} {selectedInvoice.status.charAt(0).toUpperCase() + selectedInvoice.status.slice(1)}
                      </span>
                    </div>
                    {selectedInvoice.approvedBy && (
                      <div><strong>Approved By:</strong> {selectedInvoice.approvedBy}</div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Asset & Contract</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Asset:</strong> {selectedInvoice.assetName || 'Multiple Assets'}</div>
                    {selectedInvoice.assetId && (
                      <div><strong>Asset ID:</strong> {selectedInvoice.assetId}</div>
                    )}
                    {selectedInvoice.assetLocation && (
                      <div><strong>Location:</strong> {selectedInvoice.assetLocation}</div>
                    )}
                    <div><strong>Vendor:</strong> {selectedInvoice.vendor}</div>
                    <div><strong>Category:</strong> {selectedInvoice.category}</div>
                    <div><strong>Contract:</strong> {selectedInvoice.contractTitle}</div>
                    <div><strong>Contract ID:</strong> {selectedInvoice.contractId}</div>
                    <div><strong>Attachments:</strong> {selectedInvoice.attachments} files</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Description</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  {selectedInvoice.description}
                </p>
              </div>

              {selectedInvoice.status === 'paid' && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Payment Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><strong>Payment Date:</strong> {selectedInvoice.paymentDate ? new Date(selectedInvoice.paymentDate).toLocaleDateString('en-GB') : 'N/A'}</div>
                    <div><strong>Payment Method:</strong> {selectedInvoice.paymentMethod || 'N/A'}</div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowInvoiceModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 font-medium"
                >
                  Close
                </button>
                {selectedInvoice.status !== 'paid' && (
                  <button
                    onClick={() => {
                      handleMarkAsPaid(selectedInvoice)
                      setShowInvoiceModal(false)
                    }}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Mark as Paid
                  </button>
                )}
                {selectedInvoice.status === 'paid' && selectedInvoice.receiptUploaded && (
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                    View Receipt
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Upload Modal */}
      {showReceiptUpload && selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Upload Payment Receipt</h3>
                <button
                  onClick={() => {
                    setShowReceiptUpload(false)
                    setSelectedInvoice(null)
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedInvoice.invoiceNumber}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedInvoice.vendor} • {formatCurrency(selectedInvoice.amount)}
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="receipt-upload"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      handleUploadReceipt(file)
                    }
                  }}
                  className="hidden"
                  disabled={uploadingReceipt}
                />
                <label
                  htmlFor="receipt-upload"
                  className={`cursor-pointer ${uploadingReceipt ? 'opacity-50' : ''}`}
                >
                  <div className="text-4xl mb-2">📄</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {uploadingReceipt ? 'Uploading...' : 'Click to upload receipt'}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    PDF, JPG, PNG up to 10MB
                  </div>
                </label>
                {uploadingReceipt && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Upload the payment receipt to complete the payment process
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowReceiptUpload(false)
                    setSelectedInvoice(null)
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 font-medium"
                  disabled={uploadingReceipt}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Record Invoice Modal */}
      {showRecordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Record New Invoice</h3>
                <button
                  onClick={() => {
                    setShowRecordModal(false)
                    setNewInvoice({
                      invoiceNumber: '',
                      vendor: '',
                      contractId: '',
                      contractTitle: '',
                      amount: '',
                      issueDate: '',
                      dueDate: '',
                      description: '',
                      category: 'Maintenance',
                      assetId: '',
                      assetName: '',
                      assetLocation: ''
                    })
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleRecordInvoice} className="p-6 space-y-6">
              {/* Invoice Details */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Invoice Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Invoice Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={newInvoice.invoiceNumber}
                      onChange={(e) => setNewInvoice({...newInvoice, invoiceNumber: e.target.value})}
                      placeholder="e.g., INV-2025-007"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Vendor *
                    </label>
                    <input
                      type="text"
                      required
                      value={newInvoice.vendor}
                      onChange={(e) => setNewInvoice({...newInvoice, vendor: e.target.value})}
                      placeholder="e.g., ABC Construction Ltd"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Amount (₦) *
                    </label>
                    <input
                      type="number"
                      required
                      value={newInvoice.amount}
                      onChange={(e) => setNewInvoice({...newInvoice, amount: e.target.value})}
                      placeholder="e.g., 1500000"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={newInvoice.category}
                      onChange={(e) => setNewInvoice({...newInvoice, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="Maintenance">Maintenance</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Security">Security</option>
                      <option value="Services">Services</option>
                      <option value="Supplies">Supplies</option>
                      <option value="IT Services">IT Services</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Dates</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Issue Date
                    </label>
                    <input
                      type="date"
                      value={newInvoice.issueDate}
                      onChange={(e) => setNewInvoice({...newInvoice, issueDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Due Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={newInvoice.dueDate}
                      onChange={(e) => setNewInvoice({...newInvoice, dueDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Contract & Asset Details */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contract & Asset Details (Optional)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Contract ID
                    </label>
                    <input
                      type="text"
                      value={newInvoice.contractId}
                      onChange={(e) => setNewInvoice({...newInvoice, contractId: e.target.value})}
                      placeholder="e.g., CT-2025-007"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Asset ID
                    </label>
                    <input
                      type="text"
                      value={newInvoice.assetId}
                      onChange={(e) => setNewInvoice({...newInvoice, assetId: e.target.value})}
                      placeholder="e.g., LAS-HLT-001"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Asset Name
                    </label>
                    <input
                      type="text"
                      value={newInvoice.assetName}
                      onChange={(e) => setNewInvoice({...newInvoice, assetName: e.target.value})}
                      placeholder="e.g., Lagos State General Hospital"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Asset Location
                    </label>
                    <input
                      type="text"
                      value={newInvoice.assetLocation}
                      onChange={(e) => setNewInvoice({...newInvoice, assetLocation: e.target.value})}
                      placeholder="e.g., Ikeja, Lagos State"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={newInvoice.description}
                  onChange={(e) => setNewInvoice({...newInvoice, description: e.target.value})}
                  placeholder="Brief description of services or goods provided..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => {
                    setShowRecordModal(false)
                    setNewInvoice({
                      invoiceNumber: '',
                      vendor: '',
                      contractId: '',
                      contractTitle: '',
                      amount: '',
                      issueDate: '',
                      dueDate: '',
                      description: '',
                      category: 'Maintenance',
                      assetId: '',
                      assetName: '',
                      assetLocation: ''
                    })
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Record Invoice</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
