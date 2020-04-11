import React from 'react';
import { Grid } from 'semantic-ui-react';

class MainWindow extends React.Component {

    render() {        
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={16} >
                        {this.props.children}
                    </Grid.Column>
                </Grid.Row>           
            </Grid>              
        );
    }
}

export default MainWindow;