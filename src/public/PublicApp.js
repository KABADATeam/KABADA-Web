import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SiteHeader from './containers/SiteHeader';

class PublicApp extends React.Component {
    render() {
        return (
            <Router>
                <SiteHeader />
            </Router>
           
        )
    }
}

export default PublicApp;