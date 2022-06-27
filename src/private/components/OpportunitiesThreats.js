import React, { Component } from 'react';
import { Card, Checkbox, Table, Button, Input, Typography, Space, Tooltip, Popover, Row, Col } from 'antd';
import { PlusOutlined, DeleteOutlined, InfoCircleFilled } from '@ant-design/icons';
import { buttonStyle, inputStyle, tableTitleStyle, tableDescriptionStyle, tableCardBodyStyle, tableCardStyle } from '../../styles/customStyles';
import '../../css/swotStyle.css';
import { connect } from 'react-redux';
import { createNewItem, updateItem, deleteItem, updateCheckedStrenghsAndOportunities, setSwotOpportunitiesAIPredict } from "../../appStore/actions/swotAction";
import TooltipComponent from '../components/Tooltip';

const { Text } = Typography;

class OpportunitiesThreats extends Component {

    state = {
        popoverVisibility: false,
        popoverType: 'no predict',
        popoverTextObject: [],
    }
    onAddItem = () => {
        const newItem = {
            "business_plan_id": this.props.businessPlan.id,
            "swot": {
                "id": null,
                "name": "-",
                "operation": 0
            },
            "kind": 1
        };

        this.props.createNewItem(2, newItem);
    }

    handleState = (item, type) => event => {
        console.log('handle state by user item', item)
        console.log('handle state by user type', type)
        console.log('handle state by user event', event.target.checked)
        console.log('item before ', item.value)
        if (type === 3) {  // if opportunity
            item.value = event.target.checked === true ? 3 : 0;
        } else {    // threat
            item.value = event.target.checked === true ? 4 : 0;
        }
        console.log('after ', item.value)
        console.log("working", item)
        this.props.updateCheckedStrenghsAndOportunities(2, item)
        //isPredict === false ? this.props.updateCheckedStrenghsAndOportunities(2, item, false) : this.props.updateCheckedStrenghsAndOportunities(2, item, true);
        // this.props.getUpdatesWindowState();
    };

    handleStateFromAIButton = (item) => {
        console.log("working")
        console.log(item)
        this.props.updateCheckedStrenghsAndOportunities(2, item)
    }

    onDeleteItem = (item) => {
        const deleteItem = {
            "business_plan_id": this.props.businessPlan.id,
            "opportunities_threats": [
                {
                    "id": item.id,
                    "name": item.title,
                    "operation": -1
                }
            ]
        };
        this.props.deleteItem(2, deleteItem);
    }

    handleSaveItem = (item) => {
        item.title = this.state.title;
        this.props.updateNewItem(1, item);
        this.setState({
            editingId: -1,
            editing: false,
            title: ""
        });
    }

    handleInputChange = (item) => event => {
        item.title = event.target.value;
        this.props.updateNewItem(2, item);
        this.setState({
            editingId: -1,
            editing: false,
            title: ""
        });
    }

    onTitleChange = (item) => event => {
        const updateItem = {
            "business_plan_id": this.props.businessPlan.id,
            "swot": {
                "id": item.id,
                "name": event.target.value,
                "operation": item.value
            },
            "kind": 1
        };
        if (event.target.value !== '') {
            this.props.updateItem(2, updateItem);
        }
    }

    isOpportunityDisabled = (id) => {
        //console.log('opport disabled ', id)
        const index = this.props.list.checked_oportunities.findIndex(w => w.id === id)
        const threatIndex = this.props.list.checked_threats.findIndex(s => s.id === id)
        //if index is -1 that means there is no item with that id in array 
        return (
            this.props.list.checked_oportunities.length > 5 && index === -1 || threatIndex !== -1
        )
    }

    isThreatDisabled = (id) => {
        const index = this.props.list.checked_threats.findIndex(w => w.id === id)
        const oportunityIndex = this.props.list.checked_oportunities.findIndex(s => s.id === id)
        //if index is -1 that means there is no item with that id in array 
        return (
            this.props.list.checked_threats.length > 5 && index === -1 || oportunityIndex !== -1
        )
    }
    // 

