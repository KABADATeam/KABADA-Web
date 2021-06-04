import React, { Component } from 'react';
import FooterComponent from '../components/FooterComponent';
import {Layout} from 'antd';

const { Content } = Layout;

class AuthenticationWindow extends Component {

    render() {        
        return (
            <>
                <div style={{ minHeight: 'calc(100% - 50px)', width: '100%', backgroundColor: 'rgb(245, 245, 245)' }}>
                    <Layout style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", width: "100%", backgroundColor: 'rgb(245, 245, 245)' }}>
                        <Content style={{ width: "486px", marginLeft: "auto", marginRight: "auto" }}>
                            {this.props.children}
                        </Content>
                    </Layout>
                </div>
                <div>
                    <FooterComponent alignment='center' divider={false}/>
                </div>
            </>
        );
    }
}

export default AuthenticationWindow;