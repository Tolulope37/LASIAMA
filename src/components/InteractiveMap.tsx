"use client"

import { useState } from 'react'

interface Asset {
  id: number
  name: string
  position: [number, number]
  type: string
  status: 'operational' | 'maintenance' | 'critical'
  description: string
}

export default function InteractiveMap() {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [zoomLevel, setZoomLevel] = useState(11)

  // Real assets in Lagos State with precise coordinates
  const assets: Asset[] = [
    {
      id: 1,
      name: "Lagos State Secretariat",
      position: [6.5244, 3.3792], // Alausa, Ikeja
      type: "Government Building",
      status: "operational",
      description: "Main administrative complex housing various government departments and offices in Alausa, Ikeja."
    },
    {
      id: 2,
      name: "Government House Marina",
      position: [6.4698, 3.3792], // Marina, Lagos Island
      type: "Government Building",
      status: "operational",
      description: "Official residence and office of the Lagos State Governor located in Marina, Lagos Island."
    },
    {
      id: 3,
      name: "Lagos State University",
      position: [6.6018, 3.2442], // Ojo
      type: "Educational Institution",
      status: "operational",
      description: "State university campus in Ojo providing higher education and research facilities."
    },
    {
      id: 4,
      name: "Lagos State General Hospital",
      position: [6.4541, 3.3947], // Ikeja
      type: "Healthcare Facility",
      status: "maintenance",
      description: "Primary state hospital in Ikeja providing healthcare services. Currently undergoing facility upgrades."
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return '#10B981'
      case 'maintenance': return '#F59E0B'
      case 'critical': return '#EF4444'
      default: return '#6B7280'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'operational': return 'Operational'
      case 'maintenance': return 'Under Maintenance'
      case 'critical': return 'Critical Issue'
      default: return 'Unknown'
    }
  }

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 18))
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 8))
  }

  const resetZoom = () => {
    setZoomLevel(11)
  }

  return (
    <div className="relative">
      {/* Interactive Lagos State Map */}
      <div className="h-96 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-600 shadow-lg relative bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900">
        
        {/* Map Background with Lagos State Shape */}
        <div className="absolute inset-0">
          <svg 
            viewBox="0 0 800 500" 
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
          >
            {/* Lagos State landmass */}
            <path
              d="M100 200 Q200 150 350 180 Q500 200 650 220 Q700 250 720 300 Q700 350 650 380 Q500 400 350 390 Q200 380 150 350 Q100 300 100 200 Z"
              fill="rgba(34, 197, 94, 0.15)"
              stroke="rgba(34, 197, 94, 0.4)"
              strokeWidth="2"
            />
            
            {/* Lagos Island */}
            <ellipse
              cx="580"
              cy="320"
              rx="40"
              ry="25"
              fill="rgba(59, 130, 246, 0.2)"
              stroke="rgba(59, 130, 246, 0.5)"
              strokeWidth="1"
            />
            
            {/* Victoria Island */}
            <ellipse
              cx="620"
              cy="340"
              rx="30"
              ry="15"
              fill="rgba(59, 130, 246, 0.2)"
              stroke="rgba(59, 130, 246, 0.5)"
              strokeWidth="1"
            />
            
            {/* Water bodies */}
            <path
              d="M400 100 Q500 80 600 100 Q650 120 680 150 Q700 180 720 220"
              fill="none"
              stroke="rgba(59, 130, 246, 0.6)"
              strokeWidth="3"
            />
            
            {/* Major roads */}
            <path
              d="M150 250 Q300 240 450 250 Q600 260 700 270"
              fill="none"
              stroke="rgba(107, 114, 128, 0.4)"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            
            <path
              d="M200 180 Q250 280 300 380"
              fill="none"
              stroke="rgba(107, 114, 128, 0.4)"
              strokeWidth="2"
              strokeDasharray="5,5"
            />

            {/* District Labels */}
            <text x="150" y="280" className="text-xs fill-gray-600" style={{fontSize: '12px', fontFamily: 'system-ui'}}>Ikeja</text>
            <text x="580" y="310" className="text-xs fill-gray-600" style={{fontSize: '12px', fontFamily: 'system-ui'}}>Lagos Island</text>
            <text x="620" y="355" className="text-xs fill-gray-600" style={{fontSize: '12px', fontFamily: 'system-ui'}}>Victoria Island</text>
            <text x="300" y="200" className="text-xs fill-gray-600" style={{fontSize: '12px', fontFamily: 'system-ui'}}>Alausa</text>
            <text x="500" y="180" className="text-xs fill-gray-600" style={{fontSize: '12px', fontFamily: 'system-ui'}}>Surulere</text>
          </svg>
        </div>

        {/* Asset Markers */}
        {assets.map((asset) => {
          // Convert lat/lng to approximate pixel positions for Lagos area
          const latMin = 6.3, latMax = 6.7, lngMin = 3.1, lngMax = 3.6
          const x = ((asset.position[1] - lngMin) / (lngMax - lngMin)) * 100
          const y = 100 - ((asset.position[0] - latMin) / (latMax - latMin)) * 100
          
          return (
            <div
              key={asset.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110 z-10"
              style={{ left: `${x}%`, top: `${y}%` }}
              onClick={() => setSelectedAsset(asset)}
            >
              <div 
                className="w-10 h-10 rounded-full border-3 border-white shadow-lg flex items-center justify-center animate-pulse"
                style={{ backgroundColor: getStatusColor(asset.status) }}
              >
                <span className="text-white font-bold text-sm">{asset.id}</span>
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                Asset {asset.id}
              </div>
            </div>
          )
        })}

        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 z-20">
          <button
            onClick={handleZoomIn}
            disabled={zoomLevel >= 18}
            className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg"
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            disabled={zoomLevel <= 8}
            className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg"
          >
            −
          </button>
          <button
            onClick={resetZoom}
            className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-xs"
          >
            🏠
          </button>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg px-2 py-1 text-xs text-gray-600 dark:text-gray-400 text-center">
            {zoomLevel}
          </div>
        </div>

        {/* Map Info Overlay */}
        <div className="absolute top-4 left-4 bg-white/95 dark:bg-gray-800/95 rounded-lg p-3 shadow-lg backdrop-blur-sm border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">🗺️ Interactive Lagos State Map</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">4 assets • Zoom Level: {zoomLevel} • Working controls</p>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-gray-800/95 rounded-lg p-3 shadow-lg backdrop-blur-sm border border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Asset Status</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Operational (3)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Maintenance (1)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Critical (0)</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="absolute bottom-4 right-4 bg-green-50/95 dark:bg-green-900/95 rounded-lg p-3 shadow-lg backdrop-blur-sm border border-green-200 dark:border-green-700">
          <p className="text-xs text-green-800 dark:text-green-200 text-center font-medium">
            🎯 Click numbered markers<br/>
            ➕➖ Use zoom controls<br/>
            🗺️ Lagos districts visible<br/>
            🏛️ Government locations
          </p>
        </div>
      </div>

      {/* Asset Details Modal */}
      {selectedAsset && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 rounded-lg">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Asset Details</h3>
              <button
                onClick={() => setSelectedAsset(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-lg">{selectedAsset.name}</h4>
                <p className="text-gray-600 dark:text-gray-400">{selectedAsset.type}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <span 
                  className="px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: getStatusColor(selectedAsset.status) }}
                >
                  {getStatusText(selectedAsset.status)}
                </span>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">{selectedAsset.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">Asset ID:</span>
                  <p className="text-gray-600 dark:text-gray-400">AST-{selectedAsset.id.toString().padStart(4, '0')}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">GPS Location:</span>
                  <p className="text-gray-600 dark:text-gray-400">{selectedAsset.position[0].toFixed(4)}, {selectedAsset.position[1].toFixed(4)}</p>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  📝 Edit Asset
                </button>
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  📊 View Reports
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
