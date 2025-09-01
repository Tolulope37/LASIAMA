"use client"

import { useState } from "react"

export default function MaintenanceAndFaultsPage() {
  // Available assets for dropdown selection
  const availableAssets = [
    "Lagos State General Hospital Main Building",
    "Lagos State University Teaching Hospital", 
    "Surulere Primary Healthcare Center",
    "Ayinke House Maternity Center",
    "Neuropsychiatric Hospital Yaba",
    "Lagos State University Main Campus",
    "Ikorodu Primary School", 
    "Adeniran Ogunsanya College of Education",
    "Lagos State Secretariat Complex",
    "Ministry of Health Building",
    "Lagos High Court Complex",
    "Third Mainland Bridge",
    "Lagos-Ibadan Expressway (Lagos Section)",
    "Ogudu Water Treatment Plant",
    "Lagos BRT Blue Line",
    "Mile 2 BRT Terminal",
    "Lagos State Ferry Services",
    "Tafawa Balewa Square Parking Complex",
    "Murtala Muhammed Airport Terminal 2",
    "Victoria Island Water Supply System",
    "Festac Sewage Treatment Plant",
    "Lagos Gas Distribution Network",
    "Lagos Street Lighting System",
    "Ikoyi Public Toilets",
    "Dolphin Estate Public Housing",
    "Government Staff Quarters Ikeja",
    "Alaba International Market",
    "Computer Village Shopping Center",
    "Tafawa Balewa Square",
    "Teslim Balogun Stadium",
    "National Theatre Lagos",
    "Area F Police Station",
    "Lagos State Fire Service Headquarters",
    "Lagos State CCTV Monitoring Network",
    "Lagos Emergency Response Center",
    "Kirikiri Correctional Center",
    "Lagos State Medical Equipment Pool",
    "Government IT Infrastructure",
    "Government Office Equipment Pool",
    "Lagos State Construction Equipment Fleet",
    "Lagos State Laboratory Equipment Network",
    "Lagos State Power Generator Network"
  ]
  const [activeTab, setActiveTab] = useState('maintenance')
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [selectedFault, setSelectedFault] = useState<any>(null)
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [showFaultModal, setShowFaultModal] = useState(false)
  const [showResolveModal, setShowResolveModal] = useState(false)
  const [resolveNotes, setResolveNotes] = useState('')
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [updateData, setUpdateData] = useState({
    status: '',
    progress: 0,
    actualCost: '',
    notes: ''
  })
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)
  const [showReportIssueModal, setShowReportIssueModal] = useState(false)
  const [newProjectData, setNewProjectData] = useState({
    title: '',
    asset: '',
    type: 'Capital Replacement',
    priority: 'High',
    description: '',
    estimatedCost: '',
    scheduledDate: '',
    completionDate: '',
    contractor: '',
    projectManager: '',
    scope: '',
    images: [] as File[],
    drawings: [] as File[],
    quotes: [] as File[]
  })
  const [newIssueData, setNewIssueData] = useState({
    title: '',
    asset: '',
    priority: 'Critical',
    description: '',
    urgency: '',
    estimatedRepairCost: '',
    contractor: ''
  })
  
  // Filter states
  const [projectFilters, setProjectFilters] = useState({
    type: 'all',
    status: 'all',
    search: ''
  })
  
  const [faultFilters, setFaultFilters] = useState({
    priority: 'all',
    status: 'all',
    search: ''
  })
  
  const [majorProjects, setMajorProjects] = useState([
    {
      id: 1,
      title: "Complete AC System Replacement - 25 Units",
      asset: "Lagos State Secretariat Main Building",
      type: "Capital Replacement",
      priority: "High",
      status: "In Progress",
      assignedTo: "Climate Control Systems Ltd",
      scheduledDate: "15/02/2024",
      completionDate: "30/04/2024",
      estimatedCost: "₦45,000,000",
      actualCost: "₦42,500,000",
      progress: 65,
      description: "Full replacement of aging HVAC system across 8 floors including ductwork, electrical connections, and control systems.",
      scope: "25 AC Units, Ductwork, Electrical, Controls",
      contractor: "Climate Control Systems Ltd",
      projectManager: "Eng. Adebayo Johnson"
    },
    {
      id: 2,
      title: "Roof Replacement & Waterproofing Project",
      asset: "Lagos State University Teaching Hospital",
      type: "Major Renovation",
      priority: "Critical",
      status: "Planning",
      assignedTo: "Roofing Specialists Nigeria",
      scheduledDate: "01/03/2024",
      completionDate: "15/06/2024",
      estimatedCost: "₦85,000,000",
      actualCost: "₦0",
      progress: 15,
      description: "Complete roof replacement for main hospital building due to extensive water damage. Includes structural repairs and modern waterproofing systems.",
      scope: "12,000 sqm roof area, Structural repairs, Waterproofing",
      contractor: "Roofing Specialists Nigeria",
      projectManager: "Eng. Sarah Okafor"
    },
    {
      id: 3,
      title: "Electrical Infrastructure Upgrade",
      asset: "Government House Complex",
      type: "Infrastructure Upgrade",
      priority: "High",
      status: "Scheduled",
      assignedTo: "PowerTech Engineering",
      scheduledDate: "30/01/2024",
      completionDate: "30/05/2024",
      estimatedCost: "₦125,000,000",
      actualCost: "₦0",
      progress: 0,
      description: "Upgrade of main electrical distribution system, installation of backup generators, and modernization of lighting systems across the entire complex.",
      scope: "Main electrical panel, 3 Backup generators, LED lighting conversion",
      contractor: "PowerTech Engineering",
      projectManager: "Eng. Michael Okonkwo"
    },
    {
      id: 4,
      title: "Building Structural Rehabilitation",
      asset: "Lagos State General Hospital",
      type: "Structural Repair",
      priority: "Critical",
      status: "Completed",
      assignedTo: "Structural Engineering Associates",
      scheduledDate: "01/08/2023",
      completionDate: "15/12/2023",
      estimatedCost: "₦180,000,000",
      actualCost: "₦175,000,000",
      progress: 100,
      description: "Major structural repairs including foundation reinforcement, column strengthening, and floor slab repairs for the 8-story hospital building.",
      scope: "Foundation work, Column reinforcement, Floor repairs, Seismic upgrades",
      contractor: "Structural Engineering Associates",
      projectManager: "Eng. Fatima Abdullahi"
    },
    {
      id: 5,
      title: "Fire Safety System Installation",
      asset: "Lagos State Secretariat Towers A & B",
      type: "Safety Upgrade",
      priority: "High",
      status: "In Progress",
      assignedTo: "Fire Protection Systems Ltd",
      scheduledDate: "15/01/2024",
      completionDate: "30/03/2024",
      estimatedCost: "₦95,000,000",
      actualCost: "₦87,000,000",
      progress: 80,
      description: "Installation of comprehensive fire safety systems including sprinklers, fire alarms, emergency exits, and firefighting equipment across both towers.",
      scope: "Sprinkler systems, Fire alarms, Emergency exits, Firefighting equipment",
      contractor: "Fire Protection Systems Ltd",
      projectManager: "Eng. Ibrahim Musa"
    }
  ])

  const [majorFaults, setMajorFaults] = useState([
    {
      id: 1,
      title: "Structural Cracks in Building Foundation",
      asset: "Lagos State University Main Campus - Engineering Block",
      priority: "Critical",
      status: "Open",
      reportedBy: "Structural Engineer",
      reportedDate: "10/01/2024",
      description: "Major structural cracks observed in the foundation and supporting columns. Immediate assessment required to determine building safety.",
      estimatedRepairCost: "₦85,000,000",
      urgency: "Immediate - Building evacuation may be required",
      contractor: "Structural Engineering Associates"
    },
    {
      id: 2,
      title: "Complete Electrical System Failure - East Wing",
      asset: "Lagos State General Hospital",
      priority: "Critical", 
      status: "In Progress",
      reportedBy: "Chief Electrician",
      reportedDate: "12/01/2024",
      description: "Total electrical failure in East Wing affecting 120 hospital beds. Emergency generators running but need permanent solution.",
      estimatedRepairCost: "₦35,000,000",
      urgency: "Critical - Patient safety at risk",
      contractor: "PowerTech Engineering"
    },
    {
      id: 3,
      title: "Roof Collapse Risk - Multiple Sections",
      asset: "Lagos State Secretariat Building C",
      priority: "Critical",
      status: "Open",
      reportedBy: "Building Inspector",
      reportedDate: "08/01/2024",
      description: "Severe water damage and structural deterioration in roof sections. Multiple areas showing signs of imminent collapse.",
      estimatedRepairCost: "₦120,000,000",
      urgency: "Immediate - Sections cordoned off",
      contractor: "Roofing Specialists Nigeria"
    },
    {
      id: 4,
      title: "Water System Contamination - Campus Wide",
      asset: "Lagos State University Teaching Hospital",
      priority: "High",
      status: "In Progress",
      reportedBy: "Water Quality Inspector",
      reportedDate: "05/01/2024",
      description: "Bacterial contamination detected in main water supply system affecting entire hospital complex. Alternative water sources being used.",
      estimatedRepairCost: "₦55,000,000",
      urgency: "High - Health risk to patients",
      contractor: "Water Systems Engineering Ltd"
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planning': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'Scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'In Progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'On Hold': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'Overdue': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'Open': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'Resolved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Closed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'High': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  // Filter functions
  const getFilteredProjects = () => {
    return majorProjects.filter(project => {
      // Type filter
      if (projectFilters.type !== 'all' && project.type.toLowerCase() !== projectFilters.type.toLowerCase()) {
        return false
      }
      
      // Status filter
      if (projectFilters.status !== 'all' && project.status.toLowerCase() !== projectFilters.status.toLowerCase()) {
        return false
      }
      
      // Search filter
      if (projectFilters.search) {
        const searchTerm = projectFilters.search.toLowerCase()
        const matchesSearch = 
          project.title.toLowerCase().includes(searchTerm) ||
          project.asset.toLowerCase().includes(searchTerm) ||
          project.contractor.toLowerCase().includes(searchTerm) ||
          project.projectManager.toLowerCase().includes(searchTerm)
        
        if (!matchesSearch) return false
      }
      
      return true
    })
  }

  const getFilteredFaults = () => {
    return majorFaults.filter(fault => {
      // Priority filter
      if (faultFilters.priority !== 'all' && fault.priority.toLowerCase() !== faultFilters.priority.toLowerCase()) {
        return false
      }
      
      // Status filter
      if (faultFilters.status !== 'all' && fault.status.toLowerCase() !== faultFilters.status.toLowerCase()) {
        return false
      }
      
      // Search filter
      if (faultFilters.search) {
        const searchTerm = faultFilters.search.toLowerCase()
        const matchesSearch = 
          fault.title.toLowerCase().includes(searchTerm) ||
          fault.asset.toLowerCase().includes(searchTerm) ||
          fault.contractor.toLowerCase().includes(searchTerm) ||
          fault.reportedBy.toLowerCase().includes(searchTerm)
        
        if (!matchesSearch) return false
      }
      
      return true
    })
  }

  // Button handlers
  const handleViewProject = (project: any) => {
    setSelectedProject(project)
    setShowProjectModal(true)
  }

  const handleUpdateProject = (project: any) => {
    setSelectedProject(project)
    setUpdateData({
      status: project.status,
      progress: project.progress,
      actualCost: project.actualCost,
      notes: ''
    })
    setShowUpdateModal(true)
  }

  const confirmUpdateProject = () => {
    if (selectedProject) {
      const updatedProjects = majorProjects.map(p => 
        p.id === selectedProject.id ? { 
          ...p, 
          status: updateData.status,
          progress: updateData.progress,
          actualCost: updateData.actualCost,
          lastUpdated: new Date().toLocaleDateString('en-GB'),
          updateNotes: updateData.notes
        } : p
      )
      setMajorProjects(updatedProjects)
      setShowUpdateModal(false)
      setUpdateData({ status: '', progress: 0, actualCost: '', notes: '' })
      setSelectedProject(null)
      
      // Show success notification
      alert(`✅ Project "${selectedProject.title}" has been successfully updated!`)
    }
  }

  const handleViewFault = (fault: any) => {
    setSelectedFault(fault)
    setShowFaultModal(true)
  }

  const handleResolveFault = (fault: any) => {
    setSelectedFault(fault)
    setShowResolveModal(true)
  }

  const confirmResolveFault = () => {
    if (selectedFault) {
      // Update fault status to resolved
      const updatedFaults = majorFaults.map(f => 
        f.id === selectedFault.id ? { 
          ...f, 
          status: 'Resolved',
          resolvedDate: new Date().toLocaleDateString('en-GB'),
          resolvedBy: 'Admin User',
          resolveNotes: resolveNotes
        } : f
      )
      setMajorFaults(updatedFaults)
      setShowResolveModal(false)
      setResolveNotes('')
      setSelectedFault(null)
      
      // Show success notification
      alert(`✅ Fault "${selectedFault.title}" has been successfully resolved!`)
    }
  }

  const handleCreateProject = () => {
    // In a real application, you would upload files to a server/cloud storage
    // and get back URLs to store in the project data
    const uploadedFiles = {
      images: newProjectData.images.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file) // Temporary URL for demo
      })),
      drawings: newProjectData.drawings.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file) // Temporary URL for demo
      })),
      quotes: newProjectData.quotes.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file) // Temporary URL for demo
      }))
    }

    const newProject = {
      id: majorProjects.length + 1,
      title: newProjectData.title,
      asset: newProjectData.asset,
      type: newProjectData.type,
      priority: newProjectData.priority,
      status: 'Planning',
      assignedTo: newProjectData.contractor,
      scheduledDate: newProjectData.scheduledDate,
      completionDate: newProjectData.completionDate,
      estimatedCost: newProjectData.estimatedCost,
      actualCost: '₦0',
      progress: 0,
      description: newProjectData.description,
      scope: newProjectData.scope,
      contractor: newProjectData.contractor,
      projectManager: newProjectData.projectManager,
      files: uploadedFiles,
      totalFiles: newProjectData.images.length + newProjectData.drawings.length + newProjectData.quotes.length
    }
    
    setMajorProjects([...majorProjects, newProject])
    setShowNewProjectModal(false)
    setNewProjectData({
      title: '',
      asset: '',
      type: 'Capital Replacement',
      priority: 'High',
      description: '',
      estimatedCost: '',
      scheduledDate: '',
      completionDate: '',
      contractor: '',
      projectManager: '',
      scope: '',
      images: [] as File[],
      drawings: [] as File[],
      quotes: [] as File[]
    })
    
    alert(`✅ New capital project "${newProject.title}" has been created successfully!`)
  }

  const handleReportIssue = () => {
    const newIssue = {
      id: majorFaults.length + 1,
      title: newIssueData.title,
      asset: newIssueData.asset,
      priority: newIssueData.priority,
      status: 'Open',
      reportedBy: 'Admin User',
      reportedDate: new Date().toLocaleDateString('en-GB'),
      description: newIssueData.description,
      estimatedRepairCost: newIssueData.estimatedRepairCost,
      urgency: newIssueData.urgency,
      contractor: newIssueData.contractor
    }
    
    setMajorFaults([...majorFaults, newIssue])
    setShowReportIssueModal(false)
    setNewIssueData({
      title: '',
      asset: '',
      priority: 'Critical',
      description: '',
      urgency: '',
      estimatedRepairCost: '',
      contractor: ''
    })
    
    alert(`🚨 Critical issue "${newIssue.title}" has been reported successfully!`)
  }

  const filteredProjects = getFilteredProjects()
  const filteredFaults = getFilteredFaults()

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Major Capital Projects & Critical Issues</h1>
              <p className="text-gray-600 dark:text-gray-400">Track large-scale maintenance projects and critical infrastructure issues</p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setShowNewProjectModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                + New Capital Project
              </button>
              <button 
                onClick={() => setShowReportIssueModal(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                + Report Critical Issue
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Tab Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('maintenance')}
              className={`px-6 py-4 font-medium text-sm transition-colors ${
                activeTab === 'maintenance'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Capital Projects ({majorProjects.length})</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('faults')}
              className={`px-6 py-4 font-medium text-sm transition-colors ${
                activeTab === 'faults'
                  ? 'text-red-600 dark:text-red-400 border-b-2 border-red-600 dark:border-red-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span>Critical Issues ({majorFaults.length})</span>
              </div>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {activeTab === 'maintenance' ? (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Projects</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{filteredProjects.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                    <svg className="h-6 w-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">1</p>
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">1</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                    <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Budget</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">₦530M</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
                    <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Faults</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{filteredFaults.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
                    <svg className="h-6 w-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Critical</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">1</p>
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Resolved Today</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {activeTab === 'maintenance' ? (
                <>
                  <select 
                    value={projectFilters.type}
                    onChange={(e) => setProjectFilters({...projectFilters, type: e.target.value})}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="all">All Project Types</option>
                    <option value="capital replacement">Capital Replacement</option>
                    <option value="major renovation">Major Renovation</option>
                    <option value="infrastructure upgrade">Infrastructure Upgrade</option>
                    <option value="structural repair">Structural Repair</option>
                    <option value="safety upgrade">Safety Upgrade</option>
                  </select>
                  <select 
                    value={projectFilters.status}
                    onChange={(e) => setProjectFilters({...projectFilters, status: e.target.value})}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="all">All Status</option>
                    <option value="planning">Planning</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="on hold">On Hold</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Search capital projects..."
                    value={projectFilters.search}
                    onChange={(e) => setProjectFilters({...projectFilters, search: e.target.value})}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </>
              ) : (
                <>
                  <select 
                    value={faultFilters.priority}
                    onChange={(e) => setFaultFilters({...faultFilters, priority: e.target.value})}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="all">All Priorities</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  <select 
                    value={faultFilters.status}
                    onChange={(e) => setFaultFilters({...faultFilters, status: e.target.value})}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="all">All Status</option>
                    <option value="open">Open</option>
                    <option value="in progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Search critical issues..."
                    value={faultFilters.search}
                    onChange={(e) => setFaultFilters({...faultFilters, search: e.target.value})}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </>
              )}
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Export Report
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {activeTab === 'maintenance' ? 'Major Capital Projects' : 'Critical Infrastructure Issues'}
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {activeTab === 'maintenance' ? (
              filteredProjects.length > 0 ? filteredProjects.map((project) => (
                <div key={project.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {project.title}
                        </h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(project.priority)}`}>
                          {project.priority}
                        </span>
                        <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded text-xs font-medium">
                          {project.type}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{project.description}</p>
                      
                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span>{project.asset}</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>{project.projectManager}</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>Start: {project.scheduledDate}</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>End: {project.completionDate}</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          <span>Budget: {project.estimatedCost}</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Scope: {project.scope}</span>
                        </div>
                        {(project as any).totalFiles > 0 && (
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                            <span>Files: {(project as any).totalFiles}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleViewProject(project)}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => handleUpdateProject(project)}
                        className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                  <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-.974-5.709-2.292" />
                  </svg>
                  <p className="text-lg font-medium mb-2">No projects found</p>
                  <p>Try adjusting your filters or search terms</p>
                </div>
              )
            ) : (
              filteredFaults.length > 0 ? filteredFaults.map((fault) => (
                <div key={fault.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {fault.title}
                        </h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(fault.priority)}`}>
                          {fault.priority}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(fault.status)}`}>
                          {fault.status}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">{fault.description}</p>
                      
                      {/* Urgency Alert */}
                      <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                          <span className="text-red-700 dark:text-red-300 font-medium text-sm">
                            {fault.urgency}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span>{fault.asset}</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>Reported by {fault.reportedBy}</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{fault.reportedDate}</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          <span>Est. Repair: {fault.estimatedRepairCost}</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>Contractor: {fault.contractor}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleViewFault(fault)}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => handleResolveFault(fault)}
                        className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium"
                      >
                        Resolve
                      </button>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                  <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <p className="text-lg font-medium mb-2">No critical issues found</p>
                  <p>Try adjusting your filters or search terms</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* New Capital Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Create New Capital Project
                </h2>
                <button 
                  onClick={() => setShowNewProjectModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={newProjectData.title}
                    onChange={(e) => setNewProjectData({...newProjectData, title: e.target.value})}
                    placeholder="e.g., Complete AC System Replacement - 25 Units"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Asset/Building *
                  </label>
                  <select
                    value={newProjectData.asset}
                    onChange={(e) => setNewProjectData({...newProjectData, asset: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select an asset/building...</option>
                    {availableAssets.map((asset, index) => (
                      <option key={index} value={asset}>
                        {asset}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Project Type *
                  </label>
                  <select
                    value={newProjectData.type}
                    onChange={(e) => setNewProjectData({...newProjectData, type: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Capital Replacement">Capital Replacement</option>
                    <option value="Major Renovation">Major Renovation</option>
                    <option value="Infrastructure Upgrade">Infrastructure Upgrade</option>
                    <option value="Structural Repair">Structural Repair</option>
                    <option value="Safety Upgrade">Safety Upgrade</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priority *
                  </label>
                  <select
                    value={newProjectData.priority}
                    onChange={(e) => setNewProjectData({...newProjectData, priority: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Estimated Cost *
                  </label>
                  <input
                    type="text"
                    value={newProjectData.estimatedCost}
                    onChange={(e) => setNewProjectData({...newProjectData, estimatedCost: e.target.value})}
                    placeholder="e.g., ₦45,000,000"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Scheduled Start Date
                  </label>
                  <input
                    type="date"
                    value={newProjectData.scheduledDate}
                    onChange={(e) => setNewProjectData({...newProjectData, scheduledDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Expected Completion Date
                  </label>
                  <input
                    type="date"
                    value={newProjectData.completionDate}
                    onChange={(e) => setNewProjectData({...newProjectData, completionDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contractor
                  </label>
                  <input
                    type="text"
                    value={newProjectData.contractor}
                    onChange={(e) => setNewProjectData({...newProjectData, contractor: e.target.value})}
                    placeholder="e.g., Climate Control Systems Ltd"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Project Manager
                  </label>
                  <input
                    type="text"
                    value={newProjectData.projectManager}
                    onChange={(e) => setNewProjectData({...newProjectData, projectManager: e.target.value})}
                    placeholder="e.g., Eng. Adebayo Johnson"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Project Scope
                  </label>
                  <input
                    type="text"
                    value={newProjectData.scope}
                    onChange={(e) => setNewProjectData({...newProjectData, scope: e.target.value})}
                    placeholder="e.g., 25 AC Units, Ductwork, Electrical, Controls"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Project Description *
                  </label>
                  <textarea
                    value={newProjectData.description}
                    onChange={(e) => setNewProjectData({...newProjectData, description: e.target.value})}
                    placeholder="Describe the project in detail, including objectives, scope, and expected outcomes..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    required
                  />
                </div>
              </div>

              {/* File Upload Section */}
              <div className="mt-8 border-t border-gray-200 dark:border-gray-600 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  Project Documents & Media
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Images Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Project Images
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        id="images-upload"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || [])
                          setNewProjectData({...newProjectData, images: [...newProjectData.images, ...files]})
                        }}
                        className="hidden"
                      />
                      <label htmlFor="images-upload" className="cursor-pointer">
                        <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Click to upload images
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </label>
                    </div>
                    {newProjectData.images.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{newProjectData.images.length} file(s) selected:</p>
                        <div className="space-y-1 max-h-20 overflow-y-auto">
                          {newProjectData.images.map((file, index) => (
                            <div key={index} className="flex items-center justify-between text-xs bg-gray-50 dark:bg-gray-700 p-2 rounded">
                              <span className="truncate">{file.name}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedImages = newProjectData.images.filter((_, i) => i !== index)
                                  setNewProjectData({...newProjectData, images: updatedImages})
                                }}
                                className="text-red-500 hover:text-red-700 ml-2"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Drawings Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Technical Drawings
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        id="drawings-upload"
                        multiple
                        accept=".pdf,.dwg,.dxf,.png,.jpg,.jpeg"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || [])
                          setNewProjectData({...newProjectData, drawings: [...newProjectData.drawings, ...files]})
                        }}
                        className="hidden"
                      />
                      <label htmlFor="drawings-upload" className="cursor-pointer">
                        <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Upload drawings
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          PDF, DWG, DXF, Images
                        </p>
                      </label>
                    </div>
                    {newProjectData.drawings.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{newProjectData.drawings.length} file(s) selected:</p>
                        <div className="space-y-1 max-h-20 overflow-y-auto">
                          {newProjectData.drawings.map((file, index) => (
                            <div key={index} className="flex items-center justify-between text-xs bg-gray-50 dark:bg-gray-700 p-2 rounded">
                              <span className="truncate">{file.name}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedDrawings = newProjectData.drawings.filter((_, i) => i !== index)
                                  setNewProjectData({...newProjectData, drawings: updatedDrawings})
                                }}
                                className="text-red-500 hover:text-red-700 ml-2"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quotes Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Contractor Quotes
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        id="quotes-upload"
                        multiple
                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || [])
                          setNewProjectData({...newProjectData, quotes: [...newProjectData.quotes, ...files]})
                        }}
                        className="hidden"
                      />
                      <label htmlFor="quotes-upload" className="cursor-pointer">
                        <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Upload quotes
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          PDF, DOC, XLS files
                        </p>
                      </label>
                    </div>
                    {newProjectData.quotes.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{newProjectData.quotes.length} file(s) selected:</p>
                        <div className="space-y-1 max-h-20 overflow-y-auto">
                          {newProjectData.quotes.map((file, index) => (
                            <div key={index} className="flex items-center justify-between text-xs bg-gray-50 dark:bg-gray-700 p-2 rounded">
                              <span className="truncate">{file.name}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedQuotes = newProjectData.quotes.filter((_, i) => i !== index)
                                  setNewProjectData({...newProjectData, quotes: updatedQuotes})
                                }}
                                className="text-red-500 hover:text-red-700 ml-2"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4 mt-6">
                <button
                  onClick={() => setShowNewProjectModal(false)}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateProject}
                  disabled={!newProjectData.title || !newProjectData.asset || !newProjectData.description}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                >
                  🏗️ Create Capital Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Critical Issue Modal */}
      {showReportIssueModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Report Critical Infrastructure Issue
                </h2>
                <button 
                  onClick={() => setShowReportIssueModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Issue Title *
                  </label>
                  <input
                    type="text"
                    value={newIssueData.title}
                    onChange={(e) => setNewIssueData({...newIssueData, title: e.target.value})}
                    placeholder="e.g., Structural Cracks in Building Foundation"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Affected Asset/Building *
                  </label>
                  <select
                    value={newIssueData.asset}
                    onChange={(e) => setNewIssueData({...newIssueData, asset: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500"
                    required
                  >
                    <option value="">Select affected asset/building...</option>
                    {availableAssets.map((asset, index) => (
                      <option key={index} value={asset}>
                        {asset}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priority Level *
                  </label>
                  <select
                    value={newIssueData.priority}
                    onChange={(e) => setNewIssueData({...newIssueData, priority: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Estimated Repair Cost
                  </label>
                  <input
                    type="text"
                    value={newIssueData.estimatedRepairCost}
                    onChange={(e) => setNewIssueData({...newIssueData, estimatedRepairCost: e.target.value})}
                    placeholder="e.g., ₦85,000,000"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Recommended Contractor
                  </label>
                  <input
                    type="text"
                    value={newIssueData.contractor}
                    onChange={(e) => setNewIssueData({...newIssueData, contractor: e.target.value})}
                    placeholder="e.g., Structural Engineering Associates"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Urgency Level *
                  </label>
                  <input
                    type="text"
                    value={newIssueData.urgency}
                    onChange={(e) => setNewIssueData({...newIssueData, urgency: e.target.value})}
                    placeholder="e.g., Immediate - Building evacuation may be required"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Issue Description *
                  </label>
                  <textarea
                    value={newIssueData.description}
                    onChange={(e) => setNewIssueData({...newIssueData, description: e.target.value})}
                    placeholder="Provide detailed description of the critical issue, including potential risks, affected areas, and immediate concerns..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500"
                    rows={4}
                    required
                  />
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mt-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div className="text-red-700 dark:text-red-300">
                    <p className="font-medium text-sm">Critical Infrastructure Issue</p>
                    <p className="text-sm mt-1">This report will create a high-priority issue that requires immediate attention from facility managers and contractors.</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4 mt-6">
                <button
                  onClick={() => setShowReportIssueModal(false)}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReportIssue}
                  disabled={!newIssueData.title || !newIssueData.asset || !newIssueData.description || !newIssueData.urgency}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                >
                  🚨 Report Critical Issue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {showProjectModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedProject.title}
                </h2>
                <button 
                  onClick={() => setShowProjectModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project Details</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Asset:</span>
                      <p className="text-gray-900 dark:text-white">{selectedProject.asset}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Type:</span>
                      <p className="text-gray-900 dark:text-white">{selectedProject.type}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Status:</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedProject.status)}`}>
                        {selectedProject.status}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Priority:</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(selectedProject.priority)}`}>
                        {selectedProject.priority}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Description:</span>
                      <p className="text-gray-900 dark:text-white">{selectedProject.description}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project Management</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Project Manager:</span>
                      <p className="text-gray-900 dark:text-white">{selectedProject.projectManager}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Contractor:</span>
                      <p className="text-gray-900 dark:text-white">{selectedProject.contractor}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Start Date:</span>
                      <p className="text-gray-900 dark:text-white">{selectedProject.scheduledDate}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Completion Date:</span>
                      <p className="text-gray-900 dark:text-white">{selectedProject.completionDate}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Budget:</span>
                      <p className="text-gray-900 dark:text-white">{selectedProject.estimatedCost}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Actual Cost:</span>
                      <p className="text-gray-900 dark:text-white">{selectedProject.actualCost}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Progress</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Completion</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{selectedProject.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${selectedProject.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fault Modal */}
      {showFaultModal && selectedFault && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedFault.title}
                </h2>
                <button 
                  onClick={() => setShowFaultModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Issue Details</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Asset:</span>
                      <p className="text-gray-900 dark:text-white">{selectedFault.asset}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Priority:</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(selectedFault.priority)}`}>
                        {selectedFault.priority}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Status:</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedFault.status)}`}>
                        {selectedFault.status}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Description:</span>
                      <p className="text-gray-900 dark:text-white">{selectedFault.description}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Report Information</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Reported By:</span>
                      <p className="text-gray-900 dark:text-white">{selectedFault.reportedBy}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Reported Date:</span>
                      <p className="text-gray-900 dark:text-white">{selectedFault.reportedDate}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Estimated Repair Cost:</span>
                      <p className="text-gray-900 dark:text-white">{selectedFault.estimatedRepairCost}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Contractor:</span>
                      <p className="text-gray-900 dark:text-white">{selectedFault.contractor}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span className="text-red-700 dark:text-red-300 font-medium text-sm">
                      Urgency: {selectedFault.urgency}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Project Modal */}
      {showUpdateModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full mx-4">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Update Project
                </h2>
                <button 
                  onClick={() => {
                    setShowUpdateModal(false)
                    setUpdateData({ status: '', progress: 0, actualCost: '', notes: '' })
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {selectedProject.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {selectedProject.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Project Status
                  </label>
                  <select
                    value={updateData.status}
                    onChange={(e) => setUpdateData({...updateData, status: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Planning">Planning</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Progress (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={updateData.progress}
                    onChange={(e) => setUpdateData({...updateData, progress: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Actual Cost
                </label>
                <input
                  type="text"
                  value={updateData.actualCost}
                  onChange={(e) => setUpdateData({...updateData, actualCost: e.target.value})}
                  placeholder="e.g., ₦42,500,000"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Update Notes
                </label>
                <textarea
                  value={updateData.notes}
                  onChange={(e) => setUpdateData({...updateData, notes: e.target.value})}
                  placeholder="Describe the progress made, any challenges encountered, or changes to the project..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress Preview</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{updateData.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${updateData.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4">
                <button
                  onClick={() => {
                    setShowUpdateModal(false)
                    setUpdateData({ status: '', progress: 0, actualCost: '', notes: '' })
                  }}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmUpdateProject}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  💾 Update Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resolve Modal */}
      {showResolveModal && selectedFault && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full mx-4">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Resolve Critical Issue
                </h2>
                <button 
                  onClick={() => {
                    setShowResolveModal(false)
                    setResolveNotes('')
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {selectedFault.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {selectedFault.description}
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Asset:</span>
                  <span className="text-gray-900 dark:text-white">{selectedFault.asset}</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Resolution Notes *
                </label>
                <textarea
                  value={resolveNotes}
                  onChange={(e) => setResolveNotes(e.target.value)}
                  placeholder="Please describe how this issue was resolved, what actions were taken, and any follow-up requirements..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  required
                />
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-green-700 dark:text-green-300">
                    <p className="font-medium text-sm">This action will:</p>
                    <ul className="text-sm mt-1 ml-4 list-disc">
                      <li>Mark the issue as "Resolved"</li>
                      <li>Record resolution date and responsible person</li>
                      <li>Update the dashboard statistics</li>
                      <li>Save resolution notes for audit trail</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4">
                <button
                  onClick={() => {
                    setShowResolveModal(false)
                    setResolveNotes('')
                  }}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmResolveFault}
                  disabled={!resolveNotes.trim()}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                >
                  ✅ Resolve Issue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}