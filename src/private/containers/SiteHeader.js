import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Menu, Image, Header } from 'semantic-ui-react';
import '../../css/header.css';
import UserMenu from '../components/UserMenu';

class SiteHeader extends React.Component {

    render() {
        return (
            <Grid>
                <Grid.Row columns={1} only='computer tablet'>
                    <Grid.Column>
                        <Menu inverted className='header-config' secondary>
                            <Menu.Item name='home' as={Link} to='/'>
                                <Image src='kabada_logo.png' style={{ width: "120px" }}></Image>
                            </Menu.Item>
                            <Menu.Menu position='right' style={{ marginRight: "30px" }}>
                                <Menu.Item name='about' as={Link} to='/about'>
                                    <Header as='h4' className='header-items'>About</Header>
                                </Menu.Item>  
                                <Menu.Item name='policy' as={Link} to='/privacy'>
                                    <Header as='h4' className='header-items'>Privacy policy</Header>
                                </Menu.Item>   
                                <Menu.Item name='about' as={Link} to='/plans'>
                                    <Header as='h4' className='header-items'>My plans</Header>
                                </Menu.Item>                            
                                <UserMenu />
                            </Menu.Menu>
                        </Menu>                       
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default SiteHeader;