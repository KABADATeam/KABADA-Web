import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, List, Button, Space, Popover, Row, Typography } from 'antd';
import '../../css/customModal.css';
import { RightOutlined } from '@ant-design/icons';
import { selectCategoryType, setKeyPartnerCategoryType, setPriorityObject } from "../../appStore/actions/partnersAction";
import { saveDistributor } from "../../appStore/actions/partnersAction";

const { Text } = Typography;

class KeyPartnersModal extends Component {

    state = {
        popoverVisibility: false,
        popoverType: 'no predict',
        popoverTextObject: [],
        predictActive: false
    }

    onCancel = () => {
        this.props.onClose();
    };

    onAddNewPartner = (item) => {
        const newItem = this.props.partners.aiPredict[0].partnerType[0] === item.type_id && this.state.predictActive === true ? {...item, tag: 1} : item ;
        console.log('New item is', newItem);
        const priority = this.props.partners.aiPredict[0].partnerType[0] === item.type_id && this.state.predictActive === true ?  this.props.partners.aiPredict[0].priority[0].toLowerCase() : 'false';
        console.log('Priority ', priority)
        const priorityObject = {
            value: priority === 'true',
            tag: this.props.partners.aiPredict[0].partnerType[0] === item.type_id && this.state.predictActive === true ? 1 : 0
        }
        console.log(priorityObject)
        this.props.selectCategoryType(this.props.category.title, newItem, () => {
            if (item.title === "Self distribution" || item.title === "Highly diversified distributors") {
                const postObj = {
                    "id": null,
                    "business_plan_id": this.props.businessPlan.id,
                    "type_id": item.type_id,
                    "name": '-',
                    "is_priority": false,
                    "website": "-",
                    "comment": "-"
                }
                this.props.saveDistributor(postObj, item.title);
                this.props.onClose();
            } else {
                //console.log('Pasirenkamas item', item)
                this.props.setPriorityObject(priorityObject);
                this.props.onClose();
                this.props.onForward();
            }

        });

    }

    closeNewKeyPartnerModal = () => {
        this.setState({
            isPartnerModalVisible: false
        })
    }
    handlePopoverVisibilityChange = (visible) => {
        if (this.props.partners.aiPredict === null) {
            this.setState({
                popoverVisibility: visible,
                popoverType: 'no predict'
            })
        } else {
            const text = this.generateAIHelpText(this.props.partners.aiPredict);
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

    generateAIHelpText = (predictsObj) => {
        const aiHintTextObject = [];
        if (predictsObj !== undefined) {
            const predict = predictsObj.find(x => x.id === null);
            const title = this.props.category.types.find(x => x.type_id === predict.partnerType[0]).title;
            if (title === 'Self distribution' || title === 'Highly diversified distributors') {
                const newObject = {
                    type_title: this.props.category.title + ' type',
                    text: title
                }
                aiHintTextObject.push(newObject)
            } else {
                const newObjectType = {
                    type_title: this.props.category.title + ' type',
                    text: title
                };
                aiHintTextObject.push(newObjectType);
                const newObjectPriority = {
                    type_title: 'priority',
                    text: predict.priority[0]
                };
                aiHintTextObject.push(newObjectPriority);
            }
            return aiHintTextObject
        } else {
            this.setState({
                popoverType: 'no predict',
            })
        }
    }
    onAIButtonClick = () => {
        //console.log('AI spejimas', this.props.partners.aiPredict);
        const newAIPartnerTypeID = this.props.partners.aiPredict[0].partnerType[0];
        const aiPartnerTypeObj = this.props.category.title === 'distributor' ? this.props.categories.distributors.find(obj => obj.type_id === newAIPartnerTypeID) :
            this.props.category.title === 'supplier' ? this.props.categories.suppliers.find(obj => obj.type_id === newAIPartnerTypeID) :
                this.props.category.title === 'other' ? this.props.categories.others.find(obj => obj.type_id === newAIPartnerTypeID) : null;
        const selectionSuggestObjForReducer = {
            type_id: newAIPartnerTypeID,
            title: aiPartnerTypeObj.title,
            description: aiPartnerTypeObj.description,
            tag: 1
        }
        this.props.setKeyPartnerCategoryType(selectionSuggestObjForReducer);
        this.setState({
            predictActive: true
        })
        this.hidePopover();
    }

    render() {
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
                                                Based on your input KABADA AI recommends that you consider adding {this.state.popoverTextObject.map((e, index) => {
                                                    if (index + 1 === this.state.popoverTextObject.length) {
                                                        return (
                                                            <Text key={index} > for "{e.type_title}": {e.text}</Text>
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
                    title={<Space><Text>Add new {this.props.category.title}</Text>
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
                    </Space>}
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
                                extra={<Button type="text" onClick={this.onAddNewPartner.bind(this, item)}>{item.title !== "Self distribution" && item.title !== "Highly diversified distributors" && <RightOutlined />}</Button>} >

                                <List.Item.Meta onClick={this.onAddNewPartner.bind(this, item)} style={{ cursor: "pointer", background: item.tag === 1 ? '#BAE7FF' : 'white' }}
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
        category: state.selectedPartnersCategory,
        businessPlan: state.selectedBusinessPlan,
        partners: state.partners,
        categories: state.partnersCategories
    };
}

export default connect(mapStateToProps, { selectCategoryType, saveDistributor, setKeyPartnerCategoryType, setPriorityObject })(KeyPartnersModal);

