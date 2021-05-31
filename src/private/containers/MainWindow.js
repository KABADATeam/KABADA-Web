import React from 'react';
import FooterComponent from '../../public/components/FooterComponent';
import {Layout} from 'antd';

const { Content } = Layout;

class MainWindow extends React.Component {

    render() {        
        return (
            <Layout style={{minHeight: '100%', position: "relative", marginBottom: 0, paddingBottom: 20, boxSizing: "border-box" }}>
                <Content >
                        {this.props.children}
                </Content>
                <FooterComponent alignment='left' divider={true}/>
            </Layout>              
        );
    }
}

export default MainWindow;