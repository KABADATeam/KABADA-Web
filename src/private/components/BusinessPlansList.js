import React from 'react';
import { Grid, Button, Icon, Divider, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPlans } from "../../appStore/actions/planActions";

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

    render() {

        //const { plans } = this.state;
        if (this.props.savedBusinessPlans === undefined) {
            console.log("nėra planų");
        } else {
            console.log("yra planų");
            console.log(this.props.savedBusinessPlans);

        }
        const savedBusinessPlans = this.props.savedBusinessPlans.map(({ id, title }) => ({ key: id, value: id, text: title }));
        // const savedBusinessPlans = this.props.savedBusinessPlans;
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
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <Dropdown
                                    placeholder='Select Saved Business Plan'
                                    fluid
                                    search
                                    selection
                                    options={savedBusinessPlans}
                                //onChange={this.onBusinessPlanChanged}
                                />
                                {/*There are no items to display here, yet.*/}

                            </Grid.Column>
                        </Grid.Row>
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
    };
}

export default connect(mapStateToProps, { getPlans })(BusinessPlansList);