import React, { Component } from 'react';
import {Row, Col, Button, Avatar, Dropdown, Typography, Menu} from 'antd'
import { connect } from 'react-redux';
import KabadaIcon from './KabadaIcon';
import { logout } from '../../appStore/actions/authenticationActions';
import { withRouter } from "react-router-dom";
import {buttonStyle} from '../../styles/customStyles';
import { CaretDownFilled, UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

const headerStyles = {
    position: 'absolute',
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
    render() {  
        const menu = (
            <Menu>
              <Menu.Item onClick={() => this.props.logout()}>
                Log out
              </Menu.Item>
              
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
                                <Text style={{...avatarTextStyle, paddingLeft: 8}}>Kaspars <CaretDownFilled /></Text>
                            </Dropdown> 
                        </div>
                    </Col>
                </Row>    
            </>
        );
    }
}

export default connect(null, { logout })(withRouter(Header));