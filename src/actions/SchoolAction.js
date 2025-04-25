import axios from "axios";
import { BASE_URL } from "../constants/constant";

export const loginSchool = (params, navigate) => {
    return (dispatch) => {
        console.log("Login params:", params);
        axios.post(`${BASE_URL}school/loginschool`, params)
            .then((response) => {
                console.log("Login response:", response);
                if (response.status == 200) {
                    var json = response.data;
                    if (json["status"] == true) {
                        var message = json["message"];
                        alert(message);
                        sessionStorage.setItem("schoollogin", true);
                        sessionStorage.setItem("token", json["access_token"]);
                        dispatch({ "type": "LOGIN", "payload": { "data": json["data"].school || [] } });
                        console.log(sessionStorage.getItem("token"));
                        navigate("/");
                    } else {
                        var message = json["message"];
                        alert(message);
                    }
                }
            })
            .catch((error) => {
                console.error("Login error:", error);
            });
    };
};

export const getSingleSchoolData = (id) => {
    return (dispatch) => {
        axios.get(`${BASE_URL}school/viewsingledata/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    const json = response.data["School_data"];
                    dispatch({ type: "STORE_SCHOOL_SINGLE", payload: { data: json[0] } });
                }
            })
            .catch((error) => {
                console.error("Error fetching school data:", error);
            });
    };
};

export const getAllSchoolData = () => {
    return (dispatch) => {
        dispatch({ type: "START" });
        axios.get(`${BASE_URL}school/viewdata`)
            .then((response) => {
                if (response.status === 200) {
                    const json = response.data;
                    dispatch({ type: "STORE_SCHOOL_DATA", "payload": { "data": json["School_data"] } });
                }
            })
            .catch((error) => {
                dispatch({ type: "END" });
            });
    };
};