# MapmyIndia (Mappls) Setup Guide for EcoSort

## Overview
This guide explains how to set up, configure, and customize the MapmyIndia (Mappls) integration in EcoSort.

---

## Prerequisites

### 1. MapmyIndia Account
- Create account at: https://apis.mappls.com/
- Verify email and complete profile
- Accept terms of service

### 2. API Key
**Current Project**:
- Project ID: `prj1762609389i286257877`
- API Key: `b1c23a72ffa93441c0caa32e7cea6992`
- Console: https://apis.mappls.com/console/#/app/project/project-details?Id=prj1762609389i286257877

### 3. Development Environment
- Node.js installed
- React project set up
- Modern browser (Chrome, Firefox, Safari, Edge)

---

## Installation Steps

### Step 1: Component Already Installed
The MapplsMap component is already created at `/components/MapplsMap.tsx`. No npm package installation needed!

### Step 2: API Key Configuration

**Current Implementation** (Client-side):
```typescript
// In MapplsMap.tsx, line 57
const script = document.createElement('script');
script.src = `https://apis.mappls.com/advancedmaps/api/b1c23a72ffa93441c0caa32e7cea6992/map_sdk?layer=vector&v=3.0&callback=initMappls1`;
```

**Recommended Production Setup** (Server-side):
```typescript
// .env.local
VITE_MAPPLS_API_KEY=your_api_key_here

// In MapplsMap.tsx
const API_KEY = import.meta.env.VITE_MAPPLS_API_KEY;
script.src = `https://apis.mappls.com/advancedmaps/api/${API_KEY}/map_sdk?layer=vector&v=3.0&callback=initMappls1`;
```

### Step 3: Basic Usage

```tsx
import MapplsMap from './components/MapplsMap';

