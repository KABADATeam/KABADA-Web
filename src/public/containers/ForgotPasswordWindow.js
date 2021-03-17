import React, { Component } from 'react';
import ResetPassword from '../components/ResetPassword';

class ForgotPasswordWindow extends Component {

    render() {        
        return (
            <>
                <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", width: "100%" }}>
                    <div style={{ width: "486px", marginLeft: "auto", marginRight: "auto" }}>
                        <ResetPassword />
                    </div>
                </div>     
                <div style={{ position: "absolute", bottom: "1rem", width: "100%", textAlign: "center" }}>
                    © KABADA {new Date().getFullYear()}
                </div>
            </>
        );
    }
}

export default ForgotPasswordWindow;