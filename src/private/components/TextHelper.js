import React, { Component } from 'react';
import { Tooltip, Typography } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const { Text } = Typography;

const textStyle = {
    fontSize: '14px',
    color: '#8C8C8C',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: '22px',
    marginRight: '40px',
}

class TextHelper extends Component {
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
            if (type === 'lefttext' && title.tooltip !== null) {
                return (
                    <>
                        <Text style={{ ...textStyle }}>{title.tooltip}</Text>
                    </>
                )
            } else {
                return (
                    <>
                        <Text>Need to insert text into csv file</Text>
                    </>
                )
            }
        } else {
            return (
                <>
                    <Text style={{ ...textStyle }}>Cant find tooltip code</Text>
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

export default connect(mapStateToProps, {})(withRouter(TextHelper));