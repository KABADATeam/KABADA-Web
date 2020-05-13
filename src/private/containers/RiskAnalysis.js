import React from 'react';
import {Grid, Form, Label } from 'semantic-ui-react';
import Chart from '../components/Chart';

const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2000 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2000 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2000 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2000 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2000 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2000 }
  ];

class RiskAnalysis extends React.Component {
    render() {
        return (
            <div style={{ textAlign: "center"}}>
                <div style={{ width: "70%", margin: "0 auto", textAlign: "left" }}>
                    <div style={{ width: "100%", margin: "0 auto", textAlign: "center" }}>
                        <h2>Risk analysis</h2>
                    </div>
                    <Grid style={{ marginTop: "3vh"}}>
                        <Grid.Row columns={2}>
                            <Grid.Column width={8}>
                                <Form textAlign="left">
                                    <Label>Tekstas {this.props.activities}</Label>
                                </Form>
                            </Grid.Column>
                            <Grid.Column width={8} style={{ overflow: "hidden" }}>
                                <Chart data={data}/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>     
                </div>
            </div>
        )
    }
}

export default RiskAnalysis;