import React, { Component } from 'react';
import FooterComponent from '../components/FooterComponent';
import {Layout} from 'antd';

const { Content } = Layout;

class AuthenticationWindow extends Component {

    render() {        
        return (
            <Layout style={{minHeight: '100%', position: "relative", marginBottom: -20, paddingBottom: 20, boxSizing: "border-box" }}>
                <Content >
                        {this.props.children}
                </Content>
                <FooterComponent alignment='center' divider={false}/>
            </Layout>
                     
            
        );
    }
}

export default AuthenticationWindow;