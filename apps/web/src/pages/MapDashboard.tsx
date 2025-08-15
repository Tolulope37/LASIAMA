import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api/v1';

export default function MapDashboard() {
  const mapRef = useRef<maplibregl.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [assets, setAssets] = useState<any[]>([]);

  useEffect(() => {
    if (containerRef.current && !mapRef.current) {
      mapRef.current = new maplibregl.Map({
        container: containerRef.current,
        style: 'https://demotiles.maplibre.org/style.json',
        center: [3.3792, 6.5244], // Lagos approx
        zoom: 10
      });

      mapRef.current.addControl(new maplibregl.NavigationControl(), 'top-left');
      mapRef.current.on('moveend', fetchAssetsFromBounds);
      fetchAssetsFromBounds();
    }

    return () => { mapRef.current?.remove(); };
  }, []);

  async function fetchAssetsFromBounds() {
    if (!mapRef.current) return;
    const b = mapRef.current.getBounds();
    const bbox = [b.getWest(), b.getSouth(), b.getEast(), b.getNorth()].join(',');
    const res = await fetch(`${API_BASE}/assets?bbox=${bbox}`);
    const data = await res.json();
    setAssets(data);

    // clear existing markers
    document.querySelectorAll('.asset-marker').forEach((el) => el.remove());

    data.forEach((a: any) => {
      if (a.longitude && a.latitude) {
        const el = document.createElement('div');
        el.className = 'asset-marker';
        el.style.width = '10px';
        el.style.height = '10px';
        el.style.borderRadius = '50%';
        el.style.background = '#1d4ed8';
        new maplibregl.Marker(el)
          .setLngLat([a.longitude, a.latitude])
          .setPopup(new maplibregl.Popup().setHTML(`<strong>${a.name}</strong><br/>${a.type||''} ${a.status||''}`))
          .addTo(mapRef.current!);
      }
    });
  }

  return (
    <div style={{height:'100%'}}>
      <div ref={containerRef} className="map" />
      <div style={{position:'absolute', top:10, right:10, background:'#fff', padding:'8px 12px', borderRadius:6, maxWidth:320, boxShadow:'0 2px 8px rgba(0,0,0,.15)'}}>
        <strong>Assets</strong>
        <div style={{fontSize:12, color:'#555'}}>Showing last {assets.length} in view.</div>
      </div>
    </div>
  );
}
