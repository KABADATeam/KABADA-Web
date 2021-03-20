import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div style={{ position: "absolute", bottom: "16px", width: "100%", textAlign: "center", fontSize: '12px', color: '#8C8C8C' }}>
                © KABADA {new Date().getFullYear()}
            </div>
        )
    }
}

export default Footer;