import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, List, Button, Space, Popover, Row, Typography } from 'antd';
import '../../../css/customModal.css';
import '../../../css/AIelements.css';
import { RightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { selectRelationshipCategory, saveCustomerRelationship, setRelationshipCategory } from "../../../appStore/actions/customerRelationshipsAction";

const { Text } = Typography;

class RelationshipCategoriesModal extends Component {
    state = {
        popoverVisibility: false,
        popoverType: 'no predict',
        popoverTextObject: [],
    }

    handlePopoverVisibilityChange = (visible) => {
        if (this.props.customerRelationships.ai_customer_relationship_predict === undefined) {
            this.setState({
                popoverVisibility: visible,
                popoverType: 'no predict'
            })
        }
        else {
            const customerRelatioshipType = this.props.group === 1 ? this.props.customerRelationships.ai_customer_relationship_predict.getCust
                : this.props.group === 2 ? this.props.customerRelationships.ai_customer_relationship_predict.keepCust
                    : this.props.group === 3 ? this.props.customerRelationships.ai_customer_relationship_predict.convCust
                        : null;
            const text = this.generateAIHelpText(customerRelatioshipType);
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
        const customerRelatioshipType = this.props.group === 1 ? this.props.customerRelationships.ai_customer_relationship_predict.getCust
            : this.props.group === 2 ? this.props.customerRelationships.ai_customer_relationship_predict.keepCust
                : this.props.group === 3 ? this.props.customerRelationships.ai_customer_relationship_predict.convCust
                    : null;
        const newAICustomerRelationshipSuggest = customerRelatioshipType.find(x => x.id === null).action;
        const selectionSuggestObj = this.props.categories.categories.find(x => x.id === newAICustomerRelationshipSuggest[0]);
        const selectionSuggestObjForReducer = {
            id: selectionSuggestObj.id,
            title: selectionSuggestObj.title,
            key: selectionSuggestObj.key,
            tag: 1
        }
        this.props.setRelationshipCategory(selectionSuggestObjForReducer);
        this.hidePopover();
    }

    addNewRelationship = (item) => {
        this.props.selectRelationshipCategory(item)
            .then(
                this.props.onOpen()
            );
        if (item.title === "Word of Mouth") {
            const postObj = {
                "item_id": null,
                "business_plan_id": this.props.businessPlan.id,
                "channels": ['-'],
                "category_id": "2fc70a56-27b6-442b-938c-9c13fb36e316",
                "group": this.props.group,
            };
            const reducerObj = {
                "channels": ['-'],
                "category": this.props.categories.categories[0],
                "comment": null,
                "group": this.props.group,
            };
            this.props.saveCustomerRelationship(postObj, reducerObj);
            this.props.onClose();
        } else {
            return;
        }
    }

    onCancel = () => {
        this.props.onClose();
    }

    generateAIHelpText = (predictsObj) => {
        const aiHintTextObject = [];
        if (predictsObj !== undefined) {
            const predict = predictsObj.find(x => x.id === null).action;
            const title = this.props.categories.categories.find(x => x.id === predict[0]).title;
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
        const title = 'Add customer relationship mechanism';
        const data = this.props.categories.categories;

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
                        dataSource={data}
                        renderItem={item => (
                            <List.Item
                                key={item.key}
                                extra={<Button type="text" onClick={this.addNewRelationship.bind(this, item)}>{item.title !== "Word of Mouth" && <RightOutlined />}</Button>} >
                                <List.Item.Meta style={{ cursor: "pointer", background: item.tag === 1 ? '#BAE7FF' : 'white' }}
                                    onClick={this.addNewRelationship.bind(this, item)}
                                    title={<Text >{item.title}</Text>}
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
        customerRelationships: state.customerRelationships
    };
}

export default connect(mapStateToProps, { selectRelationshipCategory, saveCustomerRelationship, setRelationshipCategory })(RelationshipCategoriesModal);