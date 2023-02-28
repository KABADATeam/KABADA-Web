import React from 'react'
import { Table, Typography } from 'antd';
import TooltipComponent from '../Tooltip';

const { Text } = Typography;

function SalesForecastTable({ columns, dataSource, title }) {
    if (title === 'Sales forecast in EU') {
        return (
            <div>
                <Table
                    title={() =>
                        <>
                            <Text>Sales forecast in EU</Text>
                            <TooltipComponent code='salesforecast4' type='text' />
                        </>
                    }
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                />
            </div>
        )
    } else if (title === 'Sales forecast outside EU') {
        return (
            <div>
                <Table
                    title={() =>
                        <>
                            <Text>Sales forecast outside EU</Text>
                            <TooltipComponent code='salesforecast5' type='text' />
                        </>
                    }
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                />
            </div>
        )
    }
}

export default SalesForecastTable;