import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, List, Button, Popover, Space, Row, Typography } from 'antd';
import '../../../css/customModal.css';
import {RightOutlined, ArrowLeftOutlined} from '@ant-design/icons';
import { getCategories, selectCostCategory, setCostStructureCategory} from "../../../appStore/actions/costStructureAction";

const { Text } = Typography;

class CostCategoriesModal extends Component {
    state = {
        popoverVisibility: false,
        popoverType: 'no predict',
        popoverTextObject: [],
    }
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
    handlePopoverVisibilityChange = (visible) => {
        // console.log('hanlde')
        // console.log(this.props.costs)
        // if ai_predict is undefined or null
        if (!this.props.costs.ai_cost_structure_predict) {
            this.setState({
                popoverVisibility: visible,
                popoverType: 'no predict'
            })
        }
        else {
            const costStructureType = this.props.costNumber === 1 ? this.props.costs.ai_cost_structure_predict.fixedCosts
                : this.props.costNumber === 2 ? this.props.costs.ai_cost_structure_predict.variableCosts
                : null;
            // console.log('ĄĄ costs: ' + JSON.stringify(this.props.costs));
            // console.log('coststructure: ' + JSON.stringify(costStructureType));
            const text = this.generateAIHelpText(costStructureType);
            if (text === undefined) {
                this.setState({
                    popoverVisibility: visible,
                    popoverType: 'no predict',
                })
            } else {
                this.setState({
                    popoverVisibility: visible,
                    popoverType: 'is predict',
                    popoverTextObject: text
                })
            }
        }
    }
    
    hidePopover = () => {
        this.setState({
            popoverVisibility: false
        })
    }

    onAIButtonClick = () => {
        //list of all available fixed or variable costs (based on choice before: add fixed or variable cost)
        const costStructureType = this.props.costNumber === 1 ? this.props.costs.ai_cost_structure_predict.fixedCosts
                : this.props.costNumber === 2 ? this.props.costs.ai_cost_structure_predict.variableCosts
                : null;
        //getting category suggested by ai (its array of 1 element)
        const newAICostStructureSuggest = costStructureType.find(x => x.id === null).category;
        const suggestedValue = newAICostStructureSuggest.shift();
        // there are fixed_categories and variable_categories in categories redux state. 
        // so there will be list of all available fixed categories (rent of office, rent of buildings ....)
        const categories = this.props.costNumber === 1 ? this.props.categories.fixed_categories
            : this.props.costNumber === 2 ? this.props.categories.variable_categories
            : null;
        const selectionSuggestObj = categories.find(x => x.category_id === suggestedValue);
        // console.log(selectionSuggestObj)
        const selectionSuggestObjForReducer = {
            id: selectionSuggestObj.category_id,
            title: selectionSuggestObj.category_title,
            key: selectionSuggestObj.category_id,
            tag: 1,
            costNumber: this.props.costNumber 
        }
        // console.log(selectionSuggestObjForReducer)
        this.props.setCostStructureCategory(selectionSuggestObjForReducer);
        this.hidePopover();
    }

    addNewCost = (item) => {
        this.props.selectCostCategory(item, () => {
            this.props.onOpen()
        });
        // console.log(item);
    }

