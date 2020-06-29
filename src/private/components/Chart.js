import React, {Component} from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

class Chart extends Component{

    render() {
        const firstElement = this.props.data[0];
        const emptyElement = { };
        const returnElement = Object.assign(emptyElement, firstElement);
        const objectPropertyNames = Object.getOwnPropertyNames(returnElement);
        const legendName = objectPropertyNames[1];

        return(
            <div>
                <div>
                    <h2>{legendName}</h2>
                </div>
            
            <BarChart
                width={700}
                height={400}
                data={this.props.data}
                style={{ margin: "0 auto" }}
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
            </div>
        )
    }
}

  export default Chart


  
