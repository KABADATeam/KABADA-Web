import React from 'react'
import { Select } from 'antd'

function SalesForecastSelect({ defaultValue, onChange, dataSource1 }) {
    const dataSource = [
        {
            key: '1',
            month: "1st mo."
        }, {
            key: '2',
            month: '2nd mo.',
        }, {
            key: '3',
            month: '3rd mo.',
        }, {
            key: '4',
            month: '4th mo.',
        }, {
            key: '5',
            month: "5th mo.",
        }, {
            key: '6',
            month: '6th mo.',
        }, {
            key: '7',
            month: '7th mo.',
        }, {
            key: '8',
            month: '8th mo.',
        }, {
            key: '9',
            month: '9th mo.',
        }, {
            key: '10',
            month: '10th mo.',
        }, {
            key: '11',
            month: '11th mo.',
        }, {
            key: '12',
            month: '12th mo.',
        },

    ];
    return (
        <div>
            <Select style={{ width: '100px' }} defaultValue={defaultValue} onChange={onChange}>
                {dataSource.map(x => (
                    <option key={x.key} value={x.key}>{x.month}</option>
                ))}

            </Select>
        </div>
    )
}

export default SalesForecastSelect
