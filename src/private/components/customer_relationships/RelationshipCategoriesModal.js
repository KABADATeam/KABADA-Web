import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, List, Button } from 'antd';
import '../../../css/customModal.css';
import { RightOutlined } from '@ant-design/icons';
import { selectRelationshipCategory } from "../../../appStore/actions/customerRelationshipsAction";

class RelationshipCategoriesModal extends Component {
    addNewRelationship = (item) => {
        this.props.selectRelationshipCategory(item)
            .then(
                this.props.onOpen()
            );
    }

    onCancel = () => {
        this.props.onClose();
    }

    render() {
        const title = 'Add customer relationships';
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
                                extra={<Button type="text" onClick={this.addNewRelationship.bind(this, item)}><RightOutlined /></Button>} >
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

export default connect(mapStateToProps, { selectRelationshipCategory })(RelationshipCategoriesModal);