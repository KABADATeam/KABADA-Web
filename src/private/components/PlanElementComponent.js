import React, { Component } from 'react';
import { Card, Typography, List, Row } from 'antd';
import { connect } from 'react-redux';
import { getPlans, getSelectedPlan } from "../../appStore/actions/planActions";
import PlanStatusTag from "./PlanStatusTag";

const {Text} = Typography;

const planTitleTextStyle = {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 16,
}
const dateTextStyle = {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    color: '#8C8C8C',
}

class PlanElementComponent extends Component {

    componentDidMount() {
        this.props.getPlans();  
    }

    filterFunction = (tabKey) => {
        if (tabKey === "1") {
            return this.props.personalPlans
        } else if (tabKey === "2") {
            const inProgressPlans = this.props.personalPlans.filter(item => item.percentage < 100);
            return inProgressPlans
        } else if (tabKey === "3") {
            const completedPlans = this.props.personalPlans.filter(item => item.percentage === 100);
            return completedPlans
        } else if (tabKey === "4") {
            const sharedPlans = this.props.personalPlans.filter(item => item.shareWithMe === true);
            return sharedPlans
        } else
            return this.props.personalPlans
    }

    onClick(plan) {
        this.props.getSelectedPlan(plan);
    }

    render () {
        const {tabKey} = this.props;
        const dataSource = (
            this.filterFunction(tabKey)
        )

        return ( 
            <>
            <List
                grid={{ gutter: 16}}
                dataSource={dataSource}
                renderItem={item => (
                    <List.Item onClick={() => this.onClick(item)}>
                        <Card style={{width: '282px', height: '236px', borderRadius: '8px', backgroundColor: '#FFFFFF',
                             backgroundImage: item.planImage === null? `url(businessPlan.webp)` : `url(${item.img})`,
                             backgroundSize:'282px 152px', backgroundRepeat: "no-repeat" 
                        }}>
                        <Row>
                            <PlanStatusTag planStatusValue={item.percentage}/>
                        </Row>
                        <Row style={{marginTop: 131}}>
                            <Text style={{...planTitleTextStyle}}>{item.name}</Text>
                        </Row>
                        <Row>
                            <Text style={{...dateTextStyle}}>{(new Date(item.dateCreated)).toLocaleDateString('lt-lt')} {item.planType}</Text>
                        </Row>                                                            
                        </Card>
                    </List.Item>
                )}
            />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        personalPlans: state.personalBusinessPlans
    };
}

export default connect(mapStateToProps, { getPlans, getSelectedPlan })(PlanElementComponent);
