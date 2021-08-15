import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, List, Button } from 'antd';
import '../../../css/customModal.css';
import {RightOutlined} from '@ant-design/icons';
import { getCategories, selectCostCategory } from "../../../appStore/actions/costStructureAction";

class CostCategoriesModal extends Component {
    onCancel = () => {
        this.props.onClose()
    } 
    
    /*addNewKeyResource = (item) => {
        this.props.selectCategory(item, () => {
            this.props.handleClose();
            this.setState({
                is_add_resource_modal_visible: true
            });
        });
    }*/
    addNewCost = (item) => {
        this.props.selectCostCategory(item, () => {
            this.props.onOpen()
        });
        console.log(item);
    }
    render() {
        const title = this.props.number === 1 ? 'Add fixed cost' : 'Add variable cost';
        const dataSource = this.props.number === 1 ? this.props.categories.fixed_categories : this.props.categories.variable_categories
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
                        dataSource={dataSource}
                        renderItem={item => (
                            <List.Item
                                key={item.category_id}
                                extra={<Button type="text" onClick={this.addNewCost.bind(this, item)}><RightOutlined /></Button>} >
                                <List.Item.Meta style={{ cursor: "pointer" }}
                                    onClick={this.addNewCost.bind(this, item)}
                                    title={item.category_title}
                                    description={item.description}                                    
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
        categories: state.costCategoriesList       
    };
}

export default connect(mapStateToProps, { getCategories, selectCostCategory } )(CostCategoriesModal);