import React from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Form, Select, InputNumber, Input, Divider, Button, Breadcrumb, Row, Col, Typography, Radio, Switch, Card, Table, Space, Tooltip, Tabs } from 'antd';
import { ArrowLeftOutlined, InfoCircleFilled } from '@ant-design/icons';
// import { tableCardStyle, tableCardBodyStyle } from '../../styles/customStyles';
import UnsavedChangesHeader from '../components/UnsavedChangesHeader'
import { refreshPlan } from "../../appStore/actions/refreshAction";
import { getSelectedPlanOverview } from "../../appStore/actions/planActions";
import { getPersonalCharacteristics, savePersonalCharacteristics } from '../../appStore/actions/personalCharacteristicsActions'


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
        questionText: 'Your age group',
        set_code: 1,
        selection_code: 14,
        answerOptions: [
            { answerText: 'Under 18', optionCode: 12 },
            { answerText: '18-24', optionCode: 13 },
            { answerText: '35-44', optionCode: 14 },
            { answerText: '45-54', optionCode: 15 },
            { answerText: '55-64', optionCode: 16 },
            { answerText: '65 or over', optionCode: 17 },
        ],
    },
    {
        questionText: 'Your gender',
        set_code: 2,
        selection_code: 23,
        answerOptions: [
            { answerText: 'Female', optionCode: 22 },
            { answerText: 'Male', optionCode: 23 },
            { answerText: 'Prefer no to answer', optionCode: 24 },
        ],
    },
    {
        questionText: 'You country of origin',
        set_code: 3,
        selection_code: 32,
        answerOptions: [
            { answerText: 'Latvia', optionCode: 32 },
            { answerText: 'Lithuania', optionCode: 33 },
        ],
    },
    {
        questionText: 'Your education',
        set_code: 4,
        selection_code: 43,
        answerOptions: [
            { answerText: 'Graduate (bachelor or higher)', optionCode: 42 },
            { answerText: 'Non-graduate', optionCode: 43 },
        ],
    },
    {
        questionText: 'Reasons for starting business?',
        set_code: 5,
        selection_code: 52,
        answerOptions: [
            { answerText: 'Autonomy and independence', optionCode: 52 },
            { answerText: 'To make a difference in the world', optionCode: 53 },
            { answerText: 'To build great wealth or very high income', optionCode: 54 },
            { answerText: 'To continue a family tradition', optionCode: 55 },
            { answerText: 'To earn a living becouse jobs are scarce', optionCode: 56 },
            { answerText: 'Other', optionCode: 57 }
        ],
    },
    {
        questionText: 'Does you family support your business intention?',
        set_code: 6,
        selection_code: 64,
        answerOptions: [
            { answerText: 'Fully support', optionCode: 62 },
            { answerText: 'Rather support', optionCode: 63 },
            { answerText: 'Is neutral', optionCode: 64 },
            { answerText: 'Does not support', optionCode: 65 },
            { answerText: 'I do not have a family', optionCode: 66 },
        ],
    },
    {
        questionText: 'Are you ready to lose your savings?',
        set_code: 7,
        selection_code: 72,
        answerOptions: [
            { answerText: 'Yes', optionCode: 72 },
            { answerText: 'Not sure', optionCode: 73 },
            { answerText: 'No', optionCode: 74 }
        ],
    },
    {
        questionText: 'Are you ready for a heavily increased workload and stress?',
        set_code: 8,
        selection_code: 83,
        answerOptions: [
            { answerText: 'Yes', optionCode: 82 },
            { answerText: 'Not Sure', optionCode: 83 },
            { answerText: 'No', optionCode: 84 },
        ],
    },
    {
        questionText: 'Do you like to be in charge and responsible?',
        set_code: 9,
        selection_code: 94,
        answerOptions: [
            { answerText: 'Yes', optionCode: 92 },
            { answerText: 'Not Sure', optionCode: 93 },
            { answerText: 'No', optionCode: 94 },
        ],
    },
    {
        questionText: 'Can you make a desicion on a matter and then stick to desicion even when challenged?',
        set_code: 10,
        selection_code: 103,
        answerOptions: [
            { answerText: 'Yes', optionCode: 101 },
            { answerText: 'Mostly yes', optionCode: 102 },
            { answerText: 'No', optionCode: 103 },
        ],
    },
    {
        questionText: 'Do you like meeting and dealing with people?',
        set_code: 11,
        selection_code: 112,
        answerOptions: [
            { answerText: 'Yes', optionCode: 111 },
            { answerText: 'Sometimes', optionCode: 112 },
            { answerText: 'No', optionCode: 113 },
        ],
    },
    {
        questionText: 'Have you had an extensive experience in the type of business you wish to start?',
        set_code: 12,
        selection_code: 123,
        answerOptions: [
            { answerText: 'Yes', optionCode: 121 },
            { answerText: 'I have some', optionCode: 122 },
            { answerText: 'No', optionCode: 123 },
        ],
    },
    {
        questionText: 'Do you have enough financial backing for the first year of operation?',
        set_code: 13,
        selection_code: 131,
        answerOptions: [
            { answerText: 'Yes', optionCode: 131 },
            { answerText: 'Not sure', optionCode: 132 },
            { answerText: 'No', optionCode: 133 },
        ],
    },
    {
        questionText: 'Do you know individuals who have the talents and expertise you lack?',
        set_code: 14,
        selection_code: 143,
        answerOptions: [
            { answerText: 'Yes', optionCode: 141 },
            { answerText: 'Few', optionCode: 142 },
            { answerText: 'No', optionCode: 143 },
        ],
    },
    {
        questionText: 'Do you really want to start this business more that anything else?',
        set_code: 15,
        selection_code: 153,
        answerOptions: [
            { answerText: 'Yes', optionCode: 151 },
            { answerText: 'Not sure', optionCode: 152 },
            { answerText: 'No', optionCode: 153 },
        ],
    },
    {
        questionText: 'Do others easily understand your concepts and ideas?',
        set_code: 16,
        selection_code: 161,
        answerOptions: [
            { answerText: 'Yes', optionCode: 161 },
            { answerText: 'Not sure', optionCode: 162 },
            { answerText: 'No', optionCode: 163 },
        ],
    },
    {
        questionText: 'Can you communicate effectively and persuade people to go along with your dream?',
        set_code: 17,
        selection_code: 172,
        answerOptions: [
            { answerText: 'Yes', optionCode: 171 },
            { answerText: 'Not sure', optionCode: 172 },
            { answerText: 'No', optionCode: 173 },
        ],
    },
    {
        questionText: 'Please, assess your skills in management',
        set_code: 18,
        selection_code: 185,
        answerOptions: [
            { answerText: '1', optionCode: 181 },
            { answerText: '2', optionCode: 182 },
            { answerText: '3', optionCode: 183 },
            { answerText: '4', optionCode: 184 },
            { answerText: '5', optionCode: 185 },
        ],
    },
    {
        questionText: 'Please, assess your skills in finance',
        set_code: 19,
        selection_code: 195,
        answerOptions: [
            { answerText: '1', optionCode: 191 },
            { answerText: '2', optionCode: 192 },
            { answerText: '3', optionCode: 193 },
            { answerText: '4', optionCode: 194 },
            { answerText: '5', optionCode: 195 },
        ],
    },
    {
        questionText: 'Please, assess your skills in marketing',
        set_code: 20,
        selection_code: 203,
        answerOptions: [
            { answerText: '1', optionCode: 201 },
            { answerText: '2', optionCode: 202 },
            { answerText: '3', optionCode: 203 },
            { answerText: '4', optionCode: 204 },
            { answerText: '5', optionCode: 205 },
        ],
    }
]


