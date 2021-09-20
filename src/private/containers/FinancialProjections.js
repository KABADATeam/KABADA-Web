import React from 'react';
import { useContext, useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import { Select,InputNumber,Form, Popconfirm,Input,Divider, Button, Breadcrumb, Row, Col, Typography, Switch, Card, Table, Space } from 'antd';
import { ArrowLeftOutlined, PlusOutlined, DeleteOutlined, InfoCircleFilled } from '@ant-design/icons';
import { buttonStyle, leftButtonStyle, rightButtonStyle, tableCardStyle, tableCardBodyStyle } from '../../styles/customStyles';

const { Option } = Select;
const { Text } = Typography;
// interface IMyTableData {
//     id: String;
//     name: String;
//     price: Number;
//     vat: Number;
//     expensesDuration: String;
// }

const titleTextStyle = {
    fontStyle: "normal",
    fontWeight:"600",
    fontSize: '20px',
    lineHeight: "38px"
}

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

const titleButtonStyle = {
    width: "40px",
    height: "40px",
    border: "1px solid #BFBFBF",
    boxSizing: "border-box",
    filter: "drop-shadow(0px 1px 0px rgba(0, 0, 0, 0.05))",
    borderRadius: "4px",
    backgroundColor: "transparent",
}

const rentOfBuildingsDataSource = [
  {
    id: "1",
    name: "Manufacturing buildings",
    price: 0,
    vat: 21,
    firstExpenses: "1st mo."
  },
  {
    id: "2",
    name: "Office",
    price: 24,
    vat: 21,
    firstExpenses: "1st mo."
  }
]

const variableCostsDataSource = [
  {
    id: "1",
    name: "Electricity",
    price: 0,
    vat: 21,
    firstExpenses: "1st mo."
  },
]
 
function FinancialProjections(props) {
  const [rentOfBuildingsTableData, setRentOfBuildingsTableData] = useState(rentOfBuildingsDataSource);
  const history = useHistory();
  
  useEffect(() =>{
    // Set totals on initial render
    const newData = [...rentOfBuildingsTableData];

  },[]);

  const onBackClick = () => {
    history.push(`/overview`);
  };

  const onInputChange = (key, index) => (
    event
  ) => {
    const newData = [...rentOfBuildingsTableData];
    newData[index][key] = Number(event.target.value);
    setRentOfBuildingsTableData(newData);
  };

  // const onConfirm = () => {
  //   console.log(tableData);
  // };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '55%',
    },
    {
      title: 'Price (€/mo.)',
      dataIndex: 'price',
      width: '20%',
      render: (text, record, index) => (
        <Input value={text} onChange={onInputChange("price", index)}/>
      )
    },
    {
      title: 'VAT Rate',
      dataIndex: 'vat',
      width: '10%',
      render: (text, record, index) => (
        <Input.Group compact>
          <Select defaultValue={text+"%"}>
            <Option value={text}>{text+"%"}</Option>
            <Option value={20}>{20+"%"}</Option>
            <Option value={10}>{10+"%"}</Option>
          </Select>
        </Input.Group>
      )
    },
    {
      title: 'First expenses',
      dataIndex: 'firstExpenses',
      width: '15%',
      render: (text, record, index) => (
        <Input.Group compact>
          <Select defaultValue={text}>
            <Option value={text}>{text}</Option>
            <Option value={"2nd mo."}>{"2nd mo."}</Option>
            <Option value={"3rd mo."}>{"3rd mo."}</Option>
          </Select>
        </Input.Group>
      )
    },
  ];

  return (
    <>
            <Col span={16} offset={4}>
                <Breadcrumb style={{ marginTop: "40px" }}>
                    <Breadcrumb.Item style={{ marginTop: "40px" }}>
                        <Space><Link to = '/personal-business-plans'>My Business plans</Link></Space>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item style={{ marginTop: "40px" }}>
                        <Space><Link to='/overview'>Lbas</Link></Space>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Space>Financial projections</Space>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Col>
            <Row align="middle" styke={{marginTop: "9px"}}>
                <Col span={12} offset={4}>
                    <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                        <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => onBackClick()}></Button>
                        <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Fixed and Variables Costs</Text>
                        <InfoCircleFilled style={{ fontSize: '21px', color: '#BFBFBF', marginLeft: '17px' }} />
                    </div>
                </Col>
                <Col span={4}>
                        <div style={{ float: 'right', display: 'inline-flex', alignItems: 'center' }}>
                            <Text style={{ fontSize: '14px', color: '##262626', marginLeft: '10px', marginRight: '10px' }}>Mark as completed: </Text><Switch checked={false} />
                        </div>
                    </Col>
            </Row>

            <Col span={16} offset={4}>
                <Divider/>
            </Col>
            <Col offset={4} span={16}>
                <Row style={{marginBottom: "50px"}}>
                    <Col span={7}>
                        <div style={{marginRight: '40px'}}>
                            <Typography.Title style={{...aboutTitleTextStyle}}>Fixed Costs</Typography.Title>
                            <Typography.Text style={{...textStyle}}>
                                Please indicate the amount of fixed and variable costs (all shown cost are based on pre-filled information in canvas)A60
                            </Typography.Text>
                        </div>
                    </Col>
                    <Col span={17}>
                        <Card size={'small'} style={{...tableCardStyle}} bodyStyle={{...tableCardBodyStyle}}>
                        <Table
                          rowKey="id"
                          columns={columns}
                          dataSource={rentOfBuildingsTableData}
                          pagination={false}
                        />
                        </Card>
                    </Col>
                </Row>
                <Divider/>
                <Row style={{marginBottom: "50px"}}>
                    <Col span={7}>
                        <div style={{marginRight: '40px'}}>
                            <Typography.Title style={{...aboutTitleTextStyle}}>Variable Costs</Typography.Title>
                            <Typography.Text style={{...textStyle}}>
                                Please indicate the amount of fixed and variable costs (all shown cost are based on pre-filled information in canvas)A60
                            </Typography.Text>
                        </div>
                    </Col>
                    <Col span={17}>
                        <Card size={'small'} style={{...tableCardStyle}} bodyStyle={{...tableCardBodyStyle}}>
                        <Table
                          rowKey="id"
                          columns={columns}
                          dataSource={rentOfBuildingsTableData}
                          pagination={false}
                        />
                        </Card>
                    </Col>
                </Row>

            </Col>
        </>
    )
}

export default FinancialProjections
