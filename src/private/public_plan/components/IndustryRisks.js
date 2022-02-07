import React, { PureComponent } from 'react'
import { Table, Typography, Tag, Alert } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../../../css/IndustryRisks.css';
import { InfoCircleFilled } from '@ant-design/icons';
import TooltipComponent from '../../components/Tooltip';



const { Text } = Typography;



class IndustryRisks extends PureComponent {


    filterRisks = (type, data) => {
        if (data === null) {
            return;
        } else {
            const riskGroup = data.filter((x, index) => x.category === type);
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
            <>
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
                    dataSource={this.filterRisks('MACRO', this.props.industryRisk.risks.risks)}
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
                    dataSource={this.filterRisks('INDUSTRY', this.props.industryRisk.risks.risks)}
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
                    dataSource={this.filterRisks('COMPANY', this.props.industryRisk.risks.risks)}
                    pagination={false}
                />

            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
        industryRisk: state.industryRisk,
    };
}
export default connect(mapStateToProps, { })(withRouter(IndustryRisks))