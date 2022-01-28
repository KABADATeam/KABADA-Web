import React, { Component } from 'react';
import { Tooltip } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class TooltipComponent extends Component {
    title = (tooltip, code) => {
        if (tooltip === undefined) {
            const title = undefined;
            return title
        } else if (tooltip !== undefined) {
            const title = tooltip.find((element, index) => element.code === code);
            return title
        }
    }
    render() {
        const { code, type } = this.props;
        const title = this.title(this.props.tooltips.tooltips, code);
        if (title !== undefined) {
            if (type === 'title' && title.tooltip !== null) {
                return (
                    <>
                        <Tooltip title={title.tooltip}>
                            <InfoCircleFilled style={{ fontSize: '21px', color: '#BFBFBF', marginLeft: '9.5px' }} />
                        </Tooltip>
                    </>
                )
            } else if (type === 'text' && title.tooltip !== null) {
                return (
                    <>
                        <Tooltip title={title.tooltip}>
                            <InfoCircleFilled style={{ fontSize: '17.5px', color: '#BFBFBF', marginLeft: '5.25px' }} />
                        </Tooltip>
                    </>
                )
            } else if (type === 'text' && title.tooltip === null) {
                return (
                    <>
                        <Tooltip title="Tooltip">
                            <InfoCircleFilled style={{ fontSize: '17.5px', color: '#BFBFBF', marginLeft: '5.25px' }} />
                        </Tooltip>
                    </>
                )
            } else if (type === 'title' && title.tooltip === null) {
                return (
                    <>
                        <Tooltip title="Title tooltip">
                            <InfoCircleFilled style={{ fontSize: '21px', color: '#BFBFBF', marginLeft: '9.5px' }} />
                        </Tooltip>
                    </>
                )
            } else {
                return (
                    <>
                        <Tooltip title="Tooltip">
                            <InfoCircleFilled style={{ fontSize: '17.5px', color: '#BFBFBF', marginLeft: '5.25px' }} />
                        </Tooltip>
                    </>
                )
            }
        } else {
            if (type === 'title') {
                return (
                    <>
                        <Tooltip title="Tooltip">
                            <InfoCircleFilled style={{ fontSize: '21px', color: '#BFBFBF', marginLeft: '9.5px' }} />
                        </Tooltip>
                    </>
                )
            } else if (type === 'text') {
                return (
                    <>
                        <Tooltip title="Tooltip">
                            <InfoCircleFilled style={{ fontSize: '17.5px', color: '#BFBFBF', marginLeft: '5.25px' }} />
                        </Tooltip>
                    </>
                )
            } else {
                return (
                    <>
                        <Tooltip title="Tooltip">
                            <InfoCircleFilled style={{ fontSize: '17.5px', color: '#BFBFBF', marginLeft: '5.25px' }} />
                        </Tooltip>
                    </>
                )
            }
        }
    }
}

const mapStateToProps = (state) => {
    return {
        tooltips: state.tooltips,
    }
}

export default connect(mapStateToProps, {})(withRouter(TooltipComponent));