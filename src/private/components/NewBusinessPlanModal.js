import React, { Component } from 'react';
import { Form, Modal, Button, Input, Upload, Select, TreeSelect, Space, Typography, Tooltip } from 'antd';
import { QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { buttonStyle, inputStyle } from '../../styles/customStyles';
import '../../css/customModal.css';
import { connect } from 'react-redux';
import { getCountries } from '../../appStore/actions/countriesActions';
import { getIndustries, getActivities, getNace } from '../../appStore/actions/naceActions';
import { saveInitialPlanData } from '../../appStore/actions/planActions';
import { uploadFile } from '../../appStore/actions/userFileAction';
import { getPlanLanguages } from '../../appStore/actions/planLanguageAction';
import { getImage } from "../../appStore/actions/planActions";

const { Option } = Select;
const { Text } = Typography;

class NewBusinessPlanModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            isVisible: false,
        };
    }
    formRef = React.createRef();

    componentDidMount() {
        this.props.getCountries();
        //this.props.getIndustries();
        this.props.getPlanLanguages();
        this.props.getNace();
    }

    handleOk = (values) => {
        const { fileList } = this.state;
        const formData = new FormData();

        if (Array.isArray(fileList) && fileList.length !== 0) {
            fileList.forEach(item => {
                if (item.file.status !== 'removed') {
                    formData.append('files[]', item.file);
                }
            })
            formData.append('name', values.name);
            this.props.uploadFile(formData)
                .then(
                    () => {
                        this.props.saveInitialPlanData(values.name, values.activity, values.country, values.language, this.props.uploadedFile)
                            .then(() => {
                                const plan = this.props.personalPlans[this.props.personalPlans.length - 1];
                                this.props.getImage(plan);
                            });
                    }
                )
        }
        else {
            this.props.saveInitialPlanData(values.name, values.activity, values.country, values.language, '');
        }

        this.setState({
            isVisible: true,
        });
        this.props.handleClose();
    };

    handleCancel = () => {
        this.props.handleClose();
        this.setState({
            isVisible: false,
        });
    };

    normFile = (e) => {

        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };

    /*
    handleIndustryChange = (value) => {
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
        //console.log(this.props.nace)
        const isVisible = this.props.visibility;
        const { fileList } = this.state;

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
        }));*/

        const naceClass = this.props.nace;

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
                        fileList: newFileList,
                    };
                });
            },
            onChange: file => {
                this.setState(state => {
                    return {
                        fileList: [file],
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        };

        return (
            <>
                <Modal
                    destroyOnClose={true}
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    width={700}
                    title="New business plan"
                    visible={isVisible}
                    onCancel={this.handleCancel}
                    footer={
                        <div>
                            <Button key="customCancel" onClick={this.handleCancel.bind(this)}>Cancel</Button>
                            <Button key="customSubmit" form="newBusinessPlanForm" htmlType="submit" type={'primary'}>Submit</Button>
                        </div>
                    }
                >
                    <Form
                        ref={this.formRef}
                        layout="vertical"
                        id="newBusinessPlanForm"
                        name="newBusinessPlanForm"
                        onFinish={this.handleOk}
                        hideRequiredMark
                    >
                        <Form.Item key="name" name="name" label="Project name"
                            rules={[
                                {
                                    validator: async (_, name) => {
                                        if (!name || name.length < 1) {
                                            return Promise.reject(new Error('Enter project name'));
                                        } else if (name.length > 100) {
                                            return Promise.reject(new Error('Project name is to long'));
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
                            <Upload key="files" {...propsUpload} maxCount={1} name="files" accept="image/*">
                                <Button style={buttonStyle} icon={<UploadOutlined />}>Browse</Button>
                            </Upload>
                        </Form.Item>
                        {
                            /*<Form.Item key="industry" name="industry" label={<Space><Text>NACE Rev. 2 Section</Text><Tooltip title={aboutNACE}><QuestionCircleOutlined style={{ color: "#8C8C8C" }} /></Tooltip></Space>}
                            rules={[{ required: true, message: 'Select NACE Rev. 2 Section' }]}
                        >
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
                        </Form.Item>*/
                        }
                        <Form.Item key="activity" name="activity" label={<Text>Select industry according NACE Rev. 2 classification (<a href="https://ec.europa.eu/eurostat/ramon/nomenclatures/index.cfm?TargetUrl=LST_NOM_DTL&StrNom=NACE_REV2&StrLanguageCode=EN&IntPcKey=&StrLayoutCode=HIERARCHIC&IntCurrentPage=1" target="_blank" >read more about NACE</a>)</Text>}
                            rules={[{ 
                                required: true,
                                validator(_, activity) {
                                    if(activity && naceClass.findIndex(x => x.id === activity) !== -1) {
                                        return Promise.reject('Don\'t select first level activities')
                                    } else if(!activity){
                                        return Promise.reject('Select NACE Rev. 2')
                                    }else {
                                        return Promise.resolve()
                                    }
                                } }]}>
                            <TreeSelect
                                showSearch
                                style={{ width: 655 }}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                treeData={naceClass}
                                treeDefaultExpandAll={false}
                                allowClear
                                treeLine={true}
                                placeholder="Select NACE Rev. 2"
                                treeNodeFilterProp='title'
                            >
                            </TreeSelect>
                        </Form.Item>


                        <Space size={26}>
                            <Form.Item key="country" name="country" label="Country of residence" rules={[{ required: true, message: 'Select country' }]}>
                                <Select
                                    showSearch
                                    allowClear
                                    style={{ width: 315 }}
                                    placeholder="Select country"
                                    optionFilterProp="label"

                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }>
                                    {countries.map(item => (
                                        <Option key={item.key} value={item.value}>{item.text}</Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item key="language" name="language" label="Language of business plan?" initialValue={languages.length > 0 ? languages[0].value : ""}
                                rules={[{ required: true, message: 'Select language' }]}>
                                <Select
                                    style={{ width: 315 }}
                                    placeholder="Select language"
                                    optionFilterProp="children"
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
    saveInitialPlanData,
    uploadFile,
    getPlanLanguages,
    getImage,
    getNace,
})(NewBusinessPlanModal);

