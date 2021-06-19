import React, { Component } from 'react';
import { Modal, List, Button } from 'antd';
import '../../css/customModal.css';
import { RightOutlined } from '@ant-design/icons';
import AddKeyPartnerModal from './AddKeyPartnerModal'

const data = [
    {
        key: 1,
        title: 'Self Distribution',
        description: 'Possible if you distribute your products through your own channels – directly, your own store, homepage. Often the case in some service sectors'
    },
    {
        key: 2,
        title: 'Highly diversified distributors',
        description: 'You can choose «Many Distributors» if you believe that distribution channels are strongly diversified and no distributor is of high importance'
    },
    {
        key: 3,
        title: 'Retailers',
        description: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
    },
    {
        key: 4,
        title: 'Wholesalers',
        description: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
    },
    {
        key: 5,
        title: 'Agents',
        description: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
    },
    {
        key: 6,
        title: 'Other',
        description: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
    },
]
class KeyPartnersModal extends Component {
    state = {
        isVisible: false,
        addKeyVisibility: false,
    }

    handleCancel = () => {
        this.props.handleClose();
        console.log('Clicked cancel button');
        this.setState({
            isVisible: false,
        });
    };
    addNewKeyPartner = () => {
        console.log()
        this.setState({
            addKeyVisibility: true,
        })
    }
    closeNewKeyPartnerModal = () => {
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
                                extra={<Button type="text" onClick={this.addNewKeyPartner.bind(this)}><RightOutlined /></Button>}
                            >
                                <AddKeyPartnerModal title={item.title} visibility={this.state.addKeyVisibility} handleClose={this.closeNewKeyPartnerModal} />
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

export default KeyPartnersModal;

