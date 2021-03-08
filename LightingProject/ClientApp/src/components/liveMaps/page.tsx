import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
// import Container from '@material-ui/core/Container'

import AppBar from '../appBar/index';
// import Dashboard from '../Dashboard/Dashboard';
import MyMarker from '../markers/markerclusert'

// import clsx from 'clsx';

import {useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import {TileLayer, MapContainer, LayersControl} from 'react-leaflet'
import {LatLngTuple} from 'leaflet';
import L from 'leaflet';
// import MarkerClusterGroup from 'react-leaflet-markercluster';

import './styles.css'
// import prueba from ../estructuras_220.json"
// import axios from 'axios'
import ReactLeafletKml from "react-leaflet-kml";


const drawerWidth = 240;

 
// class MarkerClusterGroup extends Component<MarkerClusterGroupProps> {}


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
  appBarSpacer: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
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



// console.log(prueba)

function Page() {
    const classes = useStyles();
    const defaultLatLng:LatLngTuple = [23,-82];
    const zoom: number = 8;
    const [kmlline, setKmlline] = React.useState<null | Document>();
    const [kmlstruct, setKmlstruct] = React.useState<null | Document>();
    const [kmlsub, setKmlsub] = React.useState<null | Document>();
    
    React.useEffect(() => {
      fetch(
        "/weatherforecast/DataLayers/subestaciones_220.kml"
      )
        .then((res) => res.text())
        .then((kmlText) => {
          const parser = new DOMParser();
          const kml = parser.parseFromString(kmlText, "text/xml");
          setKmlsub(kml);
        });
    }, []);
    React.useEffect(() => {
      fetch(
        "/weatherforecast/DataLayers/estructuras_220.kml"
      )
        .then((res) => res.text())
        .then((kmlText) => {
          const parser = new DOMParser();
          const kml = parser.parseFromString(kmlText, "text/xml");
          setKmlstruct(kml);
        });
    }, []);
    React.useEffect(() => {
      fetch(
        "/weatherforecast/DataLayers/lineas_220.kml"
      )
        .then(
          (res) => 
          console.log(res)
        
        // res.text()
        )
        // .then((kmlText) => {
        //   const parser = new DOMParser();
        //   const kml = parser.parseFromString(kmlText, "text/xml");
        //   setKmlline(kml);
        // });
    }, []);
    // const {lightnings} = useSelector<LightningState, StateProps>((state: LightningState) => {
    //           return {
    //               lightnings : state.lightnings
    //           }
    //       });
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar/>
            <main 
              className={classes.content}>
              
            <div className={classes.appBarSpacer} />
            
            <MapContainer id='mapId'
                center={defaultLatLng}
                zoom={zoom}>
                
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
                
                 
                {/* <Marker position={defaultLatLng}>
                
                </Marker> */}
                {/* <MarkerClusterGroup disableClusteringAtZoom={11} spiderfyOnMaxZoom={false} maxClusterRadius={80}> */}
                 <LayersControl.Overlay name="Lightnings Data">
                
                 <MyMarker/>

                </LayersControl.Overlay> 
                </LayersControl> 
                
                


                {/* <Marker position={defaultLatLng}  >
                    <Popup >
                        A pretty CSS3 popup. <br /> Easily customizable.
                     </Popup>
                </Marker> */}
                  {/* </MarkerClusterGroup> */}
            </MapContainer>
            
            </main>
            </div>
    )
}
export default Page;