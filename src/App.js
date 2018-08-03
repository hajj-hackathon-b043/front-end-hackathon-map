import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import 'normalize.css';
import './App.css';
import IntroWizardCont from './containers/IntroWizardCont';
import Mappage from './components/mappage';
import Menu from './components/Menu'
import Map from './components/Map'
import { launchApp } from './actions';
class App extends Component { 
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(launchApp())
	}
	render() {
		return (
			<div className = "App">
				<Route exact path = "/" component = { IntroWizardCont } />
        		<Route exact path="/menu" component={Menu} />
				<Route exact path="/menu/:type" component={Mappage} />
				<Route exact path="/menu/team/:team" component={Mappage} />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isFirstTimeLoading: state.introWizard.isFirstTimeLoading
	}
};

export default withRouter(connect(mapStateToProps)(App));