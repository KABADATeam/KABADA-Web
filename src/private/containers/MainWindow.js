import React from 'react';
import FooterComponent from '../../public/components/FooterComponent';
import {Layout} from 'antd';

const { Content } = Layout;

class MainWindow extends React.Component {

    render() {        
        return (
            <Layout style={{minHeight: 'calc(100% - 64px)', position: "relative", marginBottom: -20, paddingBottom: 0, backgroundColor: '#F5F5F5'}}>
                <Content >
                        {this.props.children}
                </Content>
                <FooterComponent alignment='left' divider={true}/>
            </Layout>              
        );
    }
}

export default MainWindow;