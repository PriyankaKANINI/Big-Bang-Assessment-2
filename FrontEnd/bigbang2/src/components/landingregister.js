import React from 'react';
import { Link } from 'react-router-dom';
import './landingregister.css';
import doctorImage from '../images/individualdoctornobg.png';
import patientImage from '../images/patientimage.png';

const landingregister = () => {
  return (
    <div className="landing-register-container">
      <img src={doctorImage} alt="Doctor" className="doctor-image" />
    <Link to="/doctorregister" className="landing-register-button landing-register-button-primary">
      Register as Doctor
    </Link>
    <Link to="/patientregister" className="landing-register-button landing-register-button-secondary">
        Register as Patient
    </Link>
    <img src={patientImage} alt="Patient" className="patient-image" />
  </div>
  );
};

export default landingregister;
