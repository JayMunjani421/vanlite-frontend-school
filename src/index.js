import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import mystore from './store/mystore';
import SchoolLogin from './views/school/Login';
import Dashboard from './views/Dashboard';
import PrivateRoute from './views/components/ValidationRoute';
import Area from './views/area/Area';
import AreaForm from './views/area/AreaForm';
import AreaDetail from './views/area/AreaDetail';
import AreaEditForm from './views/area/AreaEditForm';
import Student from './views/student/Student';
import StudentDetail from './views/student/StudentDetail';
import StudentForm from './views/student/StudentForm';
import StudentEditForm from './views/student/StudentEditForm';
import Bus from './views/bus/Bus';
import BusDetail from './views/bus/BusDetail';
import BusForm from './views/bus/BusForm';
import BusEditForm from './views/bus/BusEditForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={mystore}>
        <BrowserRouter>
            <Routes>
                {/* Public Route */}
                <Route path="/schoollogin" element={<SchoolLogin />} />

                {/* Private Routes */}
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/area" element={<Area />} />
                    <Route path="/areaform" element={<AreaForm />} />
                    <Route path="/areadetail/:id" element={<AreaDetail />} />
                    <Route path="/areaeditform/:id" element={<AreaEditForm />} />
                    <Route path="/student" element={<Student />} />
                    <Route path="/studentform" element={<StudentForm />} />
                    <Route path="/studentdetail/:id" element={<StudentDetail />} />
                    <Route path="/studenteditform/:id" element={<StudentEditForm />} />
                    <Route path="/bus" element={<Bus />} />
                    <Route path="/busform" element={<BusForm />} />
                    <Route path="/busdetail/:id" element={<BusDetail />} />
                    <Route path="/buseditform/:id" element={<BusEditForm />} />
                </Route>

                {/* Redirect any unknown routes */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    </Provider>
);



// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import mystore from './store/mystore';
// import SchoolLogin from './views/school/Login';
// import Dashboard from './views/Dashboard';
// import PrivateRoute from './views/components/ValidationRoute';
// import Area from './views/area/Area';
// import AreaForm from './views/area/AreaForm';
// import AreaDetail from './views/area/AreaDetail';
// import AreaEditForm from './views/area/AreaEditForm';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <Provider store={mystore}>

//         <BrowserRouter>
//             <Routes>
//                 <Route path="/" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
//                 <Route path="/schoollogin" element={<SchoolLogin />}></Route>
//                 <Route path="/area" element={<Area/>}></Route>
//                 <Route path="/areaform" element={<AreaForm />} />
//                 <Route path="/areadetail/:id" element={<AreaDetail />} />
//                 <Route path="/areaeditform/:id" element={<AreaEditForm />} />

//             </Routes>
//         </BrowserRouter>

//     </Provider>

// );
