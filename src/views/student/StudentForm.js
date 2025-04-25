
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Button } from "react-bootstrap";
import { clearMessage, insertStudent } from "../../actions/StudentAction";
import { getSingleSchoolData } from "../../actions/SchoolAction";
import { getAllAreaData } from "../../actions/AreaAction";
import { jwtDecode } from "jwt-decode";
import { getAllBusData } from "../../actions/BusAction";

const StudentForm = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        student_name: "",
        father_name: "",
        father_mobile: "",
        mother_name: "",
        mother_mobile: "",
        student_password: "",
        student_standard: "",
        student_birthdate: "",
        is_active: "Yes",
        area_id: "",
        addressline1: "",
        addressline2: "",
        pincode: "",
        school_id: "",
        bus_id: "",
    });

    const { message } = useSelector(state => state.student);
    const { single: School_data } = useSelector(state => state.school);
    const { Area_data } = useSelector(state => state.area);
    const { Bus_data } = useSelector(state => state.bus);

    useEffect(() => {
        dispatch(clearMessage());
        const token = sessionStorage.getItem("token");

        if (token) {
            try {
                const decoded = jwtDecode(token);
                const school_id = decoded.school_id;
                dispatch(getSingleSchoolData(school_id));
                dispatch(getAllAreaData());
                dispatch(getAllBusData());
                setValues(prev => ({ ...prev, school_id }));

                // Debugging logs
                console.log("Decoded School ID:", school_id);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, [location, dispatch]);

    // Debug logs for Area and Bus data
    useEffect(() => {
        console.log("Fetched Area Data:", Area_data);
        console.log("Fetched Bus Data:", Bus_data);
    }, [Area_data, Bus_data]);



    const insertData = (e) => {
        e.preventDefault();

        if (!values.student_name || !values.father_name || !values.father_mobile || !values.mother_name || !values.mother_mobile || !values.student_password || !values.student_standard || !values.student_birthdate || !values.is_active || !values.area_id || !values.addressline1 || !values.addressline2 || !values.pincode || !values.school_id || !values.bus_id) {
            alert("Please fill all the required fields.");
            return;
        }

        const formData = new FormData();
        formData.append("student_name", values.student_name);
        formData.append("father_name", values.father_name);
        formData.append("father_mobile", values.father_mobile);
        formData.append("mother_name", values.mother_name);
        formData.append("mother_mobile", values.mother_mobile);
        formData.append("student_password", values.student_password);
        formData.append("student_standard", values.student_standard);
        formData.append("student_birthdate", values.student_birthdate);
        formData.append("is_active", values.is_active);
        formData.append("area_id", values.area_id);
        formData.append("addressline1", values.addressline1);
        formData.append("addressline2", values.addressline2);
        formData.append("pincode", values.pincode);
        formData.append("school_id", values.school_id);
        formData.append("bus_id", values.bus_id);

        dispatch(insertStudent(formData))
            .then(() => {
                setValues({
                    student_name: "",
                    father_name: "",
                    father_mobile: "",
                    mother_name: "",
                    mother_mobile: "",
                    student_password: "",
                    student_standard: "",
                    student_birthdate: "",
                    is_active: "Yes",
                    area_id: "",
                    addressline1: "",
                    addressline2: "",
                    pincode: "",
                    school_id: values.school_id,
                    bus_id: "",
                });
                navigate("/student");
            });
    };

    const goToHome = () => {
        navigate("/student");
    };

    return (
        <>
            <Navbar />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Student</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item">Components</li>
                            <li className="breadcrumb-item active">Student</li>
                        </ol>
                    </nav>
                </div>

                <section className="section">
                    <div className="row">
                        <div className="col-lg-6 offset-3">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title mb-3">Student Form</h4>
                                    <form onSubmit={insertData} method="post">
                                        <div className="form-group mb-3">
                                            <label>Student Name*</label>
                                            <input type="text" value={values.student_name} onChange={(e) => setValues({ ...values, student_name: e.target.value })} className="form-control" placeholder="Student Name" />
                                        </div>

                                        <div className="form-group mb-3">
                                            <label>Father Name*</label>
                                            <input type="text" value={values.father_name} onChange={(e) => setValues({ ...values, father_name: e.target.value })} className="form-control" placeholder="Father Name" />
                                        </div>

                                        <div className="form-group mb-3">
                                            <label>Father Mobile</label>
                                            <input type="tel" minLength={10} maxLength={10} value={values.father_mobile} onChange={(e) => setValues({ ...values, father_mobile: e.target.value })} className="form-control" placeholder="Father Mobile" />
                                        </div>

                                        <div className="form-group mb-3">
                                            <label>Mother Name</label>
                                            <input type="text" value={values.mother_name} onChange={(e) => setValues({ ...values, mother_name: e.target.value })} className="form-control" placeholder="Mother Name" />
                                        </div>

                                        <div className="form-group mb-3">
                                            <label>Mother Mobile</label>
                                            <input type="tel" minLength={10} maxLength={10} value={values.mother_mobile} onChange={(e) => setValues({ ...values, mother_mobile: e.target.value })} className="form-control" placeholder="Mother Mobile" />
                                        </div>

                                        <div className="form-group mb-3">
                                            <label>Student Password*</label>
                                            <input type="password" pattern=".{8,}" value={values.student_password} onChange={(e) => setValues({ ...values, student_password: e.target.value })} className="form-control" placeholder="Student Password" required />
                                        </div>

                                        <div className="form-group mb-3">
                                            <label>Student Standard*</label>
                                            <input type="text" pattern="^(1[0-2]|[1-9])$" title="Enter a number between 1 and 12" value={values.student_standard} onChange={(e) => setValues({ ...values, student_standard: e.target.value })} className="form-control" placeholder="Student Standard" required />
                                        </div>

                                        <div className="form-group mb-3">
                                            <label>Birthdate*</label>
                                            <input type="date" value={values.student_birthdate} onChange={(e) => setValues({ ...values, student_birthdate: e.target.value })} className="form-control" required />
                                        </div>

                                        <div className="form-group mb-3">
                                            <label>Is Active</label>
                                            <select value={values.is_active} onChange={(e) => setValues({ ...values, is_active: e.target.value })} className="form-control">
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </div>

                                        <div className="form-group mb-3">
                                            <label>Area*</label>
                                            <select value={values.area_id} onChange={(e) => setValues({ ...values, area_id: e.target.value })} className="form-control" required>
                                                <option value="">Select Area</option>
                                                {Area_data.filter(area => area.school_id === values.school_id).map(area => (
                                                    <option key={area.area_id} value={area.area_id}>{area.area_name}</option>
                                                ))}

                                            </select>
                                        </div>

                                        <div className="form-group mb-3">
                                            <label>Address Line 1</label>
                                            <input type="text" value={values.addressline1} onChange={(e) => setValues({ ...values, addressline1: e.target.value })} className="form-control" placeholder="Address Line 1" />
                                        </div>

                                        <div className="form-group mb-3">
                                            <label>Address Line 2</label>
                                            <input type="text" value={values.addressline2} onChange={(e) => setValues({ ...values, addressline2: e.target.value })} className="form-control" placeholder="Address Line 2" />
                                        </div>

                                        <div className="form-group mb-3">
                                            <label>Pincode</label>
                                            <input type="tel" minLength={6} maxLength={6} value={values.pincode} onChange={(e) => setValues({ ...values, pincode: e.target.value })} className="form-control" placeholder="Pincode" />
                                        </div>

                                        <div className="form-group mb-3">
                                            <label>School Name</label>
                                            <input
                                                type="text"
                                                value={School_data ? School_data.school_name : ""}
                                                className="form-control"
                                                disabled
                                            />
                                        </div>

                                        <div className="form-group mb-3">
                                            <label>Bus*</label>
                                            <select value={values.bus_id} onChange={(e) => setValues({ ...values, bus_id: e.target.value })} className="form-control" required>
                                                <option value="">Select Bus</option>
                                                {Bus_data.filter(bus => bus.school_id === values.school_id).map(bus => (
                                                    <option key={bus.bus_id} value={bus.bus_id}>{bus.bus_name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <Button type="submit" variant="success">Add</Button>{' '}
                                        <button onClick={goToHome} className="btn btn-light">Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default StudentForm;