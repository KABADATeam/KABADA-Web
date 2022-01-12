import React, {Component} from 'react';
import { Tooltip } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class TooltipComponent extends Component {
    render() {
        const { tooltipCode } = this.props;
        const title = this.props.tooltips.tooltips.find((element, index) => element.code === tooltipCode).tooltip;
        return (
            <>
                <Tooltip title={title}>
                    <InfoCircleFilled style={{ width: '17.5px', height: '17.5px', color: '#BFBFBF' }} />
                </Tooltip>
            </>
        )
        // if (planStatusValue === 100) {
        //     return (
        //         <Tag color="#D9F7BE" style={{borderRadius: 50, color: "#262626"}}>Completed</Tag>
        //     )
        // }
        // else if (planStatusValue < 100) {
        //     return (
        //         <Tag color="#BAE7FF" style={{borderRadius: 50, color: "#262626"}}>{planStatusValue}% Completed</Tag>
        //     )
        // }
    }
}

const mapStateToProps = (state) => {
    return {
        tooltips: state.tooltips,
    }
}

export default connect(mapStateToProps, {}) (withRouter(TooltipComponent));