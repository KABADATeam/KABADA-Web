import React from 'react';
import { Grid, Button, Icon, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPlans, removePlan } from "../../appStore/actions/planActions";

class BusinessPlansList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            plans: []
        };
    }

    componentDidMount() {
        this.props.getPlans();
    }


    onPlanEdit = (data) => {
        console.log(data);
    }

    onPlanDelete = (data) => {
        this.props.removePlan(data);
        this.props.getPlans();
        this.props.getPlans();
        console.log(this.props.savedBusinessPlans);
    }

    render() {
        const savedBusinessPlans = this.props.savedBusinessPlans.map((plan) =>
            <Grid.Row key={plan.id} columns={2}>
                <Grid.Column key={plan.id} floated='left'>
                    <label>{plan.title}</label>
                </Grid.Column>
                <Grid.Column floated='right'>
                    <Button icon onClick={() => this.onPlanDelete(plan.id)}>
                        <Icon disabled name='delete' />
                    </Button>
                    <Button icon onClick={() => this.onPlanEdit(plan.id)}>
                        <Icon disabled name='edit' />
                    </Button>
                </Grid.Column>
            </Grid.Row>
        );
        console.log(this.props.savedBusinessPlans);


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
                        {savedBusinessPlans}
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
        removedBusinessPlan: state.removedBusinessPlan,
    };
}

export default connect(mapStateToProps, { getPlans, removePlan })(BusinessPlansList);