import React from 'react'
import { useSelector } from 'react-redux'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Markers from './index'
require('react-leaflet-markercluster/dist/styles.min.css');


// const live = useSelector((state) => {state.live});

function MarkersClusters()
    {
        const live = useSelector(state => state.live)
        // const live = false;
        return (
            !live?(
            <MarkerClusterGroup disableClusteringAtZoom={11} spiderfyOnMaxZoom={false} maxClusterRadius={80}>
                <Markers/>
            </MarkerClusterGroup>
            ):<Markers/>
        );
    };
export default MarkersClusters;