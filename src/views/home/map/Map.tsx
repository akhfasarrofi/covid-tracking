import { Map, TileLayer } from 'react-leaflet';
import './Map.css';
import { showDataOnMap } from '../../../lib/util';

type TProps = {
  countries: number
  casesType: string
  center?: any
  zoom: number
}

const Maps: React.FC<TProps> = ({
  countries,
  casesType,
  center,
  zoom
}) => (
  <div className="map">
    <Map center={center} zoom={zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {showDataOnMap(countries, casesType)}
    </Map>
  </div>
);


export default Maps;
