import React from 'react'
import { Select } from 'antd'
const { Option } = Select;
function SalesForecastSelect({ defaultValue, onChange, dataSource }) {

    return (

        <Select defaultValue={defaultValue} onChange={onChange}>
            {dataSource.map(x => (
                <Option key={x.key} value={x.value}>{x.name}</Option>
            ))}

        </Select>

    )
}

export default SalesForecastSelect
