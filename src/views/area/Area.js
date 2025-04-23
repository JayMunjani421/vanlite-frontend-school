// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "react-bootstrap";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import Footer from "../components/Footer";
// import { deleteArea, getAllAreaData } from "../../actions/AreaAction";

// const Area = () => {

//     const buttonStyle = {
//         margin: '0px 30px 10px 0px',
//         padding: '5px 50px'
//     };

//     const navigate = useNavigate();
//     const add = () => {
//         navigate('/areaform');
//     };

//     const dispatch = useDispatch();

//     const { Area_data, loading } = useSelector(state => state.area);

//     useEffect(() => {
//         dispatch(getAllAreaData());
//     }, [dispatch]);


//     console.log("Area Data from Redux:", Area_data); // Log to verify if data is received correctly

//     if (loading) {
//         return <h1>Please Wait...</h1>;
//     }

//     const handleViewDetails = (id) => {
//         navigate(`/areadetail/${id}`);
//     };

//     const delete_Area = (id) => {
//         var formData = new FormData();
//         formData.append("area_id", id);
//         dispatch(deleteArea(id));
//     };

//     const editArea = (id) => {
//         navigate('/areaeditform/' + id);
//     };

//     return (
//         <>
//             <Navbar />
//             <Sidebar />
//             <main id="main" className="main">
//                 <div className="pagetitle">
//                     <h1>Areas</h1>
//                     <nav>
//                         <ol className="breadcrumb">
//                             <li className="breadcrumb-item"><a href="/admin">Home</a></li>
//                             <li className="breadcrumb-item">Components</li>
//                             <li className="breadcrumb-item active">Areas</li>
//                         </ol>
//                     </nav>
//                 </div>

//                 <section className="section">
//                     <div className="page-header">
//                         <h3 className="page-title"> Area </h3>
//                         <nav aria-label="breadcrumb">
//                             <ol className="breadcrumb">
//                                 <div style={{ textAlign: 'center' }}>
//                                     <Button onClick={add} style={buttonStyle} variant="primary" size="lg">
//                                         Add
//                                     </Button>{' '}
//                                 </div>
//                             </ol>
//                         </nav>
//                     </div>
//                     <div className="row">
//                         <div className="col-lg-12">
//                             <div className="card">
//                                 <div className="card-body">
//                                     <h5 className="card-title">Areas</h5>
//                                     <table className="table table-bordered text-center">
//                                         <thead>
//                                             <tr>
//                                                 <th>Id</th>
//                                                 <th>Area Name</th>
//                                                 <th>School Id</th>
//                                                 <th>Action</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {Area_data && Area_data.map((obj) => (
//                                                 <tr key={obj.area_id}>
//                                                     <td>{obj.area_id}</td>
//                                                     <td>{obj.area_name}</td>
//                                                     <td>{obj.school_id}</td>
//                                                     <td>
//                                                         <Button variant="info" onClick={(e) => handleViewDetails(obj.area_id)}>View</Button>{' '}
//                                                         <Button variant="warning" onClick={(e) => editArea(obj.area_id)}>Edit</Button>{' '}
//                                                         <Button variant="danger" onClick={(e) => delete_Area(obj.area_id)}>Delete</Button>{' '}
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </main>
//             <Footer />
//             <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
//         </>
//     );
// };

// export default Area;


import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { Button } from "react-bootstrap";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { deleteArea, getAllAreaData } from "../../actions/AreaAction";
import { getSingleSchoolData } from "../../actions/SchoolAction";

const Area = () => {
    const buttonStyle = {
        margin: '0px 30px 10px 0px',
        padding: '5px 50px'
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { Area_data, loading } = useSelector(state => state.area);
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

        // Fetch all area data
        dispatch(getAllAreaData());
    }, [dispatch]);

    if (loading) {
        return <h1>Please Wait...</h1>;
    }

    const handleViewDetails = (id) => {
        navigate(`/areadetail/${id}`);
    };

    const delete_Area = (id) => {
        dispatch(deleteArea(id));
    };

    // const editArea = (id) => {
    //     navigate('/areaeditform/' + id);
    // };

    const editArea = (id) => {
        navigate('/areaeditform/' + id, { state: { schoolName: School_data?.school_name } });
    };
    

    // Filter areas based on the school_id from the token
    const filteredAreas = Area_data.filter(area => area.school_id === schoolId);

    return (
        <>
            <Navbar />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Areas</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/admin">Home</a></li>
                            <li className="breadcrumb-item">Components</li>
                            <li className="breadcrumb-item active">Areas</li>
                        </ol>
                    </nav>
                </div>

                <section className="section">
                    <div className="page-header">
                        <h3 className="page-title"> Area </h3>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <div style={{ textAlign: 'center' }}>
                                    <Button onClick={() => navigate('/areaform')} style={buttonStyle} variant="primary" size="lg">
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
                                    <h5 className="card-title">Areas</h5>
                                    <table className="table table-bordered text-center">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Area Name</th>
                                                <th>School Name</th> {/* Changed from School ID */}
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredAreas.length > 0 ? (
                                                filteredAreas.map((area) => (
                                                    <tr key={area.area_id}>
                                                        <td>{area.area_id}</td>
                                                        <td>{area.area_name}</td>
                                                        <td>{School_data?.school_name || "Loading..."}</td> {/* Display school_name */}
                                                        <td>
                                                            <Button variant="info" onClick={() => handleViewDetails(area.area_id)}>View</Button>{' '}
                                                            <Button variant="warning" onClick={() => editArea(area.area_id)}>Edit</Button>{' '}
                                                            <Button variant="danger" onClick={() => delete_Area(area.area_id)}>Delete</Button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4">No areas found for this school.</td>
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

export default Area;
