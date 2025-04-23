import axios from "axios";
import { BASE_URL } from "../constants/constant";

export const getAllAreaData = () => {
    return (dispatch) => {
        dispatch({ type: "START" });
        axios.get(`${BASE_URL}area/viewdata`)
            .then((response) => {
                if (response.status === 200) {
                    const json = response.data;
                    dispatch({ type: "STORE_AREA_DATA", "payload": { "data": json["Area_data"] } });
                }
            })
            .catch((error) => {
                dispatch({ type: "END" });
            });
    };
};

export const insertArea = (formData) => {
    return (dispatch) => {
        console.log("Sending data to backend:", formData); // Log formData to make sure it's not empty
        return axios.post(`${BASE_URL}area/insertdata`, formData)
            .then((response) => {
                if (response.status == 200) {
                    var json = response.data;
                    if (json["status"] == true) {
                        var message = json["message"];
                        alert(message);
                        // dispatch({ "type": "SHOW_MESSAGE", "payload": { "message": "Data Inserted Successfully" } });
                        dispatch(getAllAreaData());
                    }
                    else {
                        // var message = json["message"];
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

export const deleteArea = (id) => {
    return (dispatch) => {
        return axios.delete(`${BASE_URL}area/deletedata/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    var json = response.data;
                    if (json["status"] === true) {
                        var message = json["message"];
                        alert(message);
                        dispatch(getAllAreaData());
                    }
                }
            }).catch((error) => { 
                console.error("Error deleting area:", error);
            });
    }
};

export const getSingleAreaData = (id) => {
    return (dispatch) => {
        axios.get(`${BASE_URL}area/viewsingledata/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    var json = response.data["Area_data"];
                    console.log(json);
                    dispatch({ "type": "STORE_AREA_SINGLE", "payload": { "data": json[0] } });
                }
            })
    };
};

export const updateArea = (formData) => {
    return (dispatch) => {
        return axios.patch(`${BASE_URL}area/updatedata/${formData.get("area_id")}`, formData) // Add return here
            .then((response) => {
                if (response.status === 200) {
                    var json = response.data;
                    if (json["status"] === true) {
                        var message = json["message"];
                        alert(message);
                        dispatch(getAllAreaData());
                    } else {
                        alert(json["message"]);
                    }
                }
            })
            .catch((error) => {
                console.error("Error updating area:", error);
            });
    };
};

export const clearMessage = () => {
    return (dispatch) => {
        dispatch({ "type": "SHOW_AREA_MESSAGE", "payload": { "message": "" } });
    }
};