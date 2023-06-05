import React from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Select, Switch, Button, Breadcrumb, Row, Col, Typography, Radio, Card, Space, Tooltip, Tabs, Checkbox } from 'antd';
import { ArrowLeftOutlined, CloseOutlined, InfoCircleFilled, InfoCircleOutlined } from '@ant-design/icons';
import UnsavedChangesHeader from '../components/UnsavedChangesHeader'
import { refreshPlan } from "../../appStore/actions/refreshAction";
import { getSelectedPlanOverview } from "../../appStore/actions/planActions";
import { tableCardStyle } from '../../styles/customStyles'
import KeyPartnersPopUp from '../components/personal_characteristics/KeyPartnersPopUp';
import { getPersonalCharacteristics, savePersonalCharacteristics } from '../../appStore/actions/personalCharacteristicsActions';
import { logout } from '../../appStore/actions/authenticationActions';
import { getTooltips } from '../../appStore/actions/tooltipsAction';
import TooltipComponent from '../components/Tooltip';
import Cookies from 'js-cookie';


const { Option } = Select;
const { Text } = Typography;
const { TabPane } = Tabs;

const aboutTitleTextStyle = {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    marginBottom: '16px',
}

const titleTextStyle = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: '30px',
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

const specialCardStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#E6F7FF',
    boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(0, 0, 0, 0.04)',
    borderRadius: '8px',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: '2px',
    borderColor: '#69C0FF'
}

const tableCardBodyStyle = {
    width: '100%',
    padding: '15px 15px 15px 15px',
};


