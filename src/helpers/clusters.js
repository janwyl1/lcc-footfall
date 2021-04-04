import React, {useState, useEffect} from 'react'
import L from 'leaflet'

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

const clusterScoreToClass = (avgScore) => {
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

const createClusterIcon =  (cluster) => {
    // Determine which colour to use by taking the average traffic_light score of all visible markers (rounded up) 
    const avgScore = clusterAvgScore(cluster.getAllChildMarkers());
    const clusterIconClass = clusterScoreToClass(avgScore);

    return L.divIcon({
      html: `<div><span>${cluster.getChildCount()}</span></div>`,
      className: clusterIconClass,
      iconSize: L.point(40, 40, true),
    });
}

export default createClusterIcon