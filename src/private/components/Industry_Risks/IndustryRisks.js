import React, { Component } from 'react'
import { Table, Typography, Tag } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../../../css/IndustryRisks.css'
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
                    console.log(this.state.riskscol)
                    this.filterriskMacro();
                    //console.log(JSON.stringify(this.props.industryRisk.risks))
                    console.log('master ' + this.props.industryRisk.activeKey)
                    console.log('master ' + this.props.businessPlan.id)
                })

            }
        } else {
            this.props.getSelectedPlanActiveKey(this.props.businessPlan.id, () => {
                this.props.getRisks(this.props.industryRisk.activeKey, () => {
                    this.setState({
                        riskscol: this.props.industryRisk.risks.risks
                    })
                    console.log(this.state.riskscol)

                    //console.log(JSON.stringify(this.props.industryRisk.risks))
                    console.log('master ' + this.props.industryRisk.activeKey)
                    console.log('master ' + this.props.businessPlan.id)
                })
            })



        }
    }


    filterriskMacro = () => {
        const macros = this.state.riskscol.filter((x, index) => x.category === 'MACRO')
        macros.map((element1, index = 1) => {

            element1.key = index++;
            //console.log(JSON.stringify(element1))
            return element1;

        })
        //console.log(JSON.stringify(macros));
        return macros
    }

    filterriskIndustry = () => {
        const industry = this.state.riskscol.filter((x, index) => x.category === 'INDUSTRY')
        industry.map((element1, index = 1) => {

            element1.key = index++;
            //console.log(JSON.stringify(element1))
            return element1;

        })
        //console.log(JSON.stringify(industry));
        return industry
    }

    filterriskCompany = () => {
        const company = this.state.riskscol.filter((x, index) => x.category === 'COMPANY')
        company.map((element1, index = 1) => {

            element1.key = index++;
            //console.log(JSON.stringify(element1))
            return element1;

        })
        //console.log(JSON.stringify(company));
        return company
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
                                <span className='medium'>Medium high</span> :
                                record.likelihood === 1 && record.severity === 2 ?
                                    <span className='low'>Low medium</span> :
                                    record.likelihood && record.severity === 2 ?
                                        <span className='medium'>Midem</span> :
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
                    title={() => 'Macro'}
                    columns={columns}
                    expandable={{
                        expandedRowRender: record => <p style={{ margin: 0 }}>{record.comments}</p>,
                        rowExpandable: record => record.name !== 'Not Expandable',
                    }}
                    dataSource={this.filterriskMacro()}
                    pagination={false}
                />

                <Table
                    style={{ marginTop: '25px' }}
                    title={() => 'Industry'}
                    columns={columns}
                    expandable={{
                        expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                        rowExpandable: record => record.name !== 'Not Expandable',
                    }}
                    dataSource={this.filterriskIndustry()}
                    pagination={false}
                />
                <Table
                    style={{ marginTop: '25px' }}
                    title={() => 'Company'}
                    columns={columns}
                    expandable={{
                        expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                        rowExpandable: record => record.name !== 'Not Expandable',
                    }}
                    dataSource={this.filterriskCompany()}
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