import axios from "axios";
import { BASE_URL } from "../constants/constant";

export const getAllBusData = () => {
    return (dispatch) => {
        dispatch({ type: "START" });
        axios.get(`${BASE_URL}bus/viewdata`)
            .then((response) => {
                if (response.status === 200) {
                    const json = response.data;
                    dispatch({ type: "STORE_BUS_DATA", "payload": { "data": json["Bus_data"] } });
                }
            })
            .catch((error) => {
                dispatch({ type: "END" });
            });
    };
};

export const insertBus = (formData) => {
    return (dispatch) => {
        console.log("Sending data to backend:", formData); // Log formData to make sure it's not empty
        return axios.post(`${BASE_URL}bus/insertdata`, formData)
            .then((response) => {
                if (response.status == 200) {
                    var json = response.data;
                    if (json["status"] == true) {
                        var message = json["message"];
                        alert(message);
                        dispatch(getAllBusData());
                    }
                    else {
                        alert(message);
                    }
                }
            })
            .catch((error) => {
                console.error("Error during the insert:", error);
                alert("There was an error during insertion. Please try again.");
            });
    };
};

export const deleteBus = (id) => {
    return (dispatch) => {
        return axios.delete(`${BASE_URL}bus/deletedata/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    var json = response.data;
                    if (json["status"] === true) {
                        var message = json["message"];
                        alert(message);
                        dispatch(getAllBusData());
                    }
                }
            }).catch((error) => { 
                console.error("Error deleting bus:", error);
            });
    }
};

export const getSingleBusData = (id) => {
    return (dispatch) => {
        axios.get(`${BASE_URL}bus/viewsingledata/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    var json = response.data["Bus_data"];
                    console.log(json);
                    dispatch({ "type": "STORE_BUS_SINGLE", "payload": { "data": json[0] } });
                }
            })
    };
};

export const updateBus = (formData) => {
    return (dispatch) => {
        return axios.patch(`${BASE_URL}bus/updatedata/${formData.get("bus_id")}`, formData) // Add return here
            .then((response) => {
                if (response.status === 200) {
                    var json = response.data;
                    if (json["status"] === true) {
                        var message = json["message"];
                        alert(message);
                        dispatch(getAllBusData());
                    } else {
                        alert(json["message"]);
                    }
                }
            })
            .catch((error) => {
                console.error("Error updating bus:", error);
            });
    };
};

export const clearMessage = () => {
    return (dispatch) => {
        dispatch({ "type": "SHOW_BUS_MESSAGE", "payload": { "message": "" } });
    }
};