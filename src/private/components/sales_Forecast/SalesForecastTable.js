import React from 'react'
import { Table } from 'antd';

function SalesForecastTable({ columns, dataSource, title }) {

    return (
        <div>


            <Table title={() => title} columns={columns} dataSource={dataSource} pagination={false} />


        </div>
    )
}

export default SalesForecastTable;