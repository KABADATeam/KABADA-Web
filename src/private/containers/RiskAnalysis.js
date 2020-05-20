import React from 'react';
import {Grid, Form, Button } from 'semantic-ui-react';
import Chart from '../components/Chart';
import {getEurostatData} from '../../appStore/actions/eurostat/eurostatAction'
import { connect } from 'react-redux';

/*const data = [
    { name: 'Page A', uv: 4000  },
    { name: 'Page B', uv: 3000 },
    { name: 'Page C', uv: 2000 },
    { name: 'Page D', uv: 2780 },
    { name: 'Page E', uv: 1890 },
    { name: 'Page F', uv: 2390 },
    { name: 'Page G', uv: 3490 }
  ];*/


class RiskAnalysis extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount() {  
        this.props.getEurostatData();      
    }
    showeurostatData(){
        const valuesObj = JSON.parse(JSON.stringify(this.props.eurostatData)).value
        const yearObj = JSON.parse(JSON.stringify(this.props.eurostatData)).dimension.time.category.label
        const newData = []

        for (const property in valuesObj){
            newData.push({ name: '', uv: valuesObj[property]})
        }
        var i = 0
        for (const property in yearObj){
            newData[i].name = yearObj[property]
            i++
        }
        this.setState({
            data: newData
        })

        /*
        for (const label in  testJsonParse1){
            this.setState({
                name: [...this.state.name, testJsonParse1[label]]
            })
            console.log(testJsonParse1[label])
        }

        for (const prop in testJsonParse){
            testJsonParse.prop = testJsonParse[prop];
            console.log(testJsonParse.prop)
        }*/ 
        /*for (const label in testJsonParse1){
            this.setState(prevState => ({
                data: {name:[...prevState.name, testJsonParse1[label]], uv: null}
            })
            )
            console.log(testJsonParse[label])
        }
        for (const prop in testJsonParse){
            this.setState(prevState => ({
                data: {name: this.state.name, uv:[...prevState.uv, testJsonParse[prop]]}
            })
            )
            console.log(testJsonParse[prop])
        }*/
        /*this.setState({
            data: {name: {...this.setState.name, testJsonParse1}, uv: {...this.setState.uv, testJsonParse}}
        })*/
        /*this.setState({
            name: JSON.parse(JSON.stringify(this.props.eurostatData)).dimension.time.category.label,
            uv: JSON.parse(JSON.stringify(this.props.eurostatData)).value
        })*/
    }
    checkJsonParse(){
        console.log(this.state.data)
    }
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
                                    <Button onClick={this.showeurostatData.bind(this)}>Test</Button><br/>
                                    <Button onClick={this.checkJsonParse.bind(this)}>Check state</Button>
                                </Form>
                            </Grid.Column>
                            <Grid.Column width={8} style={{ overflow: "hidden" }}>
                                <Chart data={this.state.data}/>
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
        eurostatData: state.eurostatData,
    };
}

export default connect(mapStateToProps, { getEurostatData })(RiskAnalysis);