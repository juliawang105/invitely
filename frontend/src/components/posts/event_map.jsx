import React from "react";
import { withRouter } from "react-router-dom";
/*global google*/ 

// import MarkerManager from "../util/marker_manager";

class EventMap extends React.Component {
    constructor(props){
      super(props);

      // this.state = this.props;
    }

  componentDidMount() {
    let geocoder = new google.maps.Geocoder();

    let mapOptions = {
      zoom: 14
    };

    let map = new google.maps.Map(this.mapNode, mapOptions);
    if(geocoder) {
      geocoder.geocode({ address: this.props.event.location }, function(
        results,
        status
      ) {
        if (status === google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          let marker = new google.maps.Marker({
            position: results[0].geometry.location,
            map: map,
            title: "address"
          });

        } else {
          console.log(
            "Geocode was not successful for the following reason: " + status
          );
        }
      })
    };
    
    
    console.log("working");
    // wrap this.mapNode in a Google Map
    
    // this.MarkerManager = new MarkerManager(this.map);
    // this.MarkerManager.updateMarkers(this.props.benches);

};


  render() {
    
    return (<div id="map-container" ref={map => (this.mapNode = map)}></div>);
   
  }
}

export default withRouter(EventMap);
