import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Menu, Image, Header } from 'semantic-ui-react';
import '../../css/header.css';
import LanguageBar from '../components/LanguageBar';

class SiteHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authWindowOpen: false
        }
    }

    onAuthClicked() {
        this.setState({ 
            authWindowOpen: true 
        });
    }

    onAuthWindowClose = () => {
        this.setState({ 
            authWindowOpen: false 
        });
    }

    render() {
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
                                    <Header as='h4' className='header-items'>About</Header>
                                </Menu.Item>                                
                                <Menu.Item name='login' as={Link} to='/login'>
                                    <Header as='h4' className='header-items'>Login</Header>
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

export default SiteHeader;