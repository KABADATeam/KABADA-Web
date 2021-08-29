import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, List, Button } from 'antd';
import '../../../css/customModal.css';
import {RightOutlined} from '@ant-design/icons';
import { selectActivityCategory } from '../../../appStore/actions/keyActivitiesAction'

class KeyActivityTypesModal extends Component {
    onCancel = () => {
        this.props.onClose()
    } 
    chooseActivityCategory = (item) => {
        this.props.selectActivityCategory(item, () => {
            this.props.onOpen()
        });
        console.log(item);
    }
    
    render() {
        const dataSource = this.props.categories.activity_categories
        return (
            <>
                <Modal
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    title='Add key activity'
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
                                key={item.id}
                                extra={<Button type="text" onClick={this.chooseActivityCategory.bind(this, item)}><RightOutlined /></Button>} >
                                <List.Item.Meta style={{ cursor: "pointer" }}
                                    onClick={this.chooseActivityCategory.bind(this, item)}
                                    title={item.title}
                                    description='{item description}'                                    
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
        categories: state.keyActivitiesCategoriesList     
    };
}

export default connect(mapStateToProps, { selectActivityCategory } )(KeyActivityTypesModal);