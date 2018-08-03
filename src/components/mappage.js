import React, { Component } from 'react';
import '../App.css';
import Map from './Map';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { GeoPosition } from 'react-fns';
import {Link} from 'react-router-dom';

class Mappage extends Component {
  constructor(props){
    super(props)
  }
  render() {
    console.log(this.props)
    return (
      <GeoPosition
      render={({ isLoading, coords, error }) => (
      <div className="mappagecontainer">
        <div className="nav">
          <AppBar position="static" style={{ backgroundColor: '#f1f1f1', color: '#fff' }}>
            <Toolbar>
              <Typography variant="title" style={{ color: '#000' }}>
                <Link to='/menu' style={{color:'#000'}}>Back</Link>
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
      { isLoading ? null : <Map type={this.props.match.params.type? this.props.match.params.type: ''} 
        team={this.props.match.params.team? this.props.match.params.team: ''}
      coords={coords} /> }
      </div>
    )}/>
  )
}
}
export default Mappage;
