import React, {useState, useEffect} from 'react'
// import L from 'leaflet'
import { LayersControl, LayerGroup, MapContainer, TileLayer, Marker, Popup, Polyline, Polygon } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import {convertIsoDateStr} from '../helpers/dates'
import {createClusterIcon} from '../helpers/clusters'
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
                style={{ height: '85vh' }}
            >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | Built by <a href="https://parall.ax">Parallax</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LayersControl position="topright">
                <LayersControl.Overlay name="Clusters" checked>
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
                                <Popup>
                                    <h3>{sensor.name}</h3>
                                    <img src={placeholderImg} alt="Placeholder" />
                                    <p>Current: {sensor.current_total}</p>
                                    <p>Updated at {convertIsoDateStr(sensor.updated_at)}</p>
                                </Popup>
                            </Marker>
                            )
                        })}
                    </MarkerClusterGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Streets">
                    <LayerGroup>
                    {/* North Street Wetherby */}
                    <Polyline pathOptions={{color:'green', weight: 10, opacity: 0.5}} positions={
                        [[53.92861,-1.38551],[53.92889,-1.38543],[53.92935,-1.38535],[53.9296,-1.38531],[53.92974,-1.38526],[53.9298,-1.38523],[53.93003,-1.38512],[53.93018,-1.38505],[53.93022,-1.38509],[53.93025,-1.38505],[53.93026,-1.38501],[53.93031,-1.38496],[53.93048,-1.38486],[53.93064,-1.38474],[53.93107,-1.38435],[53.93145,-1.38401]]
                    } /> 
                    {/* Market Place Wetherby */}
                    <Polyline pathOptions={{color:'red', weight: 10, opacity: 0.5}} positions={
                        [[53.928554874484874, -1.3869093056904334], [53.92849733121453, -1.3864997673931516], [53.928438417784164, -1.386306632855229], [53.92832196075853, -1.3862996520887978], [53.92823975560363, -1.3864974404710078], [53.92821235384934, -1.3867906326611072], [53.92821783420164, -1.3868674210918477], [53.928538433558586, -1.3869162864568643]]
                    } /> 
                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Polygons">
                    <LayerGroup >
                   {/* Greek Street */}
                   <Polygon pathOptions={{color:'red', weight: 5, opacity: 0.5}} positions={
                        [[53.79875905658598, -1.5492105244763497], [53.79814680217587, -1.54945733804244], [53.7980826607204, -1.5470978003506182], [53.79875322563375, -1.5470978003506182]]
                    }>
                        <Popup>
                            <h3>sensor.name</h3>
                            <img src={placeholderImg} alt="Placeholder" />
                            <p>Current: sensor.current_total</p>
                            <p>Updated at convertIsoDateStr(sensor.updated_at)</p>
                        </Popup>
                    </Polygon> 
                    {/* Boar Lane */}
                   <Polygon pathOptions={{color:'red', weight: 5, opacity: 0.5}} positions={
                        [[53.79618264923007, -1.5479878569730763], [53.79667640981577, -1.5472689373919803], [53.795876514747576, -1.545563593269381], [53.795175359609836, -1.545981569770018]]
                    }></Polygon>
                    {/* Albion Street */}
                   <Polygon pathOptions={{color:'red', weight: 5, opacity: 0.5}} positions={
                        [[53.79584142069808, -1.5454477292317268], [53.79950131836711, -1.5453651090813278], [53.79942202396944, -1.5447144753969353], [53.795822297947424, -1.5444644212365308]]
                    }></Polygon>
                    {/* Commercial Street */}
                   <Polygon pathOptions={{color:'yellow', weight: 5, opacity: 0.5}} positions={
                        [[53.797903187033576, -1.5444571061745607], [53.79699110909598, -1.5444339507279214], [53.79710681635566, -1.54243781048838], [53.79787781446195, -1.54229165067072]]
                    }></Polygon>
                    {/* Briggate (North) */}
                    <Polygon pathOptions={{color:'green', weight: 5, opacity: 0.5}} positions={
                        [[53.79927371425448, -1.542283948484872], [53.798004841351656, -1.5425115003150263], [53.798012747220675, -1.5417485324139206], [53.799261855806925, -1.5416816054050517]]
                    }></Polygon>
                     {/* Briggate (South) */}
                     <Polygon pathOptions={{color:'green', weight: 5, opacity: 0.5}} positions={
                        [[53.79708153632742, -1.542648581257603], [53.79604978491607, -1.5428158987797755], [53.796061644271894, -1.5422604046061632], [53.79706572423676, -1.5421600140928597]]
                    }></Polygon>


                    </LayerGroup>
                </LayersControl.Overlay>
            </LayersControl>
        </MapContainer>
        )}
        </>
    )
}

export default Map;