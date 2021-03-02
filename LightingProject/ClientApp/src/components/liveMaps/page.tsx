import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import MyMarker from '../markers/markerclusert'
import {TileLayer, MapContainer, LayersControl} from 'react-leaflet'
import {LatLngTuple} from 'leaflet';


function Page() {
  return (
    <div>
      <main>
        <div></div>
        <MapContainer>
        <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="Storage Local Map">
                <TileLayer
                    // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    url='weatherforecast/{z}/{x}/{y}'

                    />
                </LayersControl.BaseLayer>  
                <LayersControl.BaseLayer name="Internet Map">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    // url='weatherforecast/{z}/{x}/{y}'

                    />
                </LayersControl.BaseLayer>
                {/* <LayersControl.Overlay checked name="Substations">
                  {kmlsub && <ReactLeafletKml kml={kmlsub} />}
                </LayersControl.Overlay> 
                <LayersControl.Overlay checked name="Line">
                  {kmlline && <ReactLeafletKml kml={kmlline} />}
                </LayersControl.Overlay>
                <LayersControl.Overlay checked name="Structure">
                  {kmlstruct && <ReactLeafletKml kml={kmlstruct} />}
                </LayersControl.Overlay> */}
                </LayersControl> 
        </MapContainer>
      </main>
    </div>
  )
}

export default Page