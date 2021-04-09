import React, {useState, useEffect} from 'react'
import { LayersControl, LayerGroup, MapContainer, TileLayer, Marker, Popup, Polygon} from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import {convertIsoDateStr} from '../helpers/dates'
import {createClusterIcon} from '../helpers/clusters'
import setIcon from '../helpers/icons'
import popupExample from '../img/leeds-popup-example.jpeg'
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
                className="map"
            >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | Built by <a href="https://parall.ax">Parallax</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LayersControl position="topright">
                <LayersControl.Overlay name="Custom Polygons" checked>
                    <LayerGroup >
                    {mapData && mapData.map((sensor, index)=>{
                        console.log(sensor.polygon)
                            return (
                            <Polygon
                                pathOptions={{color: sensor.traffic_light, weight: 10, opacity: 0.5}}
                                positions={sensor.polygon} 
                            >
                            <Marker 
                                pathOptions={{color: sensor.traffic_light, weight: 10, opacity: 0.5}}
                                positions={sensor.polygon} 
                                position={[sensor.latitude, sensor.longitude]} 
                                trafficLight={sensor.traffic_light} 
                                currentTotal={sensor.current_total} 
                                icon={setIcon(sensor.traffic_light)}
                                key={index}
                                >
                                <Popup className="popup">
                                    <img src={popupExample} alt="Placeholder" />
                                    <div className="popup-inner">
                                    <h3>{sensor.name}</h3>
                                    <ul>
                                        <li><b>Footfall:</b> {sensor.current_total}</li>
                                        <li><b>Updated:</b> {convertIsoDateStr(sensor.updated_at)}</li>
                                        <li><b>Lat:</b> {sensor.latitude.substring(0, 8)}</li>
                                        <li><b>Long:</b> {sensor.longitude.substring(0, 8)}</li>
                                    </ul>
                                    </div>
                                </Popup>
                            </Marker>
                            </Polygon>
                            )
                        })}
                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Clusters" >
                    <MarkerClusterGroup iconCreateFunction={createClusterIcon}>
                        {mapData && mapData.map((sensor, index)=>{
                            return (
                            <Marker 
                                position={[sensor.latitude, sensor.longitude]} 
                                trafficLight={sensor.traffic_light} 
                                currentTotal={sensor.current_total} 
                                icon={setIcon(sensor.traffic_light)}
                                key={index}
                                >
                                <Popup className="popup">
                                    <img src={popupExample} alt="Placeholder" />
                                    {/* <div className="popup-head"></div> */}
                                    <div className="popup-inner">
                                    <h3>{sensor.name}</h3>
                                    <ul>
                                        <li><b>Footfall:</b> {sensor.current_total}</li>
                                        <li><b>Updated:</b> {convertIsoDateStr(sensor.updated_at)}</li>
                                        <li><b>Lat:</b> {sensor.latitude.substring(0, 8)}</li>
                                        <li><b>Long:</b> {sensor.longitude.substring(0, 8)}</li>
                                    </ul>
                                    </div>
                                </Popup>
                            </Marker>
                            )
                        })}
                    </MarkerClusterGroup>
                </LayersControl.Overlay>
            </LayersControl>
        </MapContainer>
        )}
        </>
    )
}

export default Map;