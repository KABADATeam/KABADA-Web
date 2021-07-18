import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, List, Button } from 'antd';
import '../../css/customModal.css';
import {RightOutlined} from '@ant-design/icons';
import AddKeyResourceModal from './AddKeyResourceModal';
import { selectCategory } from "../../appStore/actions/resourcesAction";

class KeyResourcesCategoriesModal extends Component {
    state = {
        is_add_resource_modal_visible: false
    }

    onCancel = () => {
        this.props.handleClose();
    };

    onBack = () => {
        this.props.handleOpen();
        this.setState({
            is_add_resource_modal_visible: false
        });
    }

    addNewKeyResource = (item) => {
        this.props.selectCategory(item, () => {
            this.props.handleClose();
            this.setState({
                is_add_resource_modal_visible: true
            });
        });
    }

    closeNewKeyResourceModal = () => {
        this.setState({
            is_add_resource_modal_visible: false
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
                </Modal >
                <AddKeyResourceModal visibility={this.state.is_add_resource_modal_visible} onSaving={this.onCloseAfterSaving} onBack={this.onBack} handleClose={this.closeNewKeyResourceModal} />
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

export default connect(mapStateToProps, { selectCategory } )(KeyResourcesCategoriesModal);