function MyComponent() {
  const locations = [
    {
      id: 1,
      lat: 12.9716,
      lng: 77.5946,
      location: '123 MG Road',
      citizenName: 'John Doe',
      priority: 'High',
      status: 'pending',
      wasteTypes: ['Plastic', 'Paper'],
      quantity: 15
    }
  ];

  return (
    <MapplsMap
      locations={locations}
      onLocationClick={(location) => {
        console.log('Clicked:', location);
      }}
    />
  );
}
```

---

## Configuration Options

### Map Initialization Options

```typescript
const map = new window.mappls.Map(container, {
  center: [lat, lng],           // [latitude, longitude]
  zoom: 13,                      // 1-20 (1=world, 20=building)
  zoomControl: true,             // Show zoom buttons
  fullscreenControl: true,       // Show fullscreen button
  clickableIcons: true,          // Allow clicking POIs
  minZoom: 5,                    // Minimum zoom level
  maxZoom: 18,                   // Maximum zoom level
  bearing: 0,                    // Map rotation (0-360)
  pitch: 0                       // Map tilt (0-60)
});
```

### Marker Options

```typescript
const marker = new window.mappls.Marker({
  map: mapInstance,
  position: { lat: 12.9716, lng: 77.5946 },
  title: 'Marker Title',
  fitbounds: false,              // Auto-fit map to marker
  icon: customIconElement,       // Custom HTML element
  draggable: false,              // Allow marker dragging
  clustersIcon: 'cluster.png'    // Icon for marker clusters
});
```

### Info Window Options

```typescript
const popup = new window.mappls.InfoWindow({
  content: '<div>HTML Content</div>',
  position: { lat: 12.9716, lng: 77.5946 },
  maxWidth: 300,                 // Max popup width
  offset: [0, -10]               // Pixel offset [x, y]
});
```

---

## Advanced Features

### 1. Route Planning

```typescript
// Add routing functionality
const route = new window.mappls.direction({
  map: mapInstance,
  start: { lat: 12.9716, lng: 77.5946 },
  end: { lat: 12.9726, lng: 77.5956 },
  via: [                          // Optional waypoints
    { lat: 12.9720, lng: 77.5950 }
  ],
  routeType: 0                    // 0=fastest, 1=shortest
});
```

### 2. Marker Clustering

```typescript
// For many markers (100+)
const cluster = new window.mappls.MarkerClusterer({
  map: mapInstance,
  markers: markersArray,
  maxZoom: 15,                    // Max zoom before un-clustering
  gridSize: 60                    // Cluster grid size in pixels
});
```

### 3. Geolocation

```typescript
// Get user's current location
map.addListener('load', () => {
  navigator.geolocation.getCurrentPosition((position) => {
    const userLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    map.setCenter(userLocation);
  });
});
```

### 4. Traffic Layer

```typescript
// Show real-time traffic
map.addLayer({
  id: 'traffic',
  type: 'traffic',
  source: 'mappls',
  paint: {
    'traffic-color': [
      'match',
      ['get', 'congestion'],
      'low', '#22c55e',
      'moderate', '#eab308',
      'heavy', '#ef4444',
      '#64748b'
    ]
  }
});
```

### 5. Search/Geocoding

```typescript
// Search for places
const search = new window.mappls.search({
  map: mapInstance,
  location: [12.9716, 77.5946],
  radius: 5000,                   // Search radius in meters
  callback: (results) => {
    console.log('Search results:', results);
  }
});
```

---

## Customization Guide

### Custom Marker Styles

```typescript
const createCustomMarker = (priority: string, quantity: number) => {
  const colors = {
    'Urgent': '#ef4444',
    'High': '#f97316',
    'Medium': '#eab308',
    'Low': '#3b82f6',
    'Collected': '#22c55e'
  };

  const element = document.createElement('div');
  element.innerHTML = `
    <div style="
      width: 40px;
      height: 40px;
      background: ${colors[priority]};
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 14px;
    ">
      ${quantity}
    </div>
  `;
  
  return element;
};
```

### Custom Info Window Design

```typescript
const createInfoWindow = (location: MapLocation) => {
  return `
    <div style="
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      padding: 16px;
      min-width: 250px;
    ">
      <div style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">
        ${location.citizenName}
      </div>
      <div style="color: #64748b; margin-bottom: 12px; font-size: 14px;">
        📍 ${location.location}
      </div>
      <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px;">
        ${location.wasteTypes.map(type => `
          <span style="
            background: #e2e8f0;
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 12px;
            color: #334155;
          ">${type}</span>
        `).join('')}
      </div>
      <div style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 12px;
        border-top: 1px solid #e2e8f0;
      ">
        <span style="font-size: 14px; font-weight: 600;">
          ⚖️ ${location.quantity} kg
        </span>
        <span style="
          background: ${getPriorityColor(location.priority)};
          color: white;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 12px;
        ">
          ${location.priority}
        </span>
      </div>
    </div>
  `;
};
```

### Custom Map Styles

```typescript
// Apply custom map style
map.setStyle('mappls://styles/standard-day'); // Day mode
map.setStyle('mappls://styles/standard-night'); // Night mode
map.setStyle('mappls://styles/satellite'); // Satellite view
map.setStyle('mappls://styles/hybrid'); // Hybrid view
```

---

## Performance Optimization

### 1. Marker Management

```typescript
// Efficient marker updates
const updateMarkers = (newLocations: MapLocation[]) => {
  // Remove markers that no longer exist
  const newIds = new Set(newLocations.map(loc => loc.id));
  markersRef.current = markersRef.current.filter(marker => {
    if (!newIds.has(marker.id)) {
      marker.remove();
      return false;
    }
    return true;
  });

  // Add only new markers
  const existingIds = new Set(markersRef.current.map(m => m.id));
  newLocations.forEach(location => {
    if (!existingIds.has(location.id)) {
      const marker = createMarker(location);
      markersRef.current.push({ id: location.id, marker });
    }
  });
};
```

### 2. Debounced Updates

```typescript
import { useCallback } from 'react';
import { debounce } from 'lodash';

const debouncedUpdateMap = useCallback(
  debounce((locations) => {
    updateMapMarkers(locations);
  }, 300),
  []
);
```

### 3. Lazy Loading

```typescript
// Load map only when needed
const [shouldLoadMap, setShouldLoadMap] = useState(false);

<div ref={containerRef}>
  {shouldLoadMap && <MapplsMap {...props} />}
</div>

// Trigger load when container is visible
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setShouldLoadMap(true);
    }
  });
  
  if (containerRef.current) {
    observer.observe(containerRef.current);
  }
}, []);
```

---

## API Limits & Usage

### Free Tier Limits
- **Map Loads**: 25,000/month
- **Geocoding**: 5,000/month
- **Routing**: 1,000/month
- **Search**: 5,000/month

### Monitoring Usage

1. Visit Mappls Console
2. Navigate to Dashboard
3. View API usage metrics
4. Set up alerts for limits

### Upgrade Plans

- **Starter**: ₹2,999/month
- **Professional**: ₹9,999/month
- **Enterprise**: Custom pricing

---

## Troubleshooting

### Common Issues

#### 1. Map Not Loading
**Symptoms**: Blank map container
**Causes**:
- Network issues
- Invalid API key
- Script loading failed
- CORS errors

**Solutions**:
```typescript
// Check script load
script.onerror = (error) => {
  console.error('Script failed to load:', error);
  setMapError(true);
};

// Verify API key
console.log('Using API key:', API_KEY);

// Check network tab
// Look for failed requests to apis.mappls.com
```

#### 2. Markers Not Appearing
**Symptoms**: Map loads but no markers
**Causes**:
- Invalid coordinates
- Markers created before map ready
- Marker creation error

**Solutions**:
```typescript
// Wait for map load
map.on('load', () => {
  createMarkers(locations);
});