const questions = [
    {
        questionText: 'Your age group',
        set_code: '1',
        selection_code: null,
        answerOptions: [
            { answerText: 'Under 18', optionCode: '11' },
            { answerText: '18-24', optionCode: '12' },
            { answerText: '25-34', optionCode: '17' },
            { answerText: '35-44', optionCode: '13' },
            { answerText: '45-54', optionCode: '14' },
            { answerText: '55-64', optionCode: '15' },
            { answerText: '65 or over', optionCode: '16' },
        ],
    },
    {
        questionText: 'Your gender',
        set_code: '2',
        selection_code: null,
        answerOptions: [
            { answerText: 'Female', optionCode: '21' },
            { answerText: 'Male', optionCode: '22' },
            { answerText: 'Prefer not to answer', optionCode: '23' },
        ],
    },
    {
        questionText: 'You country of origin',
        set_code: '3',
        selection_code: null,
        answerOptions: [
            { answerText: 'Austria', optionCode: '31' },
            { answerText: 'Belgium', optionCode: '32' },
            { answerText: 'Bosnia and Herzegovina', optionCode: '33' },
            { answerText: 'Bulgaria', optionCode: '34' },
            { answerText: 'Croatia', optionCode: '35' },
            { answerText: 'Cyprus', optionCode: '36' },
            { answerText: 'Czechia', optionCode: '37' },
            { answerText: 'Denmark', optionCode: '38' },
            { answerText: 'Estonia', optionCode: '39' },
            { answerText: 'Finland', optionCode: '311' },
            { answerText: 'France', optionCode: '312' },
            { answerText: 'Germany', optionCode: '313' },
            { answerText: 'Greece', optionCode: '314' },
            { answerText: 'Hungary', optionCode: '315' },
            { answerText: 'Iceland', optionCode: '316' },
            { answerText: 'Ireland', optionCode: '317' },
            { answerText: 'Italy', optionCode: '318' },
            { answerText: 'Latvia', optionCode: '319' },
            { answerText: 'Liechtenstein', optionCode: '320' },
            { answerText: 'Lithuania', optionCode: '321' },
            { answerText: 'Luxembourg', optionCode: '322' },
            { answerText: 'Malta', optionCode: '323' },
            { answerText: 'Netherlands', optionCode: '324' },
            { answerText: 'North Macedonia', optionCode: '325' },
            { answerText: 'Norway', optionCode: '326' },
            { answerText: 'Poland', optionCode: '327' },
            { answerText: 'Portugal', optionCode: '328' },
            { answerText: 'Romania', optionCode: '329' },
            { answerText: 'Serbia', optionCode: '330' },
            { answerText: 'Slovakia', optionCode: '331' },
            { answerText: 'Slovenia', optionCode: '332' },
            { answerText: 'Spain', optionCode: '333' },
            { answerText: 'Sweden', optionCode: '334' },
            { answerText: 'Switzerland', optionCode: '335' },
            { answerText: 'Turkey', optionCode: '336' },
            { answerText: 'United Kingdom', optionCode: '337' },
        ],
    },
    {
        questionText: 'Your education',
        set_code: '4',
        selection_code: null,
        answerOptions: [
            { answerText: 'Graduate (bachelor or higher)', optionCode: '41' },
            { answerText: 'Non-graduate', optionCode: '42' },
        ],
    },
    {
        questionText: 'Reasons for starting business?',
        set_code: '5',
        selection_code: [],
        answerOptions: [
            { answerText: 'Autonomy and independence', optionCode: '51' },
            { answerText: 'To make a difference in the world', optionCode: '52' },
            { answerText: 'To build great wealth or very high income', optionCode: '53' },
            { answerText: 'To continue a family tradition', optionCode: '54' },
            { answerText: 'To earn a living becouse jobs are scarce', optionCode: '55' },
            { answerText: 'Other', optionCode: '56' }
        ],
    },
    {
        questionText: 'Does you family support your business intention?',
        set_code: '6',
        selection_code: null,
        answerOptions: [
            { answerText: 'Fully support', optionCode: '61' },
            { answerText: 'Rather support', optionCode: '62' },
            { answerText: 'Is neutral', optionCode: '63' },
            { answerText: 'Rather does not support', optionCode: '64' },
            { answerText: 'Does not support', optionCode: '65' },
            { answerText: 'I do not have a family', optionCode: '66' },
        ],
    },
    {
        questionText: 'Are you ready to lose your savings?',
        set_code: '7',
        selection_code: null,
        answerOptions: [
            { answerText: 'Yes', optionCode: '71' },
            { answerText: 'Not sure', optionCode: '72' },
            { answerText: 'No', optionCode: '73' }
        ],
    },
    {
        questionText: 'Are you ready for a heavily increased workload and stress?',
        set_code: '8',
        selection_code: null,
        answerOptions: [
            { answerText: 'Yes', optionCode: '81' },
            { answerText: 'Not Sure', optionCode: '82' },
            { answerText: 'No', optionCode: '83' },
        ],
    },
    {
        questionText: 'Do you like to be in charge and be responsible?',
        set_code: '9',
        selection_code: null,
        answerOptions: [
            { answerText: 'Yes', optionCode: '91' },
            { answerText: 'Not Sure', optionCode: '92' },
            { answerText: 'No', optionCode: '93' },
        ],
    },
    {
        questionText: 'Can you make a desicion on a matter and then stick to the desicion even when challenged?',
        set_code: '10',
        selection_code: null,
        answerOptions: [
            { answerText: 'Yes', optionCode: '101' },
            { answerText: 'Mostly yes', optionCode: '102' },
            { answerText: 'No', optionCode: '103' },
        ],
    },
    {
        questionText: 'Do you like meeting and dealing with people?',
        set_code: '11',
        selection_code: null,
        answerOptions: [
            { answerText: 'Yes', optionCode: '111' },
            { answerText: 'Sometimes', optionCode: '112' },
            { answerText: 'No', optionCode: '113' },
        ],
    },
    {
        questionText: 'Have you had an extensive experience in the type of business you wish to start?',
        set_code: '12',
        selection_code: null,
        answerOptions: [
            { answerText: 'Yes', optionCode: '121' },
            { answerText: 'I have some', optionCode: '122' },
            { answerText: 'No', optionCode: '123' },
        ],
    },
    {
        questionText: 'Do you have enough financial backing for the first year of operation?',
        set_code: '13',
        selection_code: null,
        answerOptions: [
            { answerText: 'Yes', optionCode: '131' },
            { answerText: 'Not sure', optionCode: '132' },
            { answerText: 'No', optionCode: '133' },
        ],
    },
    {
        questionText: 'Do you know individuals who have the talents and expertise you lack?',
        set_code: '14',
        selection_code: null,
        answerOptions: [
            { answerText: 'Yes', optionCode: '141' },
            { answerText: 'Few', optionCode: '142' },
            { answerText: 'No', optionCode: '143' },
        ],
    },
    {
        questionText: 'Do you really want to start this business more than anything else?',
        set_code: '15',
        selection_code: null,
        answerOptions: [
            { answerText: 'Yes', optionCode: '151' },
            { answerText: 'Not sure', optionCode: '152' },
            { answerText: 'No', optionCode: '153' },
        ],
    },
    {
        questionText: 'Do others easily understand your concepts and ideas?',
        set_code: '16',
        selection_code: null,
        answerOptions: [
            { answerText: 'Yes', optionCode: '161' },
            { answerText: 'Not sure', optionCode: '162' },
            { answerText: 'No', optionCode: '163' },
        ],
    },
    {
        questionText: 'Can you communicate effectively and persuade people to go along with your dream?',
        set_code: '17',
        selection_code: null,
        answerOptions: [
            { answerText: 'Yes', optionCode: '171' },
            { answerText: 'Not sure', optionCode: '172' },
            { answerText: 'No', optionCode: '173' },
        ],
    },
    {
        questionText: 'Please, assess your skills in management',
        set_code: '18',
        selection_code: null,
        answerOptions: [
            { answerText: '1', optionCode: '181' },
            { answerText: '2', optionCode: '182' },
            { answerText: '3', optionCode: '183' },
            { answerText: '4', optionCode: '184' },
            { answerText: '5', optionCode: '185' },
        ],
    },
    {
        questionText: 'Please, assess your skills in finance',
        set_code: '19',
        selection_code: null,
        answerOptions: [
            { answerText: '1', optionCode: '191' },
            { answerText: '2', optionCode: '192' },
            { answerText: '3', optionCode: '193' },
            { answerText: '4', optionCode: '194' },
            { answerText: '5', optionCode: '195' },
        ],
    },
    {
        questionText: 'Please, assess your skills in marketing',
        set_code: '20',
        selection_code: null,
        answerOptions: [
            { answerText: '1', optionCode: '201' },
            { answerText: '2', optionCode: '202' },
            { answerText: '3', optionCode: '203' },
            { answerText: '4', optionCode: '204' },
            { answerText: '5', optionCode: '205' },
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
            visiblePopUp: false,
            importCardVisibility: true,
            checked: []
        }
    }

    //everytime you check checkbox it will add id of income source to checked array ['7878787','898954654654654']
    onChange = checkedValues => {
        this.setState(() => {
            return {
                checked: checkedValues
            };
        }, () => {
            this.onDataChange(checkedValues, true)
        });
    };
    isDisabled(id) {
        return (
            this.state.checked.length > 1 && this.state.checked.indexOf(id) === -1
        );
    };

    onBackClick = () => {
        this.props.history.push('/overview')
    }

    discardChanges = () => {
        this.setQuestionsAnswers();
        this.setState({
            visibleHeader: 'hidden'
        });
    }

    showImportPopUp = () => {
        this.setState({
            visiblePopUp: true
        });
    }

    unshowImportPopUp = () => {
        this.setState({
            visiblePopUp: false
        });
    }

    closeImportCard = () => {
        this.setState({
            importCardVisibility: false
        });
    }

    saveChanges = () => {
        const modifiedChoices = JSON.parse(JSON.stringify(this.state.questions));
        const originalChoices = JSON.parse(JSON.stringify(this.props.personalCharacteristics.choices));
        let answeredQuestions = 0;
        let isCompleted = false;
        let choices = [];
        // if original choices were null. then set choices array to modifiedChoices state
        if (originalChoices === null || originalChoices === undefined) {
            modifiedChoices.map((element, index) => {
                if (element.set_code !== '5') {

                    const objektas = {
                        "set_code": element.set_code, //code of question
                        "selection_code": element.selection_code,  //code of answer
                        "extraText": "text"        // brief answer text if needed
                    }
                    if (element.selection_code !== null)
                        answeredQuestions++;
                    choices.push(objektas);
                } else {
                    var newArray = element.selection_code.join();
                    const objektas = {
                        "set_code": element.set_code, //code of question
                        "selection_code": newArray,  //code of answer
                        "extraText": "text"        // brief answer text if needed
                    }
                    if (element.selection_code.length > 0)
                        answeredQuestions++;
                    choices.push(objektas);
                }

                // choices.push(objektas);
            });
        } else {
            for (var i = 0; i < modifiedChoices.length; i++) {
                if (modifiedChoices[i].set_code !== '5') {
                    const objektas = {
                        "set_code": modifiedChoices[i].set_code, //code of question
                        "selection_code": modifiedChoices[i].selection_code,  //code of answer
                        "extraText": "text"        // brief answer text if needed
                    }
                    if (modifiedChoices[i].selection_code !== null)
                        answeredQuestions++;
                    choices.push(objektas)
                } else {
                    var newArray = modifiedChoices[i].selection_code.join();
                    if (modifiedChoices[i].selection_code !== null)
                        answeredQuestions++;
                    const objektas = {
                        "set_code": modifiedChoices[i].set_code, //code of question
                        "selection_code": newArray,  //code of answer
                        "extraText": "text"        // brief answer text if needed
                    }
                    choices.push(objektas)
                }

            }
        }
        if (answeredQuestions === 20)
            isCompleted = true;

        const postObject = {
            "plan_id": this.props.businessPlan.id,
            "choices": choices,
            "is_personal_characteristics_completed": isCompleted
        }
        this.props.savePersonalCharacteristics(postObject, () => {
            this.props.getPersonalCharacteristics(this.props.businessPlan.id, () => {
                this.setQuestionsAnswers();
                this.setState({
                    visibleHeader: 'hidden'
                });
            });
        });
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

    onDataChange = (e, isArray) => {
        const questionsClone = JSON.parse(JSON.stringify(this.state.questions))
        if (isArray === false) {
            questionsClone.map((element, index) => {
                element.answerOptions.map((element2, index1) => {
                    if (element2.optionCode === e) {
                        element.selection_code = e;
                    }
                })
            });
        } else {
            questionsClone.map((element, index) => {
                if (element.set_code == '5') {
                    element.selection_code = e;
                }
            });
        }

        this.setState({
            questions: questionsClone
        }, () => {
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
        } else {
            const questionsArray = JSON.parse(JSON.stringify(questions))
            //map through each element of choices array. then map through each element of questionsArray
            //check if set_code(id's) match. then change selection_code. thats it
            choicesClone.map((obj, index) => {
                questionsArray.map((element, index1) => {
                    if (obj.set_code === element.set_code) {
                        if (obj.set_code !== '5') {
                            element.selection_code = obj.selection_code;
                        } else {
                            var oldString = obj.selection_code;
                            var mynewarray = oldString.split(',')
                            element.selection_code = mynewarray;
                            this.setState({
                                checked: mynewarray
                            })
                        }

                    }
                });
            });

            this.setState({
                questions: questionsArray,
                originalQuestions: questionsArray
            });
        }
    }
    importAnswers = (planId) => {
        let array = [];
        this.props.getPersonalCharacteristics(planId, () => {
            const choicesClone = JSON.parse(JSON.stringify(this.props.personalCharacteristics.choices));
            if (choicesClone === null || choicesClone === undefined) {
                const questionsClone = JSON.parse(JSON.stringify(questions));
                for (var i = 0; i < questionsClone.length; i++) {
                    // for each element in question array create new object
                    const obj = {
                        "set_code": questionsClone[i].set_code, //code of question
                        "selection_code": questionsClone[i].selection_code,  //code of answer
                        "extraText": "text"        // brief answer text if needed
                    }
                    array.push(obj);
                }
            } else {
                array = choicesClone;
            }
            //update whole array
            const postObject = {
                "plan_id": this.props.businessPlan.id,
                "choices": array
            }

            this.props.savePersonalCharacteristics(postObject, () => {
                this.props.getPersonalCharacteristics(this.props.businessPlan.id, () => {
                    const choicesClone = JSON.parse(JSON.stringify(this.props.personalCharacteristics.choices))
                    this.setQuestionsAnswers();
                    this.setState({
                        visibleHeader: 'hidden',
                        visiblePopUp: false
                    });
                });
            });
        });

    }
    componentDidMount() {
        if (Cookies.get('access_token') !== undefined && Cookies.get('access_token') !== null) {
            if (this.props.businessPlan.id === null) {
                if (localStorage.getItem("plan") === undefined || localStorage.getItem("plan") === null) {
                    this.props.history.push(`/`);
                } else {
                    this.props.refreshPlan(localStorage.getItem("plan"), () => {
                        //all my actions that i need to dispatch to get data...
                        this.props.getPersonalCharacteristics(this.props.businessPlan.id, () => {
                            this.setQuestionsAnswers();
                        });
                        this.props.getTooltips();
                    });
                }
            } else {
                this.props.getPersonalCharacteristics(this.props.businessPlan.id, () => {
                    this.setQuestionsAnswers();
                });
            }
        } else {
            this.props.logout();
            this.props.history.push('/')
        }
    }
    render() {
        const questions = this.state.questions;
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
                            <Space>Personal characteristics</Space>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
                <Row align="middle" style={{ marginTop: "9px" }}>
                    <Col span={12} offset={4}>
                        <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center' }}>
                            <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                            <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Personal characteristics</Text>
                            <TooltipComponent code="personcharact" type="title" />
                        </div>
                    </Col>
                </Row>
                {this.state.importCardVisibility === true ?
                    <Row align="middle" style={{ marginTop: "9px" }}>
                        <Col span={16} offset={4}>
                            <div style={{ float: 'left', display: 'inline-flex', alignItems: 'center', width: '100%' }}>
                                <Card size={'small'} style={{ ...specialCardStyle }} visible={false}>
                                    <div style={{ display: 'flex', width: '100%', padding: '10px' }}>
                                        <div style={{ paddingRight: '15px' }}>
                                            <InfoCircleOutlined style={{ fontSize: '25px', textAlign: 'center', color: '#1890FF' }} />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                                <p style={{ ...aboutTitleTextStyle }}>Import answers from previous surveys</p>
                                                {/* <CloseOutlined style={{ fontSize: '16px', paddingTop: '5px', color: '#8C8C8C' }} /> */}
                                                <Button
                                                    style={{ backgroundColor: '#E6F7FF', borderStyle: 'none' }}
                                                    icon={<CloseOutlined style={{ fontSize: '16px', paddingTop: '5px', color: '#8C8C8C' }} />}
                                                    size="large"
                                                    onClick={this.closeImportCard}
                                                />
                                            </div>
                                            <p>To save time you can import answers from previous surveys</p>
                                            <Button style={{ width: '150px', backgroundColor: '#E6F7FF' }} onClick={this.showImportPopUp}>Import answers</Button>
                                        </div>
                                    </div>


                                </Card>
                            </div>
                        </Col>
                    </Row> : null}

                {questions.map((element, index) => {
                    return (<Row align={'middle'} key={index} style={{ marginTop: 10 }}>
                        <Col span={16} offset={4}>
                            <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                <p style={aboutTitleTextStyle}>{(index + 1) + ' ' + element.questionText}</p>
                                {element.set_code < 3 ?
                                    <Radio.Group onChange={(e) => this.onDataChange(e.target.value, false)} value={element.selection_code}>
                                        <Space direction={'vertical'}>
                                            {element.answerOptions.map((element2, index2) => {
                                                return (
                                                    <Radio
                                                        name={element2.answerText}
                                                        value={element2.optionCode}
                                                        key={element2.optionCode}
                                                    // checked={element2.optionCode === element.selection_code}
                                                    >{element2.answerText}</Radio>
                                                )
                                            })}
                                        </Space>
                                    </Radio.Group> : element.set_code == 3 ?
                                        <Select
                                            showSearch
                                            style={{ width: '320px' }}
                                            placeholder="Select country"
                                            optionFilterProp="children"
                                            onChange={(e) => this.onDataChange(e, false)}
                                            defaultValue={element.selection_code}
                                            value={element.selection_code}
                                        >
                                            {element.answerOptions.map((element2, index) => {
                                                return (<Option key={element2.optionCode} name={element2.answerText}
                                                    value={element2.optionCode}>{element2.answerText}</Option>)
                                            })}
                                        </Select> : element.set_code > 3 && element.set_code < 5 ?
                                            <Radio.Group onChange={(e) => this.onDataChange(e.target.value, false)} value={element.selection_code}>
                                                <Space direction={'vertical'}>
                                                    {element.answerOptions.map((element2, index2) => {
                                                        return (
                                                            <Radio
                                                                name={element2.answerText}
                                                                value={element2.optionCode}
                                                            // checked={element2.optionCode === element.selection_code}
                                                            >{element2.answerText}</Radio>
                                                        )
                                                    })}
                                                </Space>
                                            </Radio.Group> : element.set_code == 5 ?
                                                <Checkbox.Group onChange={this.onChange} value={element.selection_code}>
                                                    <Space direction={'vertical'}>
                                                        {element.answerOptions.map((element2, index2) => {
                                                            return (
                                                                <Checkbox
                                                                    name={element2.answerText}
                                                                    value={element2.optionCode}
                                                                    disabled={this.isDisabled(element2.optionCode)}
                                                                // checked={element2.optionCode === element.selection_code}
                                                                >{element2.answerText}</Checkbox>
                                                            )
                                                        })}
                                                    </Space>
                                                </Checkbox.Group>
                                                : element.set_code > 5 && element.set_code < 18 ?
                                                    <Radio.Group onChange={(e) => this.onDataChange(e.target.value, false)} value={element.selection_code}>
                                                        <Space direction={'vertical'}>
                                                            {element.answerOptions.map((element2, index2) => {
                                                                return (
                                                                    <Radio
                                                                        name={element2.answerText}
                                                                        value={element2.optionCode}
                                                                    // checked={element2.optionCode === element.selection_code}
                                                                    >{element2.answerText}</Radio>
                                                                )
                                                            })}
                                                        </Space>
                                                    </Radio.Group>
                                                    : element.set_code >= 18 ?
                                                        <Radio.Group style={{ width: "100%" }} compact onChange={(e) => this.onDataChange(e.target.value, false)} value={element.selection_code} buttonStyle="solid">
                                                            {element.answerOptions.map((element2, index2) => {
                                                                return (
                                                                    <Radio.Button
                                                                        name={element2.answerText}
                                                                        value={element2.optionCode}
                                                                        style={{ width: '20%', height: '40px', textAlign: 'center' }}
                                                                    // checked={element2.optionCode === element.selection_code}
                                                                    >{element2.answerText}</Radio.Button>
                                                                )
                                                            })}
                                                        </Radio.Group> : null

                                }

                            </Card>
                        </Col>
                    </Row>)
                })}
                <KeyPartnersPopUp visible={this.state.visiblePopUp}
                    plans={this.props.personalBusinessPlans}
                    planId={this.props.businessPlan.id}
                    onClose={this.unshowImportPopUp}
                    save={this.importAnswers}
                />
            </>
        )
    }
}

//getting redux states.  function that returns all states
const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
        personalCharacteristics: state.personalCharacteristics,
        personalBusinessPlans: state.personalBusinessPlans

    }
}
//to connect passing mapStateToProps and all actions that we will be dispatching
export default connect(mapStateToProps, { 
    getSelectedPlanOverview, 
    getPersonalCharacteristics, 
    savePersonalCharacteristics, 
    logout, 
    refreshPlan,
    getTooltips 
})(withRouter(PersonalCharacteristics));