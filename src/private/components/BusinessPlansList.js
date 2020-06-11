import React from 'react';
import { Grid, Button, Icon, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class BusinessPlansList extends React.Component {
    render() {
        return (
            <div style={{ textAlign: "center"}}>
                <div style={{ width: "70%", margin: "0 auto", textAlign: "left" }}>
                    <div style={{ width: "100%", margin: "0 auto", textAlign: "center" }}>
                        <h2>My Business Plans</h2>
                    </div>
                    <Grid style={{ marginTop: "3vh"}}>
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
                                There are no items to display here, yet.
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
        language: state.language
    };
}

export default connect(mapStateToProps, null)(BusinessPlansList);