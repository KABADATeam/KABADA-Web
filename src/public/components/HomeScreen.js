import React from 'react';
import { Row, Col, Button, Divider, Card, Image, List, Typography } from 'antd';
import '../../css/Home.css'
import { FacebookFilled, InstagramOutlined, LinkedinFilled, TwitterOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import { connect } from 'react-redux'
import { getPosts } from '../../appStore/actions/homeAction';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import moment from 'moment'
import { changeState } from '../../appStore/actions/homeAction'
import { Link } from 'react-router-dom';

const { Meta } = Card;


const { Title, Paragraph } = Typography;

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAllPost: false,
            link: ''
        }
    }
    componentDidMount() {
        this.props.getPosts(() => {
            console.log(this.props.homeReducer)

        });
        this.checkLoginStatus()
    }

    checkLoginStatus = () => {
        if (Cookies.get('access_token') !== undefined && Cookies.get('access_token') !== null) {
            this.setState({
                link: `/personal-business-plans`
            })

        } else {
            this.setState({
                link: '/login'
            })


        }
    }
    openPopup = () => {
        this.props.changeState(false);
    }
    onClick = () => {
        if (this.state.showAllPost === false) {
            this.setState({
                showAllPost: true
            })
        } else {
            this.setState({
                showAllPost: false
            })
        }
    }
    render() {
        const allPosts = this.props.homeReducer;
        const fourPosts = this.props.homeReducer.slice(0, 4);

        const Partners = [

            {
                id: 1,
                imgPath: 'image36.png'
            }, {
                id: 2,
                imgPath: 'image37.png'
            }, {
                id: 3,
                imgPath: 'image38.png'
            }, {
                id: 4,
                imgPath: 'image39.png'
            }, {
                id: 5,
                imgPath: 'SETSlogo.png'
            }, {
                id: 6,
                imgPath: 'IPS_logo.png'
            }, {
                id: 7,
                imgPath: 'ArtSmart_Logo_eng.png'
            }, {
                id: 8,
                imgPath: 'download.png'
            },
            {
                id: 9,
                imgPath: 'CSCS-logocscs.png'
            }

        ]
        return (
            <>

                <Row style={{ marginTop: '77px' }}>

                    <Col span={11} offset={2}  >

                        <h1 className='h1Style'>Start off your business on the right foot</h1>
                        <p style={{ marginTop: '5%' }}>Get organized and set up your business plan properly using our easy-to-use structured framework</p>

                        <Col span={12} >
                            <Link to={this.state.link}>
                                <Button onClick={() => this.openPopup()} className='PrimaryButton' type="primary">Create business plan</Button>
                            </Link>
                        </Col>
                    </Col>

                    <Col span={5} >
                        <img style={{ width: '196%' }} alt='main' src='Main.png' />
                    </Col>

                </Row>

                <Row style={{ background: '#ffff' }}>

                    <Col span={12} offset={7} style={{ marginTop: '85px' }}  >

                        <Paragraph className='secanP'>KABADA stands for Knowledge Alliance of Business
                            Idea Assessment: Digital Approach. It is a structured,
                            Web-based platform that purports to take the guesswork
                            out of business plan development. Informed by theoretical
                            research, relevant statistics, and artificial intelligence (AI)
                            insights, the tool guides new entrepreneurs through every step of
                            the way, helping them understand where they stand, where and how
                            they might consider going, and what challenges and
                            opportunities lie ahead.</Paragraph>


                    </Col>
                    <Col span={20} offset={2}>
                        <Divider style={{ color: 'red', background: "#D9D9D9" }} />
                    </Col>
                </Row>

                <Row style={{ background: '#ffff' }}>

                    <Col offset={2} span={10} style={{ marginTop: '85px' }}  >

                        <h2 className='h2Style'>Do it all with KABADA</h2>

                        <p style={{ width: '64%', marginBottom: '7%' }} className='pStyle'>Set up your perfect business plan from scratch. From the initial business idea to detailed financial projections, KABADA provides a way to plan and assess every aspect of your new enterprise.</p>

                    </Col>
                    <Col span={12} style={{ marginTop: '85px' }}  >

                        <Col>
                            <svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 9V27C0 28.625 1.375 30 3 30H6V6H3C1.375 6 0 7.375 0 9ZM21 0H11C9.375 0 8 1.375 8 3V30H24V3C24 1.375 22.625 0 21 0ZM21 6H11V3H21V6ZM29 6H26V30H29C30.625 30 32 28.625 32 27V9C32 7.375 30.625 6 29 6Z" fill="#1890FF" />
                            </svg>

                            <h3 className='h3Style'>Business Canvas</h3>

                            <p style={{ width: '80%' }} className='pStyle'>The Business Canvas offers you a structured way to describe your business model. How will your business create, deliver, and capture value?</p>
                        </Col>

                        <Col style={{ marginTop: '5.5%' }}>
                            <svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 9V27C0 28.625 1.375 30 3 30H6V6H3C1.375 6 0 7.375 0 9ZM21 0H11C9.375 0 8 1.375 8 3V30H24V3C24 1.375 22.625 0 21 0ZM21 6H11V3H21V6ZM29 6H26V30H29C30.625 30 32 28.625 32 27V9C32 7.375 30.625 6 29 6Z" fill="#1890FF" />
                            </svg>
                            <h3 className='h3Style'>Financial Projections</h3>

                            <p style={{ width: '80%' }} className='pStyle'>The Financial Projections section will evaluate your company's current and future financial position. What assets

                                do you have? What investments will you need? What will your costs and revenues be? Will your overall cash flow over time be viable?</p>
                        </Col>

                        <Col style={{ marginTop: '6.5%' }}>

                            <svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 9V27C0 28.625 1.375 30 3 30H6V6H3C1.375 6 0 7.375 0 9ZM21 0H11C9.375 0 8 1.375 8 3V30H24V3C24 1.375 22.625 0 21 0ZM21 6H11V3H21V6ZM29 6H26V30H29C30.625 30 32 28.625 32 27V9C32 7.375 30.625 6 29 6Z" fill="#1890FF" />
                            </svg>
                            <h3 className='h3Style'>SWOT Analysis</h3>

                            <p style={{ width: '80%' }} className='pStyle'>Short for "Strengths, Weaknesses, Opportunities, and Threats", SWOT analysis allows you to identify both internal and external factors that affect your likelihood to succeed. What are your firm’s internal strengths and weaknesses relative to your competition? What opportunities does the external environment offer you</p>
                        </Col>

                        <Col style={{ marginTop: '12.5%' }}>

                            <svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 9V27C0 28.625 1.375 30 3 30H6V6H3C1.375 6 0 7.375 0 9ZM21 0H11C9.375 0 8 1.375 8 3V30H24V3C24 1.375 22.625 0 21 0ZM21 6H11V3H21V6ZM29 6H26V30H29C30.625 30 32 28.625 32 27V9C32 7.375 30.625 6 29 6Z" fill="#1890FF" />
                            </svg>
                            <h3 className='h3Style'>Personal Characteristics</h3>

                            <p style={{ width: '80%' }} className='pStyle'>The success of a company depends a great deal on the people behind it. In this section, you will answer a few questions about yourself, your reasons for starting the business, and your readiness to tackle the trials ahead. Are you up to the challenge?</p>
                        </Col>

                        <Col style={{ marginTop: '10.5%' }}>

                            <svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 9V27C0 28.625 1.375 30 3 30H6V6H3C1.375 6 0 7.375 0 9ZM21 0H11C9.375 0 8 1.375 8 3V30H24V3C24 1.375 22.625 0 21 0ZM21 6H11V3H21V6ZM29 6H26V30H29C30.625 30 32 28.625 32 27V9C32 7.375 30.625 6 29 6Z" fill="#1890FF" />
                            </svg>
                            <h3 className='h3Style'>Industry data</h3>

                            <p style={{ width: '80%' }} className='pStyle'>
                                You will be provided with data on how others are doing in your industry, in your country, and in the European Union. What are the turnover, the productivity, and the cost structure like? How likely are new firms to survive?</p>
                        </Col>


                        <Col style={{ marginTop: '10.5%', marginBottom: '5%' }}>

                            <svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 9V27C0 28.625 1.375 30 3 30H6V6H3C1.375 6 0 7.375 0 9ZM21 0H11C9.375 0 8 1.375 8 3V30H24V3C24 1.375 22.625 0 21 0ZM21 6H11V3H21V6ZM29 6H26V30H29C30.625 30 32 28.625 32 27V9C32 7.375 30.625 6 29 6Z" fill="#1890FF" />
                            </svg>
                            <h3 className='h3Style'>Industry risk assessment</h3>

                            <p style={{ width: '80%' }} className='pStyle'>
                                KABADA provides a structured overview of the risks your new business may face, depending on the industry in which you plan to operate. Awareness of the potential risks will help you take appropriate action to mitigate their potential impact.</p>
                        </Col>
                    </Col>
                </Row>
                <Row style={{ background: '#ffff' }}>

                    <Col span={20} offset={2}>
                        <Divider style={{ color: 'red', background: "#D9D9D9" }} />
                    </Col>
                    <Col span={10} offset={2} style={{ marginTop: '60px' }}>
                        <h2 className='h2Style'>Who is this tool for?</h2>

                    </Col>

                    <Col span={10} style={{ marginTop: '60px', marginBottom: '115px' }} >
                        <span className='whoIsSpan'>Entrepreneurs</span>
                        <span className='whoIsSpan'>Students</span>
                        <span className='whoIsSpan'>Teaching staff of HEI </span>
                        <span className='whoIsSpan'>Business consultants </span>
                        <span className='whoIsSpan'>Development finance institutions and related </span>
                        <span className='whoIsSpan'>Other parties interested in the development of business ideas</span>

                    </Col>
                </Row>

                <Row style={{ background: '#F5F5F5' }}>

                    <Col span={24} style={{ marginTop: '72px', marginBottom: '56px' }}>
                        <h2 className='h2Style' style={{ textAlign: 'center' }}>Resources to give you the </h2>
                        <h2 className='h2Style' style={{ textAlign: 'center' }}>inside track </h2>
                    </Col>
                    <Col span={20} offset={2}>
                        <List
                            grid={{
                                gutter: 16,
                                xs: 1,
                                sm: 2,
                                md: 3,
                                lg: 3,
                                xl: 4,
                                xxl: 4,
                            }}
                            dataSource={this.state.showAllPost === false ? fourPosts : allPosts}
                            renderItem={item => (
                                <List.Item>
                                    <Card
                                        style={{
                                            height: '292px', borderRadius: '8px', backgroundColor: '#FFFFFF'
                                        }}
                                        cover={<img alt="" src={item.jetpack_featured_media_url} style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', width: '100%', height: '152px', objectFit: 'cover', backgroundSize: '100% auto', backgroundRepeat: 'no-repeat' }} />}
                                    >
                                        <a href={item.link}>
                                            <h3>{item.title.rendered}</h3>

                                        </a>
                                        <Meta title='' description={moment(item.date).format("YYYY/MM/DD")} />
                                    </Card>
                                </List.Item>
                            )}
                        />
                        <Col span={12} offset={11} style={{ marginTop: '66px', marginBottom: '88px' }}><Button onClick={() => this.onClick()} className='Archive'>{this.state.showAllPost === false ? 'Show More' : 'Show less'}</Button></Col>
                    </Col>
                </Row>

                <Row style={{ background: '#F5F5F5' }}>

                </Row>

                <Row style={{ background: '#ffff', marginBottom: '200px' }}>
                    <Col span={24} style={{ marginTop: '72px', marginBottom: '56px' }}>
                        <h2 className='h2Style' style={{ textAlign: 'center' }}>Partners </h2>
                    </Col>
                    <Col span={20} offset={2}>
                        <List
                            grid={{
                                gutter: 60,
                                xs: 1,
                                sm: 2,
                                md: 3,
                                lg: 3,
                                xl: 4,
                                xxl: 4,
                            }}
                            dataSource={Partners}
                            renderItem={item => (
                                <List.Item>
                                    <Card
                                        style={{
                                            height: '97px', borderRadius: '8px', backgroundColor: '#FFFFFF', overflow: 'hidden'
                                        }}
                                        cover={<img alt="" src={item.imgPath} style={{ height: '80px', marginTop: '10px', marginLeft: '10px' }} />}
                                    >
                                    </Card>
                                </List.Item>
                            )}
                        >

                        </List>
                    </Col>
                </Row>


                <Row style={{ background: '#262626' }} >
                    <Col offset={2} span={20} style={{ alignContent: 'center' }}><h1 className='getDown'>Set up your perfect business plan now</h1></Col>

                    <Col style={{ textAlign: 'center', marginBottom: '115px' }} offset={2} span={20}>
                        <Link to={this.state.link}>
                            <Button onClick={() => this.checkLoginStatus()} className='PrimaryButton' type="primary">Create business plan</Button>
                        </Link>
                    </Col>
                </Row>


                <Row style={{ background: '#ffff' }} >

                    <Col offset={2} span={10} style={{ marginTop: '53px' }}>
                        <Image alt='EU' src='image46.png' />

                        <p className='secanP' style={{ textAlign: 'left' }}>The KABADA tool was developed as an Erasmus+ KA2 project No. 612542-EPP-1-2019-1-LV-EPPKA2-KA.</p>
                        <p className='secanP' style={{ textAlign: 'left' }}>The information and views set out in this web-site are those of the authors and do not necessarily reflect the official opinion of the European Union. Neither the European Union institutions and bodies nor any person acting on their behalf may be held responsible for the use which may be made of the information contained therein.</p>
                    </Col>
                    <Col offset={3} style={{ background: '#262626', marginTop: '53px', height: '95px' }}>
                        <a href='https://www.facebook.com/kabadaKA2/'><FacebookFilled style={{ fontSize: '50px', color: '#ffff', padding: '10px' }} /></a>
                        <a href='https://www.linkedin.com/company/kabada-project/'><LinkedinFilled style={{ fontSize: '50px', color: '#ffff', padding: '10px' }} /></a>
                        <a href='https://twitter.com/KabadaKa2'><TwitterOutlined style={{ fontSize: '50px', color: '#ffff', padding: '10px' }} /></a>
                        <a href='https://www.instagram.com/kabada_erasmusplus_ka2/'><InstagramOutlined style={{ fontSize: '50px', color: '#ffff', padding: '10px' }} /></a>

                    </Col>

                </Row>


            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        homeReducer: state.homeReducer.posts

    };

}

export default connect(mapStateToProps, { getPosts, changeState })(withRouter(HomeScreen));

