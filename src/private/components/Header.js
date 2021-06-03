import React, { Component } from 'react';
import {Row, Col, Button, Avatar, Dropdown, Typography, Menu } from 'antd'
import { connect } from 'react-redux';
import KabadaIcon from './KabadaIcon';
import { logout } from '../../appStore/actions/authenticationActions';
import { withRouter, Redirect } from "react-router-dom";
import {buttonStyle} from '../../styles/customStyles';
import { CaretDownFilled, SettingOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
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

    onSwotClick() {
        this.props.history.push(`/swot`);
    }

    onResourcesClick() {
        this.props.history.push(`/key-resources`);
    }

    render() {  

        const name = this.props.user.name === '' ? this.props.user.email.substring(0, this.props.user.email.indexOf("@")) : this.props.name;

        const menu = (
            <Menu>
                <Menu.Item onClick={() => this.onSettingsClick()}>
                    <SettingOutlined />
                    <span>Settings</span>
                </Menu.Item>
                <Menu.Item onClick={() => this.props.logout()}>
                    <LogoutOutlined />
                    <span>Log out</span>
                </Menu.Item>
                <SubMenu title="Temps">
                    <Menu.Item onClick={() => this.onSwotClick()}>SWOT</Menu.Item>
                    <Menu.Item onClick={() => this.onResourcesClick()}>Key Resources</Menu.Item>
                </SubMenu>
            </Menu>
          );

        return (
            <>
                <Row style={headerStyles} align="middle">
                    <Col span={12}>
                    <div style={{paddingLeft:24, display: 'flex', alignItems: 'center'}}>
                        <KabadaIcon/>
                        <Button 
                            type="text" 
                            href="/personal-business-plans"
                            style={{...buttonStyle}}
                        >
                            My Business Plans
                        </Button>
                        <Button 
                            type="text" 
                            href="/public-business-plans"
                            style={{...buttonStyle, }}
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