    handlePopoverVisibilityChange = (visible) => {
        if (this.props.list.swotAIPredict === null) {
            this.setState({
                popoverVisibility: visible,
                popoverType: 'no predict'
            })
        } else {
            const text = this.generateAIHelpText(this.props.list.swotAIPredict, 'opportunities');
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

    compareArray = (arrayAI, arrayState) => {
        const newArray = []
        for (var i in arrayAI) {
            if (arrayState.indexOf(arrayAI[i]) === -1) {
                newArray.push(arrayAI[i]);
            }
        }
        return newArray;
    }

    generateAIHelpText = (predictsObj, category) => {
        const aiHintTextObject = [];
        console.log(predictsObj)
        const aiObj = undefined ? undefined : predictsObj;
        if (aiObj !== undefined) {
            const swotAIList = category === 'opportunities' ? aiObj.opportunities : aiObj.strengths;
            const selected_opportunities_threats_items = category === 'opportunities' ? this.props.list.updates.opportunities.map(e => e.id) : this.props.list.updates.strengths.map(e => e.id);
            const compared_opportunities_threats_items = this.compareArray(swotAIList, selected_opportunities_threats_items);
            let opportunities_threats_text = '';
            if (compared_opportunities_threats_items.length > 1) {
                for (let i = 0; i < compared_opportunities_threats_items.length; i++) {
                    const opportunity_threat_title = this.props.list.original.oportunities_threats.find(e => e.id === compared_opportunities_threats_items[i]).title;
                    opportunities_threats_text += i === compared_opportunities_threats_items.length - 1 ? opportunity_threat_title + '' : opportunity_threat_title + ', ';
                }
                const new_obj = {
                    type_title: 'Opportunities and threats',
                    text: opportunities_threats_text
                }
                aiHintTextObject.push(new_obj)
            } else if (compared_opportunities_threats_items === 1) {
                const opportunity_threat_title = this.props.list.original.oportunities_threats.find(e => e.id === compared_opportunities_threats_items[0]).title;
                opportunities_threats_text = opportunity_threat_title;
                const new_obj = {
                    type_title: 'Opportunities and threats',
                    text: opportunities_threats_text
                }
                aiHintTextObject.push(new_obj)
            }
            return aiHintTextObject
        } else {
            this.setState({
                popoverType: 'no predict',
            })
        }
    }
    onAIButtonClick = () => {
        // const newAIPartnerTypeID = this.props.partners.aiPredict[0].partnerType[0];
        // const aiPartnerTypeObj = this.props.category.title === 'distributor' ? this.props.categories.distributors.find(obj => obj.type_id === newAIPartnerTypeID) :
        //     this.props.category.title === 'supplier' ? this.props.categories.suppliers.find(obj => obj.type_id === newAIPartnerTypeID) :
        //         this.props.category.title === 'other' ? this.props.categories.others.find(obj => obj.type_id === newAIPartnerTypeID) : null;
        // const selectionSuggestObjForReducer = {
        //     type_id: newAIPartnerTypeID,
        //     title: aiPartnerTypeObj.title,
        //     description: aiPartnerTypeObj.description,
        //     tag: 1
        // }
        // this.props.setKeyPartnerCategoryType(selectionSuggestObjForReducer);
        // this.setState({
        //     predictActive: true
        // })
        //this.props.setSwotOpportunitiesAIPredict();
        // const swotAIList = this.props.list.swotAIPredict.opportunities
        // const selected_opportunities_threats_items = this.props.list.updates.opportunities.map(e => e.id);
        // const compared_opportunities_threats_items = this.compareArray(swotAIList, selected_opportunities_threats_items);
        // console.log(compared_opportunities_threats_items);
        // for (let i in compared_opportunities_threats_items) {
        //     const opportunity_obj = this.props.list.original.oportunities_threats.find(e => e.id === compared_opportunities_threats_items[i]);
        //     console.log(opportunity_obj);
        //     const new_item = {
        //         ...opportunity_obj,
        //         tag: 1,
        //         value: 3
        //     }
        //     console.log(new_item)
        //     this.handleStateFromAIButton(new_item);
        // }
        this.hidePopover();
    }
    render() {
        const data = this.props.list.original.oportunities_threats.concat(this.props.list.updates.opportunities.filter(x => isNaN(x.id) === false));

        const columns = [
            {
                title: 'Column name',
                dataIndex: 'title',
                key: 'title',
                render: (title, record, rowIndex) => (
                    (record.isLocal === true) ? (
                        <Space>
                            <Input
                                style={{ ...inputStyle, fontSize: '14px', height: "40px" }}
                                size="large"
                                onChange={this.onTitleChange(record)}
                                placeholder="Enter title"
                                defaultValue={record.title}
                            />
                            <Button size="large" style={{ ...buttonStyle }} onClick={this.onDeleteItem.bind(this, record)}><DeleteOutlined /></Button>
                        </Space>
                    ) : ((record.title) ? (<Space><Typography>{record.title}<TooltipComponent code={'swotot' + rowIndex} type='text' /></Typography></Space>) :
                        (<Space><Typography>{record.title}</Typography></Space>))
                ),
                width: '54%',
            },
            {
                title: 'Opportunities',
                dataIndex: 'checkedOpportunities',
                key: 'checkedOpportunities',
                render: (value, record, rowIndex) => (
                    <Checkbox
                        checked={record.value === 0 ? false : record.value === 3 ? true : false}
                        disabled={this.isOpportunityDisabled(record.id)}
                        onChange={this.handleState(record, 3)}
                    />
                ),
                width: '23%',
            },
            {
                title: 'Threats',
                dataIndex: 'checkedThreats',
                key: 'checkedThreats',
                render: (value, record, rowIndex) => (
                    <Checkbox
                        checked={record.value === 0 ? false : record.value === 4 ? true : false}
                        disabled={this.isThreatDisabled(record.id)}
                        onChange={this.handleState(record, 4)}
                    />
                ),
                width: '23%',
            }
        ];

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
                <Table

                    title={() => <>
                        <Space>
                            <Row>
                                <Typography style={{ alignSelf: 'center', marginRight: '5px' }}>Opportunities and threats</Typography>
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
                            </Row>
                        </Space>


                        <Typography style={{ ...tableDescriptionStyle }}>
                            List of predefined options for each part, where some of the items can be define for both sides,
                            some can be simultaneously on both sides, some only for O or T part</Typography>

                    </>


                        //     () => <>
                        //     <Typography style={{ ...tableTitleStyle }}>Opportunities and threats</Typography>
                        //     <Typography style={{ ...tableDescriptionStyle }}>
                        //         List of predefined options for each part, where some of the items can be define for both sides,
                        //         some can be simultaneously on both sides, some only for O or T part</Typography>
                        // </>
                    }
                    dataSource={data}
                    columns={columns}
                    pagination={false}
                    footer={() => (<Button size="large" style={{ ...buttonStyle }} onClick={this.onAddItem.bind(this)}><PlusOutlined />Add item</Button>)}
                />
            </>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        list: state.swotList,
        businessPlan: state.selectedBusinessPlan
    };
}

export default connect(mapStateToProps, { createNewItem, updateItem, deleteItem, updateCheckedStrenghsAndOportunities, setSwotOpportunitiesAIPredict })(OpportunitiesThreats);

