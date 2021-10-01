import React, { Component } from 'react';
import { Card, Typography, List, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { getSelectedPlan } from "../../appStore/actions/planActions";
import PlanStatusTag from "./PlanStatusTag";
import { withRouter } from 'react-router-dom';

const { Text } = Typography;
const { Meta } = Card;

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
            const sharedPlans = this.props.personalPlans.filter(item => item.sharedWithMe === true);
            return sharedPlans
        } else
            return this.props.personalPlans
    }

    onClick(plan) {
        this.props.getSelectedPlan(plan);
        localStorage.setItem("plan", plan.id);
        this.props.history.push(`/overview`);
    }

    render() {
        const { tabKey } = this.props;
        const dataSource = (
            this.filterFunction(tabKey)
        )

        return (
            <>
                <List
                    grid={{ gutter: 16 }}
                    dataSource={dataSource}
                    renderItem={item => (
                        <List.Item onClick={this.onClick.bind(this, item)} style={{ cursor: 'pointer' }}>
                            <Card
                                style={{
                                    width: '282px', height: '236px', borderRadius: '8px', backgroundColor: '#FFFFFF',
                                    backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 252, 0) 64.5%, rgba(255, 255, 255, 1) 35.5%), ' + (item.coverImage ? `url(${item.coverImage})` : `url(businessPlan.webp)`),
                                    objectFit: 'cover', backgroundSize: '100% auto', backgroundRepeat: 'no-repeat'
                                }}
                            >
                                <Row>
                                    <PlanStatusTag planStatusValue={item.percentage} />
                                </Row>
                                <Row style={{ marginTop: 131 }}>
                                    <Text ellipsis={true} style={{ ...planTitleTextStyle }}>{item.name}</Text>
                                </Row>
                                <Row>
                                    <Text style={{ ...dateTextStyle }}>{(new Date(item.dateCreated)).toLocaleDateString('lt-lt')} {item.planType}</Text>
                                </Row>
                            </Card>
                        </List.Item>
                    )
                    }
                />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        personalPlans: state.personalBusinessPlans
    };
}

export default connect(mapStateToProps, { getSelectedPlan })(withRouter(PlanElementComponent));
