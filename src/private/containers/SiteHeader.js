import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Menu, Image, Header } from 'semantic-ui-react';
import LanguageBar from '../../public/components/LanguageBar';
import '../../css/header.css';
import { connect } from 'react-redux';
import mainMenuDictionary from '../../dictionaries/MainMenuDictionary';
import { logout } from '../../appStore/actions/authenticationActions';

class SiteHeader extends React.Component {

    onLogoutClick() {
        this.props.logout();
    }

    render() {
        const translation = mainMenuDictionary[this.props.language];
        return (
            <Grid>
                <Grid.Row columns={1} only='computer tablet'>
                    <Grid.Column>
                        <Menu inverted className='header-config' secondary>
                            <Menu.Item name='home' as={Link} to='/'>
                                <Image src='kabada_logo.png' style={{ 'width': '170px'}}></Image>
                            </Menu.Item>
                            <Menu.Menu position='right'>
                                <Menu.Item name='about' as={Link} to='/'>
                                    <Header as='h4' className='header-items'>{translation.about}</Header>
                                </Menu.Item>                                
                                <Menu.Item name='logout' onClick={this.onLogoutClick.bind(this)}>
                                    <Header as='h4' className='header-items'>{translation.logout}</Header>
                                </Menu.Item>
                                <Menu.Item style={{ width: '150px'}}>
                                    <LanguageBar />
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>                       
                    </Grid.Column>
                </Grid.Row>
            </Grid>
           
        )
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.language
    };
}

export default connect(mapStateToProps, { logout })(SiteHeader);