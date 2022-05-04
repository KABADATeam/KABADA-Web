export const channelsReducer = (
    state = {
        is_channels_completed: false,
        channels: [],
        aiChannelPredict: []
    }, action) => {
    switch (action.type) {
        case "FETCHING_CHANNELS_SUCCESS":
            //console.log(action.payload);
            return action.payload;
        case "SAVE_CHANNEL_SUCCESS":
            const channels = [ ...state.channels, { ...action.payload } ];
            return { ...state, "channels": channels };
        case "UPDATE_CHANNEL_SUCCESS":
            //console.log(action.payload);
            const channels_ = state.channels.map(x => x.id === action.payload.id ? action.payload : x);
            //console.log(channels_);
            return { ...state, "channels": channels_ };
        case "REMOVING_CHANNEL_SUCCESS":
            const _channels = state.channels.filter(x => x.id !== action.payload);
            return { ...state, "channels": _channels };
        case "SAVE_STATE_SUCCESS":
            return { ...state, "is_channels_completed": action.payload };
        case "GET_AI_CHANNEL_PREDICT_SUCCESS": 
            console.log(action.payload)
            return {...state, aiChannelPredict: action.payload }
        default:
            return state;
    }
};

export const channelTypesReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCHING_CHANNEL_TYPES_SUCCESS':
            return action.payload.channel_types;
        default:
            return state;
    }
}
