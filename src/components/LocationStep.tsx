import { useEffect, useRef } from 'react';
import { useAssessment } from '@/context/AssessmentContext';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, useMapsLibrary } from '@vis.gl/react-google-maps';

function AutocompleteInput() {
  const { setBuildingName, setLocation } = useAssessment();
  const containerRef = useRef<HTMLDivElement>(null);
  const places = useMapsLibrary('places');

  useEffect(() => {
    if (!places || !containerRef.current) return;

    // We MUST use the New Places API Web Component because the user's API key has the Legacy API disabled.
    const autocompleteElement = new places.PlaceAutocompleteElement({
      requestedLanguage: 'en',
      requestedRegion: 'KE',
    });
    
    // Explicitly request location field
    autocompleteElement.fields = ['displayName', 'location'];
    
    // Styling
    autocompleteElement.style.width = '100%';
    autocompleteElement.style.boxSizing = 'border-box';
    autocompleteElement.style.padding = '12px 16px 12px 48px';
    autocompleteElement.style.borderRadius = '12px';
    autocompleteElement.style.border = '2px solid #e2e8f0';
    autocompleteElement.style.fontSize = '1.125rem';
    autocompleteElement.style.backgroundColor = '#ffffff';
    autocompleteElement.style.color = '#000000';
    autocompleteElement.style.colorScheme = 'light'; 

    autocompleteElement.addEventListener('gmp-placeselect', async (e: any) => {
      try {
        const place = e.place;
        if (!place) return;
        
        let hasDetails = false;
        if (!place.location && typeof place.fetchFields === 'function') {
          try {
            await place.fetchFields({ fields: ['displayName', 'location', 'formattedAddress'] });
            hasDetails = true;
          } catch(err) {
            console.warn("fetchFields failed (API Key restriction). Falling back to shadow DOM Geocoding.", err);
          }
        } else {
          hasDetails = true;
        }
        
        // Try to get name from the place object
        let name = "";
        if (place.displayName) {
           name = typeof place.displayName === 'string' ? place.displayName : (place.displayName.text || "");
        }
        
        // If fetchFields failed, we can extract what they typed from the web component's internal input
        if (!name) {
           const internalInput = autocompleteElement.shadowRoot?.querySelector('input');
           name = internalInput ? internalInput.value : "";
        }
        
        if (name) {
           setBuildingName(name);
        }
        
        if (place.location && hasDetails) {
          const lat = typeof place.location.lat === 'function' ? place.location.lat() : place.location.lat;
          const lng = typeof place.location.lng === 'function' ? place.location.lng() : place.location.lng;
          
          if (lat && lng) {
            setLocation({ lat, lng });
          }
        } else {
          // Absolute Bulletproof Fallback: Geocoder
          const geocoder = new google.maps.Geocoder();
          const query = name || place.formattedAddress || "";
          if (query) {
             geocoder.geocode({ address: query + ", Kenya" }, (results, status) => {
                if (status === 'OK' && results && results[0]) {
                   setLocation({
                      lat: results[0].geometry.location.lat(),
                      lng: results[0].geometry.location.lng()
                   });
                } else {
                   alert("Google Maps completely refused to return coordinates for this location. Please click the map manually.");
                }
             });
          } else {
             alert("Could not extract location name. Please click the map manually.");
          }
        }
      } catch (err) {
        console.error("New Places API error:", err);
      }
    });

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(autocompleteElement);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [places, setLocation, setBuildingName]);

  return (
    <div className="relative mb-6">
      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10" size={20} />
      <div ref={containerRef} className="w-full" />
    </div>
  );
}

export function LocationStep() {
  const { location, setLocation, buildingName, setBuildingName } = useAssessment();

  const handleMapClick = (e: any) => {
    if (e.detail && e.detail.latLng) {
      setLocation({ lat: e.detail.latLng.lat, lng: e.detail.latLng.lng });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Step 0: Building Location</h2>
        <p className="text-slate-500 mb-6">
          Before we begin the assessment, please pinpoint the building on the map. You can search, or <strong>click directly on the map</strong> to drop a pin.
        </p>

        <APIProvider apiKey="AIzaSyBxwHEPwzo7KylXwnoyK2cZ_ieZCWHd424">
          <AutocompleteInput />

          <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <label className="block text-sm font-medium text-slate-700 mb-2">Building Name (Verify & Confirm)</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="text" 
                className="flex-1 w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-0 outline-none transition-colors font-medium text-slate-900 bg-white" 
                placeholder="e.g. Riara University"
                value={buildingName || ""}
                onChange={(e) => setBuildingName(e.target.value)}
              />
              <button 
                onClick={() => {
                  if(!buildingName) {
                    alert("Please enter a building name before confirming.");
                  } else if (!location) {
                    alert("Please drop a pin on the map first (by searching or clicking the map). Note: If searching fails, you need to enable Billing on Google Cloud!");
                  } else {
                    alert("Building Name & Location successfully confirmed!");
                  }
                }}
                className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors whitespace-nowrap"
              >
                Confirm Details
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2">Explicitly confirm the name and pin location before starting.</p>
          </div>

          <div className="w-full h-[400px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100 relative">
            <Map
              mapId="DEMO_MAP_ID"
              defaultCenter={location || { lat: -1.2921, lng: 36.8219 }}
              defaultZoom={location ? 16 : 12}
              center={location}
              disableDefaultUI={false}
              mapTypeControl={true}
              gestureHandling="greedy"
              onClick={handleMapClick}
            >
              {location && (
                <AdvancedMarker position={location} />
              )}
            </Map>
          </div>
        </APIProvider>

        {!location ? (
          <div className="mt-4 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-200">
            Please select a specific location from the dropdown, or <strong>click anywhere on the map</strong> to place the marker.
          </div>
        ) : (
          <div className="mt-4 text-sm text-emerald-600 bg-emerald-50 p-3 rounded-lg border border-emerald-200 flex items-center gap-2 font-medium">
            <MapPin size={16} /> Location pinned successfully! You may now Start Assessment.
          </div>
        )}
      </div>
    </motion.div>
  );
}
