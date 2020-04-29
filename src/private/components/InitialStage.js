import React, {Component} from 'react';
import {Grid, GridColumn, Form, Dropdown} from 'semantic-ui-react';

const JSON = [
    {key: 1, value: 'Arvydas Sabonis', text: 'Arvydas Sabonis'},
    {key: 2, value: 'Domantas Sabonis', text: 'Domantas Sabonis'},
    {key: 3, value: 'Jonas Valanciunas', text: 'Jonas Valanciunas'},
    {key: 4, value: 'Saras', text: 'Saras'}
]
class InitialStage extends Component {
    render()
        {
            return(
                <Grid divide='vertically'>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <Form>
                                <Form.Field>
                                    <label>Name of Business Plan</label>
                                    <input placeholder='Name of Business Plan'/>
                                </Form.Field>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row columns={3}>
                        <Grid.Column>
                            <label>Select Industry</label>
                            <Dropdown
                                placeholder='Select Industry '
                                fluid
                                search
                                selection
                                options={JSON}
                            />
                            <label>Select NACE clasification</label>
                            <Dropdown
                                placeholder='Select NACE clasification'
                                fluid
                                search
                                selection
                                options={JSON}
                            />
                            <label>Select country</label>
                            <Dropdown
                                placeholder='Country '
                                fluid
                                search
                                selection
                                options={JSON}
                            />
                        </Grid.Column>
                        <GridColumn>
                            <div>Zemelapis</div>
                        </GridColumn>
                    </Grid.Row>

                </Grid>
            )
        }
}


export default InitialStage;