class PersonalCharacteristics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            originalQuestions: [],
            questions: [],
            visibleHeader: 'hidden',
            selectedQuestions: []
        }
    }
    onBackClick = () => {
        this.props.history.push('/overview')
    }

    discardChanges = () => {

    }

    saveChanges = () => {

    }

    arraysEqual = (array1, array2) => {
        let a = JSON.parse(JSON.stringify(array1));
        let b = JSON.parse(JSON.stringify(array2));

        let original = array1;
        let modified = array2;

        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;

        a = a.sort();
        b = b.sort();

        for (var i = 0; i < a.length; i++) {
            if (original[i].selection_code !== modified[i].selection_code) {
                return false;
            }
        }

        return true;
    }


    getWindowsUpdate = () => {
        const originalClone = JSON.parse(JSON.stringify(this.state.originalQuestions));
        const modifiedClone = JSON.parse(JSON.stringify(this.state.questions));

        if (originalClone === null) {
            return 'hidden';
        }
        if (modifiedClone === null) {
            return 'hidden';
        }
        if (this.arraysEqual(originalClone, modifiedClone) === false) {
            return 'visible';
        }
        return 'hidden';

    }

    onDataChange = (e) => {
        console.log('radio checked', e.target.value);
        const questionsClone = JSON.parse(JSON.stringify(this.state.questions))
        questionsClone.map((element, index) => {
            element.answerOptions.map((element2, index1) => {
                if (element2.optionCode === e.target.value) {
                    element.selection_code = e.target.value;
                }
            })
        });
        this.setState({
            questions: questionsClone
        }, () => {
            console.log('Questions state is:' + JSON.stringify(this.state.questions))
            let visibilityString = this.getWindowsUpdate();
            this.setState({
                visibleHeader: visibilityString
            });
        });

    };

    setQuestionsAnswers = () => {
        const choicesClone = JSON.parse(JSON.stringify(this.props.personalCharacteristics.choices));
        if (choicesClone === null || choicesClone === undefined) {
            this.setState({
                questions: questions,
                originalQuestions: questions
            });
        }
    }

    componentDidMount() {
        if (this.props.businessPlan.id === null) {
            if (localStorage.getItem("plan") === undefined || localStorage.getItem("plan") === null) {
                this.props.history.push(`/`);
            } else {
                this.props.refreshPlan(localStorage.getItem("plan"), () => {
                    //all my actions that i need to dispatch to get data...
                    this.props.getPersonalCharacteristics(this.props.businessPlan.id, () => {
                        this.setQuestionsAnswers();
                    });
                });
            }
        } else {
            console.log('Business plan id:' + this.props.businessPlan.id)
            this.props.getPersonalCharacteristics(this.props.businessPlan.id, () => {
                this.setQuestionsAnswers();
            });
            // this.setState({
            //     questions: questions
            // });
        }
    }
    render() {
        return (
            <>
                <UnsavedChangesHeader
                    visibility={this.state.visibleHeader}
                    discardChanges={this.discardChanges}
                    saveChanges={this.saveChanges}
                />
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
                    return (<Row align={'middle'} style={{ marginTop: 10 }}>
                        <Col span={16} offset={4}>
                            <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                <p style={aboutTitleTextStyle}>{(index + 1) + ' ' + element.questionText}</p>
                                <Radio.Group onChange={this.onDataChange} defaultValue={element.selection_code}>
                                    <Space direction={'vertical'}>
                                        {element.answerOptions.map((element2, index2) => {
                                            return (
                                                <Radio
                                                    name={element.answerText}
                                                    value={element2.optionCode}
                                                    // checked={element2.optionCode === element.selection_code}
                                                >{element2.answerText}</Radio>
                                            )

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
        businessPlan: state.selectedBusinessPlan,
        personalCharacteristics: state.personalCharacteristics
    }
}
//to connect passing mapStateToProps and all actions that we will be dispatching
export default connect(mapStateToProps, { getSelectedPlanOverview, getPersonalCharacteristics, savePersonalCharacteristics, refreshPlan })(withRouter(PersonalCharacteristics));