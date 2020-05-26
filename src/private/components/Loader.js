import React from 'react'
import {Dimmer, Loader} from 'semantic-ui-react'

const ChartLoader = (props) => (
        <Dimmer active={props.active} inverted>
            <Loader  content='Loading'/>
        </Dimmer>
)

export default ChartLoader