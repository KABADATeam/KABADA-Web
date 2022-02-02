import React from 'react'
import { Select } from 'antd'
import { CaretDownFilled } from '@ant-design/icons';

const { Option } = Select;
function SalesForecastSelect({ defaultValue, onChange, dataSource }) {

    return (

        <Select defaultValue={defaultValue} onChange={onChange} suffixIcon={<CaretDownFilled />} style={{width: 106}} disabled={true}>
            {dataSource.map(x => (
                <Option key={x.key} value={x.value}>{x.name}</Option>
            ))}

        </Select>

    )
}

export default SalesForecastSelect
