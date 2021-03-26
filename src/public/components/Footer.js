import React, { Component } from 'react';
import { footerStyle } from '../../styles/customStyles'
import { Divider } from 'antd';

class Footer extends Component {
    render() {
        const {alignment, divider} = this.props;
        if (divider === true) {
            return (
                <div style={{ ...footerStyle, textAlign: alignment }}>
                    <Divider style={{marginBottom: 10.5 }}/>
                    © KABADA {new Date().getFullYear()}
                </div>
            )
        }
        else if (divider === false) {
            return (
                <div style={{ ...footerStyle, textAlign: alignment }}>
                    © KABADA {new Date().getFullYear()}
                </div>
            )
        }       
    }
}

export default Footer;