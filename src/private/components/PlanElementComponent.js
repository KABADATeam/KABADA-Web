import React, { Component } from 'react';
import {Card, Typography, List, Row} from 'antd';
import { connect } from 'react-redux';
import { getAllPublicPlansForFilter, getAllPublicPlans } from "../../appStore/actions/planActions";
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
        //this.props.getAllPublicPlans();
        this.props.getAllPublicPlansForFilter(this.props.tabKey)  
    }
    render () {
        const {tabKey} = this.props;
        
        /*const showedPlans = () => {
            if (tabKey === "1") {
                console.log("komponente " + this.props.publicPlansJZ.allPlanList)
                return this.props.publicPlansJZ.allPlanList
            } else if (tabKey === "2") {
                return this.props.publicPlansJZ.completedPlanList
            } else if (tabKey === "3") {
                return this.props.publicPlansJZ.inProgressPlanList
            } else {
                return this.props.publicPlansJZ.sharedPlanList
            }
        }*/
        return ( 
            <>
            <List
                grid={{ gutter: 16}}
                dataSource={this.props.publicPlansForFilter}
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
        publicPlansForFilter: state.publicPlansForFilter,
    };
}

export default connect(mapStateToProps, { getAllPublicPlansForFilter, getAllPublicPlans })(PlanElementComponent);