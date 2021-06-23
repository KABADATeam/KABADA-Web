import React, { Component } from 'react';
import { Modal, List, Button, Row, Col, Typography } from 'antd';
import '../../css/customModal.css';
import {RightOutlined} from '@ant-design/icons';
import AddKeyResourceModal from './AddKeyResourceModal'

const {Title, Text} = Typography;

const data = [
    {
        key: 1,
        title: 'Physical resources',
        description: 'Physical assets are tangible resources that a company uses to create its value proposition. These could include equipment, inventory, buildings, manufacturing plants and distribution networks that enable the business to function.'
    },
    {
        key: 2,
        title: 'Intellectual resources',
        description: 'These are non-physical, intangible resources like brand, patents, IP, copyrights, and even partnerships. Customer lists, customer knowledge, and even your own people, represent a form of intellectual resource. Intellectual resources take a great deal of time and expenditure to develop. But once developed, they can offer unique advantages to the company.'
    },
    {
        key: 3,
        title: 'Human resources',
        description: 'Employees are often the most important and yet the most easily overlooked assets of an organization. Specifically for companies in the service industries or require a great deal of creativity and an extensive knowledge pool, human resources such as customer service representatives, software engineers or scientists are pivotal.',
    },
    {
        key: 4,
        title: 'Human resources',
        description: 'The financial resource includes cash, lines of credit and the ability to have stock option plans for employees. All businesses have key resources in finance, but some will have stronger financial resources than other, such as banks that are based entirely on the availability of this key resource.',
    },
    {
        key: 5,
        title: 'Other',
        description: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
    },
]
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
    addNewKeyResource = () => {
        console.log()
        this.setState({
            addKeyVisibility: true,
        })
    }
    closeNewKeyResourceModal = () => {
        this.setState({
            addKeyVisibility: false,
        })
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
                        dataSource={data}
                    
                        renderItem={item => (
                            <List.Item
                                key={item.key}
                                extra={<Button type="text" onClick={this.addNewKeyResource.bind(this)}><RightOutlined /></Button>}
                            >
                                <AddKeyResourceModal title={item.title} visibility={this.state.addKeyVisibility} handleClose={this.closeNewKeyResourceModal} />
                                <List.Item.Meta
                                    title={item.title}
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

export default KeyResourcesModal;


