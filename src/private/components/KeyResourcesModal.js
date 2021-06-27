import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, List, Button } from 'antd';
import '../../css/customModal.css';
import {RightOutlined} from '@ant-design/icons';
import AddKeyResourceModal from './AddKeyResourceModal';
import { selectCategory } from "../../appStore/actions/resourcesAction";

class KeyResourcesModal extends Component {
    state = {
        isVisible : false,
        addKeyVisibility: false,
    }

    handleCancel = () => {
        this.props.handleClose();
        console.log('Clicked cancel button');
        this.setState({
            isVisible: false,
        });
    };

    addNewKeyResource = (item) => {
        this.props.selectCategory(item, () => {
            this.setState({
                addKeyVisibility: true
            });
        });
    }

    closeNewKeyResourceModal = () => {
        this.setState({
            addKeyVisibility: false
        });
    }

    onCloseAfterSaving = () => {
        this.setState({
            isVisible: false
        });
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
                    onCancel={this.handleCancel}
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
                                
                                <List.Item.Meta
                                    title={item.title}
                                    description={item.description}                                    
                                />
                            </List.Item>
                        )}
                    /> 
                </Modal >
                <AddKeyResourceModal visibility={this.state.addKeyVisibility} onSaving={this.onCloseAfterSaving} handleClose={this.closeNewKeyResourceModal} />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        businessPlan: state.selectedBusinessPlan,
        categories: state.resourcesCategoriesList        
    };
}

export default connect(mapStateToProps, { selectCategory } )(KeyResourcesModal);


