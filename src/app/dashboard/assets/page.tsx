"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AssetsPage() {
  const router = useRouter()
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    category: 'all',
    subcategory: 'all',
    location: 'all',
    dateFrom: '',
    dateTo: '',
    condition: 'all',
    department: 'all',
    yearBuiltFrom: '',
    yearBuiltTo: '',
    value: 'all',
    size: 'all'
  })

  const categories = [
    { 
      value: 'all', 
      label: 'All Categories',
      subcategories: []
    },
    { 
      value: 'healthcare', 
      label: 'Healthcare Facilities',
      subcategories: [
        { value: 'hospital', label: 'General Hospitals' },
        { value: 'specialist-hospital', label: 'Specialist Hospitals' },
        { value: 'primary-healthcare', label: 'Primary Healthcare Centers' },
        { value: 'maternity', label: 'Maternity Centers' },
        { value: 'psychiatric', label: 'Psychiatric Facilities' },
        { value: 'medical-lab', label: 'Medical Laboratories' },
        { value: 'ambulance', label: 'Ambulance Services' },
        { value: 'pharmacy', label: 'Government Pharmacies' }
      ]
    },
    { 
      value: 'education', 
      label: 'Educational Institutions',
      subcategories: [
        { value: 'primary-school', label: 'Primary Schools' },
        { value: 'secondary-school', label: 'Secondary Schools' },
        { value: 'technical-college', label: 'Technical Colleges' },
        { value: 'university', label: 'Universities' },
        { value: 'polytechnic', label: 'Polytechnics' },
        { value: 'training-center', label: 'Training Centers' },
        { value: 'library', label: 'Public Libraries' },
        { value: 'research-institute', label: 'Research Institutes' }
      ]
    },
    { 
      value: 'government', 
      label: 'Government Buildings',
      subcategories: [
        { value: 'secretariat', label: 'Secretariat Buildings' },
        { value: 'ministry', label: 'Ministry Buildings' },
        { value: 'agency', label: 'Agency Offices' },
        { value: 'court', label: 'Court Buildings' },
        { value: 'local-govt', label: 'Local Government Areas' },
        { value: 'assembly', label: 'Assembly Buildings' },
        { value: 'governor-office', label: 'Governor\'s Office' },
        { value: 'tax-office', label: 'Tax Offices' }
      ]
    },
    { 
      value: 'infrastructure', 
      label: 'Infrastructure',
      subcategories: [
        { value: 'bridge', label: 'Bridges & Flyovers' },
        { value: 'road', label: 'Roads & Highways' },
        { value: 'drainage', label: 'Drainage Systems' },
        { value: 'water-works', label: 'Water Treatment Plants' },
        { value: 'power-station', label: 'Power Stations' },
        { value: 'waste-facility', label: 'Waste Management Facilities' },
        { value: 'telecommunications', label: 'Telecommunications Infrastructure' },
        { value: 'port', label: 'Ports & Harbors' }
      ]
    },
    { 
      value: 'transportation', 
      label: 'Transportation',
      subcategories: [
        { value: 'brt-bus', label: 'BRT Buses' },
        { value: 'brt-terminal', label: 'BRT Terminals' },
        { value: 'ferry', label: 'Ferry Services' },
        { value: 'jetty', label: 'Jetties & Terminals' },
        { value: 'govt-vehicle', label: 'Government Vehicles' },
        { value: 'traffic-light', label: 'Traffic Management Systems' },
        { value: 'parking', label: 'Public Parking Facilities' },
        { value: 'airport', label: 'Airport Facilities' }
      ]
    },
    { 
      value: 'utilities', 
      label: 'Utilities & Services',
      subcategories: [
        { value: 'water-supply', label: 'Water Supply Systems' },
        { value: 'sewage', label: 'Sewage Treatment Plants' },
        { value: 'electricity', label: 'Electrical Infrastructure' },
        { value: 'gas', label: 'Gas Distribution' },
        { value: 'street-light', label: 'Street Lighting' },
        { value: 'waste-collection', label: 'Waste Collection Points' },
        { value: 'public-toilet', label: 'Public Toilets' },
        { value: 'cemetery', label: 'Public Cemeteries' }
      ]
    },
    { 
      value: 'residential', 
      label: 'Residential Properties',
      subcategories: [
        { value: 'public-housing', label: 'Public Housing Estates' },
        { value: 'staff-quarters', label: 'Staff Quarters' },
        { value: 'low-income', label: 'Low-Income Housing' },
        { value: 'middle-income', label: 'Middle-Income Housing' },
        { value: 'senior-housing', label: 'Senior Citizens Housing' },
        { value: 'student-hostel', label: 'Student Hostels' },
        { value: 'temporary-shelter', label: 'Temporary Shelters' },
        { value: 'rehabilitation', label: 'Rehabilitation Centers' }
      ]
    },
    { 
      value: 'commercial', 
      label: 'Commercial Properties',
      subcategories: [
        { value: 'market', label: 'Public Markets' },
        { value: 'shopping-center', label: 'Shopping Centers' },
        { value: 'business-park', label: 'Business Parks' },
        { value: 'industrial-estate', label: 'Industrial Estates' },
        { value: 'trade-center', label: 'Trade Centers' },
        { value: 'exhibition-hall', label: 'Exhibition Halls' },
        { value: 'commercial-complex', label: 'Commercial Complexes' },
        { value: 'bank-building', label: 'Government Bank Buildings' }
      ]
    },
    { 
      value: 'recreational', 
      label: 'Recreational Facilities',
      subcategories: [
        { value: 'park', label: 'Public Parks' },
        { value: 'sports-complex', label: 'Sports Complexes' },
        { value: 'stadium', label: 'Stadiums' },
        { value: 'beach', label: 'Public Beaches' },
        { value: 'cultural-center', label: 'Cultural Centers' },
        { value: 'museum', label: 'Museums' },
        { value: 'art-gallery', label: 'Art Galleries' },
        { value: 'cinema', label: 'Public Cinemas' }
      ]
    },
    { 
      value: 'security', 
      label: 'Security & Safety',
      subcategories: [
        { value: 'police-station', label: 'Police Stations' },
        { value: 'fire-station', label: 'Fire Stations' },
        { value: 'emergency-center', label: 'Emergency Response Centers' },
        { value: 'correctional', label: 'Correctional Facilities' },
        { value: 'security-post', label: 'Security Posts' },
        { value: 'cctv-system', label: 'CCTV Systems' },
        { value: 'border-post', label: 'Border Posts' },
        { value: 'disaster-center', label: 'Disaster Management Centers' }
      ]
    },
    { 
      value: 'equipment', 
      label: 'Equipment & Machinery',
      subcategories: [
        { value: 'medical-equipment', label: 'Medical Equipment' },
        { value: 'office-equipment', label: 'Office Equipment' },
        { value: 'construction-equipment', label: 'Construction Equipment' },
        { value: 'maintenance-equipment', label: 'Maintenance Equipment' },
        { value: 'it-equipment', label: 'IT Equipment' },
        { value: 'laboratory-equipment', label: 'Laboratory Equipment' },
        { value: 'security-equipment', label: 'Security Equipment' },
        { value: 'generator', label: 'Generators & Power Equipment' }
      ]
    }
  ]

  const locations = [
    { value: 'all', label: 'All Locations' },
    // 20 Local Government Areas (LGAs)
    { value: 'agege', label: 'Agege LGA' },
    { value: 'ajeromi-ifelodun', label: 'Ajeromi-Ifelodun LGA' },
    { value: 'alimosho', label: 'Alimosho LGA' },
    { value: 'amuwo-odofin', label: 'Amuwo-Odofin LGA' },
    { value: 'apapa', label: 'Apapa LGA' },
    { value: 'badagry', label: 'Badagry LGA' },
    { value: 'epe', label: 'Epe LGA' },
    { value: 'eti-osa', label: 'Eti-Osa LGA' },
    { value: 'ibeju-lekki', label: 'Ibeju-Lekki LGA' },
    { value: 'ifako-ijaiye', label: 'Ifako-Ijaiye LGA' },
    { value: 'ikeja', label: 'Ikeja LGA' },
    { value: 'ikorodu', label: 'Ikorodu LGA' },
    { value: 'kosofe', label: 'Kosofe LGA' },
    { value: 'lagos-island', label: 'Lagos Island LGA' },
    { value: 'lagos-mainland', label: 'Lagos Mainland LGA' },
    { value: 'mushin', label: 'Mushin LGA' },
    { value: 'ojo', label: 'Ojo LGA' },
    { value: 'oshodi-isolo', label: 'Oshodi-Isolo LGA' },
    { value: 'shomolu', label: 'Shomolu LGA' },
    { value: 'surulere', label: 'Surulere LGA' },
    
    // 37 Local Council Development Areas (LCDAs)
    { value: 'agboyi-ketu', label: 'Agboyi-Ketu LCDA' },
    { value: 'agbado-oke-odo', label: 'Agbado-Oke-Odo LCDA' },
    { value: 'agbowa-ikosi', label: 'Agbowa-Ikosi LCDA' },
    { value: 'awori', label: 'Awori LCDA' },
    { value: 'ayobo-ipaja', label: 'Ayobo-Ipaja LCDA' },
    { value: 'bariga', label: 'Bariga LCDA' },
    { value: 'coker-aguda', label: 'Coker-Aguda LCDA' },
    { value: 'egbe-idimu', label: 'Egbe-Idimu LCDA' },
    { value: 'ejigbo', label: 'Ejigbo LCDA' },
    { value: 'epe', label: 'Epe LCDA' },
    { value: 'eredo', label: 'Eredo LCDA' },
    { value: 'etiosa-east', label: 'Etiosa East LCDA' },
    { value: 'etiosa-west', label: 'Etiosa West LCDA' },
    { value: 'ibeju', label: 'Ibeju LCDA' },
    { value: 'ifelodun', label: 'Ifelodun LCDA' },
    { value: 'igando-ikotun', label: 'Igando-Ikotun LCDA' },
    { value: 'igbogbo-bayeku', label: 'Igbogbo-Bayeku LCDA' },
    { value: 'ijede', label: 'Ijede LCDA' },
    { value: 'ikosi-isheri', label: 'Ikosi-Isheri LCDA' },
    { value: 'ikorodu-north', label: 'Ikorodu North LCDA' },
    { value: 'ikorodu-west', label: 'Ikorodu West LCDA' },
    { value: 'imota', label: 'Imota LCDA' },
    { value: 'iru-victoria-island', label: 'Iru-Victoria Island LCDA' },
    { value: 'isolo', label: 'Isolo LCDA' },
    { value: 'itire-ikate', label: 'Itire-Ikate LCDA' },
    { value: 'lagos-island-east', label: 'Lagos Island East LCDA' },
    { value: 'lekki', label: 'Lekki LCDA' },
    { value: 'mosan-okunola', label: 'Mosan-Okunola LCDA' },
    { value: 'odi-olowo-ojuwoye', label: 'Odi-Olowo-Ojuwoye LCDA' },
    { value: 'ojodu', label: 'Ojodu LCDA' },
    { value: 'ojokoro', label: 'Ojokoro LCDA' },
    { value: 'onigbongbo', label: 'Onigbongbo LCDA' },
    { value: 'oriade', label: 'Oriade LCDA' },
    { value: 'orile-agege', label: 'Orile-Agege LCDA' },
    { value: 'oshodi', label: 'Oshodi LCDA' },
    { value: 'semi-final', label: 'Semi-Final LCDA' },
    { value: 'yaba', label: 'Yaba LCDA' }
  ]

  const departments = [
    { value: 'all', label: 'All Departments' },
    { value: 'health', label: 'Ministry of Health' },
    { value: 'education', label: 'Ministry of Education' },
    { value: 'works', label: 'Ministry of Works & Infrastructure' },
    { value: 'transport', label: 'Ministry of Transportation' },
    { value: 'environment', label: 'Ministry of Environment' },
    { value: 'housing', label: 'Ministry of Housing' },
    { value: 'agriculture', label: 'Ministry of Agriculture' },
    { value: 'commerce', label: 'Ministry of Commerce & Industry' },
    { value: 'justice', label: 'Ministry of Justice' },
    { value: 'finance', label: 'Ministry of Finance' },
    { value: 'security', label: 'Security Agencies' },
    { value: 'lasg', label: 'Lagos State Government' }
  ]

  const valueRanges = [
    { value: 'all', label: 'All Values' },
    { value: 'under-1m', label: 'Under ₦1M' },
    { value: '1m-10m', label: '₦1M - ₦10M' },
    { value: '10m-50m', label: '₦10M - ₦50M' },
    { value: '50m-100m', label: '₦50M - ₦100M' },
    { value: '100m-500m', label: '₦100M - ₦500M' },
    { value: '500m-1b', label: '₦500M - ₦1B' },
    { value: 'over-1b', label: 'Over ₦1B' }
  ]

  const sizeRanges = [
    { value: 'all', label: 'All Sizes' },
    { value: 'small', label: 'Small (Under 1,000 sqm)' },
    { value: 'medium', label: 'Medium (1,000 - 5,000 sqm)' },
    { value: 'large', label: 'Large (5,000 - 20,000 sqm)' },
    { value: 'extra-large', label: 'Extra Large (Over 20,000 sqm)' }
  ]

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      category: 'all',
      subcategory: 'all',
      location: 'all',
      dateFrom: '',
      dateTo: '',
      condition: 'all',
      department: 'all',
      yearBuiltFrom: '',
      yearBuiltTo: '',
      value: 'all',
      size: 'all'
    })
  }

  // Get subcategories for selected category
  const getSubcategories = () => {
    const selectedCategory = categories.find(cat => cat.value === filters.category)
    return selectedCategory ? selectedCategory.subcategories : []
  }

  // Filter assets based on current filters
  const getFilteredAssets = () => {
    return assets.filter(asset => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        const matchesSearch = 
          asset.name.toLowerCase().includes(searchTerm) ||
          asset.number.toLowerCase().includes(searchTerm) ||
          asset.location.toLowerCase().includes(searchTerm) ||
          asset.category.toLowerCase().includes(searchTerm) ||
          asset.subcategory.toLowerCase().includes(searchTerm) ||
          asset.department.toLowerCase().includes(searchTerm)
        
        if (!matchesSearch) return false
      }

      // Status filter
      if (filters.status !== 'all' && asset.status.toLowerCase() !== filters.status.toLowerCase()) {
        return false
      }

      // Category filter
      if (filters.category !== 'all') {
        const categoryMatch = categories.find(cat => cat.value === filters.category)
        if (categoryMatch && asset.category !== categoryMatch.label) {
          return false
        }
      }

      // Subcategory filter
      if (filters.subcategory !== 'all') {
        const subcategoryMatch = getSubcategories().find(sub => sub.value === filters.subcategory)
        if (subcategoryMatch && asset.subcategory !== subcategoryMatch.label) {
          return false
        }
      }

      // Location filter (simplified - checking if location contains the filter)
      if (filters.location !== 'all') {
        const locationMatch = locations.find(loc => loc.value === filters.location)
        if (locationMatch && !asset.location.toLowerCase().includes(locationMatch.label.toLowerCase().replace(' lga', ''))) {
          return false
        }
      }

      // Department filter
      if (filters.department !== 'all') {
        const departmentMatch = departments.find(dept => dept.value === filters.department)
        if (departmentMatch && asset.department !== departmentMatch.label) {
          return false
        }
      }

      // Condition filter
      if (filters.condition !== 'all' && asset.condition.toLowerCase() !== filters.condition.toLowerCase()) {
        return false
      }

      // Year built range filter
      if (filters.yearBuiltFrom && asset.yearBuilt < parseInt(filters.yearBuiltFrom)) {
        return false
      }
      if (filters.yearBuiltTo && asset.yearBuilt > parseInt(filters.yearBuiltTo)) {
        return false
      }

      // Value range filter
      if (filters.value !== 'all' && asset.valueRange !== filters.value) {
        return false
      }

      // Size range filter
      if (filters.size !== 'all' && asset.sizeRange !== filters.size) {
        return false
      }

      // Date range filter (if asset has dateAdded property)
      if (filters.dateFrom && asset.dateAdded) {
        const assetDate = new Date(asset.dateAdded)
        const fromDate = new Date(filters.dateFrom)
        if (assetDate < fromDate) return false
      }
      if (filters.dateTo && asset.dateAdded) {
        const assetDate = new Date(asset.dateAdded)
        const toDate = new Date(filters.dateTo)
        if (assetDate > toDate) return false
      }

      return true
    })
  }

  const filteredAssets = getFilteredAssets()
  const [assets] = useState([
    {
      id: 1,
      name: "Lagos State General Hospital Main Building",
      number: "#LAS-HLT-001",
      location: "Ikeja, Lagos State",
      category: "Healthcare Facilities",
      subcategory: "General Hospitals",
      status: "ACTIVE",
      openFaults: 0,
      maintenance: 1,
      updated: "15/08/2025",
      department: "Ministry of Health",
      yearBuilt: 1978,
      value: "₦2.5B",
      valueRange: "over-1b",
      size: "15,000 sqm",
      sizeRange: "large",
      condition: "Good",
      floors: 8,
      rooms: 250
    },
    {
      id: 2,
      name: "Lagos State University Main Campus",
      number: "#LAS-EDU-001", 
      location: "Ojo, Lagos State",
      category: "Educational Institutions",
      subcategory: "Universities",
      status: "ACTIVE",
      openFaults: 0,
      maintenance: 0,
      updated: "12/08/2025",
      department: "Ministry of Education",
      yearBuilt: 1983,
      value: "₦8.2B",
      valueRange: "over-1b",
      size: "45,000 sqm",
      sizeRange: "extra-large",
      condition: "Excellent",
      floors: 12,
      buildings: 25
    },
    {
      id: 3,
      name: "Lagos State Secretariat Complex",
      number: "#LAS-GOV-001",
      location: "Alausa, Ikeja, Lagos State", 
      category: "Government Buildings",
      subcategory: "Secretariat Buildings",
      status: "ACTIVE",
      openFaults: 0,
      maintenance: 0,
      updated: "10/08/2025",
      department: "Lagos State Government",
      yearBuilt: 1999,
      value: "₦12.8B",
      valueRange: "over-1b",
      size: "35,000 sqm",
      sizeRange: "extra-large",
      condition: "Excellent",
      floors: 22,
      offices: 800
    },
    {
      id: 4,
      name: "Third Mainland Bridge",
      number: "#LAS-INF-001",
      location: "Lagos Island to Lagos Mainland",
      category: "Infrastructure",
      subcategory: "Bridges & Flyovers",
      status: "ACTIVE",
      openFaults: 1,
      maintenance: 2,
      updated: "08/08/2025",
      department: "Ministry of Works & Infrastructure",
      yearBuilt: 1990,
      value: "₦45B",
      valueRange: "over-1b",
      size: "11.8 km length",
      sizeRange: "extra-large",
      condition: "Good",
      lanes: 6,
      capacity: "200,000 vehicles/day"
    },
    {
      id: 5,
      name: "BRT Bus Fleet (200 Units)",
      number: "#LAS-TRP-001",
      location: "Various BRT Terminals",
      category: "Transportation",
      subcategory: "BRT Buses",
      status: "ACTIVE", 
      openFaults: 5,
      maintenance: 12,
      updated: "20/08/2025",
      department: "Ministry of Transportation",
      yearBuilt: 2019,
      value: "₦8.5B",
      valueRange: "over-1b",
      size: "200 units",
      sizeRange: "large",
      condition: "Good",
      capacity: "80 passengers each",
      routes: 15
    },
    {
      id: 6,
      name: "Tafawa Balewa Square",
      number: "#LAS-REC-001",
      location: "Lagos Island, Lagos State",
      category: "Recreational Facilities",
      subcategory: "Public Parks",
      status: "ACTIVE",
      openFaults: 0,
      maintenance: 1,
      updated: "05/08/2025",
      department: "Lagos State Government",
      yearBuilt: 1972,
      value: "₦850M",
      valueRange: "500m-1b",
      size: "12,500 sqm",
      sizeRange: "large",
      condition: "Fair",
      facilities: "Stadium, Monument, Gardens",
      capacity: "25,000 people"
    },
    {
      id: 7,
      name: "Lagos State Primary Healthcare Center",
      number: "#LAS-HLT-002",
      location: "Surulere, Lagos State",
      category: "Healthcare Facilities",
      subcategory: "Primary Healthcare Centers",
      status: "ACTIVE",
      openFaults: 0,
      maintenance: 0,
      updated: "18/08/2025",
      department: "Ministry of Health",
      yearBuilt: 2015,
      value: "₦45M",
      valueRange: "10m-50m",
      size: "800 sqm",
      sizeRange: "small",
      condition: "Excellent",
      floors: 2,
      rooms: 15
    },
    {
      id: 8,
      name: "Adeniran Ogunsanya College of Education",
      number: "#LAS-EDU-002",
      location: "Oto/Ijanikin, Lagos State",
      category: "Educational Institutions",
      subcategory: "Technical Colleges",
      status: "ACTIVE",
      openFaults: 1,
      maintenance: 0,
      updated: "14/08/2025",
      department: "Ministry of Education",
      yearBuilt: 1975,
      value: "₦1.2B",
      valueRange: "500m-1b",
      size: "18,000 sqm",
      sizeRange: "large",
      condition: "Good",
      floors: 6,
      classrooms: 45
    },
    {
      id: 9,
      name: "Lagos High Court Complex",
      number: "#LAS-GOV-002",
      location: "Lagos Island, Lagos State",
      category: "Government Buildings",
      subcategory: "Court Buildings",
      status: "ACTIVE",
      openFaults: 0,
      maintenance: 1,
      updated: "11/08/2025",
      department: "Ministry of Justice",
      yearBuilt: 1973,
      value: "₦680M",
      valueRange: "500m-1b",
      size: "6,500 sqm",
      sizeRange: "large",
      condition: "Good",
      floors: 4,
      courtrooms: 12
    }
  ])

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Assets</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage and track all government assets</p>
            </div>
            <div className="flex items-center space-x-3">
              <a href="/dashboard/assets/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                + Add New Asset
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Comprehensive Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex flex-col gap-4">
            {/* Basic Filters Row */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search assets by name, ID, or description..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select 
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="critical">Critical</option>
                <option value="decommissioned">Decommissioned</option>
              </select>
              <select 
                value={filters.category}
                onChange={(e) => {
                  handleFilterChange('category', e.target.value)
                  handleFilterChange('subcategory', 'all') // Reset subcategory when main category changes
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
              
              {/* Subcategory dropdown - only show when a main category is selected */}
              {filters.category !== 'all' && getSubcategories().length > 0 && (
                <select 
                  value={filters.subcategory}
                  onChange={(e) => handleFilterChange('subcategory', e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All {categories.find(cat => cat.value === filters.category)?.label}</option>
                  {getSubcategories().map(subcat => (
                    <option key={subcat.value} value={subcat.value}>{subcat.label}</option>
                  ))}
                </select>
              )}
              <button 
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white whitespace-nowrap"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                {showAdvancedFilters ? 'Hide Filters' : 'Advanced Filters'}
              </button>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                    <select 
                      value={filters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    >
                      {locations.map(loc => (
                        <option key={loc.value} value={loc.value}>{loc.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
                    <select 
                      value={filters.department}
                      onChange={(e) => handleFilterChange('department', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    >
                      {departments.map(dept => (
                        <option key={dept.value} value={dept.value}>{dept.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Condition</label>
                    <select 
                      value={filters.condition}
                      onChange={(e) => handleFilterChange('condition', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    >
                      <option value="all">All Conditions</option>
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="fair">Fair</option>
                      <option value="poor">Poor</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quick Date</label>
                    <select 
                      onChange={(e) => {
                        const value = e.target.value
                        const today = new Date()
                        let fromDate = ''
                        
                        switch(value) {
                          case 'week':
                            fromDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                            break
                          case 'month':
                            fromDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                            break
                          case 'quarter':
                            fromDate = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                            break
                          case 'year':
                            fromDate = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                            break
                        }
                        
                        if (fromDate) {
                          setFilters(prev => ({
                            ...prev,
                            dateFrom: fromDate,
                            dateTo: today.toISOString().split('T')[0]
                          }))
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    >
                      <option value="">Select Period</option>
                      <option value="week">Last 7 days</option>
                      <option value="month">Last 30 days</option>
                      <option value="quarter">Last 3 months</option>
                      <option value="year">Last year</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date Added From</label>
                    <input
                      type="date"
                      value={filters.dateFrom}
                      onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date Added To</label>
                    <input
                      type="date"
                      value={filters.dateTo}
                      onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    />
                  </div>
                </div>

                {/* Additional Filters Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Asset Value</label>
                    <select 
                      value={filters.value}
                      onChange={(e) => handleFilterChange('value', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    >
                      {valueRanges.map(range => (
                        <option key={range.value} value={range.value}>{range.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Asset Size</label>
                    <select 
                      value={filters.size}
                      onChange={(e) => handleFilterChange('size', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    >
                      {sizeRanges.map(range => (
                        <option key={range.value} value={range.value}>{range.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year Built Range</label>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        placeholder="From"
                        min="1900"
                        max="2025"
                        value={filters.yearBuiltFrom}
                        onChange={(e) => handleFilterChange('yearBuiltFrom', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      />
                      <input
                        type="number"
                        placeholder="To"
                        min="1900"
                        max="2025"
                        value={filters.yearBuiltTo}
                        onChange={(e) => handleFilterChange('yearBuiltTo', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Active filters: {Object.values(filters).filter(v => v && v !== 'all').length}
                    {filters.category !== 'all' && getSubcategories().length > 0 && (
                      <span className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                        Subcategories available
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={clearFilters}
                      className="px-3 py-1 text-sm text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 border border-gray-300 dark:border-gray-600 rounded"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={() => {
                        // Filters are applied automatically via the filteredAssets computed value
                        // This button could trigger additional actions like analytics tracking
                        console.log('Filters applied:', filters)
                      }}
                      className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6 flex justify-between items-center">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredAssets.length} of {assets.length} assets
            {Object.values(filters).filter(v => v && v !== 'all').length > 0 && (
              <span className="ml-2 text-blue-600 dark:text-blue-400">
                (filtered)
              </span>
            )}
          </div>
          {filteredAssets.length > 0 && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Total value: {filteredAssets.reduce((sum, asset) => {
                // Simple value calculation - in a real app this would be more sophisticated
                const valueStr = asset.value.replace('₦', '').replace('B', '').replace('M', '')
                const multiplier = asset.value.includes('B') ? 1000000000 : asset.value.includes('M') ? 1000000 : 1
                return sum + (parseFloat(valueStr) * multiplier)
              }, 0).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
            </div>
          )}
        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No assets found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Try adjusting your filters or search terms.
              </p>
            </div>
          ) : (
            filteredAssets.map((asset) => (
            <div key={asset.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{asset.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{asset.number}</p>
                </div>
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-medium">
                  {asset.status}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {asset.location}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {asset.category} • {asset.subcategory}
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Built: {asset.yearBuilt}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    {asset.value}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    {asset.size}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {asset.condition}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex space-x-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-600 dark:text-red-400">{asset.openFaults}</div>
                    <div className="text-gray-500 dark:text-gray-400">Open Faults</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{asset.maintenance}</div>
                    <div className="text-gray-500 dark:text-gray-400">Maintenance</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Updated {asset.updated}
                  </div>
                  <button
                    onClick={() => router.push(`/dashboard/assets/${asset.id}`)}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium hover:underline cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          )))}
        </div>
      </div>
    </div>
  )
}
