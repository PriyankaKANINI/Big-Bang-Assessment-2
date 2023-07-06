import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import Navbar from './components/navbar';
import Landing from './components/landing';
import Login from './components/login';
import LandingRegister from './components/landingregister';
import DoctorRegister from './components/doctorregister';
import PatientRegister from './components/patientregister';
import DocCards from './components/doccards';
import AdminPage from './components/adminpage';
import ViewAllDoctors from './components/viewalldoctors';
import DeleteDoctor from './components/deletedoctor';
import ApproveDoc from './components/approvedoc';
import ViewDoctorById from './components/viewdoctorbyid';
import ViewAllPatients from './components/viewallpatients';

import AdminProtected from './protectedrouting/adminprotected';
import DoctorCardsProtected from './protectedrouting/doccardsprotected';
import ViewAllDoctorProtected from './protectedrouting/viewalldoctorprotected';
import ViewAllPatientsProtected from './protectedrouting/viewallpatientsprotected';
import ViewDoctorIDProtected from './protectedrouting/viewdocbyidprotected';
import ApproveDoctorProtected from './protectedrouting/approveddocprotected';
import DeleteDoctorProtected from './protectedrouting/deletedocprotected';

// Add the imported icon(s) to the library
library.add(faCoffee);

function App() {
  const handleRegistrationSuccess = () => {

  };

  const token = localStorage.getItem("token");

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/landingregister" element={<LandingRegister />} />
          <Route path="/doctorregister" element={<DoctorRegister />} />
          <Route
            path="/patientregister"
            element={<PatientRegister onRegistrationSuccess={handleRegistrationSuccess} />}
          />
          {/* <Route path="/doccards" element={<DoctorCards />} /> */}

          <Route path='/adminpage' element={<AdminProtected token={token}><AdminPage/></AdminProtected>}/>
          <Route path='/doccards' element={<DoctorCardsProtected token={token}><DocCards/></DoctorCardsProtected>}/>
          <Route path='/viewdoctorbyid' element={<ViewDoctorIDProtected token={token}><ViewDoctorById/></ViewDoctorIDProtected>}/>
          <Route path='/viewalldoctors' element={<ViewAllDoctorProtected token={token}><ViewAllDoctors/></ViewAllDoctorProtected>}/>
          <Route path='/approvedoc' element={<ApproveDoctorProtected token={token}><ApproveDoc/></ApproveDoctorProtected>}/>
          <Route path='/deletedoctor' element={<DeleteDoctorProtected token={token}><DeleteDoctor/></DeleteDoctorProtected>}/>
          <Route path='/viewallpatients' element={<ViewAllPatientsProtected token={token}><ViewAllPatients/></ViewAllPatientsProtected>}/>

        </Routes>
      </div>
    </Router>
  );
}

export default App;

