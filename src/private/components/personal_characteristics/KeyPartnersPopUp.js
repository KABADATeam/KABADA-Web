import React from 'react';
import { Button, Card, Input, Modal, Select } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { tableCardStyle, tableCardBodyStyle } from '../../../styles/customStyles'

const { Option } = Select;

class KeyPartnersPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            planId: null,
            plans: []
        }
    }

    onCancel = () => {
        this.props.onClose();
    }

    save = () => {
        if(this.state.planId === this.props.planId){
            this.onCancel();
        }else{
            this.props.save(this.state.planId)
        }
    }
    componentDidMount() {
        const planIdClone = JSON.parse(JSON.stringify(this.props.planId));
        const plansClone = JSON.parse(JSON.stringify(this.props.plans))
        this.setState({
            planId: planIdClone
        });
    }

    onDataChange = (id) => {
        this.setState({
            planId: id
        });
    }

    render() {
        return (
            <>
                <Modal
                    title={'Import answers'}
                    visible={this.props.visible}
                    onCancel={this.onCancel}
                    saveChanges={this.save}
                    okButtonProps={{ disabled: false }}
                    cancelButtonProps={{ disabled: false }}
                    footer={
                        <div>
                            <Button key="customCancel" onClick={this.onCancel}>Cancel</Button>
                            <Button key="customSubmit" form="myForm" onClick={this.save} htmlType="submit" type={'primary'}>Save</Button>
                        </div>
                    }
                >
                    <div style={{ width: '100%' }}>
                        {/* <div style={{ display: 'flex' }}> */}
                        <p>Select project to import from</p>
                        <Select defaultValue={this.props.planId} onChange={this.onDataChange} style={{ width: '100%' }}>
                            {this.props.plans.map((element, index) => {
                                return (<Option key={element.id} value={element.id}>{element.name}</Option>)
                            })}
                        </Select>
                        {/* </div> */}
                    </div>
                </Modal>
            </>
        )
    }
}


export default KeyPartnersPopUp;