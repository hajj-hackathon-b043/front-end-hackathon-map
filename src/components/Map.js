import React, { Component } from 'react';
import '../App.css';
import GoogleMapReact from 'google-map-react';
import { FaWalking } from 'react-icons/fa';
import { FaMapMarker } from 'react-icons/fa';
import {connect} from 'react-redux'
import axios from 'axios'
const api = 'AIzaSyAx3lbC838VZVnuCfEO2QMBb5eeJ7LY4-I';
const Marker = ({ props }) => {
  return (
    <h1>
      <FaWalking />
    </h1>
  );
};
const MarkerDis = ({ props }) => {
  return (
    <h1>
      <FaMapMarker />
    </h1>
  );
};

class Map extends Component {
  static defaultProps = {
    center: {
      lng: 39.1563971,
      lat: 21.616973
    },
    zoom: 18.5,
    false: false,
    rotateControl: true,
    tilt: 45
  };
  constructor(props){
    super(props)
    this.state = {
      location:{
        lat: '',
        lng: ''
      },
      distance: ''
    }
  }
  componentDidMount(){
    let {type, coords, team} = this.props
    console.log({type, coords})
    if(type && coords){
      axios.post('http://desolate-caverns-43961.herokuapp.com/category', {type, postion:{
        lat: coords.latitude,
        lng: coords.longitude
      }}).then(res=>{
        let {location, distance} = res.data
        
        this.setState({location, distance})

      }).catch(errr =>{
        console.log(errr)
      })
    }else if(team && coords){
      axios.get('http://desolate-caverns-43961.herokuapp.com/team/location/' + team).then(res=>{
        let {location} = res.data
        
        this.setState({location})

      }).catch(errr =>{
        console.log(errr)
      })
    } 

  }
  render() {
    let {coords} = this.props
    let {lat,lng} = this.state.location
    return (
      <div className="mapcontainer">
        <div className="mapgrid">
          <GoogleMapReact
            bootstrapURLKeys={{ key: api }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            
            zoomControl={this.props.false}
            mapTypeControl={this.props.false}
            scaleControl={this.props.false}
            streetViewControl={this.props.false}
            fullscreenControl={this.props.false}>
            <Marker lat={coords.latitude} lng={coords.longitude} />
            <MarkerDis lat={lat} lng={lng} />
          </GoogleMapReact>
          <div className="user">
            <div className="room">
              <div className="stage">
                <br />
                <br />
                <br />
                <p>Stage</p>
              </div>
              <div className="main-entrence">entrence</div>
              <div className="foodandmore">
                <br />
                <br />
                Food<br />somke<br />rest
              </div>
              <div className="A">
                <p>A</p>
              </div>
              <div className="B">
                <p>B</p>
              </div>
              <div className="C">
                <p>C</p>
              </div>
              <div className="D">
                <p>D</p>
              </div>
              <div className="E">
                <p>E</p>
              </div>
              <div className="F">
                <p>F</p>
              </div>
              <div className="G">
                <p>G</p>
              </div>
              <div className="H">
                <p>H</p>
              </div>
              <div className="I">
                <p>I</p>
              </div>

              <div className="J">
                <p>I</p>
              </div>

              <div className="K">
                <p>J</p>
              </div>

              <div className="L">
                <p>L</p>
              </div>

              <div className="M">
                <p>M</p>
              </div>

              <div className="N">
                <p>N</p>
              </div>

              <div className="O">
                <p>O</p>
              </div>

              <div className="P">
                <p>P</p>
              </div>

              <div className="Q">
                <p>Q</p>
              </div>

              <div className="R">
                <p>R</p>
              </div>
              <div className="M-Wc">
                <p>Male WC</p>
              </div>
              <div className="W-Wc">
                <p>FemaleWC</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps =(state, props)=>{
  return {
      ...state.introWizard,
      ...props
  }
}

export default connect(mapStateToProps)(Map);

//AIzaSyAx3lbC838VZVnuCfEO2QMBb5eeJ7LY4-I
