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

            const renderContent = (value, row, index) => {
                const obj = {
                    children: (value !== null || value) ? <p style={{ marginBottom: 0 }}>{value}</p> : <p style={{ marginBottom: 0 }}>-</p>,
                    props: { style: { color: (value === 0) ? "#820014" : '#262626', background: (value === 0) ? "#FFCCC7" : '' } },
                };
                if (row.tag === "title" || row.tag === "section") {
                    obj.props.colSpan = 0;
                }
                return obj;
            };
            const tableColumns = cash.openingCash.rows[0].monthlyValue.map((v, index) => ({ title: index, dataIndex: index, key: index, render: renderContent }));

            return { ...cash, "dataForTable": dataForTable.map((obj, index) => ({ ...obj, "key": index })), "tableColumns": tableColumns };
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