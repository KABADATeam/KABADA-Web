import React, {Component} from 'react';
import { Grid, Button, Form, Input } from 'semantic-ui-react';

class ResetPassword extends React.Component {
    render() {
        return (
            <Grid centered columns={1}>
                <Form>
                    <Form.Field>
                        <label>Forgot password</label>
                        <label>You can reset your password here</label>
                        <Input 
                            focus
                            placeholder='Email address'    
                        />
                    </Form.Field>
                    <Button 
                            primary

                    >Send My Password
                    </Button>
                </Form>
            </Grid>
        )
    }
}

export default ResetPassword;