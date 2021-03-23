import React from 'react';
import {Marker,Popup} from 'react-leaflet'


function myMarker ({light}:{light : ILightning}){
    return <Marker position={[light.latitude,light.longitude]}  >
    <Popup >
        DateTime: {
          light.idDateNavigation.date1
        }
        <br /> 
        Position: {light.latitude} : {light.longitude}
        <br/>
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
}
export default React.memo(myMarker,(prevProps, nextProps)=>{
  return prevProps.light === nextProps.light
})