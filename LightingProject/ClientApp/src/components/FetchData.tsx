import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as WeatherForecastsStore from '../store/WeatherForecasts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import L from 'leaflet';
import MarkerClusterGroup  from 'react-leaflet-markercluster'



// At runtime, Redux will merge together...
type WeatherForecastProps =
  WeatherForecastsStore.WeatherForecastsState // ... state we've requested from the Redux store
  & typeof WeatherForecastsStore.actionCreators // ... plus action creators we've requested
  & RouteComponentProps<{ startDateIndex: string }>; // ... plus incoming routing parameters


const defaultLatLng: LatLngTuple = [23.1165, -82.3882];
const zoom: number = 8;
const iconRayo = new L.Icon({

    iconUrl: require('./kisspng-lightning-bolt-white-clip-art-harry-potter-lightning-bolt-5a889aea3a3450.8681451215189019942384.png'),

    iconSize: [40, 45], // tamaño del icono

    shadowSize: [50, 64], // tamaño de la sombra

    iconAnchor: [20, 40], // punto del icono que corresponde a la posición del marcador

    popupAnchor: [0, -40] // punto relativo al marcador desde donde se deberá abrir el popup

});
const iconRayo2 = new L.Icon({

    iconUrl: require('./kisspng-lightning-thunderbolt-clip-art-lightning-vector-5ad7a78ec1dee8.1019215715240825747941.png'),

    iconSize: [40, 45], // tamaño del icono

    shadowSize: [50, 64], // tamaño de la sombra

    iconAnchor: [20, 40], // punto del icono que corresponde a la posición del marcador

    popupAnchor: [0, -40] // punto relativo al marcador desde donde se deberá abrir el popup

});

class FetchData extends React.PureComponent<WeatherForecastProps> {
  // This method is called when the component is first added to the document
  public componentDidMount() {
    this.ensureDataFetched();
  }

  // This method is called when the route parameters change
  public componentDidUpdate() {
    this.ensureDataFetched();
  }

  public render() {
    return (
      <React.Fragment>
        <h1 id="tabelLabel">Lighting Projects</h1>
            <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
            {this.renderMap()}
      </React.Fragment>
    );
  }

    private renderMap() {
        return (
            <MapContainer id="mapId"
                center={defaultLatLng}
                zoom={zoom}>
                <TileLayer
                    //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    url='weatherforecast/{z}/{x}/{y}'
                    />

                <MarkerClusterGroup>
                <Marker position={defaultLatLng}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                     </Popup>
                </Marker>
                    <Marker position={[23.765583, -82.283523]} icon={ iconRayo}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                     </Popup>
                </Marker>
                    <Marker position={[23.785600, -82.283523]} icon={iconRayo2}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                     </Popup>
                </Marker>
                </MarkerClusterGroup>;
            </MapContainer>
        );
    }
  private ensureDataFetched() {
    const startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;
    this.props.requestWeatherForecasts(startDateIndex);
  }

}

export default connect(
  (state: ApplicationState) => state.weatherForecasts, // Selects which state properties are merged into the component's props
  WeatherForecastsStore.actionCreators // Selects which action creators are merged into the component's props
)(FetchData as any); // eslint-disable-line @typescript-eslint/no-explicit-any
