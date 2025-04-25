import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import SchoolReducer from "../reducers/SchoolReducer";
import AreaReducer from "../reducers/AreaReducer";
import StudentReducer from "../reducers/StudentReducer";
import BusReducer from "../reducers/BusReducer";

const rootReducer = combineReducers({
    "school": SchoolReducer,
    "area": AreaReducer,
    "student": StudentReducer,
    "bus": BusReducer,
});

const mystore = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default mystore;
