import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Menu, Image } from 'antd';

class SiteHeader extends React.Component {
    render() {
        return (
            <>
                <Row>
                    <Col span={4}>
                        <Image src='kabada_logo.png' width={120} />
                    </Col>
                    <Col span={20}>
                        <Menu mode="horizontal">
                            <Menu.Item key='about'>
                                <Link to='/about'>
                                    <h4>About</h4>
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