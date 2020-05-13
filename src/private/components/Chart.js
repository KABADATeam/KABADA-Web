import React, {Component} from 'react';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

class Chart extends Component{

    render() {
        return(
            <AreaChart
                width={600}
                height={400}
                data={this.props.data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                    type='monotone'
                    dataKey='uv'
                    stroke='#8884d8'
                    fill='#8884d8'
                />
            </AreaChart>
        )
    }
}

  export default Chart


  
