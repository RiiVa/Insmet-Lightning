import React from 'react'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Markers from './index'
require('react-leaflet-markercluster/dist/styles.min.css');
export default function markersClusters()
    {
        return (
            <MarkerClusterGroup disableClusteringAtZoom={11} spiderfyOnMaxZoom={false} maxClusterRadius={80}>
                <Markers/>
            </MarkerClusterGroup>
        );
    }