    generateAIHelpText = (predictsObj) => {
        const aiHintTextObject = [];
        if (predictsObj) {
            var predictValue = "";
            const predict = predictsObj.find(x => x.id === null).subCategory;
            // there are fixed_categories and variable_categories in categories redux state. 
            // so there will be list of all available fixed categories (rent of office, rent of buildings ....)
            const categoryType = this.props.costNumber === 1 ? this.props.categories.fixed_categories
                : this.props.costNumber === 2 ? this.props.categories.variable_categories
                : null;   
            if(predict)
                predictValue = predict.shift();
            //looping through fixed or variable costs. 
            const title = categoryType.find(x => x.category_id === predictValue);
            const newObject = {
                type_title: 'mechanism',
                text: title 
            }
            
            aiHintTextObject.push(newObject);
            return aiHintTextObject
        } else {
            this.setState({
                popoverType: 'no predict',
            })
        }
    }
    render() {
        const title = this.props.number === 1 ? 'Add fixed cost' : 'Add variable cost';
        const dataSource = this.props.number === 1 ? this.props.categories.fixed_categories : this.props.categories.variable_categories
        const popoverContent = (
            <>
                {
                    this.state.popoverType === 'no predict' ?
                        <>
                            <Row>
                                <Text>
                                    Based on the current information KABADA AI did not have any suggestions.
                                </Text>
                            </Row>
                            <Row style={{ marginTop: '12px' }}>
                                <Button onClick={this.hidePopover}>Cancel</Button>
                            </Row>
                        </>
                        :
                        <>
                            <Row>
                                <Row>
                                    {
                                        this.state.popoverTextObject.length === 0 ?
                                            <Text>Based on the current information KABADA AI thinks that everything looks good.</Text>
                                            :
                                            <Text>
                                                Based on your input KABADA AI recommends that you consider selecting {this.state.popoverTextObject.map((e, index) => {
                                                    if (index + 1 === this.state.popoverTextObject.length) {
                                                        return (
                                                            <Text key={index} > {e.text} {e.type_title}</Text>
                                                        )
                                                    } else {
                                                        return (
                                                            <Text key={index} > for "{e.type_title}": {e.text};</Text>
                                                        )
                                                    }
                                                })}.
                                            </Text>
                                    }
                                </Row>
                                <Row style={{ marginTop: '12px' }}>
                                    {
                                        this.state.popoverTextObject.length === 0 ?
                                            <Button onClick={this.hidePopover}>Cancel</Button>
                                            :
                                            <>
                                                <Button type="primary" onClick={this.onAIButtonClick}>Add</Button>
                                                <Button style={{ marginLeft: '10px' }} onClick={this.hidePopover}>Cancel</Button>
                                            </>
                                    }
                                    {/* <Text>Test</Text>
                                    <Button type="primary" onClick={this.onAIButtonClick}>Add</Button>
                                    <Button style={{ marginLeft: '10px' }} onClick={this.hidePopover}>Cancel</Button> */}
                                </Row>
                            </Row>
                        </>
                }
            </>
        )
        return (
            <>
                <Modal
                    bodyStyle={{ paddingBottom: '0px' }}
                    centered={true}
                    title={<Space><ArrowLeftOutlined onClick={this.onCancel} />{title}
                    <Popover
                        placement='topLeft'
                        title='AI Hint'
                        content={popoverContent}
                        overlayStyle={{ width: "328px" }}
                        trigger="click"
                        visible={this.state.popoverVisibility}
                        onVisibleChange={this.handlePopoverVisibilityChange}
                    >
                        <Button
                            icon=
                            {<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                <rect width="28" height="28" rx="14" fill="#1990FE" />
                                <path d="M22.7077 11.9719C22.1277 11.9719 21.9249 12.3878 21.876 12.4719H20.7385V9.5C20.7385 8.11937 19.6369 7 18.2769 7H9.41538C8.05538 7 6.95385 8.11937 6.95385 9.5V12.4719H5.81631C5.76738 12.4156 5.56462 11.9719 4.98462 11.9719C4.45969 11.9719 4 12.4006 4 12.9719C4 13.5438 4.46062 13.9437 4.98462 13.9437C5.56462 13.9437 5.76738 13.5281 5.81631 13.4719H6.95385V17.4438C6.95385 18.8244 8.056 19.9438 9.41538 19.9438L10.8923 19.9719V22.5966C10.8923 22.7281 10.9754 23 11.2615 23C11.3391 23 11.4153 22.9747 11.4799 22.9272L15.3231 19.9719L18.2769 19.9721C19.6363 19.9721 20.7385 18.8527 20.7385 17.4721V13.4719H21.8763C21.9262 13.5844 22.1292 13.9719 22.7077 13.9719C23.2326 13.9719 23.6923 13.5431 23.6923 13C23.6923 12.4281 23.2338 11.9719 22.7077 11.9719ZM18.7692 15C18.7692 15.5522 18.3283 16 17.7846 16H9.90769C9.36308 16 8.92308 15.5531 8.92308 15V11C8.92308 10.4478 9.364 10 9.90769 10H17.7846C18.3283 10 18.7692 10.4478 18.7692 11V15ZM10.8923 11.9719C10.3486 11.9719 9.90769 12.4197 9.90769 12.9719C9.90769 13.5241 10.3486 13.9719 10.8923 13.9719C11.436 13.9719 11.8769 13.5241 11.8769 12.9719C11.8769 12.4469 11.4369 11.9719 10.8923 11.9719ZM16.8 11.9719C16.2563 11.9719 15.8154 12.4197 15.8154 12.9719C15.8154 13.5241 16.2563 13.9719 16.8 13.9719C17.3437 13.9719 17.7846 13.5241 17.7846 12.9719C17.7846 12.4469 17.3446 11.9719 16.8 11.9719Z" fill="white" />
                            </svg>
                            }
                            type="link"
                        />
                    </Popover>
                    </Space>
                    }
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
                                <List.Item.Meta style={{ cursor: "pointer", background: item.tag === 1 ? '#BAE7FF' : 'white' }}
                                    onClick={this.addNewCost.bind(this, item)}
                                    title={item.category_title}
                                    description={item.description}                                    
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
        categories: state.costCategoriesList,
        costs: state.costStructure      
    };
}

export default connect(mapStateToProps, { getCategories, selectCostCategory, setCostStructureCategory } )(CostCategoriesModal);