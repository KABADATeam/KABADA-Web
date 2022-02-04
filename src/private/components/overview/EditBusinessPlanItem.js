import React from 'react'
import { Menu, Dropdown, Typography,Switch } from 'antd';
import { getSelectedPlanOverview} from "../../../appStore/actions/planActions";
import { EllipsisOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'


const {Text} = Typography;
const canvasElementTextStyle = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "22px",
    color: '#262626'
}
class EditBusinessPlanItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    onCompletedChange = (value) => {
        this.props.save(this.props.businessPlan.id, value, () => {
            this.props.getSelectedPlanOverview(this.props.businessPlan.id);
        })
    }

    render() {
        const editMenu = (
            <Menu>
                <Menu.Item>
                <Link to={this.props.link} >Edit</Link>
                </Menu.Item>
                <Menu.Item>
                        <Text>Mark as completed: </Text><Switch checked={this.props.isCompleted} onClick={this.onCompletedChange.bind(this)} />
                </Menu.Item>
            </Menu>
        );
        return (
            <>
                {/* <div style={{ marginRight: '28px' }}> */}
                    <Dropdown overlay={editMenu} placement="bottomLeft">
                        <EllipsisOutlined />
                    </Dropdown>
                {/* </div> */}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
    }
}

export default connect(mapStateToProps,{getSelectedPlanOverview})(withRouter(EditBusinessPlanItem))