import React from 'react';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';
import { setMessage, setError } from '../../appStore/actions/messageActions';
import '../../css/Message.css';

class MessageBox extends React.Component {

    componentDidUpdate() {
        if (this.props.response.message !== '') {
            setTimeout(() => {
                if (this.props.response.type === "info") {
                    this.props.setMessage('');
                } else {
                    this.props.setError('');
                }
            }, 3000);
        }
    } 

    render() {
        if (this.props.response.type === "info") {
            return (
                this.props.response.message !== '' ?
                    <Message positive compact className="message-config">{this.props.response.message}</Message> : <div></div>
            )
        } else {
            return (
                this.props.response.message !== '' ?               
                    <Message negative compact className="message-config">{this.props.response.message}</Message> : <div></div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        response: state.message
    };
}

export default connect(mapStateToProps, { setError, setMessage })(MessageBox);