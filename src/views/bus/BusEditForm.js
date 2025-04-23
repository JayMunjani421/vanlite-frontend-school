
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Button } from "react-bootstrap";
import { getSingleBusData, updateBus } from "../../actions/BusAction";

const BusEditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { single: Bus_data } = useSelector(state => state.bus);
    const schoolName = location.state?.schoolName; // Get school_name from navigation state

    const [values, setValues] = useState({
        busname: "",
        username: "",
        password: "",
        schoolid: "",
    });

    useEffect(() => {
        // Fetch bus data
        dispatch(getSingleBusData(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (Bus_data) {
            setValues({
                busname: Bus_data.bus_name,
                username: Bus_data.user_name,
                password: Bus_data.password,
                schoolid: Bus_data.school_id,
            });
        }
    }, [Bus_data]);

    const update_Bus = (e) => {
        e.preventDefault();

        const { busname, username, password, schoolid } = values;

        if (!busname || !username || !password || !schoolid) {
            alert("Please fill in all fields");
            return;
        }

        const formData = new FormData();
        formData.append("bus_name", busname);
        formData.append("user_name", username);
        formData.append("password", password);
        formData.append("school_id", schoolid);
        formData.append("bus_id", id);

        dispatch(updateBus(formData))
            .then(() => navigate("/bus"))
            .catch((error) => console.error("Update failed:", error));
    };

    const goToHome = () => {
        navigate("/bus");
    };

    return (
        <>
            <Navbar />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Bus</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/admin">Home</a></li>
                            <li className="breadcrumb-item">Components</li>
                            <li className="breadcrumb-item active">Bus</li>
                        </ol>
                    </nav>
                </div>

                <section className="section">
                    <div className="row">
                        <div className="col-lg-6 offset-3">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title mb-3">Update Bus Form</h4>
                                    <form className="forms-sample" onSubmit={update_Bus} method="post">
                                        {/* Bus Name */}
                                        <div className="form-group mb-3">
                                            <label>Bus Name</label>
                                            <input
                                                type="text"
                                                onChange={(e) => setValues({ ...values, busname: e.target.value })}
                                                value={values.busname}
                                                className="form-control"
                                                placeholder="Bus name"
                                            />
                                        </div>

                                        {/* User Name */}
                                        <div className="form-group mb-3">
                                            <label>User Name</label>
                                            <input
                                                type="text"
                                                onChange={(e) => setValues({ ...values, username: e.target.value })}
                                                value={values.username}
                                                className="form-control"
                                                placeholder="User name"
                                            />
                                        </div>

                                        {/* Password */}
                                        <div className="form-group mb-3">
                                            <label>Password</label>
                                            <input
                                                type="password"
                                                onChange={(e) => setValues({ ...values, password: e.target.value })}
                                                value={values.password}
                                                className="form-control"
                                                placeholder="Password"
                                            />
                                        </div>

                                        {/* School Name (Disabled) */}
                                        <div className="form-group mb-3">
                                            <label>School Name</label>
                                            <input
                                                type="text"
                                                value={schoolName || "Loading..."}
                                                className="form-control"
                                                disabled
                                            />
                                        </div>

                                        {/* Hidden Input to Pass School ID */}
                                        <input type="hidden" value={values.schoolid} name="school_id" />

                                        <Button type="submit" variant="success">Update</Button>{' '}
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

export default BusEditForm;