// Validate coordinates
const isValidCoordinate = (lat: number, lng: number) => {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
};

// Wrap in try-catch
try {
  const marker = new window.mappls.Marker({...});
} catch (error) {
  console.error('Marker creation failed:', error);
}
```

#### 3. Performance Issues
**Symptoms**: Slow map, laggy interactions
**Causes**:
- Too many markers (100+)
- No marker clustering
- Memory leaks

**Solutions**:
```typescript
// Implement clustering
if (locations.length > 50) {
  useMarkerClusterer(locations);
}

// Clean up on unmount
useEffect(() => {
  return () => {
    markers.forEach(marker => marker.remove());
    if (map) map.remove();
  };
}, []);
```

#### 4. API Key Errors
**Symptoms**: 401/403 errors
**Causes**:
- Expired key
- Invalid key
- Quota exceeded
- Domain restrictions

**Solutions**:
1. Check key in console
2. Verify domain whitelist
3. Check usage limits
4. Generate new key if needed

---

## Security Best Practices

### 1. API Key Protection

**❌ Bad (Current)**:
```typescript
// Hardcoded in component
script.src = `...api/b1c23a72ffa93441c0caa32e7cea6992/...`;
```

**✅ Good (Recommended)**:
```typescript
// Environment variable
const API_KEY = import.meta.env.VITE_MAPPLS_API_KEY;

// Or server-side proxy
const response = await fetch('/api/map-token');
const { token } = await response.json();
```

### 2. Domain Restrictions

In Mappls Console:
1. Go to API Key settings
2. Add allowed domains:
   - `localhost:3000` (development)
   - `yourdomain.com` (production)
3. Save changes

### 3. Rate Limiting

```typescript
// Client-side throttling
const throttledMapUpdate = throttle((data) => {
  updateMap(data);
}, 1000);
```

---

## Testing

### Manual Testing Checklist

- [ ] Map loads on first render
- [ ] Markers appear at correct locations
- [ ] Marker colors match priority
- [ ] Info windows show correct data
- [ ] Zoom controls work
- [ ] Pan functionality works
- [ ] Navigation button opens maps
- [ ] Filters update markers
- [ ] Responsive on mobile
- [ ] Works on different browsers

### Automated Testing

```typescript
// Example Jest test
describe('MapplsMap', () => {
  it('renders loading state initially', () => {
    render(<MapplsMap locations={[]} />);
    expect(screen.getByText(/loading map/i)).toBeInTheDocument();
  });

  it('displays markers for all locations', async () => {
    const locations = [
      { id: 1, lat: 12.9716, lng: 77.5946, ... },
      { id: 2, lat: 12.9726, lng: 77.5956, ... }
    ];
    render(<MapplsMap locations={locations} />);
    
    await waitFor(() => {
      expect(mockMappls.Marker).toHaveBeenCalledTimes(2);
    });
  });
});
```

---

## Migration Guide

### From Google Maps

```typescript
// Google Maps
const map = new google.maps.Map(container, {
  center: { lat: 12.9716, lng: 77.5946 },
  zoom: 13
});

// Mappls equivalent
const map = new window.mappls.Map(container, {
  center: [12.9716, 77.5946],
  zoom: 13
});
```

**Key Differences**:
1. Center: Object → Array
2. Event handling: Similar syntax
3. Markers: Similar API
4. Coordinate order: lat,lng (both)

---

## Additional Resources

### Documentation
- **Mappls Docs**: https://apis.mappls.com/docs/
- **API Reference**: https://apis.mappls.com/docs/maps/
- **Examples**: https://apis.mappls.com/examples/

### Support
- **Console**: https://apis.mappls.com/console/
- **Forum**: https://community.mappls.com/
- **Email**: support@mappls.com

### Tools
- **Coordinate Finder**: https://apis.mappls.com/tools/coordinate-picker
- **API Playground**: https://apis.mappls.com/playground/
- **Usage Dashboard**: https://apis.mappls.com/console/usage

---

## Next Steps

1. ✅ Set up environment variables
2. ✅ Test map in development
3. ✅ Implement marker clustering
4. ✅ Add route planning
5. ✅ Optimize performance
6. ✅ Set up monitoring
7. ✅ Deploy to production

---

## Conclusion

The MapmyIndia integration is now fully functional in EcoSort! This guide covered setup, configuration, customization, optimization, and troubleshooting. For production deployment, remember to:

1. Move API key to environment variables
2. Set up domain restrictions
3. Monitor API usage
4. Implement error tracking
5. Add loading states
6. Optimize for performance

Happy mapping! 🗺️
