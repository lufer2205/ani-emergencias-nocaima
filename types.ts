export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

export interface MapLocation {
    id: string;
    name: string;
    type: 'shelter' | 'meeting_point';
    position: [number, number];
    details: string;
}

export interface EvacuationRoute {
    id: string;
    name: string;
    type: 'flood' | 'landslide';
    path: [number, number][];
    details: string;
}
