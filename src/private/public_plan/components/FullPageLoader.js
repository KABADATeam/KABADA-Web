import React, {Component} from "react";
import {Spin, Typography} from "antd";
import {connect} from 'react-redux';
import "../../../css/FullPageLoaderStyles.css";

const { Text } = Typography;

class FullPageLoader extends Component {

    render () {
        if (this.props.loading === false) {
            return null
        }
        return (
            <div className="loader-container">
                <div className="public_plans_spinner">
                    <Spin size='large' tip="Please wait while the document is being prepared ..." style={{color: '#262626'}} spinning={this.props.loading}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.downloadLoading
})

export default connect(mapStateToProps)(FullPageLoader)