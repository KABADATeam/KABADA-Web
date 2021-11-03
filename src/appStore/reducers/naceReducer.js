export const industriesReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCHING_INDUSTRIES_SUCCESS':
            return action.payload;
        default:
            return state;
    }
}

export const activitiesReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCHING_ACTIVITIES_SUCCESS':
            return action.payload;
        default:
            return state;
    }
}

export const naceReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCHING_NACE_SUCCESS':
            const allNace = action.payload.map(
                item => ({
                    ...item, title: item.code + " " + item.title, key: item.id, value: item.id, children: (item.activities || []).map(cact1 =>
                    ({
                        ...cact1, title: cact1.code + " " + cact1.title, key: cact1.id, value: cact1.id, children: (cact1.activities || []).map(cact2 =>
                        ({
                            ...cact2, title: cact2.code + " " + cact2.title, key: cact2.id, value: cact2.id, children: (cact2.activities || []).map(cact3 =>
                            ({
                                ...cact3, title: cact3.code + " " + cact3.title, key: cact3.id, value: cact3.id,
                            }))
                        }))
                    }))
                })
            );
            return allNace;
        default:
            return state;
    }
}

export const naceSelectedReducer = (state = null, action) => {
    switch (action.type) {
        case 'NACE_SELECT_SUCCESS':
            return action.payload;
        default:
            return state;
    }
}

export const industrySelectedReducer = (state = null, action) => {
    switch (action.type) {
        case 'INDUSTRY_SELECT_SUCCESS':
            return action.payload;
        default:
            return state;
    }
}

export const activitySelectedReducer = (state = null, action) => {
    switch (action.type) {
        case 'ACTIVITY_SELECT_SUCCESS':
            const codes = formatCode(action.payload.code);
            const industry = industryCode(action.payload.code);
            return {
                code: action.payload.code,
                id: action.payload.id,
                title: action.payload.title,
                formatedCodes: codes,
                industry: industry
            }
        default:
            return state;
    }
}

const formatCode = (code) => {
    var fragments = code.split(".");
    var array = [];
    while (fragments.length > 0) {
        var item = fragments.join("");
        array.push(item);
        fragments.pop();
    }
    return array;
}

const industryCode = (code) => {
    var fragments = code.split(".");
    return fragments[0];
}
