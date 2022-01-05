import React, { Component } from 'react'
import { Table, Typography, Tag, Alert } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../../../css/IndustryRisks.css';
import { InfoCircleFilled } from '@ant-design/icons';
import { getRisks, getSelectedPlanActiveKey } from '../../../appStore/actions/industryRiskAction'
import { getSelectedPlanDetails } from '../../../appStore/actions/planActions'



const { Text } = Typography;



class IndustryRisks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            riskscol: [],
            macro: []
        }
    }


    componentDidMount() {
        if (this.props.businessPlan.id === null) {
            if (localStorage.getItem("plan") === undefined || localStorage.getItem("plan") === null) {
                this.props.history.push(`/`);
            } else {
                this.props.getSelectedPlanActiveKey(this.props.businessPlan.id)
                this.props.getRisks(this.props.industryRisk.activeKey, () => {
                    this.setState({
                        riskscol: this.props.industryRisk.risks.risks
                    })
                    this.filterriskMacro();
                })

            }
        } else {
            this.props.getSelectedPlanActiveKey(this.props.businessPlan.id, () => {
                this.props.getRisks(this.props.industryRisk.activeKey, () => {
                    this.setState({
                        riskscol: this.props.industryRisk.risks.risks
                    })
                })
            })



        }
    }

    filterRisks = (type) => {
        if (this.state.riskscol === null) {
            return;
        } else {
            const riskGroup = this.state.riskscol.filter((x, index) => x.category === type)
            riskGroup.map((element1, index = 1) => {

                element1.key = index++;

                return element1;
            })
            return riskGroup
        }
    }
    render() {

        const columns = [
            {
                title: 'Risk',
                dataIndex: 'risk',
                key: 'risk',
                render: (text, record, index) =>
                    <Text> {record.type}</Text>

            },
            {
                title: 'Likelihood',
                dataIndex: 'likelihood',
                key: 'likelihood',
                width: '15%',
                render: (text, record, index) =>
                    <Text> {record.likelihood === 1 ? 'Low' : record.likelihood === 2 ? 'Medium' : record.likelihood === 3 && 'High'}</Text>
            },
            {
                title: 'Severity',
                dataIndex: 'severity',
                key: 'severity',
                width: '5%',
                render: (text, record, index) =>
                    <Text> {record.severity === 1 ? 'Low' : record.severity === 2 ? 'Medium' : record.severity === 3 && 'High'}</Text>

            },
            {
                title: 'Total',
                dataIndex: 'total',
                key: 'total',
                width: '5%',
                render: (text, record, index) => (

                    <Tag style={{ border: 'none', background: 'none' }} >

                        {record.likelihood === 3 && record.severity === 2 ?
                            <span className='high'>High medium</span> :
                            record.likelihood === 2 && record.severity === 3 ?
                                <span className='high'>Medium high</span> :
                                record.likelihood === 1 && record.severity === 2 ?
                                    <span className='low'>Low medium</span> :
                                    record.likelihood && record.severity === 2 ?
                                        <span className='medium'>medium</span> :
                                        record.likelihood && record.severity === 1 ?
                                            <span className='low'>Low</span> :
                                            <span className='high'>High</span>
                        }
                    </Tag >

                ),

            }

        ];


        return (
            <div>

                <Table
                    title={() => (

                        <>
                            <span>Macro</span> <InfoCircleFilled style={{ color: '#BFBFBF' }} />

                        </>
                    )
                    }
                    columns={columns}
                    expandable={{
                        expandedRowRender: record => (
                            <>
                                <p style={{ margin: 0 }}>{record.comments}</p>
                                <Alert message={"Possible country-specific deviations: " + record.countryDeviationScore + ' - ' + record.countryDeviationComment} type="info" showIcon />
                            </>
                        ),
                        rowExpandable: record => record.name !== 'Not Expandable',
                    }}
                    dataSource={this.filterRisks('MACRO')}
                    pagination={false}
                />

                <Table
                    style={{ marginTop: '25px' }}
                    title={() => (
                        <>
                            <span>Industry</span> <InfoCircleFilled style={{ color: '#BFBFBF' }} />
                        </>
                    )}
                    columns={columns}
                    expandable={{
                        expandedRowRender: record => (
                            <>
                                <p style={{ margin: 0 }}>{record.comments}</p>
                                <Alert message={"Possible country-specific deviations: " + record.countryDeviationScore + ' - ' + record.countryDeviationComment} type="info" showIcon />
                            </>
                        ),
                        rowExpandable: record => record.name !== 'Not Expandable',
                    }}
                    dataSource={this.filterRisks('INDUSTRY')}
                    pagination={false}
                />
                <Table
                    style={{ marginTop: '25px' }}
                    title={() => (
                        <>
                            <span>Company</span> <InfoCircleFilled style={{ color: '#BFBFBF' }} />
                        </>
                    )}
                    columns={columns}
                    expandable={{
                        expandedRowRender: record => (
                            <>
                                <p style={{ margin: 0 }}>{record.comments}</p>
                                <Alert message={"Possible country-specific deviations: " + record.countryDeviationScore + ' - ' + record.countryDeviationComment} type="info" showIcon />
                            </>
                        ),
                        rowExpandable: record => record.name !== 'Not Expandable',
                    }}
                    dataSource={this.filterRisks('COMPANY')}
                    pagination={false}
                />

            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
        industryRisk: state.industryRisk,
    };
}
export default connect(mapStateToProps, { getRisks, getSelectedPlanDetails, getSelectedPlanActiveKey })(withRouter(IndustryRisks))