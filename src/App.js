import React from 'react';
import PublicApp from './public/PublicApp';
import PrivateApp from './private/PrivateApp';
import { connect } from 'react-redux';

class App extends React.Component {

	isUserAuthenticated() {
		if (this.props.user.access_token === undefined || this.props.user.access_token === null)
			return false;
		else
			return true;
	}

	render() {
		if (this.isUserAuthenticated() === false) {
			return <PublicApp />
		} else {
			return <PrivateApp />
		}
	}
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, null)(App);
