const initialState = {
    "School_data": [],
    "loading": false,
    "single": null,
    "message": "",
    "islogin": "",
};

const SchoolReducer = (state = initialState, action) => {
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
        case "STORE_SCHOOL_DATA":
            return {
                ...state,
                "School_data": action.payload.data,
                "loading": false
            };
        case "SHOW_SCHOOL_MESSAGE":
            return {
                ...state,
                "message": action.payload.message,
            };
        case "STORE_SCHOOL_SINGLE":
            return {
                ...state,
                "single": action.payload.data,
                "loading": false
            };
        case "LOGIN":
            return {
                ...state,
                "islogin": true,
                "School_data": action.payload.data
            };
        case "LOGOUT":
            return {
                ...state,
                "islogin": false,
                "School_data": null
            };
        default:
            return state;
    }
};

export default SchoolReducer;