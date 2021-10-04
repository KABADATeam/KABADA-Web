import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle } from '../../../styles/customStyles';
import { Form, Select, InputNumber, Popconfirm, Input, Divider, Button, Breadcrumb, Row, Col, Typography, Switch, Card, Table, Space, Tooltip } from 'antd';
import VariableCostTable from './VariableCostTable';

const { Option } = Select;
const { Text } = Typography;


const aboutTitleTextStyle = {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '20px',
    marginBottom: '16px',
}

const textStyle = {
    fontSize: '14px',
    color: '#8C8C8C',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: '22px',
    marginRight: '40px',
}

class VariableCosts extends React.Component {
    render() {
        return (
            <>
                {/* looping through array of variable costs */}
                {this.props.financialProjections.variable.map((obj, index) => {
                    return (
                        <div style={{marginBottom: 24}}>
                        <Col span={24}>
                            <Row>
                                <Col span={7}>
                                    {index === 0 ?
                                        <div style={{ marginRight: '40px' }}>
                                            <Typography.Title style={{ ...aboutTitleTextStyle }}>Variable Costs</Typography.Title>
                                            <Typography.Text style={{ ...textStyle }}>
                                                Please indicate the amount of fixed and variable costs (all shown cost are based on pre-filled information in canvas)A60
                                            </Typography.Text>
                                        </div> : <div></div>}
                                </Col>
                                {/* returns second column with table */}
                                <VariableCostTable data={obj.types} countryVats={this.props.countryVats} category_title={obj.category_title} category_id={obj.category_id}/>

                            </Row>
                        </Col>
                        </div>)
                })}

            </>
        )
    }
}

export default VariableCosts
