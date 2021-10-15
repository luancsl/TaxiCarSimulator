import React, { useState } from 'react';
import { Marker } from '../marker'
import GoogleMapReact from 'google-map-react';


const displayMarkers = (markers, addMarker) => {
    return markers.map((store, index) => {
        return <Marker
            id={store.id}
            key={index}
            lat={store.lat}
            lng={store.lng}
            onClick={id => addMarker(markers.filter((value, index) => id !== value.id))}
            text={store.id}
            isDriver={store.isDriver}
        />
    })
}


export const GoogleMap = ({ markersClient, markersDriver, addMarkersClient, addMarkersDriver, onClick, onRightClick, onGoogleApiLoaded }) => {
    const [loaction, setLocation] = useState()
    const [zoom, setZoom] = useState()

    return (
        <GoogleMapReact
            onClick={onClick}
            bootstrapURLKeys={{ key: 'AIzaSyA4qk-2c3Maa4iVFa3in9yg7MK5LBV5pfE', }}
            center={loaction}
            zoom={zoom}
            defaultCenter={{
                lat: -8.889048609954317,
                lng: -36.49141122674031
            }}
            onChange={({ center, zoom }) => { setLocation(center); setZoom(zoom) }}
            onGoogleApiLoaded={({ map, maps }) => { map.addListener('rightclick', onRightClick); onGoogleApiLoaded({ map, maps }) }}
            yesIWantToUseGoogleMapApiInternals
            defaultZoom={15}
        >
            {displayMarkers(markersDriver, addMarkersDriver)}
            {displayMarkers(markersClient, addMarkersClient)}
        </GoogleMapReact>
    )
}