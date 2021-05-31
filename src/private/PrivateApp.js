import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SiteHeader from './containers/SiteHeader';
import InitialStage from './containers/InitialStage';
import MainWindow from './containers/MainWindow';
import BusinessPlansList from './components/BusinessPlansList';
import RiskAnalysis from './containers/RiskAnalysis';
import PublicBusinessPlans from './containers/PublicBusinessPlans';
import PersonalBusinessPlans from './containers/PersonalBusinessPlans';
import UserSettingsWindow from './containers/UserSettingsWindow';
import SwotWindow from './containers/SwotWindow';


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
                    <Route exact path="/public-business-plans" render={(props) => <MainWindow {...props}> <PublicBusinessPlans {...props} /> </MainWindow>} />
                    <Route exact path="/personal-business-plans" render={(props) => <MainWindow {...props}> <PersonalBusinessPlans {...props} /> </MainWindow>} />
                    <Route exact path="/plans" render={(props) => <MainWindow {...props}> <BusinessPlansList {...props} /> </MainWindow>} />
                    <Route exact path="/initial-setup" render={(props) => <MainWindow {...props}> <InitialStage {...props} /> </MainWindow>} />
                    <Route exact path="/market-analysis" render={(props) => <MainWindow {...props}> <RiskAnalysis {...props} /> </MainWindow>} />
                    <Route exact path="/user-settings" render={(props) => <MainWindow {...props}> <UserSettingsWindow {...props} /> </MainWindow> } />
                    <Route exact path="/swot" render={(props) => <MainWindow {...props}> <SwotWindow {...props} /> </MainWindow> } />
                </Switch>
            </Router>

        )
    }
}

export default PrivateApp;