import React from 'react';
import { Grid, Button, Icon, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPlans, removePlan, getSelectedPlan, clearSelectedPlan } from "../../appStore/actions/planActions";
import { selectActivity, selectIndustry } from '../../appStore/actions/naceActions';
import { selectCountry } from '../../appStore/actions/countriesActions';

class BusinessPlansList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.props.getPlans();
        this.props.clearSelectedPlan();
    }

    deletePlan = (plan) => {
        if (window.confirm("Are you sure?")) {
            const vart = this.props.removePlan(plan.id);
            console.log(vart);
        }
    }

    editPlan = (plan) => {
        this.props.getSelectedPlan(plan);
        this.props.selectActivity(plan.activity);
        this.props.selectCountry(plan.country);
        this.props.selectIndustry(plan.activity.industry);
        this.props.history.push({
            pathname: "/initial-setup",
        });
    }

    render() {
        const savedBusinessPlans = this.props.savedBusinessPlans.map((plan, i) =>
            <Grid.Row key={i} columns={3}>
                <Grid.Column floated='left' width={1}>
                    <label>{i + 1}</label>
                </Grid.Column>
                <Grid.Column floated='left'>
                    <label>{plan.title}</label>
                </Grid.Column>
                <Grid.Column floated='right' width={3}>
                    <Button icon onClick={this.deletePlan.bind(this, plan)}>
                        <Icon name='delete' />
                    </Button>
                    <Button icon onClick={this.editPlan.bind(this, plan)}>
                        <Icon name='edit' />
                    </Button>
                </Grid.Column>
            </Grid.Row>
        );

        return (
            <div style={{ textAlign: "center" }}>
                <div style={{ width: "70%", margin: "0 auto", textAlign: "left" }}>
                    <div style={{ width: "100%", margin: "0 auto", textAlign: "center" }}>
                        <h2>My Business Plans</h2>
                    </div>
                    <Grid style={{ marginTop: "3vh" }}>
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <Button icon labelPosition='left' as={Link} to='/initial-setup'>
                                    <Icon name='plus' />
                                    New...
                                </Button>
                                <Divider />
                                <div style={{ width: "100%", margin: "0 auto", textAlign: "center" }}>
                                    <h4>Saved items</h4>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                        {
                            Object.keys(this.props.savedBusinessPlans).length > 0 ? savedBusinessPlans : 'There are no items to display here, yet.'
                        }
                    </Grid>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.language,
        savedBusinessPlans: state.savedBusinessPlans,
        selectedBusinessPlan: state.selectedBusinessPlan,
        selectedActivity: state.selectedActivity,
        selectedCountry: state.selectedCountry,
        selectedIndustry: state.selectedIndustry,
    };
}

export default connect(mapStateToProps, { getPlans, removePlan, getSelectedPlan, selectCountry, selectActivity, selectIndustry, clearSelectedPlan })(BusinessPlansList);