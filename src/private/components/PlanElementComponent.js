import React, { Component } from 'react';
import {Card, Typography, List, Row} from 'antd';
import { connect } from 'react-redux';
import { getAllPublicPlans } from "../../appStore/actions/planActions";
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
        this.props.getAllPublicPlans();  
    }
    filterFunction = (tabKey) => {
        if (tabKey === "1") {
            return this.props.publicPlans
        } else if (tabKey === "2") {
            const inProgressPlans = this.props.publicPlans.filter(item => item.completed < 100);
            return inProgressPlans
        } else if (tabKey === "3") {
            const completedPlans = this.props.publicPlans.filter(item => item.completed === 100);
            return completedPlans
        } else if (tabKey === "4") {
            const sharedPlans = []
            return sharedPlans
        } else
            return this.props.publicPlans
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
                    <List.Item>
                        <Card style={{width: '282px', height: '236px', borderRadius: '8px', backgroundColor: '#FFFFFF',
                             backgroundImage: `url(${item.img})`,
                             backgroundSize:'282px 152px', backgroundRepeat: "no-repeat" 
                        }}>
                        <Row>
                            <PlanStatusTag planStatusValue={item.completed}/>
                        </Row>
                        <Row style={{marginTop: 131}}>
                            <Text style={{...planTitleTextStyle}}>{item.name}</Text>
                        </Row>
                        <Row>
                            <Text style={{...dateTextStyle}}>{item.dateCreated} {item.planType}</Text>
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
        error: state.error,
        message: state.message,
        publicPlans: state.publicPlans,
    };
}

export default connect(mapStateToProps, { getAllPublicPlans })(PlanElementComponent);