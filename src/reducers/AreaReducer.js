const initialState = {
    "Area_data": [],
    "loading": false,
    "single": null,
    "message": "",
    "islogin": "",
};

const AreaReducer = (state = initialState, action) => {
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
        case "STORE_AREA_DATA":
            return {
                ...state,
                "Area_data": action.payload.data,
                "loading": false
            };
        case "SHOW_AREA_MESSAGE":
            return {
                ...state,
                "message": action.payload.message,
            };
        case "STORE_AREA_SINGLE":
            return {
                ...state,
                "single": action.payload.data,
                "loading": false
            };
        default:
            return state;
    }
};

export default AreaReducer;