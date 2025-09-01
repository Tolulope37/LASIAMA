"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface EquipmentItem {
  type: string
  brand: string
  specifications: string
  location: string
  quantity: string
  description?: string
}

export default function NewAssetPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  
  const steps = [
    { id: 1, title: "Basic Information", description: "Asset details and category" },
    { id: 2, title: "Physical Specifications", description: "Building details and dimensions" },
    { id: 3, title: "Systems & Utilities", description: "HVAC, electrical, and utilities" },
    { id: 4, title: "Equipment Inventory", description: "AC units, doors, windows, lighting" },
    { id: 5, title: "Location & Financial", description: "Address, coordinates, and valuation" },
    { id: 6, title: "Documents & Media", description: "Upload documents, images, and certificates" },
    { id: 7, title: "Maintenance & Audit", description: "Maintenance info and audit trail" }
  ]

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    description: "",
    category: "",
    subcategory: "",
    status: "ACTIVE",
    condition: "Good",
    location: "",
    latitude: "",
    longitude: "",
    acquisitionDate: "",
    yearBuilt: "",
    assetValue: "",
    size: "",
    department: "",
    type: "",
    lga: "",
    zone: "",
    openFaults: 0,
    maintenance: 0,
    // Building specifications
    floors: "",
    totalRooms: "",
    capacity: "",
    parkingSpaces: "",
    elevators: "",
    emergencyExits: "",
    totalArea: "",
    // Construction details
    foundationType: "",
    structuralSystem: "",
    exteriorWalls: "",
    roofing: "",
    flooring: "",
    // Utilities
    hvacSystem: "",
    electricalSystem: "",
    waterSupply: "",
    fireSystem: "",
    securitySystem: "",
    backupPower: "",
    electricalLoad: "",
    waterConsumption: "",
    internetConnectivity: "",
    // Equipment Inventory
    airConditioningUnits: [{ type: '', brand: '', capacity: '', location: '' }],
    doors: [{ type: '', material: '', dimensions: '', totalDoors: '' }],
    windows: [{ type: '', material: '', dimensions: '', totalWindows: '' }],
    lightingFixtures: [{ type: '', brand: '', totalFixtures: '' }],
    electricalEquipment: [],
    plumbingFixtures: [],
    securitySystems: [],
    otherEquipment: [] as EquipmentItem[],
    // Documents
    documents: [],
    // Images
    images: [],
    // Financial details
    originalCost: "",
    currentValue: "",
    insuranceValue: "",
    annualMaintenance: "",
    lastValuation: "",
    depreciationRate: "",
    // Audit trail
    auditTrail: [],
    restrooms: "",
    kitchens: "",
    conferenceRooms: "",
    securityOffice: "",
    // Accessibility
    wheelchairAccessible: "",
    elevatorAccess: "",
    ramps: "",
    accessibleRestrooms: "",
    // Safety
    fireExtinguishers: "",
    smokeDetectors: "",
    firstAidStations: "",
    // Additional building fields
    totalWindows: "",
    totalDoors: "",
    staircases: "",
    plumbingSystem: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Auto-generate asset number when category, location, or LGA changes
  useEffect(() => {
    if (formData.category && (formData.location || formData.lga) && !formData.number) {
      const generatedNumber = generateAssetNumber(formData.category, formData.location, formData.lga)
      setFormData(prev => ({ ...prev, number: generatedNumber }))
    }
  }, [formData.category, formData.location, formData.lga])

  const generateAssetNumber = (category: string, location?: string, lga?: string) => {
    const categoryCode = {
      'Healthcare': 'HLT',
      'Education': 'EDU', 
      'Government': 'GOV',
      'Infrastructure': 'INF',
      'Transportation': 'TRP',
      'Utilities': 'UTL',
      'Residential': 'RES',
      'Commercial': 'COM',
      'Recreation': 'REC',
      'Security': 'SEC',
      'Equipment': 'EQP'
    }[category] || 'GEN'
    
    // Generate location-based code from LGA or location
    let locationCode = ''
    if (lga) {
      // Use LGA for location code
      const lgaCode = {
        'Ikeja': 'IKJ',
        'Lagos Island': 'LGI', 
        'Lagos Mainland': 'LGM',
        'Surulere': 'SUR',
        'Ojo': 'OJO',
        'Alimosho': 'ALM',
        'Agege': 'AGE',
        'Ifako-Ijaiye': 'IFJ',
        'Shomolu': 'SHM',
        'Mushin': 'MSH',
        'Oshodi-Isolo': 'OSH',
        'Kosofe': 'KOS',
        'Ikorodu': 'IKR',
        'Epe': 'EPE',
        'Badagry': 'BAD',
        'Ajeromi-Ifelodun': 'AJR',
        'Amuwo-Odofin': 'AMW',
        'Apapa': 'APA',
        'Eti-Osa': 'ETO',
        'Ibeju-Lekki': 'IBL'
      }[lga] || lga.substring(0, 3).toUpperCase()
      locationCode = lgaCode
    } else if (location) {
      // Extract location code from address
      const locationWords = location.split(/[\s,]+/)
      if (locationWords.length >= 2) {
        locationCode = locationWords.slice(0, 2).map(word => word.charAt(0).toUpperCase()).join('')
      } else {
        locationCode = location.substring(0, 3).toUpperCase().replace(/[^A-Z]/g, '')
      }
      // Ensure it's exactly 3 characters
      locationCode = locationCode.padEnd(3, 'X').substring(0, 3)
    }
    
    const randomId = Math.floor(Math.random() * 900) + 100
    const baseNumber = `LAS-${categoryCode}-${randomId.toString().padStart(3, '0')}`
    
    // Add location code if available
    if (locationCode) {
      return `#${baseNumber}-${locationCode}`
    }
    
    return `#${baseNumber}`
  }

  const formatValue = (value: string) => {
    if (!value) return "₦0"
    const numValue = parseFloat(value)
    if (numValue >= 1000000000) {
      return `₦${(numValue / 1000000000).toFixed(1)}B`
    } else if (numValue >= 1000000) {
      return `₦${(numValue / 1000000).toFixed(1)}M`
    } else if (numValue >= 1000) {
      return `₦${(numValue / 1000).toFixed(1)}K`
    }
    return `₦${numValue.toLocaleString()}`
  }

  const calculateValueRange = (value: string) => {
    if (!value) return "under-1m"
    const numValue = parseFloat(value)
    if (numValue >= 1000000000) return "over-1b"
    if (numValue >= 500000000) return "500m-1b"
    if (numValue >= 100000000) return "100m-500m"
    if (numValue >= 50000000) return "50m-100m"
    if (numValue >= 10000000) return "10m-50m"
    if (numValue >= 1000000) return "1m-10m"
    return "under-1m"
  }

  const calculateSizeRange = (totalArea: string) => {
    if (!totalArea) return "medium"
    const areaText = totalArea.toLowerCase()
    
    // Extract numerical value
    const numMatch = areaText.match(/(\d+(?:,\d+)*)/)
    if (!numMatch) return "medium"
    
    const numValue = parseInt(numMatch[1].replace(/,/g, ''))
    
    if (areaText.includes('km') || numValue >= 50000) return "extra-large"
    if (numValue >= 20000) return "large"  
    if (numValue >= 5000) return "medium"
    return "small"
  }

  // Step navigation functions
  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1: // Basic Information
        return formData.name && formData.category && formData.subcategory && formData.type && formData.condition && formData.yearBuilt && formData.size
      case 2: // Physical Specifications
        return true // Optional fields
      case 3: // Systems & Utilities
        return true // Optional fields
      case 4: // Equipment Inventory
        return true // Optional fields
      case 5: // Location & Financial
        return formData.location && formData.lga && formData.zone && formData.assetValue && formData.department
      case 6: // Documents & Media
        return true // Optional fields
      case 7: // Maintenance & Audit
        return true // Optional fields
      default:
        return true
    }
  }

  const nextStep = () => {
    if (validateCurrentStep() && currentStep < steps.length) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep])
      }
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (stepNumber: number) => {
    if (stepNumber <= currentStep || completedSteps.includes(stepNumber - 1)) {
      setCurrentStep(stepNumber)
    }
  }

  // Equipment management functions
  const addEquipmentItem = (equipmentType: string) => {
    const newItem = getEmptyEquipmentItem(equipmentType)
    setFormData(prev => ({
      ...prev,
      [equipmentType]: [...(prev[equipmentType as keyof typeof prev] as unknown[]), newItem]
    }))
  }

  const removeEquipmentItem = (equipmentType: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [equipmentType]: (prev[equipmentType as keyof typeof prev] as unknown[]).filter((_, i) => i !== index)
    }))
  }

  const updateEquipmentItem = (equipmentType: string, index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [equipmentType]: (prev[equipmentType as keyof typeof prev] as Record<string, unknown>[]).map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }))
  }

  const getEmptyEquipmentItem = (equipmentType: string) => {
    switch (equipmentType) {
      case 'airConditioningUnits':
        return { type: '', brand: '', capacity: '', location: '' }
      case 'doors':
        return { type: '', material: '', dimensions: '', totalDoors: '' }
      case 'windows':
        return { type: '', material: '', dimensions: '', totalWindows: '' }
      case 'lightingFixtures':
        return { type: '', brand: '', totalFixtures: '' }
      case 'electricalEquipment':
        return { type: '', brand: '', specifications: '', location: '', quantity: '' }
      case 'plumbingFixtures':
        return { type: '', brand: '', specifications: '', location: '', quantity: '' }
      case 'securitySystems':
        return { type: '', brand: '', specifications: '', location: '', quantity: '' }
      case 'otherEquipment':
        return { type: '', brand: '', specifications: '', location: '', quantity: '', description: '' }
      default:
        return {}
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all required fields before submission
    if (!formData.name || !formData.category || !formData.subcategory || !formData.type || 
        !formData.condition || !formData.yearBuilt || !formData.size || !formData.location || 
        !formData.lga || !formData.zone || !formData.assetValue || !formData.department) {
      alert('Please fill in all required fields before submitting.')
      return
    }
    
    // Generate asset data in the format expected by the assets list
    const newAsset = {
      id: Date.now(), // Simple ID generation
      name: formData.name,
      number: formData.number || generateAssetNumber(formData.category, formData.location, formData.lga),
      location: formData.location,
      category: formData.category === 'Healthcare' ? 'Healthcare Facilities' : 
                formData.category === 'Education' ? 'Educational Institutions' : 
                formData.category === 'Government' ? 'Government Buildings' :
                formData.category === 'Recreation' ? 'Recreational Facilities' : 
                formData.category,
      subcategory: formData.subcategory,
      type: formData.type,
      lga: formData.lga,
      zone: formData.zone,
      latitude: formData.latitude,
      longitude: formData.longitude,
      status: formData.status,
      openFaults: parseInt(formData.openFaults.toString()) || 0,
      maintenance: parseInt(formData.maintenance.toString()) || 0,
      updated: new Date().toLocaleDateString('en-GB'),
      department: formData.department,
      yearBuilt: parseInt(formData.yearBuilt) || new Date().getFullYear(),
      value: formatValue(formData.assetValue),
      valueRange: calculateValueRange(formData.assetValue),
      size: formData.totalArea || formData.size,
      sizeRange: calculateSizeRange(formData.totalArea),
      condition: formData.condition,
      description: formData.description,
      // Additional fields for comprehensive asset data
      acquisitionDate: formData.acquisitionDate,
      // Building specifications
      floors: formData.floors ? parseInt(formData.floors) : undefined,
      rooms: formData.totalRooms ? parseInt(formData.totalRooms) : undefined,
      totalRooms: formData.totalRooms ? parseInt(formData.totalRooms) : undefined,
      totalArea: formData.totalArea,
      capacity: formData.capacity,
      parkingSpaces: formData.parkingSpaces ? parseInt(formData.parkingSpaces) : undefined,
      elevators: formData.elevators ? parseInt(formData.elevators) : undefined,
      // Systems and utilities
      hvacSystem: formData.hvacSystem,
      electricalSystem: formData.electricalSystem,
      waterSupply: formData.waterSupply,
      backupPower: formData.backupPower,
      // Construction details
      foundationType: formData.foundationType,
      structuralSystem: formData.structuralSystem,
      exteriorWalls: formData.exteriorWalls,
      roofing: formData.roofing,
      flooring: formData.flooring
    }
    
    console.log("New Asset Created:", newAsset)
    
    // In a real application, you would send this to an API
    alert(`Asset "${formData.name}" created successfully!\n\nAsset Number: ${newAsset.number}\nCategory: ${newAsset.category}\nValue: ${newAsset.value}`)
    
    // Redirect to assets list
    router.push('/dashboard/assets')
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 h-full">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Asset</h1>
              <p className="text-gray-600 dark:text-gray-400">Register a new government asset with detailed specifications</p>
            </div>
            <button
              onClick={() => router.push('/dashboard/assets')}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              ← Back to Assets
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900" style={{overscrollBehavior: 'none'}}>
        <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-full">
          {/* Progress Indicator */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.title}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {Math.round((currentStep / steps.length) * 100)}% Complete
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / steps.length) * 100}%` }}
                ></div>
              </div>
              
              {/* Step Indicators */}
              <div className="flex items-center justify-between">
                {steps.map((step) => (
                  <div key={step.id} className="flex flex-col items-center">
                  <button
                    type="button"
                      onClick={() => goToStep(step.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                        step.id === currentStep
                          ? 'bg-blue-600 text-white'
                          : completedSteps.includes(step.id)
                          ? 'bg-green-500 text-white cursor-pointer hover:bg-green-600'
                          : step.id < currentStep
                          ? 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-400'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={step.id > currentStep && !completedSteps.includes(step.id - 1)}
                    >
                      {completedSteps.includes(step.id) ? '✓' : step.id}
                    </button>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center max-w-16">
                      {step.title}
                    </span>
                </div>
                ))}
              </div>
          </div>
        </div>
  
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6 pb-8">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Basic Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Asset Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Main Office Building"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Asset Number *
                </label>
                <div className="flex space-x-2">
                <input
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleInputChange}
                    placeholder="e.g., #LAS-HLT-001-IKJ"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                  <button
                    type="button"
                    onClick={() => {
                      if (formData.category) {
                        const generatedNumber = generateAssetNumber(formData.category, formData.location, formData.lga)
                        setFormData(prev => ({ ...prev, number: generatedNumber }))
                      }
                    }}
                    disabled={!formData.category}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg text-sm font-medium transition-colors"
                    title="Generate asset number based on category and location"
                  >
                    Generate
                  </button>
                </div>
                {formData.category && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Format: #LAS-{(
                      {
                        'Healthcare': 'HLT',
                        'Education': 'EDU', 
                        'Government': 'GOV',
                        'Infrastructure': 'INF',
                        'Transportation': 'TRP',
                        'Utilities': 'UTL',
                        'Residential': 'RES',
                        'Commercial': 'COM',
                        'Recreation': 'REC',
                        'Security': 'SEC',
                        'Equipment': 'EQP'
                      }[formData.category] || 'GEN'
                    )}-XXX{formData.lga ? `-${({
                      'Ikeja': 'IKJ',
                      'Lagos Island': 'LGI', 
                      'Lagos Mainland': 'LGM',
                      'Surulere': 'SUR',
                      'Ojo': 'OJO',
                      'Alimosho': 'ALM',
                      'Agege': 'AGE',
                      'Ifako-Ijaiye': 'IFJ',
                      'Shomolu': 'SHM',
                      'Mushin': 'MSH',
                      'Oshodi-Isolo': 'OSH',
                      'Kosofe': 'KOS',
                      'Ikorodu': 'IKR',
                      'Epe': 'EPE',
                      'Badagry': 'BAD',
                      'Ajeromi-Ifelodun': 'AJR',
                      'Amuwo-Odofin': 'AMW',
                      'Apapa': 'APA',
                      'Eti-Osa': 'ETO',
                      'Ibeju-Lekki': 'IBL'
                    }[formData.lga] || formData.lga.substring(0, 3).toUpperCase())}` : ''}
                  </p>
                )}
              </div>
            </div>

            <div className="">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                placeholder="Detailed description of the asset..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select category</option>
                  <option value="Healthcare">Healthcare Facilities</option>
                  <option value="Education">Educational Institutions</option>
                  <option value="Government">Government Buildings</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Utilities">Utilities & Services</option>
                  <option value="Residential">Residential Properties</option>
                  <option value="Commercial">Commercial Properties</option>
                  <option value="Recreation">Recreational Facilities</option>
                  <option value="Security">Security & Safety</option>
                  <option value="Equipment">Equipment & Machinery</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subcategory *
                </label>
                <select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select subcategory</option>
                  {formData.category === "Healthcare" && (
                    <>
                      <option value="General Hospital">General Hospitals</option>
                      <option value="Specialist Hospital">Specialist Hospitals</option>
                      <option value="Primary Healthcare Centers">Primary Healthcare Centers</option>
                      <option value="Maternity Centers">Maternity Centers</option>
                    </>
                  )}
                  {formData.category === "Education" && (
                    <>
                      <option value="University">Universities</option>
                      <option value="Primary Schools">Primary Schools</option>
                      <option value="Secondary Schools">Secondary Schools</option>
                      <option value="Technical Colleges">Technical Colleges</option>
                    </>
                  )}
                  {formData.category === "Government" && (
                    <>
                      <option value="Administrative Complex">Administrative Complex</option>
                      <option value="Courthouse">Court Buildings</option>
                      <option value="Ministry Buildings">Ministry Buildings</option>
                      <option value="Local Government Areas">Local Government Areas</option>
                    </>
                  )}
                  {formData.category === "Infrastructure" && (
                    <>
                      <option value="Bridges & Flyovers">Bridges & Flyovers</option>
                      <option value="Roads & Highways">Roads & Highways</option>
                      <option value="Water Treatment Plants">Water Treatment Plants</option>
                      <option value="Power Stations">Power Stations</option>
                    </>
                  )}
                  {formData.category === "Transportation" && (
                    <>
                      <option value="BRT Buses">BRT Buses</option>
                      <option value="BRT Terminals">BRT Terminals</option>
                      <option value="Ferry Services">Ferry Services</option>
                      <option value="Government Vehicles">Government Vehicles</option>
                    </>
                  )}
                  {formData.category === "Recreation" && (
                    <>
                      <option value="Public Parks">Public Parks</option>
                      <option value="Sports Complexes">Sports Complexes</option>
                      <option value="Museums">Museums</option>
                      <option value="Cultural Centers">Cultural Centers</option>
                    </>
                  )}
                  {formData.category === "Commercial" && (
                    <>
                      <option value="Shopping Centers">Shopping Centers</option>
                      <option value="Public Markets">Public Markets</option>
                      <option value="Business Parks">Business Parks</option>
                      <option value="Trade Centers">Trade Centers</option>
                    </>
                  )}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="MAINTENANCE">Under Maintenance</option>
                  <option value="INACTIVE">Inactive</option>
                  <option value="DECOMMISSIONED">Decommissioned</option>
                </select>
              </div>
            </div>

            {/* Type Field */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Asset Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Asset Type</option>
                {formData.category === "Healthcare" && (
                  <>
                    <option value="Hospital Building">Hospital Building</option>
                    <option value="Clinic Building">Clinic Building</option>
                    <option value="Medical Center">Medical Center</option>
                    <option value="Healthcare Facility">Healthcare Facility</option>
                    <option value="Maternity Home">Maternity Home</option>
                    <option value="Psychiatric Facility">Psychiatric Facility</option>
                    <option value="Laboratory Building">Laboratory Building</option>
                  </>
                )}
                {formData.category === "Education" && (
                  <>
                    <option value="School Building">School Building</option>
                    <option value="University Building">University Building</option>
                    <option value="College Building">College Building</option>
                    <option value="Library Building">Library Building</option>
                    <option value="Laboratory Building">Laboratory Building</option>
                    <option value="Hostel Building">Hostel Building</option>
                    <option value="Administrative Block">Administrative Block</option>
                  </>
                )}
                {formData.category === "Government" && (
                  <>
                    <option value="Government Building">Government Building</option>
                    <option value="Administrative Complex">Administrative Complex</option>
                    <option value="Ministry Building">Ministry Building</option>
                    <option value="Court Building">Court Building</option>
                    <option value="Assembly Building">Assembly Building</option>
                    <option value="Office Complex">Office Complex</option>
                    <option value="Secretariat Building">Secretariat Building</option>
                  </>
                )}
                {formData.category === "Infrastructure" && (
                  <>
                    <option value="Bridge Structure">Bridge Structure</option>
                    <option value="Road Infrastructure">Road Infrastructure</option>
                    <option value="Water Treatment Plant">Water Treatment Plant</option>
                    <option value="Power Plant">Power Plant</option>
                    <option value="Drainage System">Drainage System</option>
                    <option value="Waste Management Facility">Waste Management Facility</option>
                    <option value="Telecommunications Infrastructure">Telecommunications Infrastructure</option>
                  </>
                )}
                {formData.category === "Transportation" && (
                  <>
                    <option value="Bus Terminal">Bus Terminal</option>
                    <option value="Ferry Terminal">Ferry Terminal</option>
                    <option value="Railway Station">Railway Station</option>
                    <option value="Airport Terminal">Airport Terminal</option>
                    <option value="Parking Facility">Parking Facility</option>
                    <option value="Transport Hub">Transport Hub</option>
                    <option value="Vehicle Fleet">Vehicle Fleet</option>
                  </>
                )}
                {formData.category === "Utilities" && (
                  <>
                    <option value="Water Supply System">Water Supply System</option>
                    <option value="Sewage Treatment Plant">Sewage Treatment Plant</option>
                    <option value="Power Distribution System">Power Distribution System</option>
                    <option value="Gas Distribution Network">Gas Distribution Network</option>
                    <option value="Street Lighting System">Street Lighting System</option>
                    <option value="Waste Collection Point">Waste Collection Point</option>
                    <option value="Public Toilet Facility">Public Toilet Facility</option>
                  </>
                )}
                {formData.category === "Residential" && (
                  <>
                    <option value="Housing Estate">Housing Estate</option>
                    <option value="Staff Quarters">Staff Quarters</option>
                    <option value="Public Housing">Public Housing</option>
                    <option value="Residential Complex">Residential Complex</option>
                    <option value="Student Hostel">Student Hostel</option>
                    <option value="Senior Housing">Senior Housing</option>
                    <option value="Temporary Shelter">Temporary Shelter</option>
                  </>
                )}
                {formData.category === "Commercial" && (
                  <>
                    <option value="Market Building">Market Building</option>
                    <option value="Shopping Center">Shopping Center</option>
                    <option value="Business Complex">Business Complex</option>
                    <option value="Industrial Estate">Industrial Estate</option>
                    <option value="Trade Center">Trade Center</option>
                    <option value="Exhibition Hall">Exhibition Hall</option>
                    <option value="Commercial Building">Commercial Building</option>
                  </>
                )}
                {formData.category === "Recreation" && (
                  <>
                    <option value="Park Facility">Park Facility</option>
                    <option value="Sports Complex">Sports Complex</option>
                    <option value="Stadium">Stadium</option>
                    <option value="Recreation Center">Recreation Center</option>
                    <option value="Cultural Center">Cultural Center</option>
                    <option value="Museum Building">Museum Building</option>
                    <option value="Art Gallery">Art Gallery</option>
                  </>
                )}
                {formData.category === "Security" && (
                  <>
                    <option value="Police Station">Police Station</option>
                    <option value="Fire Station">Fire Station</option>
                    <option value="Security Post">Security Post</option>
                    <option value="Emergency Center">Emergency Center</option>
                    <option value="Correctional Facility">Correctional Facility</option>
                    <option value="Border Post">Border Post</option>
                    <option value="CCTV System">CCTV System</option>
                  </>
                )}
                {formData.category === "Equipment" && (
                  <>
                    <option value="Medical Equipment">Medical Equipment</option>
                    <option value="Office Equipment">Office Equipment</option>
                    <option value="Construction Equipment">Construction Equipment</option>
                    <option value="IT Equipment">IT Equipment</option>
                    <option value="Laboratory Equipment">Laboratory Equipment</option>
                    <option value="Security Equipment">Security Equipment</option>
                    <option value="Generator Equipment">Generator Equipment</option>
                  </>
                )}
                {!formData.category && (
                  <option value="" disabled>Please select a category first</option>
                )}
              </select>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Specific type of asset based on the selected category
              </p>
          </div>

            {/* Additional Basic Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Condition *
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Year Built *
                </label>
                <input
                  type="number"
                  name="yearBuilt"
                  value={formData.yearBuilt}
                  onChange={handleInputChange}
                  placeholder="e.g., 2020"
                  min="1800"
                  max="2025"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Size/Area *
                </label>
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  placeholder="e.g., 15,000 sqm"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Maintenance & Faults */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Open Faults
                </label>
                <input
                  type="number"
                  name="openFaults"
                  value={formData.openFaults}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Maintenance Items
                </label>
                <input
                  type="number"
                  name="maintenance"
                  value={formData.maintenance}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          )}

          {/* Step 2: Physical Specifications */}
          {currentStep === 2 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 ">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Physical Specifications</h2>
            </div>

            {/* Basic Physical Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Total Area
                </label>
                <input
                  type="text"
                  name="totalArea"
                  value={formData.totalArea}
                  onChange={handleInputChange}
                  placeholder="e.g., 15,000 sqm"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Number of Floors
                </label>
                <input
                  type="number"
                  name="floors"
                  value={formData.floors}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Total Rooms/Spaces
                </label>
                <input
                  type="number"
                  name="totalRooms"
                  value={formData.totalRooms}
                  onChange={handleInputChange}
                  min="1"
                  placeholder="Total rooms, offices, or spaces"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Capacity and Facilities */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Capacity
                </label>
                <input
                  type="text"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  placeholder="e.g., 500 people, 200 beds"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Parking Spaces
                </label>
                <input
                  type="number"
                  name="parkingSpaces"
                  value={formData.parkingSpaces}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Elevators
                </label>
                <input
                  type="number"
                  name="elevators"
                  value={formData.elevators}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          )}

          {/* Step 3: Systems & Utilities */}
          {currentStep === 3 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 ">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Systems & Utilities</h2>
            </div>

            {/* Major Systems */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  HVAC System
                </label>
                <select
                  name="hvacSystem"
                  value={formData.hvacSystem}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select HVAC System</option>
                  <option value="Central Air Conditioning">Central Air Conditioning</option>
                  <option value="VRF System">VRF System</option>
                  <option value="Split Unit System">Split Unit System</option>
                  <option value="Package Unit">Package Unit</option>
                  <option value="Chiller System">Chiller System</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Electrical System
                </label>
                <select
                  name="electricalSystem"
                  value={formData.electricalSystem}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Electrical System</option>
                  <option value="3-Phase 415V">3-Phase 415V</option>
                  <option value="Single Phase 240V">Single Phase 240V</option>
                  <option value="High Voltage">High Voltage</option>
                  <option value="Low Voltage">Low Voltage</option>
                </select>
              </div>
            </div>

            {/* Utilities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Water Supply
                </label>
                <select
                  name="waterSupply"
                  value={formData.waterSupply}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Water Supply</option>
                  <option value="Municipal + Backup">Municipal + Backup</option>
                  <option value="Municipal Only">Municipal Only</option>
                  <option value="Borehole + Municipal">Borehole + Municipal</option>
                  <option value="Borehole Only">Borehole Only</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Backup Power
                </label>
                <select
                  name="backupPower"
                  value={formData.backupPower}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Backup Power</option>
                  <option value="Diesel Generators">Diesel Generators</option>
                  <option value="UPS System">UPS System</option>
                  <option value="Solar + Battery">Solar + Battery</option>
                  <option value="Gas Generator">Gas Generator</option>
                </select>
              </div>
            </div>
          </div>
          )}

          {/* Step 4: Equipment Inventory */}
          {currentStep === 4 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 ">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Equipment Inventory</h2>
            </div>

            {/* Air Conditioning Systems */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 border-l-4 border-blue-600 pl-3">Air Conditioning Systems</h3>
              <div className="space-y-4">
                {formData.airConditioningUnits.map((unit, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg relative">
                    {formData.airConditioningUnits.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEquipmentItem('airConditioningUnits', index)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                      >
                        ✕
                      </button>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">AC Type</label>
                      <select 
                        value={unit.type}
                        onChange={(e) => updateEquipmentItem('airConditioningUnits', index, 'type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      >
                        <option value="">Select Type</option>
                        <option value="Central Chiller System">Central Chiller System</option>
                        <option value="VRF System">VRF System</option>
                        <option value="Split Unit">Split Unit</option>
                        <option value="Window Unit">Window Unit</option>
                        <option value="Cassette Unit">Cassette Unit</option>
                        <option value="Package Unit">Package Unit</option>
                        <option value="Ducted System">Ducted System</option>
                        <option value="Multi-Split System">Multi-Split System</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Brand</label>
                      <select
                        value={unit.brand}
                        onChange={(e) => updateEquipmentItem('airConditioningUnits', index, 'brand', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      >
                        <option value="">Select Brand</option>
                        <option value="Carrier">Carrier</option>
                        <option value="Daikin">Daikin</option>
                        <option value="Trane">Trane</option>
                        <option value="York">York</option>
                        <option value="Mitsubishi">Mitsubishi</option>
                        <option value="LG">LG</option>
                        <option value="Samsung">Samsung</option>
                        <option value="Panasonic">Panasonic</option>
                        <option value="Haier">Haier</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Capacity</label>
                      <input 
                        type="text" 
                        value={unit.capacity}
                        onChange={(e) => updateEquipmentItem('airConditioningUnits', index, 'capacity', e.target.value)}
                        placeholder="e.g., 500 TR, 24,000 BTU/hr" 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                      <input 
                        type="text" 
                        value={unit.location}
                        onChange={(e) => updateEquipmentItem('airConditioningUnits', index, 'location', e.target.value)}
                        placeholder="e.g., Main Building, Floor 1" 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm" 
                      />
                    </div>
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={() => addEquipmentItem('airConditioningUnits')}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm font-medium flex items-center gap-1"
                >
                  <span className="text-lg">+</span> Add Another AC Unit
                </button>
              </div>
            </div>

            {/* Doors */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 border-l-4 border-green-600 pl-3">Doors</h3>
              <div className="space-y-4">
                {formData.doors.map((door, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg relative">
                    {formData.doors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEquipmentItem('doors', index)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                      >
                        ✕
                      </button>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Door Type</label>
                      <select 
                        value={door.type}
                        onChange={(e) => updateEquipmentItem('doors', index, 'type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      >
                        <option value="">Select Type</option>
                        <option value="Main Entrance Door">Main Entrance Door</option>
                        <option value="Fire Exit Door">Fire Exit Door</option>
                        <option value="Internal Door">Internal Door</option>
                        <option value="Security Door">Security Door</option>
                        <option value="Emergency Exit">Emergency Exit</option>
                        <option value="Sliding Door">Sliding Door</option>
                        <option value="Revolving Door">Revolving Door</option>
                        <option value="Automatic Door">Automatic Door</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Material</label>
                      <select 
                        value={door.material}
                        onChange={(e) => updateEquipmentItem('doors', index, 'material', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      >
                        <option value="">Select Material</option>
                        <option value="Medical Grade Steel">Medical Grade Steel</option>
                        <option value="Security Steel">Security Steel</option>
                        <option value="Standard Steel">Standard Steel</option>
                        <option value="Wood">Wood</option>
                        <option value="Glass">Glass</option>
                        <option value="Aluminum">Aluminum</option>
                        <option value="Composite">Composite</option>
                        <option value="UPVC">UPVC</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dimensions</label>
                      <input 
                        type="text" 
                        value={door.dimensions}
                        onChange={(e) => updateEquipmentItem('doors', index, 'dimensions', e.target.value)}
                        placeholder="e.g., 3m x 2.5m" 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Doors</label>
                      <input 
                        type="number" 
                        min="1" 
                        value={door.totalDoors}
                        onChange={(e) => updateEquipmentItem('doors', index, 'totalDoors', e.target.value)}
                        placeholder="Number of doors" 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm" 
                      />
                    </div>
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={() => addEquipmentItem('doors')}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm font-medium flex items-center gap-1"
                >
                  <span className="text-lg">+</span> Add Another Door Type
                </button>
              </div>
            </div>

            {/* Windows */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 border-l-4 border-yellow-600 pl-3">Windows</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Window Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
                    <option value="">Select Type</option>
                    <option value="Double Glazed Window">Double Glazed Window</option>
                    <option value="Single Glazed Window">Single Glazed Window</option>
                    <option value="Triple Glazed Window">Triple Glazed Window</option>
                    <option value="Sliding Window">Sliding Window</option>
                    <option value="Casement Window">Casement Window</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Material</label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
                    <option value="">Select Material</option>
                    <option value="Aluminum Frame with Glass">Aluminum Frame with Glass</option>
                    <option value="UPVC Frame with Glass">UPVC Frame with Glass</option>
                    <option value="Wood Frame with Glass">Wood Frame with Glass</option>
                    <option value="Steel Frame with Glass">Steel Frame with Glass</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dimensions</label>
                  <input type="text" placeholder="e.g., 1.5m x 1.2m" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Windows</label>
                  <input type="number" min="0" placeholder="Number of windows" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm" />
                </div>
              </div>
            </div>

            {/* Lighting */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 border-l-4 border-orange-600 pl-3">Lighting Systems</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lighting Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
                    <option value="">Select Type</option>
                    <option value="LED Panel Lighting">LED Panel Lighting</option>
                    <option value="Fluorescent Lighting">Fluorescent Lighting</option>
                    <option value="Emergency Lighting">Emergency Lighting</option>
                    <option value="Track Lighting">Track Lighting</option>
                    <option value="Recessed Lighting">Recessed Lighting</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Brand</label>
                  <input type="text" placeholder="e.g., Philips, Osram" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Fixtures</label>
                  <input type="number" min="0" placeholder="Number of fixtures" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm" />
                </div>
              </div>
            </div>

            {/* Additional Equipment Types */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 border-l-4 border-purple-600 pl-3">Additional Equipment</h3>
              <div className="space-y-4">
                {formData.otherEquipment.length > 0 && formData.otherEquipment.map((equipment, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg relative">
                    <button
                      type="button"
                      onClick={() => removeEquipmentItem('otherEquipment', index)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                    >
                      ✕
                    </button>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Equipment Type</label>
                      <select 
                        value={equipment.type}
                        onChange={(e) => updateEquipmentItem('otherEquipment', index, 'type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      >
                        <option value="">Select Type</option>
                        <option value="Generator">Generator</option>
                        <option value="UPS System">UPS System</option>
                        <option value="Water Pump">Water Pump</option>
                        <option value="Elevator">Elevator</option>
                        <option value="Fire Extinguisher">Fire Extinguisher</option>
                        <option value="Security Camera">Security Camera</option>
                        <option value="Access Control">Access Control</option>
                        <option value="Intercom System">Intercom System</option>
                        <option value="Solar Panel">Solar Panel</option>
                        <option value="Water Tank">Water Tank</option>
                        <option value="Transformer">Transformer</option>
                        <option value="Boiler">Boiler</option>
                        <option value="Chiller">Chiller</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Brand/Manufacturer</label>
                      <input 
                        type="text" 
                        value={equipment.brand}
                        onChange={(e) => updateEquipmentItem('otherEquipment', index, 'brand', e.target.value)}
                        placeholder="e.g., Caterpillar, Perkins" 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Specifications</label>
                      <input 
                        type="text" 
                        value={equipment.specifications}
                        onChange={(e) => updateEquipmentItem('otherEquipment', index, 'specifications', e.target.value)}
                        placeholder="e.g., 500KVA, 1000L capacity" 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                      <input 
                        type="text" 
                        value={equipment.location}
                        onChange={(e) => updateEquipmentItem('otherEquipment', index, 'location', e.target.value)}
                        placeholder="e.g., Generator Room, Basement" 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity</label>
                      <input 
                        type="number" 
                        min="1" 
                        value={equipment.quantity}
                        onChange={(e) => updateEquipmentItem('otherEquipment', index, 'quantity', e.target.value)}
                        placeholder="Number of units" 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm" 
                      />
                    </div>
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={() => addEquipmentItem('otherEquipment')}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm font-medium flex items-center gap-1"
                >
                  <span className="text-lg">+</span> Add Equipment
                </button>
              </div>
            </div>
          </div>
          )}

          {/* Step 5: Location & Financial */}
          {currentStep === 5 && (
          <>
          {/* Location Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 ">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Location Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location/Address *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Building address or location"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  LGA (Local Government Area) *
                </label>
                <select
                  name="lga"
                  value={formData.lga}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select LGA</option>
                  <option value="Ikeja">Ikeja</option>
                  <option value="Lagos Island">Lagos Island</option>
                  <option value="Lagos Mainland">Lagos Mainland</option>
                  <option value="Surulere">Surulere</option>
                  <option value="Ojo">Ojo</option>
                  <option value="Alimosho">Alimosho</option>
                  <option value="Agege">Agege</option>
                  <option value="Ifako-Ijaiye">Ifako-Ijaiye</option>
                  <option value="Shomolu">Shomolu</option>
                  <option value="Mushin">Mushin</option>
                  <option value="Oshodi-Isolo">Oshodi-Isolo</option>
                  <option value="Kosofe">Kosofe</option>
                  <option value="Ikorodu">Ikorodu</option>
                  <option value="Epe">Epe</option>
                  <option value="Badagry">Badagry</option>
                  <option value="Ajeromi-Ifelodun">Ajeromi-Ifelodun</option>
                  <option value="Amuwo-Odofin">Amuwo-Odofin</option>
                  <option value="Apapa">Apapa</option>
                  <option value="Eti-Osa">Eti-Osa</option>
                  <option value="Ibeju-Lekki">Ibeju-Lekki</option>
                </select>
              </div>
            </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Zone *
                </label>
                <select
                  name="zone"
                  value={formData.zone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Zone</option>
                  <option value="Central Lagos">Central Lagos</option>
                  <option value="Lagos Island">Lagos Island</option>
                  <option value="Victoria Island">Victoria Island</option>
                  <option value="Ikoyi">Ikoyi</option>
                  <option value="Mainland">Mainland</option>
                  <option value="North Lagos">North Lagos</option>
                  <option value="East Lagos">East Lagos</option>
                  <option value="West Lagos">West Lagos</option>
                  <option value="Lekki Peninsula">Lekki Peninsula</option>
                  <option value="Badagry Axis">Badagry Axis</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Latitude
                </label>
                <input
                  type="text"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleInputChange}
                  placeholder="e.g., 6.5244"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Longitude
                </label>
                <input
                  type="text"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleInputChange}
                  placeholder="e.g., 3.3792"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 ">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Financial Information</h2>
            </div>

            {/* Primary Financial Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Original Cost
                </label>
                <input
                  type="text"
                  name="originalCost"
                  value={formData.originalCost}
                  onChange={handleInputChange}
                  placeholder="e.g., ₦450M (1978)"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Include year in parentheses if known</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Value *
                </label>
                <input
                  type="number"
                  name="assetValue"
                  value={formData.assetValue}
                  onChange={handleInputChange}
                  placeholder="Current market value"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
                />
              </div>
            </div>

            {/* Dates and Department */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Acquisition Date
                </label>
                <input
                  type="date"
                  name="acquisitionDate"
                  value={formData.acquisitionDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Last Valuation Date
                </label>
                <input
                  type="text"
                  name="lastValuation"
                  value={formData.lastValuation}
                  onChange={handleInputChange}
                  placeholder="e.g., December 2024"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Department *
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Ministry of Health">Ministry of Health</option>
                  <option value="Ministry of Education">Ministry of Education</option>
                  <option value="Ministry of Works & Infrastructure">Ministry of Works & Infrastructure</option>
                  <option value="Ministry of Transportation">Ministry of Transportation</option>
                  <option value="Ministry of Environment">Ministry of Environment</option>
                  <option value="Ministry of Housing">Ministry of Housing</option>
                  <option value="Ministry of Agriculture">Ministry of Agriculture</option>
                  <option value="Ministry of Commerce & Industry">Ministry of Commerce & Industry</option>
                  <option value="Ministry of Justice">Ministry of Justice</option>
                  <option value="Ministry of Finance">Ministry of Finance</option>
                  <option value="Ministry of Energy & Mineral Resources">Ministry of Energy & Mineral Resources</option>
                  <option value="Ministry of Science & Technology">Ministry of Science & Technology</option>
                  <option value="Ministry of Tourism, Arts & Culture">Ministry of Tourism, Arts & Culture</option>
                  <option value="Ministry of Youth & Sports">Ministry of Youth & Sports</option>
                  <option value="Ministry of Women Affairs & Poverty Alleviation">Ministry of Women Affairs & Poverty Alleviation</option>
                  <option value="Lagos State Government">Lagos State Government</option>
                  <option value="Lagos State Police Command">Lagos State Police Command</option>
                  <option value="Lagos State Fire Service">Lagos State Fire Service</option>
                  <option value="Lagos State Security Trust Fund">Lagos State Security Trust Fund</option>
                  <option value="Lagos State Emergency Management Agency">Lagos State Emergency Management Agency</option>
                  <option value="Federal Airports Authority of Nigeria">Federal Airports Authority of Nigeria</option>
                  <option value="Federal Ministry of Interior">Federal Ministry of Interior</option>
                  <option value="Lagos State Water Corporation">Lagos State Water Corporation</option>
                  <option value="Lagos State Waste Management Authority">Lagos State Waste Management Authority</option>
                  <option value="Lagos Metropolitan Area Transport Authority">Lagos Metropolitan Area Transport Authority</option>
                  <option value="Lagos State Resident Registration Agency">Lagos State Resident Registration Agency</option>
                  <option value="Lagos State Internal Revenue Service">Lagos State Internal Revenue Service</option>
                  <option value="Lagos State Public Works Corporation">Lagos State Public Works Corporation</option>
                  <option value="Lagos State Building Control Agency">Lagos State Building Control Agency</option>
                  <option value="Lagos State Physical Planning Permit Authority">Lagos State Physical Planning Permit Authority</option>
                </select>
        </div>
      </div>
          </div>
          </>
          )}

          {/* Step 6: Documents & Media */}
          {currentStep === 6 && (
          <>
          {/* Documents & Files */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 ">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Documents & Certificates</h2>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="mt-4">
                  <label htmlFor="documents-upload" className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-white">
                      Upload Documents
                    </span>
                    <span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">
                      Building plans, certificates, insurance policies, etc. (PDF, DOC, DWG)
                    </span>
                  </label>
                  <input id="documents-upload" name="documents-upload" type="file" className="sr-only" multiple accept=".pdf,.doc,.docx,.dwg,.jpg,.png" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Document Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="">Select Document Type</option>
                    <option value="Building Plan Approval">Building Plan Approval</option>
                    <option value="Structural Drawings">Structural Drawings</option>
                    <option value="Insurance Policy">Insurance Policy</option>
                    <option value="Fire Safety Certificate">Fire Safety Certificate</option>
                    <option value="Electrical Certificate">Electrical Certificate</option>
                    <option value="Environmental Certificate">Environmental Certificate</option>
                    <option value="Occupancy Certificate">Occupancy Certificate</option>
                    <option value="Maintenance Manual">Maintenance Manual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Issue Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expiry Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Images & Technical Drawings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 ">
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Images & Technical Drawings</h2>
        </div>

        <div className="space-y-6">
              {/* Image Upload */}
              <div>
            <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Asset Images</h3>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="mt-4">
                <label htmlFor="images-upload" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Upload Images
                  </span>
                  <span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">
                    Exterior, interior, and equipment photos (JPG, PNG, up to 10MB each)
                  </span>
                </label>
                <input id="images-upload" name="images-upload" type="file" className="sr-only" multiple accept=".jpg,.jpeg,.png" />
              </div>
            </div>
          </div>

              {/* Technical Drawings Upload */}
          <div>
                <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Technical Drawings</h3>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              <div className="mt-4">
                    <label htmlFor="drawings-upload" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-white">
                        Upload Technical Drawings
                  </span>
                  <span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">
                        Floor plans, elevations, sections (DWG, PDF, up to 50MB each)
                  </span>
                </label>
                    <input id="drawings-upload" name="drawings-upload" type="file" className="sr-only" multiple accept=".dwg,.pdf,.jpg,.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
          </>
          )}

          {/* Step 7: Maintenance & Audit */}
          {currentStep === 7 && (
          <>
          {/* Maintenance Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 ">
        <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Maintenance Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Last Inspection Date
                </label>
                <input
                  type="date"
                  name="lastInspection"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Next Inspection Date
                </label>
                <input
                  type="date"
                  name="nextInspection"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Maintenance Budget (Annual)
                </label>
                <input
                  type="text"
                  name="maintenanceBudget"
                  placeholder="e.g., ₦2.5M annually"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Maintenance Contractor
                </label>
                <input
                  type="text"
                  name="maintenanceContractor"
                  placeholder="Primary maintenance company"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Insurance Coverage
                </label>
                <select
                  name="insuranceCoverage"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Insurance Status</option>
                  <option value="Active - Lagos State Insurance">Active - Lagos State Insurance</option>
                  <option value="Active - Private Insurance">Active - Private Insurance</option>
                  <option value="Self-Insured">Self-Insured</option>
                  <option value="No Insurance">No Insurance</option>
                </select>
                </div>
                </div>
                </div>

          {/* Audit Trail & Change History */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 ">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Audit Trail & Change History</h2>
          </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="text-sm font-medium text-blue-900 dark:text-blue-200">Automatic Audit Trail</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    System will automatically create an audit trail entry when this asset is created, including user information, timestamp, and initial field values.
                  </p>
          </div>
        </div>
                </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Creation Notes
                </label>
                <textarea
                  name="creationNotes"
                  rows={3}
                  placeholder="Optional notes about asset creation or migration..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
            </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Data Source
                </label>
                <select
                  name="dataSource"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Data Source</option>
                  <option value="Manual Entry">Manual Entry</option>
                  <option value="Legacy System Migration">Legacy System Migration</option>
                  <option value="Physical Survey">Physical Survey</option>
                  <option value="Procurement Records">Procurement Records</option>
                  <option value="Insurance Records">Insurance Records</option>
                  <option value="Third Party Assessment">Third Party Assessment</option>
                </select>
              </div>
            </div>
          </div>
          </>
          )}

          {/* Building Specifications (shown when Building category is selected in any step) */}
          {(currentStep === 2 && formData.category === "Building") && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white ">Detailed Building Specifications</h2>
              
              {/* Structural */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 border-l-4 border-blue-600 pl-3">Structural</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Floors</label>
                    <input
                      type="number"
                      name="floors"
                      value={formData.floors}
                      onChange={handleInputChange}
                      placeholder="Enter floors"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Total Rooms (Count)</label>
                    <input
                      type="number"
                      name="totalRooms"
                      value={formData.totalRooms}
                      onChange={handleInputChange}
                      placeholder="Enter total rooms"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Total Windows (Count)</label>
                    <input
                      type="number"
                      name="totalWindows"
                      value={formData.totalWindows}
                      onChange={handleInputChange}
                      placeholder="Enter total windows"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Total Doors (Count)</label>
                    <input
                      type="number"
                      name="totalDoors"
                      value={formData.totalDoors}
                      onChange={handleInputChange}
                      placeholder="Enter total doors"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Elevators</label>
                    <input
                      type="number"
                      name="elevators"
                      value={formData.elevators}
                      onChange={handleInputChange}
                      placeholder="Enter elevators"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Staircases</label>
                    <input
                      type="number"
                      name="staircases"
                      value={formData.staircases}
                      onChange={handleInputChange}
                      placeholder="Enter staircases"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Total Area (Count)</label>
                  <input
                    type="text"
                    name="totalArea"
                    value={formData.totalArea}
                    onChange={handleInputChange}
                    placeholder="Enter total area"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Facilities */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 border-l-4 border-green-600 pl-3">Facilities</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Parking Spaces</label>
                    <input
                      type="number"
                      name="parkingSpaces"
                      value={formData.parkingSpaces}
                      onChange={handleInputChange}
                      placeholder="Enter parking spaces"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Restrooms</label>
                    <input
                      type="number"
                      name="restrooms"
                      value={formData.restrooms}
                      onChange={handleInputChange}
                      placeholder="Enter restrooms"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Kitchens</label>
                    <input
                      type="number"
                      name="kitchens"
                      value={formData.kitchens}
                      onChange={handleInputChange}
                      placeholder="Enter kitchens"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Conference Rooms</label>
                    <input
                      type="number"
                      name="conferenceRooms"
                      value={formData.conferenceRooms}
                      onChange={handleInputChange}
                      placeholder="Enter conference rooms"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Security Office</label>
                    <input
                      type="number"
                      name="securityOffice"
                      value={formData.securityOffice}
                      onChange={handleInputChange}
                      placeholder="Enter security office"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Systems */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 border-l-4 border-purple-600 pl-3">Systems</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">HVAC System</label>
                    <select
                      name="hvacSystem"
                      value={formData.hvacSystem}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select HVAC system</option>
                      <option value="Central Air">Central Air</option>
                      <option value="Split System">Split System</option>
                      <option value="Window Units">Window Units</option>
                      <option value="None">None</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Electrical System</label>
                    <select
                      name="electricalSystem"
                      value={formData.electricalSystem}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select electrical system</option>
                      <option value="220V Standard">220V Standard</option>
                      <option value="110V/220V Mixed">110V/220V Mixed</option>
                      <option value="Industrial 3-Phase">Industrial 3-Phase</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Plumbing System</label>
                    <select
                      name="plumbingSystem"
                      value={formData.plumbingSystem}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select plumbing system</option>
                      <option value="Municipal Water">Municipal Water</option>
                      <option value="Well Water">Well Water</option>
                      <option value="Mixed System">Mixed System</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Security System</label>
                    <select
                      name="securitySystem"
                      value={formData.securitySystem}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select security system</option>
                      <option value="CCTV + Alarms">CCTV + Alarms</option>
                      <option value="CCTV Only">CCTV Only</option>
                      <option value="Basic Alarms">Basic Alarms</option>
                      <option value="None">None</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Fire System</label>
                    <select
                      name="fireSystem"
                      value={formData.fireSystem}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select fire system</option>
                      <option value="Full Sprinkler System">Full Sprinkler System</option>
                      <option value="Smoke Detectors Only">Smoke Detectors Only</option>
                      <option value="Manual Systems">Manual Systems</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Accessibility */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 border-l-4 border-orange-600 pl-3">Accessibility</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Wheelchair Accessible</label>
                    <select
                      name="wheelchairAccessible"
                      value={formData.wheelchairAccessible}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="Partial">Partial</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Elevator Access</label>
                    <select
                      name="elevatorAccess"
                      value={formData.elevatorAccess}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ramps</label>
                    <input
                      type="number"
                      name="ramps"
                      value={formData.ramps}
                      onChange={handleInputChange}
                      placeholder="Enter ramps"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Accessible Restrooms</label>
                    <input
                      type="number"
                      name="accessibleRestrooms"
                      value={formData.accessibleRestrooms}
                      onChange={handleInputChange}
                      placeholder="Enter accessible restrooms"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Safety */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 border-l-4 border-red-600 pl-3">Safety</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Fire Extinguishers</label>
                    <input
                      type="number"
                      name="fireExtinguishers"
                      value={formData.fireExtinguishers}
                      onChange={handleInputChange}
                      placeholder="Enter fire extinguishers"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Smoke Detectors</label>
                    <input
                      type="number"
                      name="smokeDetectors"
                      value={formData.smokeDetectors}
                      onChange={handleInputChange}
                      placeholder="Enter smoke detectors"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Emergency Exits</label>
                    <input
                      type="number"
                      name="emergencyExits"
                      value={formData.emergencyExits}
                      onChange={handleInputChange}
                      placeholder="Enter emergency exits"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Aid Stations</label>
                    <input
                      type="number"
                      name="firstAidStations"
                      value={formData.firstAidStations}
                      onChange={handleInputChange}
                      placeholder="Enter first aid stations"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => router.push('/dashboard/assets')}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
              >
                Cancel
              </button>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
                >
                  ← Previous
                </button>
              )}
          </div>

            <div className="flex space-x-4">
              {currentStep < steps.length ? (
            <button
              type="button"
                  onClick={nextStep}
                  disabled={!validateCurrentStep()}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    validateCurrentStep()
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Next →
            </button>
              ) : (
            <button
              type="submit"
                  disabled={!validateCurrentStep()}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    validateCurrentStep()
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
            >
              Create Asset
            </button>
              )}
            </div>
          </div>
        </form>
        </div>
      </div>
    </div>
  )
}
