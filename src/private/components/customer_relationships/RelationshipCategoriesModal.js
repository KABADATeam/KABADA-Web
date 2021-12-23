import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, List, Button } from 'antd';
import '../../../css/customModal.css';
import { RightOutlined } from '@ant-design/icons';
import { selectRelationshipCategory, saveCustomerRelationship } from "../../../appStore/actions/customerRelationshipsAction";

class RelationshipCategoriesModal extends Component {
    addNewRelationship = (item) => {
        this.props.selectRelationshipCategory(item)
            .then(
                this.props.onOpen()
            );
        if (item.title === "Word of Mouth") {
            const postObj = {
                "item_id": null,
                "business_plan_id": this.props.businessPlan.id,
                "channels": ['-'],
                "category_id": "2fc70a56-27b6-442b-938c-9c13fb36e316",
                "group": this.props.group,
            };
            const reducerObj = {
                "channels": ['-'],
                "category": this.props.categories.categories[0],
                "comment": null,
                "group": this.props.group,
            };
            this.props.saveCustomerRelationship(postObj, reducerObj);
            this.props.onClose();
        } else {
            return;
        }
    }

    onCancel = () => {
        this.props.onClose();
    }

    render() {
        const title = 'Add customer relationship mechanism';
        const data = this.props.categories.categories;

        return (
            <>
                <Modal
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    title={title}
                    visible={this.props.visibility}
                    onCancel={this.onCancel}
                    footer={null}
                    width={636}
                >
                    <List
                        itemLayout='horizontal'
                        dataSource={data}
                        renderItem={item => (
                            <List.Item
                                key={item.key}
                                extra={<Button type="text" onClick={this.addNewRelationship.bind(this, item)}>{item.title !== "Word of Mouth" && <RightOutlined />}</Button>} >
                                <List.Item.Meta style={{ cursor: "pointer" }}
                                    onClick={this.addNewRelationship.bind(this, item)}
                                    title={item.title}
                                    description=""
                                />
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
        businessPlan: state.selectedBusinessPlan,
        categories: state.customerRelationshipsCategories,
    };
}

export default connect(mapStateToProps, { selectRelationshipCategory, saveCustomerRelationship })(RelationshipCategoriesModal);