import React, { Fragment } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

import AppBar from '../appBar/index';
import Dashboard from '../Dashboard/Dashboard';


import clsx from 'clsx';

import {useSelector,useStore} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import {MapContainer,TileLayer,Marker,Popup} from 'react-leaflet'
import {LatLngTuple} from 'leaflet';
import './styles.css'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));



function Page() {
    const classes = useStyles();
    const defaultLatLng:LatLngTuple = [23,-82];
    const zoom: number = 8;

    const {lightnings} = useSelector<LightningState, StateProps>((state: LightningState) => {
              return {
                  lightnings : state.lightnings
              }
          });
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar/>
            <main className={classes.content}>
              
            <div className={classes.appBarSpacer} />
            
            <MapContainer id="mapId"
                center={defaultLatLng}
                zoom={zoom}>
                <TileLayer
                    // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    url='weatherforecast/{z}/{x}/{y}'
                    />

                {lightnings.map((light: ILightning) => {
                  return <Marker position={[light.latitude,light.longitude]}  >
                  <Popup >
                      {
                        light.ltime
                      }
                      <br /> 
                      {
                        light.ltype
                      }
                      <br /> 
                      {
                        light.peakcurrent
                      }<br /> 
                      {
                        light.numsensors
                      }
                   </Popup>
                  </Marker>

                })}
                {/* <Marker position={defaultLatLng}  >
                    <Popup >
                        A pretty CSS3 popup. <br /> Easily customizable.
                     </Popup>
                </Marker> */}
                  
            </MapContainer>
            
            </main>
            </div>
    )
}
export default Page;