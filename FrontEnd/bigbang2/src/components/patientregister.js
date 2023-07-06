import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './patientregister.css';
import PatientImage from '../images/medical-blue.jpg';
// import '../images/abstract-medical.jpg';

const PatientRegister = ({ onRegistrationSuccess }) => {
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState({
    patientName: '',
    dateOfBirth: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    illness: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === 'checkbox' ? checked : value;

    setPatientData((prevState) => ({
      ...prevState,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = () => {
    fetch('http://localhost:5076/api/User/PatientRegister/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patientData),
    })
      .then(async (response) => {
        if (response.ok) {
          // Registration success logic
          alert('Patient registered successfully');
          const data = await response.json();
          console.log(data); 
          
          onRegistrationSuccess(); // Call the callback function
          navigate('/viewalldoctors'); // Navigate to '/viewalldoctors' page
        
        } else {
          // Handle unsuccessful registration
          const errorData = await response.json();
          console.log('Registration failed:', errorData.message);
        }
      })
      .catch((error) => {
        console.error('An error occurred during registration:', error);
      });
  };

  return (
    <div className="patient-blue-img" style={{ backgroundImage: `url(${PatientImage})`}}>
    <div className="patient-ohm">
      <div className="patient-register-container">
        <h2>Patient Registration</h2>
        <div className="form-group-patient">
  <input type="text" id="patientName" name="patientName" value={patientData.patientName} onChange={handleChange} required placeholder="Patient Name" />
</div>
<div className="form-group-patient">
  <input type="date" id="dateOfBirth" name="dateOfBirth" value={patientData.dateOfBirth} onChange={handleChange} required placeholder="Date of Birth" />
</div>
<div className="form-group-patient">
  <input type="number" id="age" name="age" value={patientData.age} onChange={handleChange} required placeholder="Age" />
</div>
<div className="form-group-patient">
  <select id="gender" name="gender" value={patientData.gender} onChange={handleChange} required>
    <option value="">Select</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
  </select>
  <label htmlFor="gender">Gender</label>
</div>
<div className="form-group-patient">
  <input type="text" id="phone" name="phone" value={patientData.phone} onChange={handleChange} required placeholder="Phone" />
</div>
<div className="form-group-patient">
  <input type="email" id="email" name="email" value={patientData.email} onChange={handleChange} required placeholder="Email" />
</div>
<div className="form-group-patient">
  <input type="text" id="illness" name="illness" value={patientData.illness} onChange={handleChange} required placeholder="Illness" />
</div>
<div className="button-container-patient">
        <button type="button" onClick={handleSubmit}>
          Register
        </button>
      </div>
      </div>
      </div>
      </div>
    );
  };
export default PatientRegister;
