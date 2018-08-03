import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import QR_Reader from './QR_Reader';
import { connect } from 'react-redux';

class One extends Component {
    state = {
        qrScan: false,
        qrScanData: ''
    }
    receiveQrData = (data) => {
        const { dispatch, updateCurrentStep } = this.props;

        this.setState({
            qrScan: false,
            qrScanData: data
        });
        updateCurrentStep(+1);
        dispatch({
            type: 'CHANGE_ID',
            payload: {
                id: data
            }
        });
    }
    enableScanner = () => {
        this.setState({
            qrScan: true
        });
    }
    componentWillUnmount() {
        this.setState({
            qrScan: false,
            qrScanData: ''
        });
    }
    render() {
        const classes = this.props;
        const { qrScan, qrScanData } = this.state;
        const { dispatch, id } = this.props;
        if (this.props.currentStep !== 1) {
            return null;
        }

        return (
            <div>
                { !qrScan ? (
                    <React.Fragment>
                        <p>Let's get started with your participant number</p>
                        <div>
                        <TextField
                            className="form-input"
                            fullWidth
                            id="name"
                            label="Participant ID"
                            margin="normal"
                            value={id || '' }
                            onChange={(e) => dispatch({ type: 'CHANGE_ID', payload: {id: e.target.value} })}
                        />
                        </div>
                        <p>OR</p>
                        <div>
                        <Button onClick={this.enableScanner} variant="contained">QR Scan</Button>
                        </div>
                    </React.Fragment>
                    )
                    : 
                    <QR_Reader receiveQrData={(data) => this.receiveQrData(data)} />
                    }
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        ...state.introWizard
    }
};

export default connect(mapStateToProps)(One);