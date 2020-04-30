/*import React from 'react';

class PrivateApp extends React.Component {
    render() {
        return (
            <div>
                PrivateApp
            </div>
        )
    }
}

export default PrivateApp;*/

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SiteHeader from './containers/SiteHeader';
import Home from './components/Home';
import InitialStage from './components/InitialStage';
import MainWindow from './containers/MainWindow';

class PrivateApp extends React.Component {
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