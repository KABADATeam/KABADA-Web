import React, { Component } from 'react';
import { Card, Typography, List, Row, Col } from 'antd';
import { getSurvivalRate } from '../../../appStore/actions/eurostat/eurostatSurvivalRateAction'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
const { Text } = Typography;

class IndustryDataComponent extends Component {
    componentDidMount() {
        this.props.getSurvivalRate();
    }
    render() {
        console.log(this.props.survival);
        return (
            <>
                <div>
                    <Text> Industry data</Text>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        personalPlans: state.personalBusinessPlans,
        survival: state.survivalRate
    };
}

export default connect(mapStateToProps, {getSurvivalRate})(withRouter(IndustryDataComponent));
