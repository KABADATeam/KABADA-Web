import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, List, Button } from 'antd';
import '../../css/customModal.css';
import { RightOutlined } from '@ant-design/icons';
import AddKeyResourceModal from './AddKeyResourceModal';
import { selectCategory } from "../../appStore/actions/resourcesAction";

class KeyResourcesCategoriesModal extends Component {
    state = {
        is_add_resource_modal: {
            visibility: false,
            resourceType: null
        }
    }

    onCancel = () => {
        this.props.handleClose();
    };

    onBack = () => {
        this.props.handleOpen();
        const obj = {
            visibility: false,
            resourceType: null
        }
        this.setState({
            is_add_resource_modal: obj
        });
    }

    addNewKeyResource = (item) => {
        this.props.selectCategory(item, () => {
            const obj = {
                visibility: true,
                resourceType: item.title
            }
            this.setState({
                is_add_resource_modal: obj
            });
        });
    }

    closeNewKeyResourceModal = () => {
        const obj = {
            visibility: false,
            resourceType: null
        }
        this.setState({
            is_add_resource_modal: obj
        });
    }

    onCloseAfterSaving = () => {
        this.props.handleClose();
    }
    render() {
        return (
            <>
                <Modal
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    title="Add key resource"
                    visible={this.props.visibility}
                    onCancel={this.onCancel}
                    footer={null}
                    width={636}
                >
                    <List
                        itemLayout='horizontal'
                        dataSource={this.props.categories}

                        renderItem={item => (
                            <List.Item
                                key={item.id}
                                extra={<Button type="text" onClick={this.addNewKeyResource.bind(this, item)}><RightOutlined /></Button>} >

                                <List.Item.Meta style={{ cursor: "pointer" }}
                                    onClick={this.addNewKeyResource.bind(this, item)}
                                    title={item.title}
                                    description={item.description}
                                />
                            </List.Item>
                        )}
                    />
                </Modal>
                {this.state.is_add_resource_modal.visibility !== false ?
                    <AddKeyResourceModal visibility={this.state.is_add_resource_modal.visibility}
                        onSaving={this.onCloseAfterSaving} onBack={this.onBack} resourceType={this.state.is_add_resource_modal.resourceType}
                        handleClose={this.closeNewKeyResourceModal} closeCategories={this.props.handleClose} />
                    : null}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        businessPlan: state.selectedBusinessPlan,
        categories: state.resourcesCategoriesList
    };
}

export default connect(mapStateToProps, { selectCategory })(KeyResourcesCategoriesModal);


