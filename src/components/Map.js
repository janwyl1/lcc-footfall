import React, {useState, useEffect} from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import axios from 'axios'

const convertIsoDateStr = (isoDate) => {
    const jsDate = new Date(isoDate);
    // const readableDate = jsDate.toLocaleString('en-GB', {timeZone: 'UTC', year:});
    const readableTime = jsDate.toLocaleTimeString('en-GB', {timeZone: 'UTC'});
    return readableTime;
}

const clusterAvgScore = (markers) => {
    let totalScore = 0;

    markers.forEach((marker)=>{
        switch(marker.options.trafficLight) {
            case 'red':
                totalScore +=3;
                break;
            case 'amber':
                totalScore +=2;
                break;
            case 'green':
            default:
                totalScore +=1;
        }
    })

    return Math.ceil(totalScore / markers.length);
}

const avgScoreToClass = (avgScore) => {
    let classStr = "" 
    switch(avgScore) {
        case 3:
            classStr = "marker-cluster marker-cluster-large"
            break;
        case 2:
            classStr = "marker-cluster marker-cluster-medium"
            break;
        case 1:
        default:
            classStr = "marker-cluster marker-cluster-small"
    }
    return classStr;
}

const createClusterCustomIcon = function (cluster) {
    const markers = cluster.getAllChildMarkers();
    // Determine which colour to use by taking the average traffic_light score of all visible markers (rounded up)
    const avgScore = clusterAvgScore(markers);
    const clusterIconClass = avgScoreToClass(avgScore);

    return L.divIcon({
      html: `<div><span>${cluster.getChildCount()}</span></div>`,
      className: clusterIconClass,
      iconSize: L.point(40, 40, true),
    });
  }

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
            <MapContainer center={[53.796027783166444, -1.5444784829114298]} zoom={10} scrollWheelZoom={true} style={{ height: '85vh' }}>
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}>
                {mapData && mapData.map((sensor, index)=>{
                    return (
                    <Marker position={[sensor.latitude, sensor.longitude]} trafficLight={sensor.traffic_light} currentTotal={sensor.current_total} key={index}>
                         <Popup>
                            <h3>{sensor.name}</h3>
                            <p>{sensor.current_total} in the last hour</p>
                            <p>Updated at {convertIsoDateStr(sensor.updated_at)}</p>
                        </Popup>
                    </Marker>
                    )
                })}
            </MarkerClusterGroup>
        </MapContainer>
        )}
        </>
    )
}

export default Map;