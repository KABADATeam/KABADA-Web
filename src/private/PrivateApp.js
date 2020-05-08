import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SiteHeader from './containers/SiteHeader';
import InitialStage from './containers/InitialStage';
import MainWindow from './containers/MainWindow';
import BusinessPlansList from './components/BusinessPlansList';

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
                    <Route exact path="/" render={(props) => <MainWindow {...props}> <BusinessPlansList {...props} /> </MainWindow>} />
                    <Route exact path="/new" render={(props) => <MainWindow {...props}> <InitialStage {...props} /> </MainWindow>} />
                </Switch>
            </Router>
           
        )
    }
}

export default PrivateApp;