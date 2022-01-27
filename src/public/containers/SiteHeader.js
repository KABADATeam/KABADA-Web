import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Divider } from 'antd';
import KabadaIcon from '../../private/components/KabadaIcon';
import '../../css/Home.css'

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

                <Row offset={2} style={{ marginTop: '77px' }}>

                    <Col span={12} offset={2}  >

                        <h1 className='h1Style'>Get down to business and grow sales</h1>
                        <p>Engage your customers and boost your business with Mailchimp's advanced, yet easy‑to‑use marketing platform.</p>

                        <Button className='PrimaryButton' type="primary">Primary Button</Button>
                    </Col>

                    <Col span={5}>
                        <div className='regtengle'></div>
                    </Col>

                </Row>

                <Row style={{ background: '#ffff' }}>

                    <Col span={12} offset={7} style={{ marginTop: '85px' }}  >

                        <p className='secanP'>KABADA – Knowledge Alliance of Business idea Assessment: Digital Approach –
                            is an Erasmus+ KA2 project aimed at developing a tool based on an artificial intelligence (AI)
                            for the assessment of business ideas and plans applicable to a wide range of young entrepreneurs
                            for the promotion of self-employment and business activities.</p>


                    </Col>
                    <Col span={20} offset={2}>
                        <Divider style={{ color: 'red', background: "#D9D9D9" }} />
                    </Col>
                </Row>

                <Row style={{ background: '#ffff' }}>

                    <Col offset={2} span={10} style={{ marginTop: '85px' }}  >

                        <h2>Do it all with KABADA</h2>

                        <p style={{ width: '64%', marginBottom: '7%' }} className='pStyle'>Bring your audience data, marketing channels, and insights together so you can reach your goals faster—all from a single platform.</p>
                        <h2 className='h2Style'>aka Features</h2>
                        <h2 className='h2Style'>Dropboxī ir vision</h2>
                    </Col>
                    <Col span={12} style={{ marginTop: '85px' }}  >

                        <div>
                            <svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 9V27C0 28.625 1.375 30 3 30H6V6H3C1.375 6 0 7.375 0 9ZM21 0H11C9.375 0 8 1.375 8 3V30H24V3C24 1.375 22.625 0 21 0ZM21 6H11V3H21V6ZM29 6H26V30H29C30.625 30 32 28.625 32 27V9C32 7.375 30.625 6 29 6Z" fill="#1890FF" />
                            </svg>

                            <h3 className='h3Style'>Risk Anssdfgd</h3>

                            <p style={{ width: '55%' }} className='pStyle'>Give your brand a home with a custom domain. Then launch a website to sell products
                                or take appointments, all with built-in marketing tools to help you boost sales and find fans.</p>
                        </div>

                        <div style={{ marginTop: '6.5%' }}>
                            <svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 9V27C0 28.625 1.375 30 3 30H6V6H3C1.375 6 0 7.375 0 9ZM21 0H11C9.375 0 8 1.375 8 3V30H24V3C24 1.375 22.625 0 21 0ZM21 6H11V3H21V6ZM29 6H26V30H29C30.625 30 32 28.625 32 27V9C32 7.375 30.625 6 29 6Z" fill="#1890FF" />
                            </svg>


                            <h3 className='h3Style'>Get your business online</h3>

                            <p style={{ width: '55%' }} className='pStyle'>Give your brand a home with a custom domain. Then launch a website to sell products
                                or take appointments, all with built-in marketing tools to help you boost sales and find fans.</p>
                        </div>

                        <div style={{ marginTop: '6.5%' }}>

                            <svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 9V27C0 28.625 1.375 30 3 30H6V6H3C1.375 6 0 7.375 0 9ZM21 0H11C9.375 0 8 1.375 8 3V30H24V3C24 1.375 22.625 0 21 0ZM21 6H11V3H21V6ZM29 6H26V30H29C30.625 30 32 28.625 32 27V9C32 7.375 30.625 6 29 6Z" fill="#1890FF" />
                            </svg>
                            <h3 className='h3Style'>Get your business online</h3>

                            <p style={{ width: '55%' }} className='pStyle'>Give your brand a home with a custom domain. Then launch a website to sell products
                                or take appointments, all with built-in marketing tools to help you boost sales and find fans.</p>
                        </div>

                        <div style={{ marginTop: '6.5%' }}>

                            <svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 9V27C0 28.625 1.375 30 3 30H6V6H3C1.375 6 0 7.375 0 9ZM21 0H11C9.375 0 8 1.375 8 3V30H24V3C24 1.375 22.625 0 21 0ZM21 6H11V3H21V6ZM29 6H26V30H29C30.625 30 32 28.625 32 27V9C32 7.375 30.625 6 29 6Z" fill="#1890FF" />
                            </svg>
                            <h3 className='h3Style'>Get your business online</h3>

                            <p style={{ width: '55%' }} className='pStyle'>Give your brand a home with a custom domain. Then launch a website to sell products
                                or take appointments, all with built-in marketing tools to help you boost sales and find fans.</p>
                        </div>
                    </Col>

                    <Col span={20} offset={2}>
                        <Divider style={{ color: 'red', background: "#D9D9D9" }} />
                    </Col>
                </Row>



            </>
        )
    }
}

export default SiteHeader;