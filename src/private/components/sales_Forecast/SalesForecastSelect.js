import React from 'react'
import { Select } from 'antd'

function SalesForecastSelect({ defaultValue, onChange, dataSource }) {

    return (
        <div>
            <Select style={{ width: '100px' }} defaultValue={defaultValue} onChange={onChange}>
                {dataSource.map(x => (
                    <option key={x.key} value={x.value}>{x.name}</option>
                ))}

            </Select>
        </div>
    )
}

export default SalesForecastSelect
