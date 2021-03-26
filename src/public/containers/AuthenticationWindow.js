import React, { Component } from 'react';
import Footer from '../components/Footer';

class AuthenticationWindow extends Component {

    render() {        
        return (
            <>
                <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", width: "100%" }}>
                    <div style={{ width: "486px", marginLeft: "auto", marginRight: "auto" }}>
                        {this.props.children}
                    </div>
                </div>     
                <Footer alignment='center' divider={false} />
            </>
        );
    }
}

export default AuthenticationWindow;