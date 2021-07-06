import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, List, Button } from 'antd';
import '../../css/customModal.css';
import { RightOutlined } from '@ant-design/icons';
import { selectCategoryType } from "../../appStore/actions/partnersAction";

class KeyPartnersModal extends Component {

    onCancel = () => {
        this.props.onClose();
    };

    onAddNewPartner = (item) => {
        this.props.selectCategoryType(this.props.category.title, item, () => {
            this.props.onClose();
            this.props.onForward();
        });
        
    }

    closeNewKeyPartnerModal = () => {
        this.setState({
            isPartnerModalVisible: false
        })
    }

    render() {
        console.log(this.props.category);
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
                                extra={<Button type="text" onClick={this.onAddNewPartner.bind(this, item)}><RightOutlined /></Button>} >

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
        category: state.selectedPartnersCategory
    };
}

export default connect(mapStateToProps, { selectCategoryType })(KeyPartnersModal);

