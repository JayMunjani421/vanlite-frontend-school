import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Button } from "react-bootstrap";
import { clearMessage, insertArea } from "../../actions/AreaAction";
import { getSingleSchoolData } from "../../actions/SchoolAction";
import { jwtDecode } from "jwt-decode";

const AreaForm = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        aname: "",
        schoolid: "",
    });

    const { message } = useSelector(state => state.area);
    const { single: School_data } = useSelector(state => state.school);  // Get the single school data

    useEffect(() => {
        dispatch(clearMessage());

        // Get the token from session storage
        const token = sessionStorage.getItem("token");

        if (token) {
            try {
                const decoded = jwtDecode(token);
                const school_id = decoded.school_id;

                // Fetch the single school data
                dispatch(getSingleSchoolData(school_id));

                // Set the school ID in the form state
                setValues(prev => ({ ...prev, schoolid: school_id }));
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, [location, dispatch]);

    const insertData = (e) => {
        e.preventDefault();

        const { aname, schoolid } = values;

        if (!aname || !schoolid) {
            alert("Please fill in all fields");
            return;
        }

        const formData = new FormData();
        formData.append("area_name", aname);
        formData.append("school_id", schoolid);

        dispatch(insertArea(formData))
            .then(() => {
                setValues({ aname: "", schoolid: schoolid });  // Retain school ID after submission
                navigate("/area");
            });
    };

    const goToHome = () => {
        navigate("/area");
    };

    return (
        <>
            <Navbar />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Area</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item">Components</li>
                            <li className="breadcrumb-item active">Area</li>
                        </ol>
                    </nav>
                </div>

                <section className="section">
                    <div className="row">
                        <div className="col-lg-6 offset-3">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title mb-3">Area Form</h4>
                                    <form onSubmit={insertData} method="post">
                                        {/* Area Name */}
                                        <div className="form-group mb-3">
                                            <label>Area Name</label>
                                            <input
                                                type="text"
                                                onChange={(e) => setValues({ ...values, aname: e.target.value })}
                                                value={values.aname}
                                                className="form-control"
                                                placeholder="Area name"
                                            />
                                        </div>

                                        {/* School Name (fetched from API) */}
                                        <div className="form-group mb-3">
                                            <label>School Name</label>
                                            <input
                                                type="text"
                                                value={School_data ? School_data.school_name : ""}
                                                className="form-control"
                                                disabled
                                            />
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

export default AreaForm;
