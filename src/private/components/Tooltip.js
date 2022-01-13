import React, { Component } from 'react';
import { Tooltip } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class TooltipComponent extends Component {
    title = (tooltip, tooltipCode) => {
        if (tooltip === undefined) {
            const title = undefined;
            return title
        } else if (tooltip !== undefined) {
            const title = tooltip.find((element, index) => element.code === tooltipCode);
            return title
        }
    }
    render() {
        const { tooltipCode } = this.props;
        const title = this.title(this.props.tooltips.tooltips, tooltipCode);
        if (title !== undefined) {
            return (
                <>
                    <Tooltip title="Tooltip">
                        <InfoCircleFilled style={{ width: '17.5px', height: '17.5px', color: '#BFBFBF' }} />
                    </Tooltip>
                </>
            )
        } else {
            return (
                <>
                    <Tooltip title="Tooltip">
                        <InfoCircleFilled style={{ width: '17.5px', height: '17.5px', color: '#BFBFBF' }} />
                    </Tooltip>
                </>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        tooltips: state.tooltips,
    }
}

export default connect(mapStateToProps, {})(withRouter(TooltipComponent));