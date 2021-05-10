import React, { Component } from 'react';
import {Tag} from 'antd';

class PlanStatusTag extends Component {
    render () {
        const {planStatusValue} = this.props; 
            if (planStatusValue === 100) {
                return (
                    <Tag color="#D9F7BE" style={{borderRadius: 50, color: "#262626"}}>Completed</Tag>
                )
            }
            else if (planStatusValue < 100) {
                return (
                    <Tag color="#BAE7FF" style={{borderRadius: 50, color: "#262626"}}>{planStatusValue}% Completed</Tag>
                )
            }
    }
}

export default PlanStatusTag;
