import React, { Component } from 'react';
import ResetPassword from '../components/ResetPassword';
import Footer from '../components/Footer';

class ForgotPasswordWindow extends Component {

    render() {        
        return (
            <>
                <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", width: "100%" }}>
                    <div style={{ width: "486px", marginLeft: "auto", marginRight: "auto" }}>
                        <ResetPassword />
                    </div>
                </div>     
                <Footer />
            </>
        );
    }
}

export default ForgotPasswordWindow;