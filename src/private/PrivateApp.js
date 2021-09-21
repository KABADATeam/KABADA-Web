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
import ValuePropositions from './containers/ValuePropositions';
import NewProduct from './components/new_product/NewProduct';
import RevenueStreams from './containers/RevenueStreams';
import CostStructure from './containers/CostStructure';
import Channels from './containers/Channels';
import CustomerSegments from './containers/CustomerSegments';
import KeyActivities from './containers/KeyActivities';
import CustomerRelationships from './containers/CustomerRelationships';
import BusinessInvestmentsWindow from './containers/BusinessInvestmentsWindow';
import PublicOverview from './public_plan/containers/Overview';
import PublicCustomerSegments from './public_plan/containers/CustomerSegments';
import FinancialProjections from './containers/FinancialProjections';

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
                    <Route exact path="/value-propositions" render={(props) => <MainWindow {...props}> <ValuePropositions {...props} /> </MainWindow>} />
                    <Route exact path="/new-product" render={(props) => <MainWindow {...props}> <NewProduct {...props} /> </MainWindow>} />
                    <Route exact path="/revenue-streams" render={(props) => <MainWindow {...props}> <RevenueStreams {...props} /> </MainWindow>} />
                    <Route exact path="/cost-structure" render={(props) => <MainWindow {...props}> <CostStructure {...props} /> </MainWindow>} />
                    <Route exact path="/channels" render={(props) => <MainWindow {...props}> <Channels {...props} /> </MainWindow>} />
                    <Route exact path="/customer-segments" render={(props) => <MainWindow {...props}> <CustomerSegments {...props} /> </MainWindow>} />
                    <Route exact path="/key-activities" render={(props) => <MainWindow {...props}> <KeyActivities {...props} /> </MainWindow>} />
                    <Route exact path="/customer-relationships" render={(props) => <MainWindow {...props}> <CustomerRelationships {...props} /></MainWindow>} />
                    <Route exact path="/business-start-up-investments" render={(props) => <MainWindow {...props}> <BusinessInvestmentsWindow {...props} /></MainWindow>} />
                    <Route exact path="/public/overview" render={(props) => <MainWindow {...props}> <PublicOverview {...props} /> </MainWindow>} />
                    <Route exact path="/public/customer-segments" render={(props) => <MainWindow {...props}> <PublicCustomerSegments {...props} /> </MainWindow>} />
                    <Route exact path="/financial-projections" render={(props) => <MainWindow {...props}> <FinancialProjections {...props} /> </MainWindow>}/>
                </Switch>
            </Router>

        )
    }
}

export default PrivateApp;