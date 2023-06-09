import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Button, Breadcrumb, Row, Col, Typography, Space } from 'antd';
import LoginServicesSettings from '../components/LoginServicesSettings';
import NotificationSettings from '../components/NotificationSettings';
import EmailPasswordSettings from '../components/EmailPasswordSettings';
import PersonalSettings from '../components/PersonalSettings';
import { buttonStyle } from '../../styles/customStyles';
import Cookies from 'js-cookie';
import { ArrowLeftOutlined } from '@ant-design/icons';
import UnsavedChangesHeader from '../components/UnsavedChangesHeader';
import { connect } from 'react-redux';
import { getUserSettings, updateUserSettings, changeUserPassword } from "../../appStore/actions/settingsAction";
import { logout } from '../../appStore/actions/authenticationActions';

const { Text } = Typography;

const settingsGroupTitleTextStyle = {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 20,
}

const titleTextStyle = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "30px",
    lineHeight: "38px"
}

const titleButtonStyle = {
    width: "40px",
    height: "40px",

    border: "1px solid #BFBFBF",
    boxSizing: "border-box",

    filter: "drop-shadow(0px 1px 0px rgba(0, 0, 0, 0.05))",
    borderRadius: "4px",
    backgroundColor: "transparent"
}

class UserSettingsWindow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisibleHeader: 'hidden',
            settings: {},
            isPhotoChanged: false,
            resetPhoto: false
        };
    }

    componentDidMount() {
        if (Cookies.get('access_token') !== undefined && Cookies.get('access_token') !== null) {
            this.props.getUserSettings()
                .then(
                    () => {
                        this.setState({
                            settings: this.props.userSettings
                        });
                    },
                    (error) => {
                        this.setState({
                            settings: {}
                        });
                    }
                )
        } else {
            this.props.logout()
            this.props.history.push('/')
        }

    }

    onBackClick() {
        this.props.history.push(`/personal-business-plans`);
    }

    hideChangesHeader = () => {
        this.setState({
            isVisibleHeader: 'hidden',
        });
    };

    showChangesHeader = () => {
        this.setState({
            isVisibleHeader: 'visible',
        });
    };

    changeRecieveEmail = (value) => {
        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                recieveEmail: value
            }
        }));
    };

    changeRecieveNotification = (value) => {
        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                recieveNotification: value
            }
        }));
    }

    changeFirstName = (value) => {
        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                firstName: value
            }
        }));
    };

    changeLastName = (value) => {
        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                lastName: value
            }
        }));
    };

    changeFacebook = (value) => {
        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                facebook: value
            }
        }));
    };

    changeGoogle = (value) => {
        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                google: value
            }
        }));
    };

    discardChanges = () => {
        this.setState({
            settings: this.props.userSettings,
            resetPhoto: true,
        });
        this.hideChangesHeader();
    };


    saveChanges = () => {
        this.hideChangesHeader();
        this.props.updateUserSettings(this.state.settings, this.state.isPhotoChanged);
        this.setState({
            isPhotoChanged: false,
            resetPhoto: false
        })
    };

    removePhoto = (isPhotoChanged) => {
        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                userPhoto: ''
            },
            isPhotoChanged: isPhotoChanged,
            resetPhoto: false,
        }));
    }

    changePhoto = (src, isPhotoChanged) => {
        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                userPhoto: src,
            },
            isPhotoChanged: isPhotoChanged,
            resetPhoto: false,
        }));
    }

    render() {
        const isVisibleHeader = this.state.isVisibleHeader;
        return (
            <>
                <UnsavedChangesHeader
                    visibility={isVisibleHeader}
                    handleHiding={this.hideChangesHeader}
                    discardChanges={this.discardChanges}
                    saveChanges={this.saveChanges}
                />
                <Col span={16} offset={4}>
                    <Breadcrumb style={{ marginTop: "40px" }}>
                        <Breadcrumb.Item>
                            <Space><Link to='/personal-business-plans'>My Business plans</Link></Space>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Settings
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>

                <Row align="middle" style={{ marginTop: "9px" }}>
                    <Col offset={4}>
                        <Button icon={<ArrowLeftOutlined />} style={titleButtonStyle} onClick={() => this.onBackClick()}></Button>
                    </Col>
                    <Col>
                        <Text style={{ ...titleTextStyle, marginLeft: "16px" }}>Settings</Text>
                    </Col>
                </Row>


                <Col span={16} offset={4}>
                    <Divider />
                </Col>

                <Row>
                    <Col span={4} offset={4}>
                        <Text style={settingsGroupTitleTextStyle}>Registration data</Text>
                    </Col>
                    <Col span={12}>
                        <EmailPasswordSettings />
                        <LoginServicesSettings
                            settings={this.state.settings}
                            handleHeader={this.showChangesHeader}
                            handleGoogle={this.changeGoogle}
                            // handleFacebook={this.changeFacebook}
                        />
                    </Col>
                </Row>

                <Col span={16} offset={4}>
                    <Divider />
                </Col>

                <Row>
                    <Col span={4} offset={4}>
                        <Text style={settingsGroupTitleTextStyle}>Personal data</Text>
                    </Col>
                    <Col span={12}>
                        <PersonalSettings
                            settings={this.state.settings}
                            handleHeader={this.showChangesHeader}
                            handleChangeFirstName={this.changeFirstName}
                            handleChangeLastName={this.changeLastName}
                            handleRemovePhoto={this.removePhoto}
                            handleChangePhoto={this.changePhoto}
                            resetPhoto={this.state.resetPhoto}
                        />
                    </Col>
                </Row>

                <Col span={16} offset={4}>
                    <Divider />
                </Col>

                <Row>
                    <Col span={4} offset={4}>
                        <Text style={settingsGroupTitleTextStyle}>Notification settings</Text>
                    </Col>
                    <Col span={12}>
                        <NotificationSettings
                            settings={this.state.settings}
                            handleHeader={this.showChangesHeader}
                            handleRecieveEmail={this.changeRecieveEmail}
                            handleRecieveNotification={this.changeRecieveNotification}
                        />
                    </Col>
                </Row>

                <Col span={16} offset={4}>
                    <Divider />
                </Col>

                <Col span={16} offset={4}>
                    <div style={{ float: "right", height: "140px" }}>
                        <Button style={{ ...buttonStyle, marginRight: "8px" }} onClick={this.discardChanges}>Discard</Button>
                        <Button type="primary" style={{ ...buttonStyle }} onClick={this.saveChanges}>Save</Button>
                    </div>
                </Col>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error,
        message: state.message,
        userSettings: state.userSettings,
    };
}

export default connect(mapStateToProps, { getUserSettings, updateUserSettings, changeUserPassword, logout })(UserSettingsWindow);
