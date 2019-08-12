import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import React from 'react'

const Map = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: 22.3, lng: 114.2 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 22.291773, lng: 114.202233 }} />}
  </GoogleMap>
))

export default Map;