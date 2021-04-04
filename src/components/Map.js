import React, {useState, useEffect} from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import {convertIsoDateStr} from '../helpers/dates'
import createClusterIcon from '../helpers/clusters'
import setIcon from '../helpers/icons'
import placeholderImg from '../img/150x150.png'
import axios from 'axios'


const Map = () => {

    const [mapData, setMapData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const result = await axios('https://howbusyhere.com/sensors');
                setMapData(result.data);
            }
            catch {
                setIsError(true);
            }
  
            setIsLoading(false);
        }
        fetchData()
      }, []);
     
    return (
        <>
        {isError && <div>Something went wrong ...</div>}

        { isLoading ? (
            <div>Loading...</div>
        ) : (
            <MapContainer 
                center={[53.796027783166444, -1.5444784829114298]} 
                zoom={10} 
                scrollWheelZoom={true} 
                style={{ height: '85vh' }}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | Website created by <a href="https://parall.ax">Parallax</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup iconCreateFunction={createClusterIcon}>
                {mapData && mapData.map((sensor, index)=>{
                    return (
                    <Marker 
                        position={[sensor.latitude, sensor.longitude]} 
                        trafficLight={sensor.traffic_light} 
                        currentTotal={sensor.current_total} 
                        icon={setIcon(sensor.traffic_light)}
                        key={index}>
                         <Popup>
                            <h3>{sensor.name}</h3>
                            <img src={placeholderImg} alt="Placeholder image" />
                            <p>{sensor.current_total} in the last hour</p>
                            <p>Updated at {convertIsoDateStr(sensor.updated_at)}</p>
                        </Popup>
                    </Marker>
                    )
                })}
            </MarkerClusterGroup>
            {/* <Polyline pathOptions={{color:'green'}} positions={[
            [53.8103218078610000, -1.5105402469635000],
            [51.51, -0.1],
            [51.51, -0.12],
            ]} /> */}
        </MapContainer>
        )}
        </>
    )
}

export default Map;