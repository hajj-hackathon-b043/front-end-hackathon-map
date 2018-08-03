import React, { Component } from 'react'
import QrReader from 'react-qr-reader'

class QR_Reader extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 300,
      result: 'No result',
    }
    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(data) {
      const { receiveQrData } = this.props;

    if(data){
      this.setState({
        result: data,
      })
      
      receiveQrData(data);
    }
  }
  handleError(err){
    console.error(err)
  }
  render(){
    return(
        <QrReader
            className="qr-code-scanner"
          delay={this.state.delay}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '200px' }}
          />
    );
  }
}

export default QR_Reader;