import React, {Component} from 'react';
import { Form, Input, Button } from 'antd';

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

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

    onFinish = (values) => {
        console.log('Success:', values);
        //this.props.login(values.username, values.password);
      };
    
      onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    render() {
        console.log('vartotojui '+this.state.emailValue +' password: '+this.state.password )
        return (
            <Form 
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed} >

			<Form.Item
				label="email"
				name="email"
				rules={[
				{
					required: true,
					message: 'Please input your email!',
				},
				]}>

				<Input />
			</Form.Item>

			<Form.Item {...tailLayout}>
				<Button type="primary" htmlType="submit">
					Reset password
				</Button>
      		</Form.Item>

		</Form>
            
        )
    }
}

export default ResetPassword;