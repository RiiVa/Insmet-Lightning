import React from 'react';
import {Marker,Popup} from 'react-leaflet'
import L from 'leaflet';
const PulsePos = L.icon({
  iconUrl : require("../red_marker_ic.png"),
  iconRetinaUrl : require("../red_marker_ic.png"),
  iconAnchor : [12,41],
  iconSize : [25,41],
  shadowAnchor : undefined,
  shadowSize : undefined,
  
  shadowUrl : undefined,
  className : "leaflet-marker-icon",
})
const PulseNeg = L.icon({
  iconUrl : require("../yellow_marker_ic.png"),
  iconRetinaUrl : require("../yellow_marker_ic.png"),
  iconAnchor : [12,41],
  iconSize : [25,41],
  shadowAnchor : undefined,
  shadowSize : undefined,
  
  shadowUrl : undefined,
  className : "leaflet-marker-icon",
})
const FlasPos = L.icon({
  iconUrl : require("../marker-icon.png"),
  iconRetinaUrl : require("../marker-icon.png"),
  iconAnchor : [12,41],
  iconSize : [25,41],
  shadowAnchor : undefined,
  shadowSize : undefined,
  
  shadowUrl : undefined,
  className : "leaflet-marker-icon",
})
function myMarker ({light}:{light : ILightning}){
   
  
  if (light.ltype == 0)
    {
      console.log('entro a cg')
      // aqui pinto rayo negro
      if(light.peakcurrent < 0)
        return (<Marker position={[light.latitude,light.longitude]} key={light.id} >
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
              light.peakcurrent/1000 
            } kA
            <br /> 
            Sensors: {
              light.sensor
            }
         </Popup>
        </Marker>)
        else
            return (<Marker position={[light.latitude,light.longitude]} key={light.id} icon={FlasPos}>
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
                  light.peakcurrent/1000 
                } kA
                <br /> 
                Sensors: {
                  light.sensor
                }
             </Popup>
            </Marker>)
    }
    else 
    {
      // aqui pinto rayo ci amarillo
      if(light.peakcurrent < 0)
        return (<Marker position={[light.latitude,light.longitude]} key={light.id} icon={PulseNeg}>
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
              light.peakcurrent/1000 
            } kA
            <br /> 
            Sensors: {
              light.sensor
            }
         </Popup>
        </Marker>)
        else
            return (<Marker position={[light.latitude,light.longitude]} key={light.id} icon={PulsePos}>
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
                  light.peakcurrent/1000 
                } kA
                <br /> 
                Sensors: {
                  light.sensor
                }
             </Popup>
            </Marker>
            )}
// return <Marker position={[light.latitude,light.longitude]} key={light.id} icon={PulsePos}>
//                <Popup >
//                    DateTime: {
//                     light.idDateNavigation.date1
//                   }
//                   <br /> 
//                   Position: {light.latitude} : {light.longitude}
//                   <br/>
//                   Type: {
//                     (light.ltype == 0)? 'cg' : 'ic'
//                   }
//                   <br /> 
//                   Peak Current: {
//                     light.peakcurrent/1000 
//                   } kA
//                   <br /> 
//                   Sensors: {
//                     light.sensor
//                   }
//                </Popup>
//                </Marker> 
}
export default React.memo(myMarker,(prevProps, nextProps)=>{
  return prevProps.light === nextProps.light
})
// export default myMarker