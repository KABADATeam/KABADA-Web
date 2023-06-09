import React, { Component } from 'react';
import { Form, Modal, Button, Input, Upload, Select, TreeSelect, Space, Typography, Tooltip, Anchor } from 'antd';
import { QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { buttonStyle, inputStyle } from '../../../styles/customStyles';
import '../../../css/customModal.css';
import { connect } from 'react-redux';
import { getCountries } from '../../../appStore/actions/countriesActions';
import { getIndustries, getActivities, getNace } from '../../../appStore/actions/naceActions';
import { updatePlanData, updateImage } from '../../../appStore/actions/planActions';
import { uploadFile, deleteFile } from '../../../appStore/actions/userFileAction';
import { getPlanLanguages } from '../../../appStore/actions/planLanguageAction';

const { Option } = Select;
const { Text } = Typography;
const { Link } = Anchor;

class EditBusinessPlanModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            //enabledSelectActivity: false
        };
    }
    formRef = React.createRef();

    componentDidMount() {
        this.props.getCountries();
        //this.props.getIndustries();
        this.props.getNace();
        //this.props.getActivities(this.props.updatingPlan.industryId);
        this.props.getPlanLanguages();
        this.setState({
            fileList: [],
        });
    }

    getActivityID = (nace, industryCode, activityCode) => {
        const firstLevelActivities = nace.find(item => item.code === industryCode);
        if (firstLevelActivities.code === activityCode) {
            return firstLevelActivities.id;
        } else {
            if (firstLevelActivities.activities !== null) {
                const secondLevelActivities = firstLevelActivities.activities.find(item => item.code === activityCode);
                if (secondLevelActivities !== undefined) {
                    return secondLevelActivities.id;
                } else {
                    const activity2nd = activityCode.split('.').slice(0, 2).join('.');
                    const secondLevelActivities = firstLevelActivities.activities.find(item => item.code === activity2nd);
                    if (secondLevelActivities.code === activityCode) {
                        return secondLevelActivities.id;
                    } else {
                        const secondLvlCode = activityCode.split('.').slice(0, 2).join('.');
                        const activity3nd = secondLvlCode + '.' + activityCode.split('.')[2].slice(0, 1);
                        const thirdLevelActivities = secondLevelActivities.activities.length > 1 ? secondLevelActivities.activities.find(item => item.code === activity3nd) : secondLevelActivities.activities[0];
                        if (thirdLevelActivities.code === activityCode) {
                            return thirdLevelActivities.id;
                        } else {
                            const activity4nd = activityCode.split('.').slice(0, 3).join('.');
                            const fourthLevelActivities = thirdLevelActivities.activities.find(item => item.code === activity4nd);
                            return fourthLevelActivities.id;
                        }
                    }
                }
            } else {
            }
        }
    }

    // handleOk = (values) => {

    //     const { fileList } = this.state;
    //     const formData = new FormData();

    //     let postObject = {
    //         "Id": this.props.updatingPlan.id,
    //         'Title': values.name,
    //         'ActivityId': values.activity,
    //         'CountryId': values.country,
    //         'LanguageId': values.language
    //     }
    //     let reducerObject = {
    //         "id": this.props.updatingPlan.id,
    //         'name': values.name,
    //         'activityId': values.activity,
    //         //'industryId': values.industry,
    //         'countryId': values.country,
    //         'languageId': values.language,
    //     }


    //     if (Array.isArray(fileList) && fileList.length !== 0 && fileList[0].fileList.length !== 0) {
    //         fileList.forEach(item => {
    //             if (item.file.status !== 'removed') {
    //                 formData.append('files[]', item.file);
    //             }
    //         })
    //         if (this.props.updatingPlan.planImage) {
    //             this.props.deleteFile(this.props.updatingPlan.planImage)
    //         }
    //         this.props.uploadFile(formData)
    //             .then(
    //                 () => {
    //                     postObject = { ...postObject, 'Img': this.props.uploadedFile }
    //                     reducerObject = { ...reducerObject, 'planImage': this.props.uploadedFile }
    //                     this.props.updateImage(reducerObject);
    //                     this.props.updatePlanData(postObject, reducerObject)
    //                     this.props.onClose();
    //                 });
    //     }
    //     else if (Array.isArray(fileList) && fileList.length !== 0 && fileList[0].file.status === 'removed') {
    //         postObject = { ...postObject, 'Img': '' }
    //         reducerObject = { ...reducerObject, 'planImage': '', 'coverImage': null }
    //         if (this.props.updatingPlan.planImage !== null || this.props.updatingPlan.planImage !== undefined) {
    //             this.props.deleteFile(this.props.updatingPlan.planImage)
    //         }
    //         this.props.updatePlanData(postObject, reducerObject)
    //         this.props.onClose();
    //     }
    //     else if (Array.isArray(fileList) && fileList.length === 0) {
    //         postObject = { ...postObject, 'Img': this.props.updatingPlan.planImage }
    //         reducerObject = { ...reducerObject, 'planImage': this.props.updatingPlan.planImage }
    //         this.props.updatePlanData(postObject, reducerObject)
    //         this.props.onClose();
    //     }
    // };

    getActivityCode = (nace, activityId) => {
        let activityCode = undefined;
        const firstLevelActivities = nace.find(item => item.code === activityId);
        if (firstLevelActivities !== undefined) {
            activityCode = firstLevelActivities.code;
        } else {
            for (var i = 0; i < nace.length; i++) {
                const firstLevelActivities = nace[i].activities;
                const secondLevelActivities = firstLevelActivities.find(item => item.id === activityId);
                if (secondLevelActivities !== undefined) {
                    activityCode = secondLevelActivities.code;
                    break;
                } else {
                    for (var j = 0; j < firstLevelActivities.length; j++) {
                        const thirdLevelActivities = firstLevelActivities[j].activities;
                        const thirdLevelActivity = thirdLevelActivities.find(item => item.id === activityId);
                        if (thirdLevelActivity !== undefined) {
                            activityCode = thirdLevelActivity.code;
                            break;
                        } else {
                            for (var k = 0; k < thirdLevelActivities.length; k++) {
                                const fourthLevelActivities = thirdLevelActivities[k].activities;
                                const fourthLevelActivity = fourthLevelActivities.find(item => item.id === activityId);
                                if (fourthLevelActivity !== undefined) {
                                    activityCode = fourthLevelActivity.code;
                                    break;
                                }
                            }
                        }

                    }
                }
            }
        }
        return activityCode;

    }

    handleOk = (values) => {

        const { fileList } = this.state;
        const formData = new FormData();
        const activityCode = this.getActivityCode(this.props.nace, values.activity);
        let postObject = {
            "Id": this.props.updatingPlan.id,
            'Title': values.name,
            'ActivityId': values.activity,
            'CountryId': values.country,
            'LanguageId': values.language
        }
        let reducerObject = {
            "id": this.props.updatingPlan.id,
            'name': values.name,
            'activityId': values.activity,
            'activityCode': activityCode,
            //'industryId': values.industry,
            'countryId': values.country,
            'languageId': values.language,
            'countryTitle': this.props.countries.find(item => item.id === values.country).title,
            'countryShortCode': this.props.countries.find(item => item.id === values.country).shortCode
        }
        if (Array.isArray(fileList) && fileList.length !== 0 && fileList[0].fileList.length !== 0) {
            fileList.forEach(item => {
                if (item.file.status !== 'removed') {
                    formData.append('files[]', item.file);
                }
            })
            if (this.props.updatingPlan.planImage) {
                this.props.deleteFile(this.props.updatingPlan.planImage)
            }
            this.props.uploadFile(formData)
                .then(
                    () => {
                        postObject = { ...postObject, 'Img': this.props.uploadedFile }
                        reducerObject = { ...reducerObject, 'planImage': this.props.uploadedFile }
                        this.props.updateImage(reducerObject);
                        this.props.updatePlanData(postObject, reducerObject)
                        this.props.onClose();
                    });
        }
        else if (Array.isArray(fileList) && fileList.length !== 0 && fileList[0].file.status === 'removed') {
            postObject = { ...postObject, 'Img': '' }
            reducerObject = { ...reducerObject, 'planImage': '', 'coverImage': null }
            if (this.props.updatingPlan.planImage !== null || this.props.updatingPlan.planImage !== undefined) {
                this.props.deleteFile(this.props.updatingPlan.planImage)
            }
            this.props.updatePlanData(postObject, reducerObject)
            this.props.onClose();
        }
        else if (Array.isArray(fileList) && fileList.length === 0) {
            postObject = { ...postObject, 'Img': this.props.updatingPlan.planImage }
            reducerObject = { ...reducerObject, 'planImage': this.props.updatingPlan.planImage }
            this.props.updatePlanData(postObject, reducerObject)
            this.props.onClose();
        }
    };

    handleCancel = () => {
        this.props.onClose();
    };

    normFile = (e) => {

        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };

    /*handleIndustryChange = (value) => {
        this.formRef.current.setFieldsValue({
            activity: undefined
        })
        if (value) {
            this.props.getActivities(value);
            this.setState({
                enabledSelectActivity: true,
            });
        }
        else {
            this.setState({
                enabledSelectActivity: false,
            });
        }
    };
 
    handleIndustryClear = () => {
        this.formRef.current.setFieldsValue({
            activity: undefined
        })
        this.setState({
            enabledSelectActivity: false,
        });
    };*/

    render() {
        const { fileList } = this.state;
        const naceClass = this.props.nace;
        const oldName = this.props.updatingPlan.name;
        const oldActivity = this.getActivityID(this.props.nace, this.props.updatingPlan.overview.nace.industry_code, this.props.updatingPlan.activityCode);
        const oldCountry = this.props.countries.find(item => item.title === this.props.updatingPlan.countryTitle).id;
        const oldLanguage = this.props.planLanguages.find(item => item.title === 'English').id;

        /*const industries = this.props.industries.map((item) => ({
            key: item.id,
            value: item.id,
            text: item.code + '. ' + item.title
        }));
 
        const activities = this.props.activities.map((item) => ({
            key: item.id,
            value: item.id,
            title: item.code + '. ' + item.title,
            children: item.childActivities.map((citem) => ({
                key: citem.id,
                value: citem.id,
                title: citem.code + '. ' + citem.title,
            }))
        }));
*/

        const oldFileList = this.props.updatingPlan.coverImage ? [{
            uid: '-1',
            status: 'done',
            name: '',
            url: this.props.updatingPlan.coverImage ? this.props.updatingPlan.coverImage : '',
            thumbUrl: this.props.updatingPlan.coverImage ? this.props.updatingPlan.coverImage : '',
        }] : []
        const countries = this.props.countries.map(({ id, title }) => ({ key: id, value: id, text: title }));
        const languages = this.props.planLanguages.map(({ id, title }) => ({ key: id, value: id, text: title }));

        const aboutNACE = "NACE is ...";

        const propsUpload = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList
                    };
                });
            },
            onChange: file => {
                this.setState(state => {
                    return {
                        fileList: [file]
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file]
                }));
                return false;
            },
            defaultFileList: oldFileList,
            fileList
        };

        return (
            <>
                <Modal
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    width={700}
                    title="Edit business plan"
                    visible={true}
                    onCancel={this.handleCancel}
                    footer={
                        <div>
                            <Button key="customCancel" onClick={this.handleCancel.bind(this)}>Cancel</Button>
                            <Button key="customSubmit" form="editBusinessPlanForm" htmlType="submit" type={'primary'}>Submit</Button>
                        </div>
                    }
                >
                    <Form
                        ref={this.formRef}
                        layout="vertical"
                        id="editBusinessPlanForm"
                        name="editBusinessPlanForm"
                        onFinish={this.handleOk}
                        hideRequiredMark
                        initialValues={{
                            name: oldName,
                            //industry: oldIndustry,
                            activity: oldActivity,
                            country: oldCountry,
                            language: oldLanguage !== null ? oldLanguage : languages[0].value
                        }}
                    >
                        <Form.Item key="name" name="name" label="Project name"
                            rules={[
                                {
                                    validator: async (_, name) => {
                                        if (!name || name.length < 1) {
                                            return Promise.reject(new Error('Enter project name'));
                                        }
                                    },
                                },
                            ]}>
                            <Input size="large" style={inputStyle} />
                        </Form.Item>
                        <Form.Item
                            key="upload"
                            name="upload"
                            label="Cover image (optional)"
                            valuePropName="fileList"
                            getValueFromEvent={this.normFile}
                        >
                            <Upload key="files" listType="picture" {...propsUpload} maxCount={1} name="files" accept="image/*">
                                <Button style={buttonStyle} icon={<UploadOutlined />}>Browse</Button>
                            </Upload>
                        </Form.Item>
                        {/*
                        <Form.Item key="industry" name="industry" label={<Space><Text>NACE Rev. 2 Section</Text><Tooltip title={aboutNACE}><QuestionCircleOutlined style={{ color: "#8C8C8C" }} /></Tooltip></Space>}
                            rules={[
                                {
                                    validator: async (_, industry) => {
                                        if (!industry || industry.length < 1) {
                                            return Promise.reject(new Error('Select NACE Rev. 2 Section'));
                                        }
                                    },
                                },
                            ]}>
                            <Select
                                showSearch
                                allowClear
                                style={{ width: 655 }}
                                placeholder="Select NACE Rev. 2 Section"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                onChange={this.handleIndustryChange}
                                onClear={this.handleIndustryClear}
                            >
                                {industries.map(item => (
                                    <Option key={item.key} value={item.value}>{item.text}</Option>
                                ))}
                            </Select>
                            </Form.Item>
                                */}
                        <Form.Item key="activity" name="activity" label={<Text>Select industry according NACE Rev. 2 classification (<a href="https://ec.europa.eu/eurostat/ramon/nomenclatures/index.cfm?TargetUrl=LST_NOM_DTL&StrNom=NACE_REV2&StrLanguageCode=EN&IntPcKey=&StrLayoutCode=HIERARCHIC&IntCurrentPage=1" target="_blank" >read more about NACE</a>)</Text>}
                            rules={[
                                {
                                    validator: async (_, value) => {
                                        if (!value || value.length < 1) {
                                            return Promise.reject(new Error('Select NACE Rev. 2 '));
                                        }
                                    },
                                },
                            ]}
                        >
                            <TreeSelect
                                showSearch
                                style={{ width: 655 }}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                treeData={naceClass}
                                allowClear
                                treeLine={true}
                                //defaultValue={this.props.personalPlans.map((x) => x.overview).map((y) => y.nace).map((z) => z.activity_code)}
                                value={oldActivity}
                                treeNodeFilterProp='title'
                                placeholder="Select NACE Rev. 2"
                            >
                            </TreeSelect>
                        </Form.Item>


                        <Space size={26}>
                            <Form.Item key="country" name="country" label="Country of residence" rules={[{ required: true, message: 'Select country' }]}
                            >
                                <Select
                                    showSearch
                                    allowClear
                                    style={{ width: 315 }}
                                    placeholder="Select country"
                                    optionFilterProp="label"
                                    //defaultValue={this.props.updatingPlan.countryTitle}
                                    //value={this.props.updatingPlan.countryTitle}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }>

                                    {countries.map(item => (
                                        <Option key={item.key} value={item.value}>{item.text}</Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item key="language" name="language" label="Language of business plan?"
                                rules={[
                                    {
                                        validator: async (_, value) => {
                                            if (!value || value.length < 1) {
                                                return Promise.reject(new Error('Select language of bussines plan'));
                                            }
                                        },
                                    },
                                ]}
                            >
                                <Select
                                    style={{ width: 315 }}
                                    placeholder="Select language"
                                    optionFilterProp="children"
                                    //defaultValue={this.props.planLanguages.map((x) => x.title)}
                                    value={this.props.planLanguages.map((x) => x.title)}
                                    filterOption={(input, option) =>
                                        option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {languages.map(item => (
                                        <Option key={item.key} value={item.key}>{item.text}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Space>
                    </Form>
                </Modal >
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        countries: state.countries,
        activities: state.activities,
        industries: state.industries,
        uploadedFile: state.uploadedFile,
        planLanguages: state.planLanguages,
        personalPlans: state.personalBusinessPlans,
        nace: state.nace
    };
}
export default connect(mapStateToProps, {
    getCountries,
    getActivities,
    getIndustries,
    updatePlanData,
    uploadFile,
    getPlanLanguages,
    updateImage,
    deleteFile,
    getNace
})(EditBusinessPlanModal);

