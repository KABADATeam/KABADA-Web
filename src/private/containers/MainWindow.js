import React from 'react';
import { Grid } from 'semantic-ui-react';
import MessageBox from '../components/MessageBox';

class MainWindow extends React.Component {

    render() {        
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={16} >
                        <div style={{ textAlign: "center"}}>
                            <MessageBox />
                            {this.props.children}
                        </div>
                    </Grid.Column>
                </Grid.Row>           
            </Grid>              
        );
    }
}

export default MainWindow;