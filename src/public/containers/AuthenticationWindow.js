import React, { Component } from 'react';
import FooterComponent from '../components/FooterComponent';
import { Layout, Row, Col } from 'antd';

const { Content, Footer, Header } = Layout;

class AuthenticationWindow extends Component {

    render() {
        return (
            <Layout className='layout' style={{width: "100%", minHeight: '100vh', backgroundColor: 'rgb(245, 245, 245)', }}>
                <Header style={{ backgroundColor: 'rgb(245, 245, 245)' }} />
                <Content style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div style={{width: '486px'}}>
                        {this.props.children}
                    </div>
                </Content>
                <Footer style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
                    <FooterComponent alignment='center' divider={false} />
                </Footer>
            </Layout>
            // <>
            //     <div style={{ minHeight: 'calc(100% - 50px)', width: '100%', backgroundColor: 'rgb(245, 245, 245)' }}>
            //         <Layout style={{  backgroundColor: 'rgb(245, 245, 245)' }}>
            //             <Content style={{ width: "486px", marginLeft: "auto", marginRight: "auto" }}>
            //                 {this.props.children}
            //             </Content>
            //         </Layout>
            //     </div>
            //     <div>
            //         <FooterComponent alignment='center' divider={false}/>
            //     </div>
            // </>
        );
    }
}

export default AuthenticationWindow;