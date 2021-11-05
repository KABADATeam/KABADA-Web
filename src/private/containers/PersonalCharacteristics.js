import React from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Form, Select, InputNumber, Input, Divider, Button, Breadcrumb, Row, Col, Typography, Radio, Switch, Card, Table, Space, Tooltip, Tabs } from 'antd';
import { ArrowLeftOutlined, InfoCircleFilled } from '@ant-design/icons';
// import { tableCardStyle, tableCardBodyStyle } from '../../styles/customStyles';
import UnsavedChangesHeader from '../components/UnsavedChangesHeader'
import { refreshPlan } from "../../appStore/actions/refreshAction";
import { getSelectedPlanOverview } from "../../appStore/actions/planActions";


const { Option } = Select;
const { Text } = Typography;
const { TabPane } = Tabs;

const aboutTitleTextStyle = {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
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


const titleTextStyle = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: '20px',
    lineHeight: "38px"
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

const tableCardStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(0, 0, 0, 0.04)',
    borderRadius: '8px',
};

const tableCardBodyStyle = {
    width: '100%',
    padding: '15px 15px 15px 15px',
};

const tableTitleStyle = {
    fontSize: "16px",
    fontWeight: "600",
    color: "#262626"
};

const questions = [
    {
        questionText: 'Choose your age group',
        set_code: 1,
        answerOptions: [
            { answerText: 'Under 18', selection_code: 12 },
            { answerText: '18-24', selection_code: 13 },
            { answerText: '35-44', selection_code: 14 },
            { answerText: '45-54', selection_code: 15 },
            { answerText: '55-64', selection_code: 16 },
            { answerText: '65 or over', selection_code: 17 },
        ],
    },
    {
        questionText: 'Your gender',
        set_code: 2,
        answerOptions: [
            { answerText: 'female', selection_code: 22 },
            { answerText: 'male', selection_code: 23 },
            { answerText: 'prefer no to answer', selection_code: 24 },
        ],
    },
    {
        questionText: 'You country of origin',
        set_code: 3,
        answerOptions: [
            { answerText: 'Latvia', selection_code: 32 },
            { answerText: 'Lithuania', selection_code: 33 },
        ],
    },
    {
        questionText: 'Your education',
        set_code: 4,
        answerOptions: [
            { answerText: 'graduate (bachelor or higher)', selection_code: 42 },
            { answerText: 'non-graduate', selection_code: 43 },
        ],
    },
    {
        questionText: 'Reasons for starting business?',
        set_code: 5,
        answerOptions: [
            { answerText: 'autonomy and independence', selection_code: 52 },
            { answerText: 'Cum sociis notoque penatibus et magnis dis parturient montes,', selection_code: 53 },
            { answerText: 'Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim', selection_code: 54 },
            { answerText: 'Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.', selection_code: 55 },
            { answerText: 'Maecenas tempus, tellus eget condimentum rhoncus', selection_code: 56 },
        ],
    },
    {
        questionText: 'Please, asses your skills in management',
        set_code: 6,
        answerOptions: [
            { answerText: '1', selection_code: 62 },
            { answerText: '2', selection_code: 63 },
            { answerText: '3', selection_code: 64 },
            { answerText: '4', selection_code: 65 },
            { answerText: '5', selection_code: 66 },
        ],
    },
    {
        questionText: 'Please, asses your skills in finance',
        set_code: 7,
        answerOptions: [
            { answerText: '1', selection_code: 72 },
            { answerText: '2', selection_code: 73 },
            { answerText: '3', selection_code: 74 },
            { answerText: '4', selection_code: 75 },
            { answerText: '5', selection_code: 76 },
        ],
    },
    {
        questionText: 'Are you ready to lose your savings?',
        set_code: 8,
        answerOptions: [
            { answerText: 'Yes', selection_code: 82 },
            { answerText: 'Not Sure', selection_code: 83 },
            { answerText: 'No', selection_code: 84 },
        ],
    }
]


class PersonalCharacteristics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            visibleHeader: 'hidden'
        }
    }
    onBackClick = () => {
        this.props.history.push('/overview')
    }

    onChange = (e) => {
        console.log('radio checked', e.target.value);

      };
    
    componentDidMount() {
        if (this.props.businessPlan.id === null) {
            if (localStorage.getItem("plan") === undefined || localStorage.getItem("plan") === null) {
                this.props.history.push(`/`);
            } else {
                this.props.refreshPlan(localStorage.getItem("plan"), () => {
                    //all my actions that i need to dispatch to get data...
                    this.setState({
                        questions: questions
                    });
                });
            }
        } else {
            console.log('Business plan id:' + this.props.businessPlan.id)
            this.setState({
                questions: questions
            });
        }
    }
    render() {
        return (
            <>
                <Col span={16} offset={4}>
                    <Breadcrumb style={{ marginTop: "40px" }}>
                        <Breadcrumb.Item style={{ marginTop: "40px" }}>
                            <Space><Link to='/personal-business-plans'>My Business plans</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item style={{ marginTop: "40px" }}>
                            <Space><Link to='/overview'>{this.props.businessPlan.name}</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Space>Personal characteristics template</Space>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
                <Row align="middle" style={{ marginTop: "9px" }}>
                    <Col span={12} offset={4}>
                        <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                            <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                            <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Personal characteristics template</Text>
                            <Tooltip title="Tooltip text">
                                <InfoCircleFilled style={{ fontSize: '21px', color: '#BFBFBF', marginLeft: '17px' }} />
                            </Tooltip>
                        </div>
                    </Col>
                </Row>
                {this.state.questions.map((element, index) => {
                    return (<Row align={'middle'} style={{marginTop:10}}>
                        <Col span={16} offset={4}>
                            <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                        <p style={aboutTitleTextStyle}>{(index+1) + ' ' +element.questionText}</p>
                                        <Radio.Group onChange={this.onDataChange}>
                                            <Space direction={'vertical'}>
                                            {element.answerOptions.map((element2, index2) => {
                                                return (<Radio key={element2.selection_code} value="a">{element2.answerText}</Radio>)
                                            })}
                                            </Space>
                                        </Radio.Group>
                            </Card>
                        </Col>
                    </Row>)
                })}
            </>
        )
    }
}

//getting redux states.  function that returns all states
const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan
    }
}
//to connect passing mapStateToProps and all actions that we will be dispatching
export default connect(mapStateToProps, { getSelectedPlanOverview, refreshPlan })(withRouter(PersonalCharacteristics));