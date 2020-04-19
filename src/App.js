import React, { useState } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import * as locationsData from "./data/locations.json";

function Map() {
  const [selectedLoc, setSelectedLoc] = useState(null);
  return (
    <div className="App">
      <header className="App-header">
        <img
          src={"./spheat_logo.jfif"}
          style={{
            width: "15vw",
            height: "15hw",
            position: "absolute",
            top: 10,
            left: 10,
          }}
        />
        <h2
          style={{
            width: "15vw",
            height: "15hw",
            position: "absolute",
            top: 10,
            left: "20vw",
            backgroundColor: "white",
          }}
        >
          Welcome to Saint-Petersburg!
        </h2>
      </header>
      <p
        style={{
          width: "15vw",
          height: "15hw",
          position: "absolute",
          top: 130,
          left: "20vw",
          backgroundColor: "white",
        }}
      >
        Please, pick the location you are interested in!
      </p>
      <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: 59.93848, lng: 30.312481 }}
      >
        {locationsData.features.map((loc) => (
          <Marker
            key={loc.properties.LOC_ID}
            position={{
              lat: loc.geometry.coordinates[0],
              lng: loc.geometry.coordinates[1],
            }}
            onClick={() => {
              setSelectedLoc(loc);
            }}
            /*
          icon={{
            url:"/spheat_round.png",
            scaledSize: new window.google.maps.Size(25,25)
          }} 
          */
          />
        ))}

        {selectedLoc && (
          <InfoWindow
            position={{
              lat: selectedLoc.geometry.coordinates[0],
              lng: selectedLoc.geometry.coordinates[1],
            }}
            onCloseClick={() => {
              setSelectedLoc(null);
            }}
          >
            <div>
              <h2>{selectedLoc.properties.NAME}</h2>
              <p>{selectedLoc.properties.DESCRIPTION}</p>
              <p>{selectedLoc.properties.ADRESS}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCPlfNpozZisS3dxh7AFQz8pWx9ttHmdgQ`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
