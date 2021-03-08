import React,{useEffect} from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {RootDispatcher} from '../../redux/actions/actionCreators'
import moment from 'moment'
import MyMarker from './marker'
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
    const dispatch = useDispatch();
    const rootDispatcher = new RootDispatcher(dispatch);
    const interval = 60000
    const delay = 61000
    
    // const nowEnd = moment().format
    // const nowInit = moment().subtract(-1,'minutes').format()
    // console.log(nowInit, '     ' ,nowEnd)

    function timerAction() {
      
      const formdata = new FormData()
      // const asd = moment().format()
      formdata.append('init', moment().subtract(-1,'minutes').format('YYYY[-]MM[-]DD[T]HH[:]MM') )
      formdata.append('end',moment().format('YYYY[-]MM[-]DD[T]HH[:]MM') )
      formdata.append('peak',  '0'  )
      formdata.append('peak', '0' );
      formdata.append('type', '2'  )
      console.log( moment().format('YYYY[-]MM[-]DD[T]HH[:]MM') )
      axios.post('/weatherforecast/Light',  formdata )
      .then(res => {
        // console.log(res);
        if(res.status === 500){
          alert('Connection Alert')
        }
        else{
        console.log(res.data as ILightning[])
        rootDispatcher.filterLight(res.data as ILightning[])
        }
      })
    }


    const {lightnings} = useSelector<LightningState, StateProps>((state: LightningState) => {
              return {
                  lightnings : state.lightnings
              }
          });
          useEffect(() => {
            let intervalId:NodeJS.Timeout;
            console.log("useEffect trigger", delay, interval);
        
            const timerId = setTimeout(() => {
              console.log("-- exec time --");
              timerAction();
        
              intervalId = setInterval(() => {
                console.log(" -- exec interval --");
                timerAction();
              }, interval);
        
              return () => {
                console.log("clearing interval");
                clearInterval(intervalId);
              };
            }, delay);
        
            return () => {
              console.log("clearing-both");
              clearInterval(intervalId);
              clearTimeout(timerId);
            };
          }, [delay, interval]);
      
    return (
      <div>
      {
        lightnings.map((light: ILightning) => {
        console.log(light)
        return <MyMarker light = {light as ILightning} />

      })}
      </div>
    )
}
export default Page;