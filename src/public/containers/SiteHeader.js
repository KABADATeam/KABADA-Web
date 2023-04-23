import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'antd';
import KabadaIcon from '../../private/components/KabadaIcon';
import '../../css/Home.css';
import {buttonStyle} from '../../styles/customStyles';
import HomeScreen from '../components/HomeScreen';

const headerStyles = {
    width: '100%',
    height: 64,
    backgroundColor: '#FFFFFF',
}


class SiteHeader extends React.Component {

    onHowToUseKabada = () => {
        window.open("https://kabada.eu/how-to-use-kabada/");
    };
    onLoginClick = () =>  {
        <Link to='/login '/>
    }

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
                        {/* <Button
                                type="text"
                                onClick={() => this.onHowToUseKabada()}
                                style={{...buttonStyle, cursor: 'pointer'}}
                            >
                                How To Use KABADA
                        </Button> */}
                        
                        <div style={{ float: 'right', marginRight: 24 }}>
                            {/* <Link to='/login'>
                                <h4>Login</h4>
                            </Link> */}
                        <Button
                                type="text"
                                onClick={() => this.onHowToUseKabada()}
                                style={{...buttonStyle, cursor: 'pointer'}}
                            >
                                How To Use KABADA
                        </Button>
                        <Button
                                type="text"
                                //onClick={() => this.onLoginClick()}
                                style={{...buttonStyle, cursor: 'pointer'}}
                            >
                                <Link to='/login'>
                                Login
                            </Link>
                        </Button>
                        </div>


                    </Col>

                </Row>

                <HomeScreen />
            </>
        )
    }
}

export default SiteHeader;