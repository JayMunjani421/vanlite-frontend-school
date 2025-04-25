import axios from "axios";
import { BASE_URL } from "../constants/constant";

export const getAllStudentData = () => {
    return (dispatch) => {
        dispatch({ type: "START" });
        axios.get(`${BASE_URL}student/viewdata`)
            .then((response) => {
                if (response.status === 200) {
                    const json = response.data;
                    dispatch({ type: "STORE_STUDENT_DATA", "payload": { "data": json["Student_data"] } });
                }
            })
            .catch((error) => {
                dispatch({ type: "END" });
            });
    };
};

export const insertStudent = (formData) => {
    return (dispatch) => {
        console.log("Sending data to backend:", formData); // Log formData to make sure it's not empty
        return axios.post(`${BASE_URL}student/insertdata`, formData)
            .then((response) => {
                if (response.status == 200) {
                    var json = response.data;
                    if (json["status"] == true) {
                        var message = json["message"];
                        alert(message);
                        dispatch(getAllStudentData());
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

export const deleteStudent = (id) => {
    return (dispatch) => {
        return axios.delete(`${BASE_URL}student/deletedata/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    var json = response.data;
                    if (json["status"] === true) {
                        var message = json["message"];
                        alert(message);
                        dispatch(getAllStudentData());
                    }
                }
            }).catch((error) => { 
                console.error("Error deleting student:", error);
            });
    }
};

export const getSingleStudentData = (id) => {
    return (dispatch) => {
        axios.get(`${BASE_URL}student/viewsingledata/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    var json = response.data["Student_data"];
                    console.log(json);
                    dispatch({ "type": "STORE_STUDENT_SINGLE", "payload": { "data": json[0] } });
                }
            })
    };
};

export const updateStudent = (formData) => {
    return (dispatch) => {
        return axios.patch(`${BASE_URL}student/updatedata/${formData.get("student_id")}`, formData) // Add return here
            .then((response) => {
                if (response.status === 200) {
                    var json = response.data;
                    if (json["status"] === true) {
                        var message = json["message"];
                        alert(message);
                        dispatch(getAllStudentData());
                    } else {
                        alert(json["message"]);
                    }
                }
            })
            .catch((error) => {
                console.error("Error updating student:", error);
            });
    };
};

export const clearMessage = () => {
    return (dispatch) => {
        dispatch({ "type": "SHOW_STUDENT_MESSAGE", "payload": { "message": "" } });
    }
};