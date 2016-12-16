const React = require('react')

const { withGoogleMap, GoogleMap, Marker } = require('react-google-maps')

// creating a higher order componentDidMount
const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={3}
    defaultCenter={{
      lat: -25.363882, lng: 131.044922
    }}
    onClick={props.onMapClick}>
    {props.markers.map((marker, index) =>
    <Marker {...marker} />
  )}
  </GoogleMap>
))

const EateryMap = React.createClass({
  render() {
    return (
      <div>
        <h1>Map</h1>
        <GettingStartedGoogleMap
        containerElement={
          <div style={{height: '400px'}} />
        }
        mapElement={
          <div style={{height: '400px'}} />
        }
        onMapLoad={() => null }
        onMapClick={() => null }
        markers={[{
          position: {
            lat: 37.7749,
            lng: 122.4194,
          },
          key: `San Francisco`,
          defaultAnimation: 2,
        }]}
        onMarkerRightClick={() => null }
        >
        </GettingStartedGoogleMap>
      </div>
    )
  }
})

module.exports = EateryMap
