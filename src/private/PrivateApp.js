import React from 'react';
import { HashRouter as Router, BrowserRouter, Route, Switch } from 'react-router-dom';
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
import EditProduct from './components/new_product/EditProduct';
import RevenueStreams from './containers/RevenueStreams';
import CostStructure from './containers/CostStructure';
import Channels from './containers/Channels';
import CustomerSegments from './containers/CustomerSegments';
import KeyActivities from './containers/KeyActivities';
import CustomerRelationships from './containers/CustomerRelationships';
import BusinessInvestmentsWindow from './containers/BusinessInvestmentsWindow';
import PublicOverview from './public_plan/containers/Overview';
import PublicCustomerSegments from './public_plan/containers/CustomerSegments';
import PublicValuePropositions from './public_plan/containers/ValuePropositions';
import PublicChannels from './public_plan/containers/Channels';
import PublicKeyResources from './public_plan/containers/KeyResources'
import PublicCustomerRelationships from './public_plan/containers/CustomerRelationships';
import PublicRevenueStreams from './public_plan/containers/RevenueStreams';
import PublicKeyPartners from './public_plan/containers/KeyPartners';
import PublicCostStructure from './public_plan/containers/CostStructure'
import PublicKeyActivities from './public_plan/containers/KeyActivities';
import PublicSwot from './public_plan/containers/Swot';
import PublicAssets from './public_plan/containers/Assets';
import PublicFixedAndVariableCosts from './public_plan/containers/FixedAndVariableCosts';
import PublicSalesForecast from './public_plan/containers/SalesForecast';
import PublicBusinessInvestmentsWindow from './public_plan/containers/BusinessInvestmentWindow';
import PublicCashFlow from './public_plan/containers/CashFlow';
import FixedAndVariableCosts from './containers/FixedAndVariableCosts';
import SalesForecast from './containers/SalesForecast';
import CashFlow from './containers/CashFlow';
import Assets from './containers/Assets';
import PersonalCharacteristics from './containers/PersonalCharacteristics';
import FullPageLoader from './components/overview/FullPageLoader';
import PublicPageLoader from './public_plan/components/FullPageLoader';
import Home from '../public/components/Home';

class PrivateApp extends React.Component {
    constructor(props) {
        super(props);
        if (window.location.pathname === '/login') {
            window.location.replace("/");
        }
    }

    render() {
        console.log(window.location)
        return (
            <BrowserRouter>
                <SiteHeader />

                <Switch>
                    <Route exact path="/" render={(props) => <MainWindow {...props}> <Home {...props} /> </MainWindow>} />
                    <Route exact path="/public-business-plans" render={(props) => <MainWindow {...props}> <PublicBusinessPlans {...props} /> <PublicPageLoader /></MainWindow>} />
                    <Route exact path="/personal-business-plans" render={(props) => <MainWindow {...props}><PersonalBusinessPlans {...props} /> </MainWindow>} />
                    <Route exact path="/user-settings" render={(props) => <MainWindow {...props}> <UserSettingsWindow {...props} /> </MainWindow>} />
                    <Route exact path="/swot" render={(props) => <MainWindow {...props}> <SwotWindow {...props} /> </MainWindow>} />
                    <Route exact path="/key-resources" render={(props) => <MainWindow {...props}> <KeyResources {...props} /> </MainWindow>} />
                    <Route exact path="/key-partners" render={(props) => <MainWindow {...props}> <KeyPartners {...props} /> </MainWindow>} />
                    <Route exact path="/overview" render={(props) => <MainWindow {...props}> <Overview {...props} /> <FullPageLoader /> </MainWindow>} />
                    <Route exact path="/value-propositions" render={(props) => <MainWindow {...props}> <ValuePropositions {...props} /> </MainWindow>} />
                    <Route exact path="/value-propositions/:productId" render={(props) => <MainWindow {...props}><EditProduct {...props}/> </MainWindow>} />
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
                    <Route exact path="/public/value-propositions" render={(props) => <MainWindow {...props}> <PublicValuePropositions {...props} /> </MainWindow>} />
                    <Route exact path="/public/channels" render={(props) => <MainWindow {...props}> <PublicChannels {...props} /> </MainWindow>} />
                    <Route exact path="/public/key-resources" render={(props) => <MainWindow {...props}> <PublicKeyResources {...props} /> </MainWindow>} />
                    <Route exact path="/public/key-activities" render={(props) => <MainWindow {...props}> <PublicKeyActivities {...props} /> </MainWindow>} />
                    <Route exact path="/public/revenue-streams" render={(props) => <MainWindow {...props}> <PublicRevenueStreams {...props} /> </MainWindow>} />
                    <Route exact path="/public/customer-relationships" render={(props) => <MainWindow {...props}> <PublicCustomerRelationships {...props} /> </MainWindow>} />
                    <Route exact path="/public/cost-structure" render={(props) => <MainWindow {...props}> <PublicCostStructure {...props} /> </MainWindow>} />
                    <Route exact path="/public/key-partners" render={(props) => <MainWindow {...props}> <PublicKeyPartners {...props} /> </MainWindow>} />
                    <Route exact path="/public/swot" render={(props) => <MainWindow {...props}> <PublicSwot {...props} /> </MainWindow>} />
                    <Route exact path="/public/assets" render={(props) => <MainWindow {...props}> <PublicAssets {...props} /> </MainWindow>} />
                    <Route exact path="/public/fixed-and-variable-costs" render={(props) => <MainWindow {...props}> <PublicFixedAndVariableCosts {...props} /> </MainWindow>} />
                    <Route exact path="/public/sales-forecast" render={(props) => <MainWindow {...props}> <PublicSalesForecast {...props} /> </MainWindow>} />
                    <Route exact path="/public/business-start-up-investments" render={(props) => <MainWindow {...props}> <PublicBusinessInvestmentsWindow {...props} /></MainWindow>} />
                    <Route exact path="/public/cash-flow" render={(props) => <MainWindow {...props}> <PublicCashFlow {...props} /> </MainWindow>} />
                    <Route exact path="/fixed-and-variable-costs" render={(props) => <MainWindow {...props}> <FixedAndVariableCosts {...props} /> </MainWindow>} />
                    <Route exact path="/sales-forecast" render={(props) => <MainWindow {...props}> <SalesForecast {...props} /> </MainWindow>} />
                    <Route exact path="/cash-flow" render={(props) => <MainWindow {...props}> <CashFlow {...props} /> </MainWindow>} />
                    <Route exact path="/assets" render={(props) => <MainWindow {...props}> <Assets {...props} /> </MainWindow>} />
                    <Route exact path="/personal-characteristics" render={(props) => <MainWindow {...props}> <PersonalCharacteristics {...props} /> </MainWindow>} />
                </Switch>
            </BrowserRouter>

        )
    }
}

export default PrivateApp;