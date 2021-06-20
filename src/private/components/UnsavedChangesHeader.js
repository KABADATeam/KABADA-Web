import React, { Component } from 'react';
import { Button, Typography, Space, Layout } from 'antd'
import { buttonStyle } from '../../styles/customStyles';
const { Header } = Layout;
const headerStyle = { position: 'fixed', top: '0', zIndex: 1, width: '100%', backgroundColor: '#262626', paddingLeft: '120px', paddingRight: '120px' };

class UnsavedChangesHeader extends Component {

    discardChanges = () => {
        //this.props.handleHiding();
        this.props.discardChanges();
    }

    saveChanges = () => {
        this.props.saveChanges();
    }

    render() {
        const isVisible = this.props.visibility;
        return (
            <>
                <Header style={{ visibility: isVisible, ...headerStyle }}>
                    <Space style={{ display: 'flex', float: 'left' }}>
                        <Typography style={{ color: '#8C8C8C', fontWeight: '600', fontSize: '16px' }}>Unsaved changes</Typography>
                    </Space>
                    <Space style={{ display: 'flex', float: 'right' }}>
                        <Button size="large" style={{ ...buttonStyle, backgroundColor: '#262626', color: '#FFFFFF' }}
                            onClick={this.discardChanges.bind(this)}>
                            Discard
                            </Button>
                        <Button size="large" type={'primary'} style={{ ...buttonStyle }} onClick={this.saveChanges.bind(this)}>Save</Button>
                    </Space>
                </Header>
            </>
        );
    }
}

export default UnsavedChangesHeader;
