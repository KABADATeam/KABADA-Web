import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, List, Button } from 'antd';
import '../../../css/customModal.css';
import {RightOutlined} from '@ant-design/icons';
import { selectActivityCategory } from '../../../appStore/actions/keyActivitiesAction';
import TextHelper from '../TextHelper';

class KeyActivityTypesModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource: []
        }

    }
    onCancel = () => {
        this.props.onClose()
    } 
    chooseActivityCategory = (item) => {
        this.props.selectActivityCategory(item, () => {
            this.props.onOpen()
        });
        console.log(item);
    }

    setDataSource = () =>{
        const newArray = [];
        const array = this.props.categories.activity_categories;
        array.forEach((element,index)=>{
            if(element.title === "Production"){
                const newObj = {
                    ...element,
                    "tooltip": 'keynewactivity1'
                }
                newArray[0] = newObj;
            }
            else if(element.title === "Problem solving"){
                const newObj = {
                    ...element,
                    "tooltip": 'keynewactivity2'
                }
                newArray[1] = newObj;
            }
            else if(element.title === "Platform/Network"){
                const newObj = {
                    ...element,
                    "tooltip": 'keynewactivity3'
                }
                newArray[2] = newObj;
            }else{
                newArray.push(element)
            }

        })
        this.setState({
            dataSource: newArray
        })
    }

    componentDidMount(){
        this.setDataSource();
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
                        dataSource={this.state.dataSource}
                        renderItem={item => (
                            <List.Item
                                key={item.id}
                                extra={<Button type="text" onClick={this.chooseActivityCategory.bind(this, item)}><RightOutlined /></Button>} >
                                <List.Item.Meta style={{ cursor: "pointer" }}
                                    onClick={this.chooseActivityCategory.bind(this, item)}
                                    title={item.title}
                                    description={<TextHelper code={item.tooltip} type="lefttext"/>}                                   
                                />
                            </List.Item>
                        )}
                    /> 
                </Modal>
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