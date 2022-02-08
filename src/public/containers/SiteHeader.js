import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import KabadaIcon from '../../private/components/KabadaIcon';
import '../../css/Home.css'
    ;
import HomeScreen from '../components/HomeScreen';

const headerStyles = {
    width: '100%',
    height: 64,
    backgroundColor: '#FFFFFF',
}


class SiteHeader extends React.Component {



    render() {
        return (
            <>
                <Row style={headerStyles} align="middle">
                    <Col span={4}>
                        <div style={{ paddingLeft: 24, display: 'flex', alignItems: 'center' }}>
                            <KabadaIcon />
                        </div>

                    </Col>
                    <Col span={20} >
                        <div style={{ float: 'right', marginRight: 24 }}>
                            <Link to='/login'>
                                <h4>Login</h4>
                            </Link>

                        </div>


                    </Col>

                </Row>

                <HomeScreen />
            </>
        )
    }
}

export default SiteHeader;