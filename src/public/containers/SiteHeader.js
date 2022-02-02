import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Divider, Card, Image } from 'antd';
import KabadaIcon from '../../private/components/KabadaIcon';
import '../../css/Home.css'
import { FacebookFilled, InstagramOutlined, LinkedinFilled, TwitterOutlined } from '@ant-design/icons';

const headerStyles = {
    width: '100%',
    height: 64,
    backgroundColor: '#FFFFFF',
}

const { Meta } = Card;
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

                <Row style={{ marginTop: '77px' }}>

                    <Col span={12} offset={2}  >

                        <h1 className='h1Style'>Get down to business and grow sales</h1>
                        <p>Engage your customers and boost your business with Mailchimp's advanced, yet easy‑to‑use marketing platform.</p>

                        <Col span={12} >
                            <Button className='PrimaryButton' type="primary">Create business plan</Button>
                        </Col>
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
                    <Col span={10} offset={2} style={{ marginTop: '60px' }}>
                        <h2>Who is this tool for?</h2>
                        <p>Bring your audience data, marketing channels, and insights together so you can reach your goals faster—all from a single platform.</p>
                    </Col>

                    <Col span={10} style={{ marginTop: '60px', marginBottom: '115px' }} >
                        <span className='whoIsSpan'>entrepreneurs</span>
                        <span className='whoIsSpan'>development finance institutions and related</span>
                        <span className='whoIsSpan'>students</span>
                        <span className='whoIsSpan'>teaching staff of HEI</span>
                        <span className='whoIsSpan'>business consultants</span>
                        <span className='whoIsSpan'>entrepreneurs</span>
                        <span className='whoIsSpan'>
                            business consultants
                            other parties interested in development of business ideas (pupils, unemployed,…)
                        </span>
                    </Col>
                </Row>

                <Row style={{ background: '#F5F5F5' }}>

                    <Col span={12} offset={9} style={{ marginTop: '72px', marginBottom: '56px' }}><h2 className='h2Style' style={{ width: '486px', textAlign: 'center' }}>Resources to give you the inside track</h2></Col>
                    <Col offset={4} span={4} >
                        <Card
                            hoverable
                            style={{ width: 282 }}
                            cover={<img alt="example" src="Rectangle7.png" />}
                        >
                            <h3>KABADA: Why is it a more comprehensive assessment tool than the others?</h3>
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>

                    </Col>

                    <Col span={4} >
                        <Card
                            hoverable
                            style={{ width: 282 }}
                            cover={<img alt="example" src="Rectangle7.png" />}
                        >
                            <h3>KABADA: Why is it a more comprehensive assessment tool than the others?</h3>
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </Col>

                    <Col span={4}>
                        <Card
                            hoverable
                            style={{ width: 282 }}
                            cover={<img alt="example" src="Rectangle7.png" />}
                        >
                            <h3>KABADA: Why is it a more comprehensive assessment tool than the others?</h3>
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </Col>

                    <Col span={4}>
                        <Card
                            hoverable
                            style={{ width: 282 }}
                            cover={<img alt="example" src="Rectangle7.png" />}
                        >
                            <h3>KABADA: Why is it a more comprehensive assessment tool than the others?</h3>
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </Col>

                    <Col span={12} offset={11} style={{ marginTop: '66px', marginBottom: '88px' }}><Button className='Archive'>See Archive</Button></Col>
                </Row>

                <div style={{ background: '#ffff', marginBottom: '200px' }}>
                    <Row >
                        <Col span={12} offset={9} style={{ marginTop: '72px', marginBottom: '56px' }}>
                            <h2 className='h2Style' style={{ width: '486px', textAlign: 'center' }}>Partners</h2>
                        </Col>
                        <Col offset={4} span={4}>
                            <Card
                                className='card'
                                hoverable
                                style={{ width: 282, height: '97px', content: 'contents' }}
                                cover={<img alt="example" src="image36.png" />}
                            >
                            </Card>
                        </Col>

                        <Col span={4}>
                            <Card
                                className='card'
                                hoverable
                                style={{ width: 282, height: '97px', content: 'contents' }}
                                cover={<img alt="example" src="image36.png" />}
                            >
                            </Card>
                        </Col>

                        <Col span={4}>
                            <Card
                                className='card'
                                hoverable
                                style={{ width: 282, height: '97px', content: 'contents' }}
                                cover={<img alt="example" src="image36.png" />}
                            >
                            </Card>
                        </Col>

                        <Col span={4}>
                            <Card
                                className='card'
                                hoverable
                                style={{ width: 282, height: '97px', content: 'contents' }}
                                cover={<img alt="example" src="image36.png" />}
                            >
                            </Card>
                        </Col>
                    </Row>

                    <Row style={{ marginTop: '24px' }}>
                        <Col offset={4} span={4}>
                            <Card
                                className='card'
                                hoverable
                                style={{ width: 282, height: '97px', content: 'contents' }}
                                cover={<img alt="example" src="image36.png" />}
                            >
                            </Card>
                        </Col>

                        <Col span={4}>
                            <Card
                                className='card'
                                hoverable
                                style={{ width: 282, height: '97px', content: 'contents' }}
                                cover={<img alt="example" src="image36.png" />}
                            >
                            </Card>
                        </Col>

                        <Col span={4}>
                            <Card
                                className='card'
                                hoverable
                                style={{ width: 282, height: '97px', content: 'contents' }}
                                cover={<img alt="example" src="image36.png" />}
                            >
                            </Card>
                        </Col>

                        <Col span={4}>
                            <Card
                                className='card'
                                hoverable
                                style={{ width: 282, height: '97px', content: 'contents' }}
                                cover={<img alt="example" src="image36.png" />}
                            >
                            </Card>
                        </Col>
                    </Row>
                </div>


                <Row style={{ background: '#262626' }} >
                    <Col offset={2} span={20} style={{ alignContent: 'center' }}><h1 className='getDown'>Get down to business and grow sales</h1></Col>

                    <Col style={{ textAlign: 'center', marginBottom: '115px' }} offset={2} span={20}>
                        <Button className='PrimaryButton' type="primary">Get Started</Button>
                    </Col>
                </Row>


                <Row style={{ background: '#ffff' }} >

                    <Col offset={2} span={10} style={{ marginTop: '53px' }}>
                        <Image alt='EU' src='image46.png' />

                        <p className='secanP' style={{ textAlign: 'left' }}>The information and views set out in this web-site are those
                            of the authors and do not necessarily reflect the official opinion of the European Union. Neither the European Union institutions and bodies nor
                            any person acting on their behalf may be held responsible for the use which may be made of the information contained therein.</p>
                    </Col>
                    <Col offset={3} style={{ background: '#262626', marginTop: '53px', height: '95px' }}>
                        <FacebookFilled style={{ fontSize: '50px', color: '#ffff', padding: '10px' }} />
                        <LinkedinFilled style={{ fontSize: '50px', color: '#ffff', padding: '10px' }} />
                        <TwitterOutlined style={{ fontSize: '50px', color: '#ffff', padding: '10px' }} />
                        <InstagramOutlined style={{ fontSize: '50px', color: '#ffff', padding: '23px 10px' }} />
                    </Col>

                </Row>
            </>
        )
    }
}

export default SiteHeader;