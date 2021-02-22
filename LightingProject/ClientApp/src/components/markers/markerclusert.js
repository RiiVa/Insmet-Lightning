import React from 'react'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Markers from './index'
require('react-leaflet-markercluster/dist/styles.min.css');
export default function markersClusters()
    {
        return (
            <MarkerClusterGroup>
                <Markers/>
            </MarkerClusterGroup>
        );
    }