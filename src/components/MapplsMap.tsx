/**
 * MapplsMap Component
 * 
 * Interactive map component using MapmyIndia (Mappls) API for displaying
 * waste collection locations with color-coded priority markers.
 * 
 * Features:
 * - Real-time location visualization
 * - Color-coded priority markers (Urgent/High/Medium/Low/Collected)
 * - Interactive popups with collection details
 * - Zoom and pan controls
 * - Automatic bounds fitting
 * - Click handlers for location selection
 * 
 * @see MAP_INTEGRATION.md for detailed documentation
 */

import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

interface MapLocation {
  id: number;
  lat: number;
  lng: number;
  location: string;
  citizenName: string;
  priority: 'High' | 'Medium' | 'Low' | 'Urgent';
  status: 'pending' | 'collected';
  wasteTypes: string[];
  quantity: number;
  contact?: string;
}

interface MapplsMapProps {
  locations: MapLocation[];
  selectedLocation?: MapLocation | null;
  onLocationClick?: (location: MapLocation) => void;
  centerLat?: number;
  centerLng?: number;
  zoom?: number;
}

// Extend Window interface to include mappls
declare global {
  interface Window {
    mappls: any;
    initMappls1?: () => void;
  }
}

export default function MapplsMap({ 
  locations, 
  selectedLocation,
  onLocationClick,
  centerLat = 12.9716,
  centerLng = 77.5946,
  zoom = 13
}: MapplsMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const scriptLoadedRef = useRef(false);

  // Load Mappls script
  useEffect(() => {
    if (scriptLoadedRef.current) return;

    const loadMapplsScript = () => {
      // Remove any existing scripts
      const existingScript = document.querySelector('script[src*="mappls.com"]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.src = `https://apis.mappls.com/advancedmaps/api/b1c23a72ffa93441c0caa32e7cea6992/map_sdk?layer=vector&v=3.0&callback=initMappls1`;
      script.async = true;
      script.defer = true;

      script.onerror = () => {
        console.error('Failed to load Mappls script');
        setMapError(true);
        toast.error('Failed to load map. Please check your connection.');
      };

      // Define the callback function
      window.initMappls1 = () => {
        console.log('Mappls script loaded successfully');
        setMapLoaded(true);
      };

      document.head.appendChild(script);
      scriptLoadedRef.current = true;
    };

    loadMapplsScript();

    return () => {
      // Cleanup markers
      markersRef.current.forEach(marker => {
        if (marker && marker.remove) {
          marker.remove();
        }
      });
      markersRef.current = [];
    };
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapLoaded || !mapContainerRef.current || mapRef.current) return;

    try {
      const map = new window.mappls.Map(mapContainerRef.current, {
        center: [centerLat, centerLng],
        zoom: zoom,
        zoomControl: true,
        fullscreenControl: true,
        clickableIcons: true
      });

      mapRef.current = map;

      // Add event listeners
      map.on('load', () => {
        console.log('Map loaded successfully');
      });

      map.on('error', (e: any) => {
        console.error('Map error:', e);
      });

    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError(true);
      toast.error('Error initializing map');
    }
  }, [mapLoaded, centerLat, centerLng, zoom]);

  // Add markers to map
  useEffect(() => {
    if (!mapRef.current || !window.mappls || locations.length === 0) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      if (marker && marker.remove) {
        marker.remove();
      }
    });
    markersRef.current = [];

    // Add new markers
    locations.forEach((location) => {
      const color = getPriorityColor(location.priority, location.status);
      
      // Create custom marker HTML
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';
      markerElement.innerHTML = `
        <div style="
          width: 32px;
          height: 32px;
          background-color: ${color};
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 14px;
          transition: transform 0.2s;
        "
        onmouseover="this.style.transform='scale(1.2)'"
        onmouseout="this.style.transform='scale(1)'"
        >
          ${location.status === 'collected' ? '✓' : location.quantity}
        </div>
      `;

      try {
        const marker = new window.mappls.Marker({
          map: mapRef.current,
          position: { lat: location.lat, lng: location.lng },
          fitbounds: false,
          icon: markerElement
        });

        // Add click event
        marker.addListener('click', () => {
          if (onLocationClick) {
            onLocationClick(location);
          }
          
          // Create popup
          const popup = new window.mappls.InfoWindow({
            content: `
              <div style="padding: 8px; min-width: 200px;">
                <div style="font-weight: 600; margin-bottom: 4px;">${location.citizenName}</div>
                <div style="font-size: 12px; color: #64748b; margin-bottom: 8px;">${location.location}</div>
                <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 4px;">
                  ${location.wasteTypes.map(type => 
                    `<span style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-size: 11px;">${type}</span>`
                  ).join('')}
                </div>
                <div style="font-size: 12px; margin-top: 4px;">
                  <strong>${location.quantity} kg</strong> • ${location.priority} Priority
                </div>
              </div>
            `,
            position: { lat: location.lat, lng: location.lng }
          });
          
          popup.open(mapRef.current);
        });

        markersRef.current.push(marker);
      } catch (error) {
        console.error('Error creating marker:', error);
      }
    });

    // Fit bounds to show all markers
    if (locations.length > 0 && mapRef.current.fitBounds) {
      try {
        const bounds = new window.mappls.LatLngBounds();
        locations.forEach(loc => {
          bounds.extend({ lat: loc.lat, lng: loc.lng });
        });
        mapRef.current.fitBounds(bounds, { padding: 50 });
      } catch (error) {
        console.error('Error fitting bounds:', error);
      }
    }
  }, [locations, onLocationClick]);

  // Highlight selected location
  useEffect(() => {
    if (!selectedLocation || !mapRef.current) return;

    try {
      mapRef.current.setCenter({ lat: selectedLocation.lat, lng: selectedLocation.lng });
      mapRef.current.setZoom(15);
    } catch (error) {
      console.error('Error centering map:', error);
    }
  }, [selectedLocation]);

  const getPriorityColor = (priority: string, status: string) => {
    if (status === 'collected') return '#22c55e'; // green
    switch (priority) {
      case 'Urgent': return '#ef4444'; // red
      case 'High': return '#f97316'; // orange
      case 'Medium': return '#eab308'; // yellow
      case 'Low': return '#3b82f6'; // blue
      default: return '#6b7280'; // gray
    }
  };

  const handleRecenter = () => {
    if (mapRef.current && locations.length > 0) {
      try {
        const bounds = new window.mappls.LatLngBounds();
        locations.forEach(loc => {
          bounds.extend({ lat: loc.lat, lng: loc.lng });
        });
        mapRef.current.fitBounds(bounds, { padding: 50 });
        toast.success('Map recentered');
      } catch (error) {
        console.error('Error recentering:', error);
      }
    }
  };

  const handleZoomIn = () => {
    if (mapRef.current) {
      try {
        mapRef.current.zoomIn();
      } catch (error) {
        console.error('Error zooming in:', error);
      }
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      try {
        mapRef.current.zoomOut();
      } catch (error) {
        console.error('Error zooming out:', error);
      }
    }
  };

  if (mapError) {
    return (
      <div className="bg-slate-100 rounded-lg h-[500px] flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-red-600 mb-4">⚠️</div>
          <h3 className="mb-2">Map Loading Error</h3>
          <p className="text-sm text-slate-600 mb-4">
            Unable to load the map. Please check your internet connection and try again.
          </p>
          <Button onClick={() => window.location.reload()}>
            Reload Page
          </Button>
        </div>
      </div>
    );
  }

  if (!mapLoaded) {
    return (
      <div className="bg-slate-100 rounded-lg h-[500px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading map...</p>
          <p className="text-sm text-slate-500 mt-2">Please wait while we initialize the map</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div 
        ref={mapContainerRef} 
        className="w-full h-[500px] rounded-lg overflow-hidden"
        style={{ background: '#f1f5f9' }}
      />
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <Button 
          size="icon" 
          variant="secondary"
          onClick={handleZoomIn}
          title="Zoom In"
        >
          +
        </Button>
        <Button 
          size="icon" 
          variant="secondary"
          onClick={handleZoomOut}
          title="Zoom Out"
        >
          -
        </Button>
        <Button 
          size="icon" 
          variant="secondary"
          onClick={handleRecenter}
          title="Recenter Map"
        >
          ⌖
        </Button>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 text-xs space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span>Urgent Priority</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span>High Priority</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span>Medium Priority</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Low Priority</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>Collected</span>
        </div>
      </div>

      {/* Location Count Badge */}
      <div className="absolute top-4 left-4">
        <Badge className="bg-white text-slate-900 shadow-lg border border-slate-200">
          {locations.filter(l => l.status === 'pending').length} Pending Locations
        </Badge>
      </div>
    </div>
  );
}
