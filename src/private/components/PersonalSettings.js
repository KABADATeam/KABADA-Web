import React, { Component } from 'react';
import { Row, Col, Typography, Button, Avatar, Input, Card, Space, Upload } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { buttonStyle } from '../../styles/customStyles';

const { Text } = Typography;

const inputStyle = {
    border: '1px solid #BFBFBF',
    borderRadius: "4px",
}

const CardStyle = {
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(0, 0, 0, 0.04)', borderRadius: '8px',
};

const CardBodyStyle = { width: '100%', paddingTop: '0px', paddingLeft: '0px', paddingRight: '0px', paddingBottom: '0px' };
const CardRowStyle = { width: '100%', paddingTop: '16px', paddingBottom: '16px', paddingLeft: '20px', paddingRight: '20px' };

class PersonalSettings extends Component {

    state = {
        fileList: [],
        previewImage: '',
    };

    onChangeFirstName = ({ target: { value } }) => {
        this.props.handleHeader();
        this.props.handleChangeFirstName(value);
    }

    onChangeLastName = ({ target: { value } }) => {
        this.props.handleHeader();
        this.props.handleChangeLastName(value);
    }

    onRemovePhoto = () => {
        this.props.handleHeader();
        this.props.handleRemovePhoto();
        this.setState({
            fileList: [],
            previewImage: ''
        });
    }

    onChangingPhoto = () => {
    }

    render() {
        const firstName = this.props.settings.firstName;
        const lastName = this.props.settings.lastName;
        let userImg = this.props.settings.userImage;

        const fileList = this.state.fileList;

        const propsUpload = {
            onChange: file => {
                this.setState({
                    fileList: [file],
                });
            },
            beforeUpload: file => {
                let previewImage = new Image();
                previewImage.src = URL.createObjectURL(file);
                this.setState({
                    fileList: [file],
                    previewImage: previewImage.src
                });
                this.props.handleHeader();
                this.props.handleChangePhoto(previewImage.src);
                return false;
            },
            fileList,
        };
        if (this.state.previewImage !== '') {
            userImg = this.state.previewImage;
        }

        return (
            <Row>
                <Col span={24} style={{ marginBottom: "20px" }}>
                    <Card headStyle={{ paddingLeft: '20px', paddingRight: '20px', textAlign: 'left' }} style={{ ...CardStyle }} bodyStyle={{ ...CardBodyStyle }}>
                        <Card.Grid hoverable={false} style={{ ...CardRowStyle }}>
                            <Space>
                                <Avatar size={40} icon={<UserOutlined />} src={userImg} />
                                <Upload {...propsUpload} key="files" maxCount={1} name="files" accept="image/*" showUploadList={false}>
                                    <Button style={{ ...buttonStyle, marginLeft: 20 }} onClick={this.onChangingPhoto.bind(this)}>
                                        Upload photo
                                    </Button>
                                </Upload>
                                <Button style={{ ...buttonStyle, marginLeft: 8 }} onClick={this.onRemovePhoto.bind(this)}>
                                    Remove photo
                                </Button>
                            </Space>
                        </Card.Grid>

                        <Card.Grid hoverable={false} style={{ ...CardRowStyle }}>
                            <Row>
                                <Col span={12}>
                                    <Text>First name</Text>
                                    <Input style={inputStyle} value={firstName} onChange={this.onChangeFirstName.bind(this)} />
                                </Col>
                                <Col span={12}>
                                    <Text style={{ marginLeft: "10px" }}>Last name</Text>
                                    <Input style={{ ...inputStyle, marginLeft: "10px" }} value={lastName} onChange={this.onChangeLastName.bind(this)} />
                                </Col>
                            </Row>
                        </Card.Grid>
                    </Card>
                </Col>

            </Row>
        );
    }
}

export default PersonalSettings;