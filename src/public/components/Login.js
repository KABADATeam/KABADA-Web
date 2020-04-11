import React from 'react';

class Login extends React.Component {
    render() {
        return (
            <div>
                <div>
                    Login stuff
                </div>
                <div>
                    Don't have account, yet? Follow the <a href='register'>Registration</a> link to create one 
                </div>
                <div>
                    Forgot password? Follow the <a href='reset'>Password reset</a> link to get new one
                </div>
            </div>
        )
    }
}

export default Login;