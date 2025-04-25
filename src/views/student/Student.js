import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Button } from "react-bootstrap";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { deleteStudent, getAllStudentData } from "../../actions/StudentAction";
import { getSingleSchoolData } from "../../actions/SchoolAction";

const Student = () => {
    const buttonStyle = {
        margin: '0px 30px 10px 0px',
        padding: '5px 50px'
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { Student_data, loading } = useSelector(state => state.student);
    const { single: schoolData } = useSelector(state => state.school);

    const [schoolId, setSchoolId] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setSchoolId(decoded.school_id);
                dispatch(getSingleSchoolData(decoded.school_id));
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }

        dispatch(getAllStudentData());
    }, [dispatch]);

    if (loading) {
        return <h1>Please Wait...</h1>;
    }

    const handleViewDetails = (id) => {
        navigate(`/studentdetail/${id}`);
    };

    const delete_Student = (id) => {
        dispatch(deleteStudent(id));
    };

    const editStudent = (id) => {
        navigate(`/studenteditform/${id}`, { state: { schoolName: schoolData?.school_name } });
    };

    const filteredStudents = Student_data.filter(student => student.school_id === schoolId);

    return (
        <>
            <Navbar />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Students</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/admin">Home</a></li>
                            <li className="breadcrumb-item">Components</li>
                            <li className="breadcrumb-item active">Students</li>
                        </ol>
                    </nav>
                </div>

                <section className="section">
                    <div className="page-header">
                        <h3 className="page-title"> Students </h3>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <div style={{ textAlign: 'center' }}>
                                    <Button onClick={() => navigate('/studentform')} style={buttonStyle} variant="primary" size="lg">
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
                                    <h5 className="card-title">Students</h5>
                                    <table className="table table-bordered text-center">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Student Name</th>
                                                <th>Standard</th>
                                                <th>Birthdate</th>
                                                <th>School Name</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredStudents.length > 0 ? (
                                                filteredStudents.map((student) => (
                                                    <tr key={student.student_id}>
                                                        <td>{student.student_id}</td>
                                                        <td>{student.student_name}</td>
                                                        <td>{student.student_standard}</td>
                                                        <td>{new Date(student.student_birthdate).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}</td>
                                                        <td>{schoolData?.school_name || "Loading..."}</td>
                                                        <td>
                                                            <Button variant="info" onClick={() => handleViewDetails(student.student_id)}>View</Button>{' '}
                                                            <Button variant="warning" onClick={() => editStudent(student.student_id)}>Edit</Button>{' '}
                                                            <Button variant="danger" onClick={() => delete_Student(student.student_id)}>Delete</Button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="13">No students found for this school.</td>
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

export default Student;