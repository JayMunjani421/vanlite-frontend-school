import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Button } from "react-bootstrap";
import { getSingleAreaData, updateArea } from "../../actions/AreaAction";

const AreaEditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { single: areaData } = useSelector(state => state.area);
    const schoolName = location.state?.schoolName; // Get school_name from navigation state

    const [values, setValues] = useState({
        aname: "",
        schoolid: "",
    });

    useEffect(() => {
        // Fetch area data
        dispatch(getSingleAreaData(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (areaData) {
            setValues({
                aname: areaData.area_name,
                schoolid: areaData.school_id,
            });
        }
    }, [areaData]);

    const update_Area = (e) => {
        e.preventDefault();

        const { aname, schoolid } = values;

        if (!aname || !schoolid) {
            alert("Please fill in all fields");
            return;
        }

        const formData = new FormData();
        formData.append("area_name", aname);
        formData.append("school_id", schoolid);
        formData.append("area_id", id);

        dispatch(updateArea(formData))
            .then(() => navigate("/area"))
            .catch((error) => console.error("Update failed:", error));
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
                            <li className="breadcrumb-item"><a href="/admin">Home</a></li>
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
                                    <h4 className="card-title mb-3">Update Area Form</h4>
                                    <form className="forms-sample" onSubmit={update_Area} method="post">
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

                                        {/* School Name (Disabled) */}
                                        <div className="form-group mb-3">
                                            <label>School</label>
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

export default AreaEditForm;
