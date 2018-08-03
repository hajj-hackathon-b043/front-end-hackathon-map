import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Welcome from '../components/intro/Welcome';
import Step1 from '../components/intro/One';
import Step2 from '../components/intro/Two';
import Step3 from '../components/intro/Three';
import Step4 from '../components/intro/Four';

class IntroWizard extends Component {
    state = {
        redirect: false,
        welcome: true,
        currentStep: 1,
        totalSteps: 4,
        stepOneData: {
            participantNo: '',
            qrData: ''
        },
        stepTwoData: {
            row: '',
            tableNo: ''
        }
    }
    getQueryParams = () => {
        let { search } = this.props.location;
        search = queryString.parse(search);
    }
    updateCurrentStep = (val) => {
        let { currentStep, totalSteps } = this.state;
        let expectedStep = currentStep + val;
        if (expectedStep < 1 || expectedStep <= totalSteps) {
            currentStep = expectedStep;
        }
        this.setState({ currentStep });
    }
    handleFinalStep = () => {
        const { history } = this.props;
        this.props.dispatch({
            type: 'HANDLE_FINAL_STEP',
        })
        history.push('/menu');
    }

    handleRedirect = () => {
        const { isFirstTimeLoading, history } = this.props;
        if(!isFirstTimeLoading) {
            this.setState({redirect: true});
        }
    }

    fadeOutWelcomeScr = () => {
        setTimeout(() => {
            this.setState({
                welcome: false
            });
            this.handleRedirect();
        }, 1500);
    }
    componentDidMount() {
        this.getQueryParams();
        this.fadeOutWelcomeScr();
    }
    render() {
        const { currentStep, totalSteps, welcome, redirect } = this.state;
        if(redirect) {
            return <Redirect to='/menu' />;
        }

        return (
            <div className="wizard">
                {welcome && <Welcome />}
                {!welcome && (
                    <React.Fragment>
                        <Step1
                            currentStep={currentStep}
                            updateCurrentStep={ (val) => this.updateCurrentStep(val) }
                        />
                        <Step2 currentStep={currentStep} />
                        <Step3 currentStep={currentStep} />
                        <Step4 currentStep={currentStep} />

                        <div className='intro-bottom-nav'>
                        { currentStep !== 1 && currentStep != 4 ?
                            <Button 
                                variant="contained"
                                color="primary"
                                onClick={() => this.updateCurrentStep(-1) }>
                                Prev
                                </Button>
                            : 
                                null
                            }
                            { currentStep == 4 ?
                            <Button 
                                variant="contained"
                                color="primary"
                                onClick={this.handleFinalStep}>
                                Done
                                </Button>
                            : 
                                null
                            }
                            
                            { currentStep < totalSteps ?
                                <Button 
                                    variant="contained"
                                    color="primary"
                                    className={currentStep === 1 ? 'flex-end' : ''}
                                    onClick={() => this.updateCurrentStep(1) }>
                                    Next
                                </Button>
                                : 
                                null
                            }
                        </div>
                    </React.Fragment>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.introWizard
    }
}

export default connect(mapStateToProps)(IntroWizard);
