import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Menu } from 'antd';

class SiteHeader extends React.Component {
    render() {
        return (
            <>
                <Row align='middle' style={{ backgroundColor: 'lightgray', height: '70px' }}>
                    <Col span={4}>
                        <img src='kabada_logo.png' style={{ height: '60px'}} alt='Kabada logo :)' />
                    </Col>
                    <Col span={20}>
                        <Menu mode="horizontal" style={{ height: '65px', float: 'right', backgroundColor: 'inherit', borderBottom: 'none' }}>
                            <Menu.Item key='about'>
                                <Link to='/about'>
                                    <h4 style={{ marginTop: '10px' }}>About</h4>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key='privacy'>
                                <Link to='/privacy'>
                                    <h4>Privacy Policy</h4>
                                </Link>
                            </Menu.Item>
                            <Menu.Item name='login'>
                                <Link to='/login'>
                                    <h4>Login</h4>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Col>
                </Row>
            </>
        )
    }
}

export default SiteHeader;