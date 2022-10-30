import React, { Component } from 'react';
import {Row, Col, Button, Avatar, Dropdown, Typography, Menu } from 'antd'
import { connect } from 'react-redux';
import KabadaIcon from './KabadaIcon';
import { logout } from '../../appStore/actions/authenticationActions';
import { withRouter } from "react-router-dom";
import {buttonStyle} from '../../styles/customStyles';
import { CaretDownFilled, SettingOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';

const { Text } = Typography;

const headerStyles = {
    width: '100%', 
    height: 64, 
    backgroundColor: '#FFFFFF',
}
const avatarTextStyle = {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '22px'
}

class Header extends Component {


    onSettingsClick() {
        this.props.history.push(`/user-settings`);
    }

    onMyPlansClick() {
        this.props.history.push(`/personal-business-plans`);
    }

    onPublicPlansClick() {
        this.props.history.push(`/public-business-plans`);
    }

    onHomeClick() {
        this.props.history.push(`/`);
    }

    render() {  
        const name = this.props.user.name === null || this.props.user.name === '' ? this.props.user.email.substring(0, this.props.user.email.indexOf("@")) : this.props.user.name;

        const menu = (
            <Menu>
                <Menu.Item onClick={() => this.onSettingsClick()}>
                    <SettingOutlined />
                    <span>Settings</span>
                </Menu.Item>
                <Menu.Item onClick={() => {
                        localStorage.removeItem("plan");
                        this.props.logout();
                        this.props.history.push(`/`);
                    }}>
                    <LogoutOutlined />
                    <span>Log out</span>
                </Menu.Item>
            </Menu>
          );

        return (
            <>
                <Row style={headerStyles} align="middle">
                    <Col span={12}>
                    <div style={{paddingLeft:24, display: 'flex', alignItems: 'center'}}>
                        <KabadaIcon onClick={() => this.onHomeClick()}/>
                        <Button 
                            type="text" 
                            style={{...buttonStyle, cursor: 'pointer'}}
                            onClick={() => this.onMyPlansClick()}
                        >
                            My Business Plans
                        </Button>
                        <Button 
                            type="text" 
                            onClick={() => this.onPublicPlansClick()}
                            style={{...buttonStyle, cursor: 'pointer'}}
                        >
                            Public business plans
                        </Button>
                    </div>
                        
                    </Col>
                    <Col span={4} offset={8} >
                        <div style={{float: 'right', marginRight: 24}}>
                            <Avatar size={32} icon={<UserOutlined />}/>
                            
                            <Dropdown overlay={menu} >
                                <Text style={{...avatarTextStyle, paddingLeft: 8}}>{name} <CaretDownFilled /></Text>
                            </Dropdown> 
                        </div>
                    </Col>
                </Row>    
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, { logout })(withRouter(Header));
