const compareArray = (arrayAI, arrayState) => {
    const newArray = []
    for (var i in arrayAI) {
        if (arrayState.indexOf(arrayAI[i]) === -1) {
            newArray.push(arrayAI[i]);
        }
    }
    return newArray;
}

export const swotReducer = (
    state = {
        is_swot_completed: false,
        checked_strengths: [],
        checked_weakness: [],
        checked_oportunities: [],
        checked_threats: [],
        _t: {
            strengths_weakness_items: [],
            oportunities_threats: []
        },
        original: {
            strengths_weakness_items: [],
            oportunities_threats: []
        },
        original_updates: {
            strengths: [],
            opportunities: []
        },
        updates: {
            strengths: [],
            opportunities: []
        },
        swotAIPredict: null
    }, action) => {
    switch (action.type) {
        case "FETCHING_SWOT_SUCCESS":
            const strengths = action.payload.strengths_weakness_items.map(obj => ({ ...obj, key: obj.id, tag: 0 })).sort((a, b) => (a.title < b.title) ? 1 : -1).sort((a, b) => (a.isLocal > b.isLocal) ? 1 : -1);
            const opportunities = action.payload.oportunities_threats.map(obj => ({ ...obj, key: obj.id, tag: 0 })).sort((a, b) => (a.title < b.title) ? 1 : -1).sort((a, b) => (a.isLocal > b.isLocal) ? 1 : -1);
            const is_completed = action.payload.is_swot_completed;
            const originalObject = {
                "strengths_weakness_items": strengths,
                "oportunities_threats": opportunities
            };
            //map through strength_weakness_items, for strengths add only those obj that have value 1(thats strengths selected)
            ////map through strength_weakness_items, for weakness add only those obj that have value 2(thats weakness selected)
            const checked_strengths = []
            const checked_weakness = []
            const updated_strenghts = []

            const checked_oportunities = []
            const checked_threats = []
            const updated_oportunities = []
            originalObject.strengths_weakness_items.forEach(item => {
                if (item.value === 1) {
                    checked_strengths.push(item)
                    updated_strenghts.push(item)
                } else if (item.value === 2) {
                    checked_weakness.push(item)
                    updated_strenghts.push(item)
                }
            });
            originalObject.oportunities_threats.forEach(item =>{
                if(item.value === 3){
                    checked_oportunities.push(item)
                    updated_oportunities.push(item)
                }else if(item.value === 4){
                    checked_threats.push(item)
                    updated_oportunities.push(item)
                }
            })
            const original_updates_strength = JSON.parse(JSON.stringify(updated_strenghts))
            const original_updates_oportunities = JSON.parse(JSON.stringify(updated_oportunities))

            const cloneObject = JSON.parse(JSON.stringify(originalObject));
            return { ...state, 
                original: originalObject, 
                _t: cloneObject, 
                original_updates: {"strengths":original_updates_strength, "opportunities": original_updates_oportunities}, 
                updates: { "strengths": updated_strenghts, "opportunities": updated_oportunities}, 
                checked_strengths: checked_strengths, 
                checked_weakness: checked_weakness, 
                checked_oportunities: checked_oportunities, 
                checked_threats: checked_threats, 
                "is_swot_completed": is_completed };
        case "UPDATE_CHECKED_STRENGHTS_OPORTUNITIES_SUCCESS":
            //if checked are strenghts and weakness
            if (action.payload.type === 1) {
                const strengthIndex = state.checked_strengths.findIndex(x => x.id === action.payload.item.id);
                const weaknessIndex = state.checked_weakness.findIndex(x => x.id === action.payload.id);
                const checkedStrengths = state.checked_strengths;
                const checkedWeakness = state.checked_weakness;
                const strengths = state.updates.strengths;
                const index = state.updates.strengths.findIndex(x => x.id === action.payload.item.id);

                //add strength
                if (action.payload.item.value === 1) {
                    //if there is no item in checked_strength with that id, add one
                    if (strengthIndex === -1) {
                        // if updates.strenghts already has that item dont add new one
                        if(index === -1){
                            const checked_strengths = [...checkedStrengths, { ...action.payload.item }];
                            const updated = [...strengths, { ...action.payload.item }];
                            // setting updates strenghts to updated. keeping whats already in strengths
                            const obj = { ...state.updates, strengths: updated };
                            return { ...state, checked_strengths: checked_strengths,original: state.original, updates: obj }
                        }else{
                            //if updates.strengths have item with this id then update it
                            const checked_strengths = [...checkedStrengths, { ...action.payload.item }];
                            //change the item 
                            const updated = strengths.map(x => x.id === action.payload.item.id? action.payload.item: x);
                            // setting updates strenghts to updated. keeping whats already in strengths
                            const obj = { ...state.updates, strengths: updated };
                            return { ...state, checked_strengths: checked_strengths,original: state.original, updates: obj }
                        }
                        
                    }
                } else if (action.payload.item.value === 2) {
                    //if there isnt item in checked_weakness
                    if (weaknessIndex === -1) {
                        // if updates.strenghts already has that item dont add new one
                        if(index === -1){
                            const checked_weakness = [...checkedWeakness, { ...action.payload.item }]
                            const updated = [...strengths, { ...action.payload.item }];
                            // setting updates strenghts to updated. keeping whats already in strengths
                            const obj = { ...state.updates, strengths: updated };
                            return { ...state, checked_weakness: checked_weakness,original: state.original, updates: obj }
                        }else{
                            const checked_weakness = [...checkedWeakness, { ...action.payload.item }];
                            const updated = strengths.map(x => x.id === action.payload.item.id? action.payload.item : x);
                            // setting updates strenghts to updated. keeping whats already in strengths
                            const obj = { ...state.updates, strengths: updated };
                            return { ...state, checked_weakness: checked_weakness,original: state.original, updates: obj }
                        }
                        
                    }
                } else if (action.payload.item.value === 0) {
                    //it can be 0 too
                    //if its unchecked then delete checked_strength and weakness to 
                    const checked_weakness = checkedWeakness.filter(x => x.id !== action.payload.item.id);
                    const checked_strengths = checkedStrengths.filter(x => x.id !== action.payload.item.id)
                    //update item not delete it. its value just gonna change to 0
                    const updated = strengths.map(x => x.id === action.payload.item.id? action.payload.item : x);
                    const obj = { ...state.updates, strengths: updated };
                    return { ...state,original: state.original, checked_strengths: checked_strengths, checked_weakness: checked_weakness, updates: obj
                    }
                }
                //checking if there is no item with such id in checkedStrengths. then add

            } else if (action.payload.type === 2) {
                //if checked are opportunities

                const oportunityIndex = state.checked_oportunities.findIndex(x => x.id === action.payload.item.id);
                const threatIndex = state.checked_threats.findIndex(x => x.id === action.payload.id);
                const checkedOportunities = state.checked_oportunities;
                const checkedThreats = state.checked_threats;

                const oportunities = state.updates.opportunities;
                const index = state.updates.opportunities.findIndex(x => x.id === action.payload.item.id);

                //add oportunity
                if (action.payload.item.value === 3) {
                    //if there is no item in checked_oportunities with that id, add one
                    if (oportunityIndex === -1) {
                        // if updates.opportunities already has that item dont add new one
                        if(index === -1){
                            //add to checked_oportunities and updates.opportunities add too
                            const checked_oportunities = [...checkedOportunities, { ...action.payload.item }]
                            const updated = [...oportunities, { ...action.payload.item }];
                            // setting updates opportunities to updated. keeping whats already in opportunities
                            const obj = { ...state.updates, opportunities: updated };
                            return { ...state, checked_oportunities: checked_oportunities,original: state.original, updates: obj }
                        }else{
                            //if updates.opportunities have item with this id then update it. and add item to checked_oportunities becouse there isnt one there
                            const checked_oportunities = [...checkedOportunities, { ...action.payload.item }]
                            //change the item 
                            const updated = oportunities.map(x => x.id === action.payload.item.id? action.payload.item: x);
                            // setting updates opportunities to updated. keeping whats already in opportunities
                            const obj = { ...state.updates, opportunities: updated };
                            return { ...state, checked_oportunities: checked_oportunities,original: state.original, updates: obj }
                        }
                        
                    }
                    //if its threat
                } else if (action.payload.item.value === 4) {
                    //if there isnt item in checked_threats
                    if (threatIndex === -1) {
                        // if updates.opportunities already has that item dont add new one
                        if(index === -1){
                            //add to checked_threats and updates.opportunities add too 
                            const checked_threats = [...checkedThreats, { ...action.payload.item }]
                            const updated = [...oportunities, { ...action.payload.item }];
                            // setting updates opportunities to updated. keeping whats already in opportunities
                            const obj = { ...state.updates, opportunities: updated };
                            return { ...state, checked_threats: checked_threats,original: state.original, updates: obj }
                        }else{
                            //if updates.opportunities have item with this id then update it. and add item to checked_threats becouse there isnt one there
                            const checked_threats = [...checkedThreats, { ...action.payload.item }]
                            const updated = oportunities.map(x => x.id === action.payload.item.id? action.payload.item : x);
                            // setting updates opportunities to updated. keeping whats already in opportunities
                            const obj = { ...state.updates, opportunities: updated };
                            return { ...state, checked_threats: checked_threats,original: state.original, updates: obj }
                        }
                        
                    }
                } else if (action.payload.item.value === 0) {
                    //it can be 0 too
                    //if its unchecked then delete checked_oportunities and threats to 
                    const checked_oportunities = checkedOportunities.filter(x => x.id !== action.payload.item.id);
                    const checked_threats = checkedThreats.filter(x => x.id !== action.payload.item.id)
                    //update item not delete it. its value just gonna change to 0
                    const updated = oportunities.map(x => x.id === action.payload.item.id? action.payload.item : x);
                    const obj = { ...state.updates, opportunities: updated };
                    return { ...state,original: state.original, checked_oportunities: checked_oportunities, checked_threats: checked_threats, updates: obj
                    }
                }
            }
            return state;
        case "CREATE_NEW_ITEM_SUCCESS":
            if (action.payload.type === 1) {
                const strengths = [...state.original.strengths_weakness_items, action.payload.item];
                const obj = { ...state.original, strengths_weakness_items: strengths };
                return { ...state, updates: state.updates, original: obj };
            } else if (action.payload.type === 2) {
                const opportunities = [...state.original.oportunities_threats, action.payload.item];
                const obj = { ...state.original, oportunities_threats: opportunities };
                return { ...state, updates: state.updates, original: obj };
            }
            return state;
        case "UPDATE_ITEM_SUCCESS":
            if (action.payload.type === 1) {
                const strengths = state.original.strengths_weakness_items;
                const updated = strengths.map(x => x.id === action.payload.item.id ? action.payload.item : x);
                const obj = { ...state.original, strengths_weakness_items: updated };
                return { ...state, updates: state.updates, original: obj };
            } else if (action.payload.type === 2) {
                const opportunities = state.original.oportunities_threats;
                const updated = opportunities.map(x => x.id === action.payload.item.id ? action.payload.item : x);
                const obj = { ...state.original, oportunities_threats: updated };
                return { ...state, updates: state.updates, original: obj };
            }
            return state;
        case "DELETE_ITEM_SUCCESS":
            if (action.payload.type === 1) {
                const updatedStrengths = state.updates.strengths.filter(x => x.id !== action.payload.id);
                const originalStrengths = state.original.strengths_weakness_items.filter(x => x.id !== action.payload.id);
                const originalObject = {
                    "strengths_weakness_items": originalStrengths,
                    "oportunities_threats": state.original.oportunities_threats
                };
                const updatesObject = {
                    "strengths": updatedStrengths,
                    "opportunities": state.updates.opportunities
                };

                const cloneObject = JSON.parse(JSON.stringify(originalObject));
                return { ...state, original: originalObject, updates: updatesObject, _t: cloneObject };
            } else if (action.payload.type === 2) {
                const updatedOpportunities = state.updates.opportunities.filter(x => x.id !== action.payload.id);
                const originalOpportunities = state.original.oportunities_threats.filter(x => x.id !== action.payload.id);
                const originalObject = {
                    "strengths_weakness_items": state.original.strengths_weakness_items,
                    "oportunities_threats": originalOpportunities
                };
                const updatesObject = {
                    "strengths": state.updates.strengths,
                    "opportunities": updatedOpportunities
                };
                const cloneObject = JSON.parse(JSON.stringify(originalObject));

                return { ...state, original: originalObject, updates: updatesObject, _t: cloneObject };
            }
            return state;
        case "DISCARD_CHANGES_SUCCESS":
            // const obj = {
            //     strengths: [],
            //     opportunities: []
            // };
            const original_updates = JSON.parse(JSON.stringify(state.original_updates));
            //delete items that are no strengths
            const strengths_checked = original_updates.strengths.filter(x => x.value !== 2)
            //delete items that are no weakness
            const weakness_checked = original_updates.strengths.filter(x => x.value !== 1)

            const discardObj = JSON.parse(JSON.stringify(state._t));
            return { ...state, original: discardObj, updates: original_updates, checked_strengths: strengths_checked, checked_weakness: weakness_checked};
        case "SAVE_STATE_SUCCESS":
            return { ...state, "is_swot_completed": action.payload };
        case "GET_AI_SWOT_PREDICT_SUCCESS":
            return {
                ...state,
                "swotAIPredict": action.payload 
            }
        case "SET_SWOT_OPPORTUNITIES_AI_PREDICT":
            const { original, updates } = action.payload.userData;
            const opportunities_items_array = [...state.updates.opportunities];
            const selected_opportunities_items = state.updates.opportunities.map(e => e.id);
            const compared_opportunities = compareArray(action.payload.predict, selected_opportunities_items);
            for (let i in compared_opportunities) {
                const item = original.find(e => e.id === compared_opportunities[i]);
                const new_obj = {
                    ...item,
                    tag: 1,
                    value: 3
                }
                opportunities_items_array.push(new_obj)
            }
            const obj = { ...state.updates, opportunities: opportunities_items_array };
            return {
                ...state,
                updates: obj
            }
        default:
            return state;
    }
};

