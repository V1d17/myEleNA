import React, { useState, useEffect } from "react";
import "./map.css";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";
import "./sidebar";
import L from "leaflet";
import customMarker from "./redmarker.png";
import "./page";
import {Rings} from "react-loader-spinner";

let pathMade = false;
//converts api data to usable coordinates
function convertCoords(coordinates) {
  var c = [];
  for (var i = 0; i < coordinates.length; i++) {
    let coords = [coordinates[i].node.lat, coordinates[i].node.lon];
    c.push(coords);
  }
  pathMade = true;
  return c;
}

const Map = (props) => {
  //initial map zoom
  const ZOOM_LEVEL = 20;
  const mapRef = useRef();

  //path coordinates
  // let coordinates = ([{"node":{"id":6357577436,"lat":42.3931953,"lon":-72.5317209,"near":[6357577437,6343662376,3151897192,2296737960,3151897175,6348628619,6348628610,6945482690],"elev":60.5369987487793},"dist":285.943962340018,"par":{"id":6357566477,"lat":42.3933471,"lon":-72.5321408,"near":[6357566476,6945482691,2296737960,3151897178,2296737961,6357577436,6357577427,6348628590],"elev":58.17497634887695}},{"node":{"id":6357566477,"lat":42.3933471,"lon":-72.5321408,"near":[6357566476,6945482691,2296737960,3151897178,2296737961,6357577436,6357577427,6348628590],"elev":58.17497634887695},"dist":285.943962340018,"par":{"id":3151897178,"lat":42.3932789,"lon":-72.5322516,"near":[66685153,6357566477,2296737960,6357566523,6357566476,6945482689,6357577430,6307218530],"elev":57.82151794433594},"elev":58.17497634887695,"eChan":0.3534584045410156},{"node":{"id":3151897178,"lat":42.3932789,"lon":-72.5322516,"near":[66685153,6357566477,2296737960,6357566523,6357566476,6945482689,6357577430,6307218530],"elev":57.82151794433594},"dist":280.26887058953554,"par":{"id":66685153,"lat":42.3933361,"lon":-72.5323138,"near":[6348628589,2296737960,3151897178,6357566524,6348628607,6945482689,6219755388,2296737963],"elev":57.48706817626953},"elev":57.82151794433594,"eChan":0.33444976806640625},{"node":{"id":66685153,"lat":42.3933361,"lon":-72.5323138,"near":[6348628589,2296737960,3151897178,6357566524,6348628607,6945482689,6219755388,2296737963],"elev":57.48706817626953},"dist":278.6941461217308,"par":{"id":6357566524,"lat":42.39331,"lon":-72.5324838,"near":[6307218531,66685153,6357566523,61795178,6348628588,6945482689,6348628586,6357566525],"elev":56.960575103759766},"elev":57.48706817626953,"eChan":0.5264930725097656},{"node":{"id":6357566524,"lat":42.39331,"lon":-72.5324838,"near":[6307218531,66685153,6357566523,61795178,6348628588,6945482689,6348628586,6357566525],"elev":56.960575103759766},"dist":277.22549015751076,"par":{"id":6357566523,"lat":42.3932468,"lon":-72.532451,"near":[6357566524,6357577428,6219755388,6348628587,6348628589,2296737958,6348628586,6357566525],"elev":56.93596649169922},"elev":56.960575103759766,"eChan":0.024608612060546875},{"node":{"id":6357566523,"lat":42.3932468,"lon":-72.532451,"near":[6357566524,6357577428,6219755388,6348628587,6348628589,2296737958,6348628586,6357566525],"elev":56.93596649169922},"dist":265.9937203879853,"par":{"id":6219755388,"lat":42.3932138,"lon":-72.5325016,"near":[6357566523,6357577428,6357577425,61795178,66685153,2296737958,6348628586,6357566525],"elev":56.75813674926758},"elev":56.93596649169922,"eChan":0.17782974243164062},{"node":{"id":6219755388,"lat":42.3932138,"lon":-72.5325016,"near":[6357566523,6357577428,6357577425,61795178,66685153,2296737958,6348628586,6357566525],"elev":56.75813674926758},"dist":264.36561085194205,"par":{"id":6348628587,"lat":42.393268,"lon":-72.5325608,"near":[6357566524,6357566523,6219755388,61795178,6307218530,2296737958,6348628586,6357566525],"elev":56.730587005615234},"elev":56.75813674926758,"eChan":0.02754974365234375},{"node":{"id":6348628587,"lat":42.393268,"lon":-72.5325608,"near":[6357566524,6357566523,6219755388,61795178,6307218530,2296737958,6348628586,6357566525],"elev":56.730587005615234},"dist":261.9230979229118,"par":{"id":6348628586,"lat":42.3930739,"lon":-72.5329028,"near":[6307218532,6945482689,1626446867,6307218533,6348628587,2296737957,6348628585,1408381935],"elev":55.2641716003418},"elev":56.730587005615234,"eChan":1.4664154052734375},{"node":{"id":6348628586,"lat":42.3930739,"lon":-72.5329028,"near":[6307218532,6945482689,1626446867,6307218533,6348628587,2296737957,6348628585,1408381935],"elev":55.2641716003418},"dist":255.0502575063312,"par":{"id":1626446867,"lat":42.3929607,"lon":-72.5329517,"near":[6348628586,2296737957,6357566414,6307218533,6219755388,6357566415,2296737954,61794457],"elev":54.563533782958984},"elev":55.2641716003418,"eChan":0.7006378173828125},{"node":{"id":1626446867,"lat":42.3929607,"lon":-72.5329517,"near":[6348628586,2296737957,6357566414,6307218533,6219755388,6357566415,2296737954,61794457],"elev":54.563533782958984},"dist":248.23155797044322,"par":{"id":6307218533,"lat":42.3929871,"lon":-72.5331769,"near":[8388278975,1626446867,6348628585,6357566582,6348628587,2296737956,1626446866,61794457],"elev":54.16778564453125},"elev":54.563533782958984,"eChan":0.3957481384277344},{"node":{"id":6307218533,"lat":42.3929871,"lon":-72.5331769,"near":[8388278975,1626446867,6348628585,6357566582,6348628587,2296737956,1626446866,61794457],"elev":54.16778564453125},"dist":246.90853754647435,"par":{"id":6348628585,"lat":42.392963,"lon":-72.5331925,"near":[6307218533,1626446867,3151897179,1701851319,6307218532,2296737954,1626446866,61794457],"elev":53.99396896362305},"elev":54.16778564453125,"eChan":0.17381668090820312},{"node":{"id":6348628585,"lat":42.392963,"lon":-72.5331925,"near":[6307218533,1626446867,3151897179,1701851319,6307218532,2296737954,1626446866,61794457],"elev":53.99396896362305},"dist":245.72848543483758,"par":{"id":3151897180,"lat":42.3926648,"lon":-72.5333004,"near":[6357566400,2296737951,2296737952,61792105,6348628585,6357566410,2296737949,1701851318],"elev":53.833126068115234},"elev":53.99396896362305,"eChan":0.1608428955078125},{"node":{"id":3151897180,"lat":42.3926648,"lon":-72.5333004,"near":[6357566400,2296737951,2296737952,61792105,6348628585,6357566410,2296737949,1701851318],"elev":53.833126068115234},"dist":230.32144450650298,"par":{"id":2296737949,"lat":42.3925265,"lon":-72.5335256,"near":[-1,2296737951,2296737948,1701851312,3151897180,6357566412,61798475,61792105],"elev":53.70013427734375},"elev":53.833126068115234,"eChan":0.13299179077148438},{"node":{"id":2296737949,"lat":42.3925265,"lon":-72.5335256,"near":[-1,2296737951,2296737948,1701851312,3151897180,6357566412,61798475,61792105],"elev":53.70013427734375},"dist":229.59149401301923,"par":{"id":2296737948,"lat":42.3924774,"lon":-72.5335041,"near":[2296737949,6357566410,6357566411,1701851312,3151897180,6357566412,61798475,61792105],"elev":53.63787841796875},"elev":53.70013427734375,"eChan":0.062255859375},{"node":{"id":2296737948,"lat":42.3924774,"lon":-72.5335041,"near":[2296737949,6357566410,6357566411,1701851312,3151897180,6357566412,61798475,61792105],"elev":53.63787841796875},"dist":224.82045160928945,"par":{"id":2296737947,"lat":42.3924622,"lon":-72.5335678,"near":[2296737948,6357566411,2296737941,1701851312,3151897180,6357566412,61798475,1701851314],"elev":53.61733627319336},"elev":53.63787841796875,"eChan":0.020542144775390625},{"node":{"id":2296737947,"lat":42.3924622,"lon":-72.5335678,"near":[2296737948,6357566411,2296737941,1701851312,3151897180,6357566412,61798475,1701851314],"elev":53.61733627319336},"dist":224.72804834990887,"par":{"id":6348628578,"lat":42.3925638,"lon":-72.5339516,"near":[6348628582,61795906,2296737950,6357566478,1701851314,2296737947,61793406,6357566479],"elev":53.21425247192383},"elev":53.61733627319336,"eChan":0.40308380126953125},{"node":{"id":6348628578,"lat":42.3925638,"lon":-72.5339516,"near":[6348628582,61795906,2296737950,6357566478,1701851314,2296737947,61793406,6357566479],"elev":53.21425247192383},"dist":215.24313937935767,"par":{"id":6348628582,"lat":42.3926285,"lon":-72.5339737,"near":[3151897183,61795906,6348628578,61794191,1701851318,6348628584,61795089,6357566479],"elev":53.165550231933594},"elev":53.21425247192383,"eChan":0.048702239990234375},{"node":{"id":6348628582,"lat":42.3926285,"lon":-72.5339737,"near":[3151897183,61795906,6348628578,61794191,1701851318,6348628584,61795089,6357566479],"elev":53.165550231933594},"dist":207.0818974998083,"par":{"id":61795906,"lat":42.392661,"lon":-72.533839,"near":[61792719,1701851314,6348628584,6348628582,1626446866,1701851312,2296737950,6348628580],"elev":53.15987014770508},"elev":53.165550231933594,"eChan":0.005680084228515625},{"node":{"id":61795906,"lat":42.392661,"lon":-72.533839,"near":[61792719,1701851314,6348628584,6348628582,1626446866,1701851312,2296737950,6348628580],"elev":53.15987014770508},"dist":183.8084888916142,"elev":53.15987014770508,"eChan":0}]);
  let coordinates = (null, null);
  if (
    props.route != "Error, start or end coordinate is out of bounds" &&
    props.route != undefined
  ) {
    coordinates = convertCoords(props.route);
  }

  //keep track of clicks(markers placed)
  let [clicks, setClicks] = useState(0);

  useEffect(() => {
    // Get current position using Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        props.setCenter([latitude, longitude]); // Update center with current position
      },
      (error) => {
        console.error("Error getting current position:", error);
      }
    );
  }, [
    props.isMarkerActive,
    props.startMarkerPosition,
    props.endMarkerPosition,
    props.center,
  ]);

  //render route once user chooses start/end
  let r = null;
  if (
    pathMade &&
    props.route != undefined &&
    props.route != "Error, start or end coordinate is out of bounds"
  ) {
    r = <Polyline positions={coordinates} color="red" />;
  }

  //adds marker to map and records longitude and lattitude of respective marker
  function AddMarker() {
    const customIcon = L.icon({
      iconUrl: customMarker,
      iconSize: [32, 32],
    });

    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        if (clicks === 0) {
          props.setStartMarkerPosition([lat, lng]);
          props.setStartLat(lat);
          props.setStartLon(lng);
        } else if (clicks === 1) {
          props.setEndMarkerPosition([lat, lng]);
          props.setEndLat(lat);
          props.setEndLon(lng);
        }
        setClicks((prevClicks) => prevClicks + 1);
      },
    });

    if (props.isMarkerActive === false) {
      props.setStartMarkerPosition(null);
      props.setEndMarkerPosition(null);
      setClicks(0);
    }

    return (
      <>
        {props.startMarkerPosition && (
          <Marker
            position={props.startMarkerPosition}
            icon={customIcon}
            draggable={false}
          />
        )}
        {props.endMarkerPosition && (
          <Marker
            position={props.endMarkerPosition}
            icon={customIcon}
            draggable={false}
          />
        )}
      </>
    );
  }

  return props.center ? (
    <div className="map">
      {props.loading ? (
        <div className="spinner-overlay">
          <Rings type="Oval" color="#4285f4" height={80} width={80} />
        </div>
      ) : null}
      <MapContainer
        center={props.center}
        zoom={ZOOM_LEVEL}
        ref={mapRef}
        minZoom={15}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <AddMarker />
        {r}
      </MapContainer>
    </div>
  ) : null;
};

export default Map;