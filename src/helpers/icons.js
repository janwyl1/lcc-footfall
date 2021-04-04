import React, {useState, useEffect} from 'react'
import greenMarker from '../img/marker-icon-2x-green.png'
import amberMarker from '../img/marker-icon-2x-yellow.png'
import redMarker from '../img/marker-icon-2x-red.png'
import markerShadow from '../img/marker-shadow.png'

import L from 'leaflet'

const greenIcon = new L.Icon({
    iconUrl: greenMarker,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const amberIcon = new L.Icon({
    iconUrl: amberMarker,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  

  const redIcon = new L.Icon({
    iconUrl: redMarker,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const setIcon = (trafficLight) => {
    if (trafficLight === 'red') return redIcon
    else if (trafficLight === 'amber') return amberIcon
    else return greenIcon
}
  
export default setIcon