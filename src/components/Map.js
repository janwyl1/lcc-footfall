import React, {useState, useEffect} from 'react'
// import L from 'leaflet'
import { LayersControl, LayerGroup, MapContainer, TileLayer, Marker, Popup, Polyline, Polygon, GeoJSON } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import {convertIsoDateStr} from '../helpers/dates'
import {createClusterIcon} from '../helpers/clusters'
import setIcon from '../helpers/icons'
import placeholderImg from '../img/150x150.png'
import axios from 'axios'
// import { Layer } from 'leaflet'
// import * as leedsPostcodes from './postcodes.js'
// import * as leedsPostcodes from '../leeds_geojson.geojson'

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
                                    <ul>
                                        <li><b>Footfall:</b> {sensor.current_total}</li>
                                        <li><b>Updated:</b> {convertIsoDateStr(sensor.updated_at)}</li>
                                        <li><b>Lat:</b> {sensor.latitude.substring(0, 8)}</li>
                                        <li><b>Long:</b> {sensor.longitude.substring(0, 8)}</li>
                                    </ul>
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
                    }>
                        <Popup>
                            <h3>sensor.name</h3>
                            <img src={placeholderImg} alt="Placeholder" />
                            <p>Current: sensor.current_total</p>
                            <p>Updated at convertIsoDateStr(sensor.updated_at)</p>
                        </Popup>
                    </Polyline> 
                    {/* Market Place Wetherby */}
                    <Polyline pathOptions={{color:'red', weight: 10, opacity: 0.5}} positions={
                        [[53.928554874484874, -1.3869093056904334], [53.92849733121453, -1.3864997673931516], [53.928438417784164, -1.386306632855229], [53.92832196075853, -1.3862996520887978], [53.92823975560363, -1.3864974404710078], [53.92821235384934, -1.3867906326611072], [53.92821783420164, -1.3868674210918477], [53.928538433558586, -1.3869162864568643]]
                    }>
                        <Popup>
                            <h3>sensor.name</h3>
                            <img src={placeholderImg} alt="Placeholder" />
                            <p>Current: sensor.current_total</p>
                            <p>Updated at convertIsoDateStr(sensor.updated_at)</p>
                        </Popup>
                    </Polyline>
                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Custom Polygons">
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
                    }>
                        <Popup>
                            <h3>sensor.name</h3>
                            <img src={placeholderImg} alt="Placeholder" />
                            <p>Current: sensor.current_total</p>
                            <p>Updated at convertIsoDateStr(sensor.updated_at)</p>
                        </Popup>
                    </Polygon>
                    {/* Albion Street */}
                   <Polygon pathOptions={{color:'red', weight: 5, opacity: 0.5}} positions={
                        [[53.79584142069808, -1.5454477292317268], [53.79950131836711, -1.5453651090813278], [53.79942202396944, -1.5447144753969353], [53.795822297947424, -1.5444644212365308]]
                    }>
                        <Popup>
                            <h3>sensor.name</h3>
                            <img src={placeholderImg} alt="Placeholder" />
                            <p>Current: sensor.current_total</p>
                            <p>Updated at convertIsoDateStr(sensor.updated_at)</p>
                        </Popup>                        
                    </Polygon>
                    {/* Commercial Street */}
                   <Polygon pathOptions={{color:'yellow', weight: 5, opacity: 0.5}} positions={
                        [[53.797903187033576, -1.5444571061745607], [53.79699110909598, -1.5444339507279214], [53.79710681635566, -1.54243781048838], [53.79787781446195, -1.54229165067072]]
                    }>
                        <Popup>
                            <h3>sensor.name</h3>
                            <img src={placeholderImg} alt="Placeholder" />
                            <p>Current: sensor.current_total</p>
                            <p>Updated at convertIsoDateStr(sensor.updated_at)</p>
                        </Popup>                              
                    </Polygon>
                    {/* Briggate (North) */}
                    <Polygon pathOptions={{color:'green', weight: 5, opacity: 0.5}} positions={
                        [[53.79927371425448, -1.542283948484872], [53.798004841351656, -1.5425115003150263], [53.798012747220675, -1.5417485324139206], [53.799261855806925, -1.5416816054050517]]
                    }>
                        <Popup>
                            <h3>sensor.name</h3>
                            <img src={placeholderImg} alt="Placeholder" />
                            <p>Current: sensor.current_total</p>
                            <p>Updated at convertIsoDateStr(sensor.updated_at)</p>
                        </Popup>                              
                    </Polygon>
                     {/* Briggate (South) */}
                     <Polygon pathOptions={{color:'green', weight: 5, opacity: 0.5}} positions={
                        [[53.79708153632742, -1.542648581257603], [53.79604978491607, -1.5428158987797755], [53.796061644271894, -1.5422604046061632], [53.79706572423676, -1.5421600140928597]]
                    }>
                        <Popup>
                            <h3>sensor.name</h3>
                            <img src={placeholderImg} alt="Placeholder" />
                            <p>Current: sensor.current_total</p>
                            <p>Updated at convertIsoDateStr(sensor.updated_at)</p>
                        </Popup>                              
                    </Polygon>
                  {/* Vicar Lane) */}
                  <Polygon pathOptions={{color:'green', weight: 5, opacity: 0.5}} positions={
                        [[53.79698037102715, -1.5404741719756434], [53.800790790144006, -1.5395545535949062], [53.80064505288013, -1.5392005020223467], [53.796957097892324, -1.5401446395491722]]
                    }>
                        <Popup>
                            <h3>sensor.name</h3>
                            <img src={placeholderImg} alt="Placeholder" />
                            <p>Current: sensor.current_total</p>
                            <p>Updated at convertIsoDateStr(sensor.updated_at)</p>
                        </Popup>                              
                    </Polygon>
                  {/* Merrion Street) */}
                  <Polygon pathOptions={{color:'green', weight: 5, opacity: 0.5}} positions={
                        [[53.80096816436116, -1.5446943072826997], [53.800773736547804, -1.5446419333540222], [53.80044674228324, -1.54105057823185], [53.800627915096186, -1.5409757583337396]]
                    }>
                        <Popup>
                            <h3>sensor.name</h3>
                            <img src={placeholderImg} alt="Placeholder" />
                            <p>Current: sensor.current_total</p>
                            <p>Updated at convertIsoDateStr(sensor.updated_at)</p>
                        </Popup>                              
                    </Polygon>
                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Postcode">
                    <LayerGroup>
                        {/* <GeoJSON data={leedsPostcodes}></GeoJSON> */}
                        <Polygon pathOptions={{color:'green', weight: 5, opacity: 0.5}} positions={
                        [
                            [ 53.79955640128425, -1.553147284798688 ],
                            [ 53.799814552313315, -1.552656647417016 ],
                            [ 53.799642134042934, -1.551871121406186 ],
                            [ 53.79950232016762, -1.549931571221862 ],
                            [ 53.79945203950703, -1.547530975669384 ],
                            [ 53.79856911108675, -1.547625611432617 ],
                            [ 53.79838961085384, -1.547805817829734 ],
                            [ 53.798239892830004, -1.547685991845888 ],
                            [ 53.79766824672311, -1.547825471078562 ],
                            [ 53.797499370904866, -1.547510681706718 ],
                            [ 53.797506586015395, -1.546827315894221 ],
                            [ 53.797493514191146, -1.545961015642487 ],
                            [ 53.79717751522895, -1.545881177985998 ],
                            [ 53.79679168165075, -1.545585395495312 ],
                            [ 53.79639798277383, -1.545822874550488 ],
                            [ 53.79592409681894, -1.545744746079342 ],
                            [ 53.79581138522738, -1.545739329208662 ],
                            [ 53.79584583224464, -1.547220274202591 ],
                            [ 53.796020356838454, -1.549034589657557 ],
                            [ 53.7961510715642, -1.550052953824824 ],
                            [ 53.79598132587358, -1.550223270566877 ],
                            [ 53.796069948040895, -1.550994719428004 ],
                            [ 53.79647854031847, -1.553901831968644 ],
                            [ 53.79775857071902, -1.553440314585398 ],
                            [ 53.799436883262196, -1.553123891816028 ],
                            [ 53.79955640128425, -1.553147284798688 ]]
                    }>
                        </Polygon>
                         
                    </LayerGroup>
                </LayersControl.Overlay>
            </LayersControl>
        </MapContainer>
        )}
        </>
    )
}

export default Map;