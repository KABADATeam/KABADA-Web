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

export const activitySelectedForEurostatReducer = (state = null, action) => {
    switch (action.type) {
        case 'ACTIVITY_SELECT_FOR_EUROSTAT_SUCCESS':
            var naceSplit = action.payload.split(".")
            const naceJoin = naceSplit.join("")
            console.log(naceJoin)
            return naceJoin;
        default:
            return state;
    }
}