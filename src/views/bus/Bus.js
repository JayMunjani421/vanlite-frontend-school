import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { Button } from "react-bootstrap";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { getSingleSchoolData } from "../../actions/SchoolAction";
import { deleteBus, getAllBusData } from "../../actions/BusAction";

const Bus = () => {
    const buttonStyle = {
        margin: '0px 30px 10px 0px',
        padding: '5px 50px'
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { Bus_data, loading } = useSelector(state => state.bus);
    const { single: School_data } = useSelector(state => state.school);

    const [schoolId, setSchoolId] = useState(null);

    useEffect(() => {
        // Decode token to get the school_id
        const token = sessionStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setSchoolId(decoded.school_id);
                dispatch(getSingleSchoolData(decoded.school_id)); // Fetch the school name
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }

        // Fetch all bus data
        dispatch(getAllBusData());
    }, [dispatch]);

    if (loading) {
        return <h1>Please Wait...</h1>;
    }

    const handleViewDetails = (id) => {
        navigate(`/busdetail/${id}`);
    };

    const delete_Bus = (id) => {
        dispatch(deleteBus(id));
    };

    const editBus = (id) => {
        navigate('/buseditform/' + id, { state: { schoolName: School_data?.school_name } });
    };
    

    // Filter areas based on the school_id from the token
    const filteredBuses = Bus_data.filter(bus => bus.school_id === schoolId);

    return (
        <>
            <Navbar />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Buses</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/admin">Home</a></li>
                            <li className="breadcrumb-item">Components</li>
                            <li className="breadcrumb-item active">Buses</li>
                        </ol>
                    </nav>
                </div>

                <section className="section">
                    <div className="page-header">
                        <h3 className="page-title"> Bus </h3>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <div style={{ textAlign: 'center' }}>
                                    <Button onClick={() => navigate('/busform')} style={buttonStyle} variant="primary" size="lg">
                                        Add
                                    </Button>
                                </div>
                            </ol>
                        </nav>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Buses</h5>
                                    <table className="table table-bordered text-center">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Bus Name</th>
                                                <th>User Name</th>
                                                <th>Password</th>
                                                <th>School Name</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredBuses.length > 0 ? (
                                                filteredBuses.map((bus) => (
                                                    <tr key={bus.bus_id}>
                                                        <td>{bus.bus_id}</td>
                                                        <td>{bus.bus_name}</td>
                                                        <td>{bus.user_name}</td>
                                                        <td>{bus.password}</td>
                                                        <td>{School_data?.school_name || "Loading..."}</td> {/* Display school_name */}
                                                        <td>
                                                            <Button variant="info" onClick={() => handleViewDetails(bus.bus_id)}>View</Button>{' '}
                                                            <Button variant="warning" onClick={() => editBus(bus.bus_id)}>Edit</Button>{' '}
                                                            <Button variant="danger" onClick={() => delete_Bus(bus.bus_id)}>Delete</Button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4">No buses found for this school.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
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

export default Bus;