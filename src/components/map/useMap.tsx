import React, {useEffect, useState, useRef} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Location} from '../../types/location';

function useMap(mapRef: React.MutableRefObject<HTMLElement | null>, city: Location) {
  const [map, setMap] = useState<leaflet.Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null) {
      if (map) {
        map.setView(
          {
            lat: city.latitude,
            lng: city.longitude,
          },
          city.zoom
        );
      } else if (!isRenderedRef.current) {
        const instance = leaflet.map(mapRef.current, {
          center: {
            lat: city.latitude,
            lng: city.longitude,
          },
          zoom: city.zoom,
        });

        leaflet
          .tileLayer(
            'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
            {
              attribution: 'OpenStreetMap contributors & CARTO',
            }
          )
          .addTo(instance);

        setMap(instance);
        isRenderedRef.current = true;
      }
    }
  }, [mapRef, city, map]);

  return map;
}

export default useMap;
