import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SiteHeader from './containers/SiteHeader';
import Login from './components/Login';
import Home from './components/Home';
import ResetPassword from './components/ResetPassword';
import Register from './components/Register';
import MainWindow from './containers/MainWindow';

class PublicApp extends React.Component {
    render() {
        return (
            <Router>
                <SiteHeader />
                <Switch>
                    <Route exact path="/login" render={(props) => <MainWindow {...props}> <Login {...props} /> </MainWindow>} />
                    <Route exact path="/" render={(props) => <MainWindow {...props}> <Home {...props} /> </MainWindow>} />
                    <Route exact path="/reset" render={(props) => <MainWindow {...props}> <ResetPassword {...props} /> </MainWindow>} />
                    <Route exact path="/register" render={(props) => <MainWindow {...props}> <Register {...props} /> </MainWindow>} />
                </Switch>
            </Router>
           
        )
    }
}

export default PublicApp;