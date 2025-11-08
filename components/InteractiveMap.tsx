
import React, { useEffect, useRef } from 'react';
import * as L from 'leaflet';
import type { MapLocation } from '../types';
import { MAP_CENTER, SHELTERS, MEETING_POINTS, EVACUATION_ROUTES } from '../map-data';

interface InteractiveMapProps {
    isVisible: boolean;
    onClose: () => void;
}

// Fix for default icon path issue with bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});


const iconShelter = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const iconMeetingPoint = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const InteractiveMap: React.FC<InteractiveMapProps> = ({ isVisible, onClose }) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);

    useEffect(() => {
        if (isVisible && mapContainerRef.current && !mapInstanceRef.current) {
            const map = L.map(mapContainerRef.current).setView(MAP_CENTER, 15);
            mapInstanceRef.current = map;

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            SHELTERS.forEach(location => {
                L.marker(location.position, { icon: iconShelter })
                    .addTo(map)
                    .bindPopup(`<b>${location.name}</b><br>${location.details}`);
            });

            MEETING_POINTS.forEach(location => {
                L.marker(location.position, { icon: iconMeetingPoint })
                    .addTo(map)
                    .bindPopup(`<b>${location.name}</b><br>${location.details}`);
            });
            
            EVACUATION_ROUTES.forEach(route => {
                const color = route.type === 'flood' ? 'red' : 'orange';
                 L.polyline(route.path, { color: color, weight: 5, opacity: 0.7 })
                    .addTo(map)
                    .bindPopup(`<b>${route.name}</b><br>${route.details}`);
            });
            
            setTimeout(() => map.invalidateSize(), 100);
        }
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 transition-opacity" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col relative" onClick={e => e.stopPropagation()}>
                <header className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Mapa Interactivo de Emergencia - Nocaima</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </header>
                <div id="map" ref={mapContainerRef} className="flex-1 w-full h-full rounded-b-lg"></div>
                <footer className="p-3 bg-gray-50 border-t text-xs text-gray-600">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <span className="flex items-center gap-1"><img src={iconShelter.options.iconUrl} className="h-5" alt="Shelter Icon"/> Refugio Seguro</span>
                        <span className="flex items-center gap-1"><img src={iconMeetingPoint.options.iconUrl} className="h-5" alt="Meeting Point Icon"/> Punto de Encuentro</span>
                        <span className="flex items-center gap-1"><div className="w-4 h-1 bg-red-500"></div> Ruta (Inundación)</span>
                        <span className="flex items-center gap-1"><div className="w-4 h-1 bg-orange-500"></div> Ruta (Deslizamiento)</span>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default InteractiveMap;
