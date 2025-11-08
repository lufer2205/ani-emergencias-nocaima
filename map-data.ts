import type { MapLocation, EvacuationRoute } from './types';

export const MAP_CENTER: [number, number] = [4.9706, -74.3769]; // Nocaima, Cundinamarca

export const SHELTERS: MapLocation[] = [
  {
    id: 'shelter1',
    name: 'Coliseo Municipal',
    type: 'shelter',
    position: [4.9715, -74.3780],
    details: 'Refugio principal con capacidad para 200 personas. Cuenta con servicios básicos.'
  },
  {
    id: 'shelter2',
    name: 'Escuela General Santander',
    type: 'shelter',
    position: [4.9688, -74.3755],
    details: 'Refugio secundario, habilitado en caso de emergencias mayores.'
  }
];

export const MEETING_POINTS: MapLocation[] = [
  {
    id: 'meeting1',
    name: 'Parque Principal Simón Bolívar',
    type: 'meeting_point',
    position: [4.9700, -74.3772],
    details: 'Punto de encuentro central al aire libre.'
  },
  {
    id: 'meeting2',
    name: 'Plaza de Mercado',
    type: 'meeting_point',
    position: [4.9721, -74.3791],
    details: 'Punto de encuentro en la zona norte del municipio.'
  }
];

export const EVACUATION_ROUTES: EvacuationRoute[] = [
    {
        id: 'route_flood_1',
        name: 'Ruta de Evacuación por Inundación (Zona Río)',
        type: 'flood',
        path: [
            [4.9680, -74.3800],
            [4.9695, -74.3785],
            [4.9700, -74.3772]
        ],
        details: 'Ruta para evacuar las zonas bajas cercanas al río hacia el Parque Principal.'
    },
    {
        id: 'route_landslide_1',
        name: 'Ruta de Evacuación por Deslizamiento (Montaña Este)',
        type: 'landslide',
        path: [
            [4.9710, -74.3740],
            [4.9705, -74.3760],
            [4.9715, -74.3780]
        ],
        details: 'Ruta para evacuar las laderas orientales hacia el Coliseo Municipal.'
    }
];
