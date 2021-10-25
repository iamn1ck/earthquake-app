import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import List from './List';
import Map from './Map'

function App() {
  const [activeMarker, setActiveMarker] = useState(null as any)
  const [data, setData] = useState([] as any[]);
  const [mapCenter, setMapCenter] = useState([0, 0])

  const refs = data && data.reduce((acc, value) => {
    acc[value.id] = React.createRef();
    return acc;
  }, {});

  const handleClick = (id: any) => {
    refs[id].current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  useEffect(() => {
    async function fetchMyAPI() {
      const res = await axios.get<any>('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson')

      setData(res.data.features)
    }
    fetchMyAPI()
  }, []);

  return (
    <div className="App">
      <div style={{ display: 'flex', flex: 1 }}>
        <List data={data} onClick={(value: any) => {
          setActiveMarker(value)
          value && setMapCenter([parseFloat(value.geometry.coordinates[1]), parseFloat(value.geometry.coordinates[0])])
        }}
          activeMarker={activeMarker}
          refs={refs}
        />
        <Map
          activeMarker={activeMarker}
          data={data}
          mapCenter={mapCenter}
          onClick={(value: any) => {
            setActiveMarker(value)
            value && handleClick(value.id)
          }}
        />
      </div>
    </div>
  );
}

export default App;
