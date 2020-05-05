import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SiteHeader from './containers/SiteHeader';
import InitialStage from './containers/InitialStage';
import MainWindow from './containers/MainWindow';

class PrivateApp extends React.Component {
    constructor(props) {
		super(props);
		if (window.location.pathname === '/login') {
            window.location.replace("/");
        }
    }
    
    render() {
        return (
            <Router>
                <SiteHeader />
                <Switch>
                    <Route exact path="/" render={(props) => <MainWindow {...props}> <InitialStage {...props} /> </MainWindow>} />
                </Switch>
            </Router>
           
        )
    }
}

export default PrivateApp;