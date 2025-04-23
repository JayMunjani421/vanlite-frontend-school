import { Button, Card, Col, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getSingleAreaData } from "../../actions/AreaAction";

const AreaDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { single, loading } = useSelector(state => state.area);

    useEffect(() => {
        dispatch(getSingleAreaData(id));
    }, [id, dispatch]);

    const goToHome = () => {
        navigate("/area");
    }

    if (loading) return <p>Loading...</p>;

    if (!single) return <p>No data available</p>;

    return (
        <>
            <Navbar />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Area Details</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item">Components</li>
                            <li className="breadcrumb-item active">Area Details</li>
                        </ol>
                    </nav>
                </div>

                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Area Information</h5>
                                    
                                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                                        <Card.Title style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>
                                            {single.area_name}
                                        </Card.Title>
                                    </div>
                                    
                                    <Row className="mb-3">
                                        <Col md={6}>
                                            <strong>Area ID:</strong> {single.area_id}
                                        </Col>
                                        <Col md={6}>
                                            <strong>Area Name:</strong> {single.area_name}
                                        </Col>
                                        <Col md={6}>
                                            <strong>School ID:</strong> {single.school_id}
                                        </Col>
                                    </Row>                                   

                                    {/* Back Button */}
                                    <div className="text-center">
                                        <Button onClick={goToHome} className="btn btn-primary" style={{ marginTop: "10px" }}>
                                            Back
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
        </>
    );
};

export default AreaDetail;
