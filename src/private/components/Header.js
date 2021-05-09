import React, { Component } from 'react';
import {Row, Col, Button, Avatar, Dropdown, Typography, Menu} from 'antd'
import { connect } from 'react-redux';
import KabadaIcon from './KabadaIcon';
import { logout } from '../../appStore/actions/authenticationActions';
<<<<<<< HEAD
import { withRouter, Redirect } from "react-router-dom";
=======
import { withRouter } from "react-router-dom";
>>>>>>> b01501c6ee6b823450743daf73c9299709e8efa5
import {buttonStyle} from '../../styles/customStyles';
import { CaretDownFilled, UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

const headerStyles = {
<<<<<<< HEAD
=======
    position: 'absolute',
>>>>>>> b01501c6ee6b823450743daf73c9299709e8efa5
    width: '100%', 
    height: 64, 
    backgroundColor: '#FFFFFF',
}
<<<<<<< HEAD

=======
>>>>>>> b01501c6ee6b823450743daf73c9299709e8efa5
const avatarTextStyle = {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '22px'
}

<<<<<<< HEAD
class Header extends Component {


    onSettingsClick() {
        this.props.history.push(`/user-settings`);
    }

    render() {  

        const name = this.props.user.name === '' ? this.props.user.email.substring(0, this.props.user.email.indexOf("@")) : this.props.name;

        const menu = (
            <Menu>
                <Menu.Item onClick={() => this.onSettingsClick()}>
                    Settings
                </Menu.Item>
                <Menu.Item onClick={() => this.props.logout()}>
                    Log out
                </Menu.Item>
=======


class Header extends Component {
    render() {  
        const menu = (
            <Menu>
              <Menu.Item onClick={() => this.props.logout()}>
                Log out
              </Menu.Item>
              
>>>>>>> b01501c6ee6b823450743daf73c9299709e8efa5
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
<<<<<<< HEAD
                                <Text style={{...avatarTextStyle, paddingLeft: 8}}>{name} <CaretDownFilled /></Text>
=======
                                <Text style={{...avatarTextStyle, paddingLeft: 8}}>Kaspars <CaretDownFilled /></Text>
>>>>>>> b01501c6ee6b823450743daf73c9299709e8efa5
                            </Dropdown> 
                        </div>
                    </Col>
                </Row>    
            </>
        );
    }
}

<<<<<<< HEAD
const mapStateToProps = (state) => {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, { logout })(withRouter(Header));
=======
export default connect(null, { logout })(withRouter(Header));
>>>>>>> b01501c6ee6b823450743daf73c9299709e8efa5
