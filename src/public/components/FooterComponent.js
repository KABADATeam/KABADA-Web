import React, { Component } from 'react';
import { footerStyle } from '../../styles/customStyles'
import { Divider, Layout } from 'antd';

const {Footer} = Layout;

class FooterComponent extends Component {
    render() {
        const {alignment, divider} = this.props;
        if (divider === true) {
            return (
                <Footer style={{...footerStyle, textAlign: alignment }}>
                    <Divider style={{marginBottom: 10.5 }}/>
                    © KABADA {new Date().getFullYear()}
                </Footer>
            )
        }
        else if (divider === false) {
            return (
                <Footer style={{...footerStyle, textAlign: alignment }}>
                    © KABADA {new Date().getFullYear()}
                </Footer>
            )
        }       
    }
}

export default FooterComponent;