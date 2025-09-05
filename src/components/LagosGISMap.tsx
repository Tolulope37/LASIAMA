"use client"

import { useState, useEffect } from 'react'

interface Asset {
  id: string
  name: string
  position: [number, number]
  type: string
  status: 'operational' | 'maintenance' | 'critical'
  description: string
  lga: string
}

export default function LagosGISMap() {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [showLayerPanel, setShowLayerPanel] = useState(true)
  const [activeBasemap, setActiveBasemap] = useState('satellite')
  const [activeLayers, setActiveLayers] = useState({
    assets: true,
    boundaries: true,
    roads: false,
    landuse: false
  })

  const assets: Asset[] = [
    {
      id: 'AST001',
      name: 'Lagos State Secretariat',
      position: [6.6018, 3.3515],
      type: 'Government Building',
      status: 'operational',
      description: 'Main government complex in Alausa',
      lga: 'Ikeja'
    },
    {
      id: 'AST002',
      name: 'Government House Marina',
      position: [6.4698, 3.3792],
      type: 'Government Building',
      status: 'operational',
      description: 'Governor\'s office and residence',
      lga: 'Lagos Island'
    },
    {
      id: 'AST003',
      name: 'LASU Main Campus',
      position: [6.6018, 3.2442],
      type: 'Educational Institution',
      status: 'operational',
      description: 'Lagos State University campus',
      lga: 'Ojo'
    },
    {
      id: 'AST004',
      name: 'General Hospital Ikeja',
      position: [6.4541, 3.3947],
      type: 'Healthcare Facility',
      status: 'maintenance',
      description: 'Major state hospital',
      lga: 'Ikeja'
    }
  ]

  return (
    <div className="w-full h-full flex flex-col bg-gray-900">
      {/* Top Navigation Bar */}
      <div className="bg-green-800 text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-green-800 font-bold text-sm">LS</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">Lagos State eGIS Portal</h1>
              <p className="text-xs opacity-90">Geographic Information System</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search location, address, or asset..."
            className="px-3 py-1 rounded text-black w-64 text-sm"
          />
          <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm">
            Search
          </button>
          <button className="bg-orange-600 hover:bg-orange-700 px-3 py-1 rounded text-sm">
            Print Map
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Left Panel - Layer Control */}
        {showLayerPanel && (
          <div className="w-80 bg-gray-800 text-white border-r border-gray-700 flex flex-col">
            <div className="p-3 border-b border-gray-700">
              <h3 className="font-semibold">Map Contents</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3">
              {/* Basemap Selection */}
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2 text-gray-300">Basemap</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'satellite', name: 'Satellite', preview: '🛰️' },
                    { id: 'streets', name: 'Streets', preview: '🗺️' },
                    { id: 'terrain', name: 'Terrain', preview: '🏔️' },
                    { id: 'hybrid', name: 'Hybrid', preview: '🌍' }
                  ].map(basemap => (
                    <button
                      key={basemap.id}
                      onClick={() => setActiveBasemap(basemap.id)}
                      className={`p-2 rounded text-xs border ${
                        activeBasemap === basemap.id
                          ? 'border-blue-500 bg-blue-900/50'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="text-lg mb-1">{basemap.preview}</div>
                      {basemap.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Layer Control */}
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2 text-gray-300">Data Layers</h4>
                <div className="space-y-2">
                  {[
                    { key: 'assets', label: 'Government Assets', count: assets.length, icon: '🏛️' },
                    { key: 'boundaries', label: 'LGA Boundaries', count: 20, icon: '📍' },
                    { key: 'roads', label: 'Major Roads', count: 156, icon: '🛣️' },
                    { key: 'landuse', label: 'Land Use Zones', count: 45, icon: '🏞️' }
                  ].map(layer => (
                    <label key={layer.key} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 p-2 rounded">
                      <input
                        type="checkbox"
                        checked={activeLayers[layer.key as keyof typeof activeLayers]}
                        onChange={(e) => setActiveLayers(prev => ({
                          ...prev,
                          [layer.key]: e.target.checked
                        }))}
                        className="rounded"
                      />
                      <span className="text-sm">{layer.icon}</span>
                      <span className="flex-1 text-sm">{layer.label}</span>
                      <span className="text-xs text-gray-400">({layer.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div>
                <h4 className="text-sm font-medium mb-2 text-gray-300">Analysis Tools</h4>
                <div className="space-y-1">
                  {[
                    { name: 'Measure Distance', icon: '📏' },
                    { name: 'Measure Area', icon: '📐' },
                    { name: 'Buffer Analysis', icon: '⭕' },
                    { name: 'Find Route', icon: '🗺️' },
                    { name: 'Identify', icon: '🔍' }
                  ].map(tool => (
                    <button
                      key={tool.name}
                      className="w-full text-left p-2 text-sm hover:bg-gray-700 rounded flex items-center space-x-2"
                    >
                      <span>{tool.icon}</span>
                      <span>{tool.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Map Container */}
        <div className="flex-1 relative bg-blue-100">
          {/* Toggle Layer Panel Button */}
          <button
            onClick={() => setShowLayerPanel(!showLayerPanel)}
            className="absolute top-4 left-4 z-20 bg-white shadow-lg rounded p-2 hover:bg-gray-50"
          >
            {showLayerPanel ? '◀' : '▶'}
          </button>

          {/* Map Display */}
          <div className="w-full h-full relative overflow-hidden">
            {/* Simulated Satellite/Map View */}
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: activeBasemap === 'satellite' 
                  ? `url("data:image/svg+xml,${encodeURIComponent(`
                    <svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="water" patternUnits="userSpaceOnUse" width="20" height="20">
                          <rect width="20" height="20" fill="#1e40af"/>
                          <circle cx="10" cy="10" r="2" fill="#3b82f6" opacity="0.5"/>
                        </pattern>
                        <pattern id="urban" patternUnits="userSpaceOnUse" width="10" height="10">
                          <rect width="10" height="10" fill="#374151"/>
                          <rect x="2" y="2" width="2" height="2" fill="#6b7280"/>
                          <rect x="6" y="6" width="2" height="2" fill="#6b7280"/>
                        </pattern>
                        <pattern id="vegetation" patternUnits="userSpaceOnUse" width="15" height="15">
                          <rect width="15" height="15" fill="#166534"/>
                          <circle cx="7.5" cy="7.5" r="3" fill="#22c55e" opacity="0.7"/>
                        </pattern>
                      </defs>
                      
                      <!-- Water bodies -->
                      <rect x="0" y="600" width="1200" height="200" fill="url(#water)"/>
                      <ellipse cx="600" cy="500" rx="300" ry="100" fill="url(#water)"/>
                      
                      <!-- Urban areas -->
                      <rect x="200" y="200" width="800" height="400" fill="url(#urban)"/>
                      
                      <!-- Vegetation -->
                      <rect x="0" y="0" width="1200" height="200" fill="url(#vegetation)"/>
                      <rect x="0" y="200" width="200" height="400" fill="url(#vegetation)"/>
                      <rect x="1000" y="200" width="200" height="400" fill="url(#vegetation)"/>
                      
                      <!-- Roads -->
                      <rect x="0" y="300" width="1200" height="4" fill="#4b5563"/>
                      <rect x="600" y="0" width="4" height="800" fill="#4b5563"/>
                      <rect x="0" y="500" width="1200" height="4" fill="#4b5563"/>
                      <rect x="300" y="0" width="4" height="800" fill="#4b5563"/>
                      <rect x="900" y="0" width="4" height="800" fill="#4b5563"/>
                    </svg>
                  `)}")`
                  : activeBasemap === 'streets'
                  ? `url("data:image/svg+xml,${encodeURIComponent(`
                    <svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
                      <rect width="1200" height="800" fill="#f9fafb"/>
                      <!-- Street grid -->
                      <defs>
                        <pattern id="streets" patternUnits="userSpaceOnUse" width="100" height="100">
                          <rect width="100" height="100" fill="#ffffff"/>
                          <path d="M0 50 L100 50 M50 0 L50 100" stroke="#d1d5db" stroke-width="1"/>
                        </pattern>
                      </defs>
                      <rect width="1200" height="800" fill="url(#streets)"/>
                      <!-- Major roads -->
                      <rect x="0" y="300" width="1200" height="6" fill="#374151"/>
                      <rect x="600" y="0" width="6" height="800" fill="#374151"/>
                      <!-- Water -->
                      <rect x="0" y="600" width="1200" height="200" fill="#3b82f6"/>
                      <ellipse cx="600" cy="500" rx="300" ry="100" fill="#3b82f6"/>
                    </svg>
                  `)}")`
                  : 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Lagos State Boundary Overlay */}
              {activeLayers.boundaries && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 800">
                  <path
                    d="M150 150 Q300 100 600 120 Q900 140 1050 180 Q1100 250 1080 400 Q1050 550 900 600 Q600 650 300 620 Q150 580 120 400 Q140 250 150 150 Z"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3"
                    strokeDasharray="10,5"
                  />
                  <text x="600" y="80" className="fill-red-600 text-2xl font-bold" textAnchor="middle">
                    LAGOS STATE
                  </text>
                  
                  {/* LGA boundaries */}
                  <g stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,3" fill="none">
                    <rect x="200" y="200" width="200" height="150" />
                    <rect x="450" y="180" width="180" height="160" />
                    <rect x="680" y="200" width="160" height="140" />
                    <rect x="300" y="400" width="220" height="120" />
                    <ellipse cx="800" cy="450" rx="100" ry="80" />
                  </g>
                  
                  <g className="fill-blue-600 text-lg font-bold">
                    <text x="300" y="280" textAnchor="middle">IKEJA</text>
                    <text x="540" y="260" textAnchor="middle">SURULERE</text>
                    <text x="760" y="270" textAnchor="middle">OSHODI</text>
                    <text x="410" y="460" textAnchor="middle">OJO</text>
                    <text x="800" y="455" textAnchor="middle">LAGOS ISLAND</text>
                  </g>
                </svg>
              )}

              {/* Asset Markers */}
              {activeLayers.assets && assets.map((asset) => {
                const x = ((asset.position[1] - 3.1) / 0.5) * 100
                const y = 100 - ((asset.position[0] - 6.3) / 0.4) * 100
                
                return (
                  <div
                    key={asset.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                    style={{ left: `${x}%`, top: `${y}%` }}
                    onClick={() => setSelectedAsset(asset)}
                  >
                    <div className={`w-6 h-6 rounded border-2 border-white shadow-lg flex items-center justify-center text-xs ${
                      asset.status === 'operational' ? 'bg-green-500' :
                      asset.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}>
                      {asset.type === 'Government Building' ? '🏛️' :
                       asset.type === 'Educational Institution' ? '🎓' :
                       asset.type === 'Healthcare Facility' ? '🏥' : '🏢'}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 space-y-2 z-20">
            <button className="w-10 h-10 bg-white shadow-lg rounded flex items-center justify-center hover:bg-gray-50 text-xl font-bold">
              +
            </button>
            <button className="w-10 h-10 bg-white shadow-lg rounded flex items-center justify-center hover:bg-gray-50 text-xl font-bold">
              −
            </button>
            <button className="w-10 h-10 bg-white shadow-lg rounded flex items-center justify-center hover:bg-gray-50">
              🏠
            </button>
          </div>

          {/* North Arrow */}
          <div className="absolute top-20 right-4 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center z-20">
            <div className="text-2xl">⬆️</div>
          </div>

          {/* Scale Bar */}
          <div className="absolute bottom-8 left-4 bg-white shadow-lg rounded px-3 py-2 z-20">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-20 h-1 bg-black"></div>
              <span>10 km</span>
            </div>
          </div>

          {/* Coordinates */}
          <div className="absolute bottom-8 right-4 bg-white shadow-lg rounded px-3 py-2 text-sm font-mono z-20">
            6.5244°N, 3.3792°E
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-gray-800 text-white px-4 py-2 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-6">
          <span>Scale: 1:50,000</span>
          <span>Projection: WGS84 / UTM Zone 31N</span>
          <span>Assets Visible: {assets.length}</span>
          <span>Active Layers: {Object.values(activeLayers).filter(Boolean).length}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Lagos State eGIS Portal v3.2.1</span>
          <span>© 2024 Lagos State Ministry of Physical Planning</span>
        </div>
      </div>

      {/* Asset Details Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">{selectedAsset.name}</h3>
              <button
                onClick={() => setSelectedAsset(null)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-3 text-sm">
              <div><strong>Asset ID:</strong> {selectedAsset.id}</div>
              <div><strong>Type:</strong> {selectedAsset.type}</div>
              <div><strong>Status:</strong> 
                <span className={`ml-2 px-2 py-1 rounded text-xs text-white ${
                  selectedAsset.status === 'operational' ? 'bg-green-500' :
                  selectedAsset.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                }`}>
                  {selectedAsset.status.toUpperCase()}
                </span>
              </div>
              <div><strong>LGA:</strong> {selectedAsset.lga}</div>
              <div><strong>Coordinates:</strong> {selectedAsset.position[0].toFixed(4)}, {selectedAsset.position[1].toFixed(4)}</div>
              <div><strong>Description:</strong> {selectedAsset.description}</div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                View Details
              </button>
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}