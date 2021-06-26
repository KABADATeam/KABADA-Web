import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SiteHeader from './containers/SiteHeader';
import MainWindow from './containers/MainWindow';
import PublicBusinessPlans from './containers/PublicBusinessPlans';
import PersonalBusinessPlans from './containers/PersonalBusinessPlans';
import UserSettingsWindow from './containers/UserSettingsWindow';
import SwotWindow from './containers/SwotWindow';
import KeyResources from './containers/KeyResources';
import KeyPartners from './containers/KeyPartners';
import Overview from './containers/Overview';


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
                    <Route exact path="/user-settings" render={(props) => <MainWindow {...props}> <UserSettingsWindow {...props} /> </MainWindow>} />
                    <Route exact path="/swot" render={(props) => <MainWindow {...props}> <SwotWindow {...props} /> </MainWindow>} />
                    <Route exact path="/key-resources" render={(props) => <MainWindow {...props}> <KeyResources {...props} /> </MainWindow>} />
                    <Route exact path="/key-partners" render={(props) => <MainWindow {...props}> <KeyPartners {...props} /> </MainWindow>} />
                    <Route exact path="/overview" render={(props) => <MainWindow {...props}> <Overview {...props} /> </MainWindow>} />
                </Switch>
            </Router>

        )
    }
}

export default PrivateApp;