import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ResetPassword from './components/ResetPassword';
import SetPassword from './components/SetPassword';
import Register from './components/Register';
import HomeWindow from './containers/HomeWindow';
import AuthenticationWindow from './containers/AuthenticationWindow';
import SentPassword from './components/SentPassword';
import Login from './components/Login';

class PublicApp extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/login" render={(props) => <AuthenticationWindow> <Login /> </AuthenticationWindow> } /> 
                    <Route exact path="/" render={(props) => <HomeWindow /> } />
                    <Route exact path="/forgot-password" render={(props) => <AuthenticationWindow> <ResetPassword /> </AuthenticationWindow> } />
                    <Route exact path="/password-sent" render={(props) => <AuthenticationWindow> <SentPassword /> </AuthenticationWindow> } />
                    <Route exact path="/set-password" render={(props) => <AuthenticationWindow> <SetPassword /> </AuthenticationWindow> } />
                    <Route exact path="/register" render={(props) => <AuthenticationWindow> <Register /> </AuthenticationWindow> }/>
                </Switch>
            </Router>
           
        )
    }
}

export default PublicApp;