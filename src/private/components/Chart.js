import React, {Component} from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

class Chart extends Component{

    render() {
        const firstElement = this.props.data[0]
        const emptyElement = { }
        const returnElement = Object.assign(emptyElement, firstElement)
        const objectPropertyNames = Object.getOwnPropertyNames(returnElement)
        const legendName = objectPropertyNames[1]
        return(
            <BarChart
                width={600}
                height={350}
                data={this.props.data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                    dataKey={legendName}
                    fill='#8884d8'
                />
            </BarChart>
        )
    }
}

  export default Chart


  
