import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        // sessionStorage.clear();
        sessionStorage.removeItem("schoollogin");
        sessionStorage.removeItem("token");
        dispatch({ "type": "LOGOUT" });
        alert("Logout Successfully...");
        navigate("/schoollogin");
    };

    return (<>
        <aside id="sidebar" className="sidebar">
            <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-item">
                    <a className="nav-link " href="/">
                        <i className="bi bi-grid"></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#school-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-menu-button-wide"></i><span>School</span><i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="school-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        {/* {!sessionStorage.getItem("schoollogin") && 
                        <Link to="/schoollogin" >
                            <li>
                                <i className="bi bi-circle"></i><span>Login</span>
                            </li>
                        </Link>}
                        {sessionStorage.getItem("schoollogin") && 
                        <Link to="" onClick={logout} >
                            <li>
                                <i className="bi bi-circle"></i><span>Logout</span>
                            </li>
                        </Link>} */}
                        {sessionStorage.getItem("schoollogin") ? (
                            <li className="nav-item">
                                <a className="nav-link" onClick={logout} style={{ cursor: "pointer" }}>
                                    <i className="bi bi-circle"></i><span>Logout</span>
                                </a>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link to="/schoollogin" className="nav-link">
                                    <i className="bi bi-circle"></i><span>Login</span>
                                </Link>
                            </li>
                        )}

                    </ul>
                </li>
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#area-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-menu-button-wide"></i><span>Area</span><i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="area-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <a href="/area">
                                <i className="bi bi-circle"></i><span>View Area</span>
                            </a>
                        </li>
                        <li>
                            <a href="/areaform">
                                <i className="bi bi-circle"></i><span>Add Area</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#student-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-menu-button-wide"></i><span>Student</span><i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="student-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <a href="/student">
                                <i className="bi bi-circle"></i><span>View Student</span>
                            </a>
                        </li>
                        <li>
                            <a href="/studentform">
                                <i className="bi bi-circle"></i><span>Add Student</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#bus-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-menu-button-wide"></i><span>Bus</span><i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="bus-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <a href="/bus">
                                <i className="bi bi-circle"></i><span>View Bus</span>
                            </a>
                        </li>
                        <li>
                            <a href="/busform">
                                <i className="bi bi-circle"></i><span>Add Bus</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </aside>
    </>);
}

export default Sidebar;