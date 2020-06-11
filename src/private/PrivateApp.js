import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SiteHeader from './containers/SiteHeader';
import InitialStage from './containers/InitialStage';
import MainWindow from './containers/MainWindow';
import BusinessPlansList from './components/BusinessPlansList';
import RiskAnalysis from './containers/RiskAnalysis';

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
                    <Route exact path="/plans" render={(props) => <MainWindow {...props}> <BusinessPlansList {...props} /> </MainWindow>} />
                    <Route exact path="/initial-setup" render={(props) => <MainWindow {...props}> <InitialStage {...props} /> </MainWindow>} />
                    <Route exact path="/market-analysis" render={(props) => <MainWindow {...props}> <RiskAnalysis {...props} /> </MainWindow>} />
                </Switch>
            </Router>
           
        )
    }
}

export default PrivateApp;