import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Menu, Image, Header } from 'semantic-ui-react';
import '../../css/header.css';
import mainMenuDictionary from '../../dictionaries/MainMenuDictionary';

class SiteHeader extends React.Component {
    render() {
        const translation = mainMenuDictionary["en"];
        return (
            <Grid>
                <Grid.Row columns={1} only='computer tablet'>
                    <Grid.Column>
                        <Menu inverted className='header-config' secondary>
                            <Menu.Item name='home'>
                                <Image src='kabada_logo.png' as={Link} to='/' style={{ width: "120px"}}></Image>
                            </Menu.Item>
                            <Menu.Menu position='right' style={{ marginRight: "30px" }}>
                                <Menu.Item name='about' as={Link} to='/about'>
                                    <Header as='h4' className='header-items'>{translation.about}</Header>
                                </Menu.Item>  
                                <Menu.Item name='policy' as={Link} to='/privacy'>
                                    <Header as='h4' className='header-items'>Privacy policy</Header>
                                </Menu.Item>                              
                                <Menu.Item name='login' as={Link} to='/login'>
                                    <Header as='h4' className='header-items'>{translation.login}</Header>
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