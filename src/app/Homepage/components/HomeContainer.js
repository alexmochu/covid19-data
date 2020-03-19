import React, {useState, useRef, useEffect} from 'react';
import useSwr from 'swr';
import ReactMapGL, { Marker, FlyToInterpolator, Source, Layer} from 'react-map-gl';
import useSupercluster from 'use-supercluster';
import convertCSVToArray from 'convert-csv-to-array';
import { checkLatitude, checkLongitude, checkConfirmed } from './layers';
import styled from 'styled-components';

const Cluster = styled.div`{
  color: #fff;
  background: #1978c8;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}`;

const Mark = styled.button`{
  background: none;
  border: none;
}`;

// .crime-marker img {
//   width: 25px;
// }

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWxleG1vY2h1IiwiYSI6ImNrN3YyMm9wcDBkYXUzaHFpa3duM3JvemwifQ.2WYpN54DCVq_vcOkLzm3cg'; // Set your mapbox token here

const url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/03-18-2020.csv';

const HomeContainer = () => {
  const [viewport, setViewport] = useState({
    latitude: 10.67,
    longitude: -70.59,
    width: '100%',
    height: '100vh',
    zoom: 2,
    bearing: 0,
    pitch: 0
  })  
  const fetcher = (...args) => fetch(...args).then(response => response.text());
  const mapRef = useRef();
  const [csv=[], setCsv] = useState()
  const {data= '', error} = useSwr(url, fetcher);

  useEffect(() => {
      const arrayofArraysWithoutHeader = () => {
        if (data.length){
        return convertCSVToArray(data, {
        header: false,
        type: 'object',
        separator: ',', // use the separator you use in your csv (e.g. '\t', ',', ';' ...)
      })} else {
        return null;
      }};
    setCsv(arrayofArraysWithoutHeader());
  }, [data]);

  const opData = csv ? csv : [
    {
      "Province/State": "Hubei",
      "Country/Region": "China",
      "Last Update": "2020-03-17T11:53:10",
      "Confirmed": 67799,
      "Deaths": 3111,
      "Recovered": 56003,
      "Latitude": 30.9756,
      "Longitude": 112.2707
    }
  ]; 
  
  const points = opData.map(covid => ({
    type: "Feature",
    properties: {
      cluster: false,
      crimeId: checkLatitude(covid),
      category: checkLatitude(covid)
    },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(checkLongitude(covid)),
        parseFloat(checkLatitude(covid))
      ]
    }
  }))

  const bounds = mapRef.current ? mapRef.current.getMap().getBounds().toArray().flat() : null;
  const { clusters, supercluster } = useSupercluster({
    points,
    zoom: viewport.zoom,
    bounds,
    options: { radius: 75, maxZoom: 2}
  });
  
  return (
    <ReactMapGL 
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={newViewport => {
        setViewport({ ...newViewport });
      }}
      ref={mapRef}
    >
      {clusters.map(cluster => {
      const [longitude, latitude] = cluster.geometry.coordinates;
      const { cluster: isCluster, point_count: pointCount} = cluster.properties;

      if(isCluster){
        return (
          <Marker key={cluster.id} latitude={latitude} longitude={longitude}>
            <Cluster style={{width:`${50 + (pointCount / points.length) * 60}px`, height: `${50 + (pointCount / points.length) * 60}px`}}
              onClick={() => {
                const expansionZoom = Math.min(supercluster.getClusterExpansionZoom(cluster.id), 2);
                  setViewport({
                    ...viewport,
                    latitude,
                    longitude,
                    zoom: expansionZoom,
                    transitionInterpolator: new FlyToInterpolator({ speed: 2}),
                    transitionDuration: 'auto'
                  })
                }}
              >
                {pointCount}
            </Cluster>
          </Marker>
        )
      }
      return (
        <Marker
          key={cluster.properties.crimeId}
          latitude={latitude}
          longitude={longitude}>
            <Mark>
              1
            </Mark>
        </Marker>)
      })}
    </ReactMapGL>
    );
  }

export default HomeContainer;