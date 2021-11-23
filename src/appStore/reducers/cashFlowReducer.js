export const cashFlowReducer = (state = [], action) => {
    switch (action.type) {
        case "FETCHING_CASHFLOW_SUCCESS":
            let dataForTable = [];
            const cash = action.payload;
            const dataForTable_openingCash = tableDataFormation(cash.openingCash, dataForTable);
            dataForTable.concat(dataForTable_openingCash);
            dataForTable.push({ title: "Revenue", tag: "title" });
            const dataForTable_initialRevenue = tableDataFormation(cash.initialRevenue, dataForTable);
            dataForTable.concat(dataForTable_initialRevenue);
            const dataForTable_salesForecast = tableDataFormation(cash.salesForecast, dataForTable);
            dataForTable.concat(dataForTable_salesForecast);
            dataForTable.push({ title: "Costs", tag: "title" });
            const dataForTable_investments = tableDataFormation(cash.investments, dataForTable);
            dataForTable.concat(dataForTable_investments);
            const dataForTable_fixedCosts = tableDataFormation(cash.fixedCosts, dataForTable);
            dataForTable.concat(dataForTable_fixedCosts);
            const dataForTable_variableCosts = tableDataFormation(cash.variableCosts, dataForTable);
            dataForTable.concat(dataForTable_variableCosts);
            const dataForTable_balances = tableDataFormation(cash.balances, dataForTable);
            dataForTable.concat(dataForTable_balances);
            console.log(dataForTable);

            let res = []
            const monthsCount = keyExists(action.payload, 'monthlyValue', res);
            console.log(monthsCount)
            const renderContent = (value, row, index) => {
                const obj = {
                    children: <p style={{ marginBottom: 0 }}>{(typeof value === 'number') ? value : '-'}</p>,
                    props: { style: { color: (typeof value === 'number' && value < 0) ? '#820014' : "#262626", background: (typeof value === 'number' && value < 0) ? "#FFCCC7" : '#FFFFFF' } },
                };
                if (row.tag === "title" || row.tag === "section") {
                    obj.props.colSpan = 0;
                    obj.props.fixed = 'left';
                }
                if (row.tag === "summary") {
                    obj.props.style = { background: '#FAFAFA', fontWeight: 600 }

                }
                return obj;
            };

            let tableColumns = []
            for (let index = 0; index < monthsCount; index++) {
                tableColumns.push({ title: index.toString(), dataIndex: index, key: index, align: 'center', width: 90, render: renderContent })
            }
            return { ...cash, "dataForTable": dataForTable.map((obj, index) => ({ ...obj, "key": index })), "tableColumns": tableColumns };
        case 'RESET_CASH_FLOW':
            return {state: []}
        default:
            return state;
    }
};

const tableDataFormation = (data, dataForTable) => {
    if (data.title) {
        dataForTable.push({ title: data.title, tag: "section" })
    }
    data.rows.forEach(element => {
        dataForTable.push({ title: element.title, totalYear1: element.totalYear1, totalYear2: element.totalYear2, ...element.monthlyValue });
    });
    if (data.summaries) {
        data.summaries.forEach(element => {
            dataForTable.push({ tag: "summary", title: element.title, totalYear1: element.totalYear1, totalYear2: element.totalYear2, ...element.monthlyValue });
        });
    }
    return dataForTable;
}

const keyExists = (obj, key, res) => {
    if (!obj || (typeof obj !== "object" && !Array.isArray(obj))) {
        return false;
    }
    else if (obj.hasOwnProperty(key)) {
        res.push(obj[key])
    }
    else if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
            const result = keyExists(obj[i], key, res);
        }
    }
    else {
        for (const k in obj) {
            const result = keyExists(obj[k], key, res);
        }
    }

    return Math.max.apply(Math, res.map(function (el) { return el.length }));;
};

