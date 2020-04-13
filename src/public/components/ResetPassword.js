import React, {Component} from 'react';
import { Grid, Button, Form, Input } from 'semantic-ui-react';

class ResetPassword extends Component {
    state = {
        emailValue: '',
        password: '',
        emailState: true
    }

    validateEmail(event){
        const mailformat = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        if (this.state.emailValue.match(mailformat)){
            this.setState({
                emailState: false,
                password: 'secret information'
            })
            console.log('Good');
        } else {
            this.setState({
                emailState: true,
            })
            console.log('wrong email')
        }
        this.setState({
            emailValue: event.target.value,
        })
    }
    sendPassword(){

        this.setState({
            emailValue: '',
            password: '',
            emailState: true
        }) 
    }
    render() {
        console.log('vartotojui '+this.state.emailValue +' password: '+this.state.password )
        return (
            <Grid centered columns={1}>
                <Form>
                    <Form.Field>
                        <label>Forgot password</label>
                        <label>You can reset your password here</label>
                        <Input 
                            focus
                            placeholder='Email address'
                            value={this.state.emailValue}
                            onChange={this.validateEmail.bind(this)}    
                        />
                    </Form.Field>
                    <Button 
                            primary
                            disabled= {this.state.emailState}
                            onClick={this.sendPassword.bind(this)}
                    >Send My Password
                    </Button>
                </Form>
            </Grid>
        )
    }
}

export default ResetPassword;