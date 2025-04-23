const initialState = {
    "Bus_data": [],
    "loading": false,
    "single": null,
    "message": "",
    "islogin": "",
};

const BusReducer = (state = initialState, action) => {
    switch (action.type) {
        case "START":
            return {
                ...state,
                "loading": true
            };
        case "END":
            return {
                ...state,
                "loading": false
            };
        case "STORE_BUS_DATA":
            return {
                ...state,
                "Bus_data": action.payload.data,
                "loading": false
            };
        case "SHOW_BUS_MESSAGE":
            return {
                ...state,
                "message": action.payload.message,
            };
        case "STORE_BUS_SINGLE":
            return {
                ...state,
                "single": action.payload.data,
                "loading": false
            };
        default:
            return state;
    }
};

export default BusReducer;