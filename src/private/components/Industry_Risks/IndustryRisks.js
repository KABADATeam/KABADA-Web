import React, { Component } from 'react'
import { Table, Typography, Tag, Alert } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../../../css/IndustryRisks.css';
import { InfoCircleFilled } from '@ant-design/icons';
import { getRisks, getSelectedPlanActiveKey } from '../../../appStore/actions/industryRiskAction';
import { getSelectedPlanDetails } from '../../../appStore/actions/planActions';
import TooltipComponent from '../Tooltip';



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
                width: '58%',
                render: (text, record, index) => (
                    <>
                    <Text>{record.type}</Text>
                    {
                        record.key === 0 && record.type === 'Political and legal' ? <TooltipComponent code='ovirm2' type='text'/>
                        : record.key === 1 && record.type === 'Economic' ? <TooltipComponent code='ovirm3' type='text'/>
                        : record.key === 2 && record.type === 'Social' ? <TooltipComponent code='ovirm4' type='text'/>
                        : record.key === 3 && record.type === 'Technological' ? <TooltipComponent code='ovirm5' type='text'/>
                        : record.key === 4 && record.type === 'Environmental' ? <TooltipComponent code='ovirm6' type='text'/>
                        : record.key === 0 && record.type === 'Existing competition' ? <TooltipComponent code='oviri2' type='text'/>
                        : record.key === 1 && record.type === 'Potential competition' ? <TooltipComponent code='oviri3' type='text'/>
                        : record.key === 2 && record.type === 'Substitution possibilities' ? <TooltipComponent code='oviri4' type='text'/>
                        : record.key === 3 && record.type === 'Power of suppliers' ? <TooltipComponent code='oviri5' type='text'/>
                        : record.key === 4 && record.type === 'Power of buyers' ? <TooltipComponent code='oviri6' type='text'/>
                        : record.key === 0 && record.type === 'Resources: Human' ? <TooltipComponent code='ovirc2' type='text'/>
                        : record.key === 1 && record.type === 'Resources: Tangible' ? <TooltipComponent code='ovirc3' type='text'/>
                        : record.key === 2 && record.type === 'Processes' ? <TooltipComponent code='ovirc4' type='text'/>
                        : <></>
                    }
                    </>   
                )
            },
            {
                title: 'Likelihood',
                dataIndex: 'likelihood',
                key: 'likelihood',
                width: '14%',
                render: (text, record, index) =>
                    <Text> {record.likelihood === 1 ? 'Low' : record.likelihood === 2 ? 'Medium' : record.likelihood === 3 && 'High'}</Text>
            },
            {
                title: 'Severity',
                dataIndex: 'severity',
                key: 'severity',
                width: '12.3%',
                render: (text, record, index) =>
                    <Text> {record.severity === 1 ? 'Low' : record.severity === 2 ? 'Medium' : record.severity === 3 && 'High'}</Text>

            },
            {
                title: 'Total',
                dataIndex: 'total',
                key: 'total',
                width: '15.7%',
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
                            <span>Macro</span><TooltipComponent code='ovirm1' type='text'/>
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
                            <span>Industry</span><TooltipComponent code='oviri1' type='text'/>
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
                            <span>Company</span><TooltipComponent code='ovirc1' type='text'/>
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