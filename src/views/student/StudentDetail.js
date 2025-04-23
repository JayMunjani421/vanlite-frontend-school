import { Button, Card, Col, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getSingleStudentData } from "../../actions/StudentAction";

const StudentDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { single, loading } = useSelector(state => state.student);

    useEffect(() => {
        dispatch(getSingleStudentData(id));
    }, [id, dispatch]);

    const goToHome = () => {
        navigate("/student");
    };

    if (loading) return <p>Loading...</p>;

    if (!single) return <p>No data available</p>;

    return (
        <>
            <Navbar />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Student Details</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/admin">Home</a></li>
                            <li className="breadcrumb-item">Components</li>
                            <li className="breadcrumb-item active">Student Details</li>
                        </ol>
                    </nav>
                </div>

                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Student Information</h5>

                                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                                        <Card.Title style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>
                                            {single.student_name}
                                        </Card.Title>
                                    </div>

                                    <Row className="mb-3">
                                        <Col md={6}><strong>Student ID:</strong> {single.student_id}</Col>
                                        <Col md={6}><strong>Student Name:</strong> {single.student_name}</Col>
                                        <Col md={6}><strong>Father's Name:</strong> {single.father_name}</Col>
                                        <Col md={6}><strong>Father's Mobile:</strong> {single.father_mobile}</Col>
                                        <Col md={6}><strong>Mother's Name:</strong> {single.mother_name}</Col>
                                        <Col md={6}><strong>Mother's Mobile:</strong> {single.mother_mobile}</Col>
                                        <Col md={6}><strong>Password:</strong> {single.student_password}</Col>
                                        <Col md={6}><strong>Standard:</strong> {single.student_standard}</Col>
                                        {/* <Col md={6}><strong>Birthdate:</strong> {single.student_birthdate}</Col> */}
                                        <Col md={6}><strong>Birthdate:</strong> {new Date(single.student_birthdate).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}</Col>
                                        <Col md={6}><strong>Active Status:</strong> {single.is_active}</Col>
                                        <Col md={6}><strong>Area ID:</strong> {single.area_id}</Col>
                                        <Col md={6}><strong>Address Line 1:</strong> {single.addressline1}</Col>
                                        <Col md={6}><strong>Address Line 2:</strong> {single.addressline2}</Col>
                                        <Col md={6}><strong>Pincode:</strong> {single.pincode}</Col>
                                        <Col md={6}><strong>School ID:</strong> {single.school_id}</Col>
                                    </Row>

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

export default StudentDetail;