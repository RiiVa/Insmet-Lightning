import React from 'react'

import {Marker,Popup} from 'react-leaflet'
// import Container from '@material-ui/core/Container'


// import Dashboard from '../Dashboard/Dashboard';


// import clsx from 'clsx';

import {useSelector} from 'react-redux'
// import { makeStyles } from '@material-ui/core/styles';
// import {TileLayer,Marker,Popup, MapContainer, LayersControl, GeoJSON} from 'react-leaflet'
// import {LatLngTuple} from 'leaflet';
// import L from 'leaflet';

import './styles.css'

// let red = L.icon({
//   iconUrl: require('../marker-icon.png'),
  
// })

// console.log(prueba)

function Page() {
    
    const {lightnings} = useSelector<LightningState, StateProps>((state: LightningState) => {
              return {
                  lightnings : state.lightnings
              }
          });
    return (
      <div>
      {
        lightnings.map((light: ILightning) => {
        // console.log(light)
        return <Marker position={[light.latitude,light.longitude]}  >
        <Popup >
            DateTime: {
              light.idDateNavigation.date1
            }
            <br /> 
            Type: {
              (light.ltype == 0)? 'cg' : 'ic'
            }
            <br /> 
            Peak Current: {
              light.peakcurrent
            }<br /> 
            Sensors: {
              light.sensor
            }
         </Popup>
        </Marker>

      })}
      </div>
    )
}
export default Page;