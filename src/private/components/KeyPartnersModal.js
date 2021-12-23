import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, List, Button } from 'antd';
import '../../css/customModal.css';
import { RightOutlined } from '@ant-design/icons';
import { selectCategoryType } from "../../appStore/actions/partnersAction";
import { saveDistributor } from "../../appStore/actions/partnersAction";

class KeyPartnersModal extends Component {

    onCancel = () => {
        this.props.onClose();
    };

    onAddNewPartner = (item) => {
        this.props.selectCategoryType(this.props.category.title, item, () => {
            if (item.title === "Self distribution" || item.title === "Highly diversified distributors") {
                const postObj = {
                    "id": null,
                    "business_plan_id": this.props.businessPlan.id,
                    "type_id": item.type_id,
                    "name": '-',
                    "is_priority": false,
                    "website": "-",
                    "comment": "-"
                }
                this.props.saveDistributor(postObj, item.title);
                this.props.onClose();
            } else {
                this.props.onClose();
                this.props.onForward();
            }

        });

    }

    closeNewKeyPartnerModal = () => {
        this.setState({
            isPartnerModalVisible: false
        })
    }

    render() {
        return (
            <>
                <Modal
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    title={<div>Add new {this.props.category.title}</div>}
                    visible={this.props.visibility}
                    onCancel={this.onCancel}
                    footer={null}
                    width={636} >
                    <List
                        itemLayout='horizontal'
                        dataSource={this.props.category.types}

                        renderItem={item => (
                            <List.Item
                                key={item.type_id}
                                extra={<Button type="text" onClick={this.onAddNewPartner.bind(this, item)}>{item.title !== "Self distribution" && item.title !== "Highly diversified distributors" && <RightOutlined />}</Button>} >

                                <List.Item.Meta onClick={this.onAddNewPartner.bind(this, item)} style={{ cursor: "pointer" }}
                                    title={item.title}
                                    description={item.description} />
                            </List.Item>
                        )}
                    />
                </Modal >

            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        category: state.selectedPartnersCategory,
        businessPlan: state.selectedBusinessPlan
    };
}

export default connect(mapStateToProps, { selectCategoryType, saveDistributor })(KeyPartnersModal);

