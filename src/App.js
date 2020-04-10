import React from 'react';
import PublicApp from './public/PublicApp';
import PrivateApp from './private/PrivateApp';

class App extends React.Component {

	isUserAuthenticated() {
		return false;
	}

	render() {
		if (this.isUserAuthenticated() === false) {
			return <PublicApp />
		} else {
			return <PrivateApp />
		}
	}
}

export default App;
