import React, { useState } from 'react';
import './doctorregister.css';
import DoctorImage from '../images/health-still.jpg';
import { useNavigate } from 'react-router-dom';

const DoctorRegister = () => {
  const navigate = useNavigate();
    const [doctorData, setDoctorData] = useState({
      doctorName: '',
      dateOfBirth: '',
      age: '',
      gender: '',
      phone: '',
      email: '',
      specialization: '',
      experience: '',
    });
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      const updatedValue = type === 'checkbox' ? checked : value;
  
      setDoctorData((prevState) => ({
        ...prevState,
        [name]: updatedValue,
      }));
    };
  
    const handleSubmit = () => {
      fetch('http://localhost:5076/api/User/DoctorRegister/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorData),
      })
        .then(async (response) => {
          if (response.ok) {
            // Registration success logic
            alert('Doctor registered successfully');
            navigate('/doccards');
            const data = await response.json();
            console.log(data);
          } else {
            // Handle unsuccessful registration
            const errorData = await response.json();
          if (response.status === 401) {
            alert(`Unauthorized: ${errorData.message}`);
          } else {
            alert(`Registration failed: ${errorData.message}`);
          }
          }
        })
        .catch((error) => {
          console.error('An error occurred during registration:', error);         
        });
    };
  
    return (
    <div className="doc-bg-img" style={{ backgroundImage: `url(${DoctorImage})`}}>
      <div className="ashy">
        <div className="register-container-doctor">
          <h2>Doctor Registration</h2>
          <div className="form-group-doctor">
            <input type="text" id="doctorName" name="doctorName" value={doctorData.doctorName} onChange={handleChange} required placeholder="Doctor Name" />
          </div>
<div className="form-group-doctor">
  <input type="date" id="dateOfBirth" name="dateOfBirth" value={doctorData.dateOfBirth} onChange={handleChange} required placeholder="Date of Birth" />
</div>
<div className="form-group-doctor">
  <input type="number" id="age" name="age" value={doctorData.age} onChange={handleChange} required placeholder="Age" />
</div>
<div className="form-group-doctor">
  <select id="gender" name="gender" value={doctorData.gender} onChange={handleChange} required>
    <option value="">Select</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
  </select>
  <label htmlFor="gender">Gender</label>
</div>
<div className="form-group-doctor">
  <input type="text" id="phone" name="phone" value={doctorData.phone} onChange={handleChange} required placeholder="Phone" />
</div>
<div className="form-group-doctor">
  <input type="email" id="email" name="email" value={doctorData.email} onChange={handleChange} required placeholder="Email" />
</div>
<div className="form-group-doctor">
  <input type="text" id="specialization" name="specialization" value={doctorData.specialization} onChange={handleChange} required placeholder="Specialization" />
</div>
<div className="form-group-doctor">
  <input type="number" id="experience" name="experience" value={doctorData.experience} onChange={handleChange} required placeholder="Experience" />
</div>
<div className="button-container-doctor ">
        <button type="button" onClick={handleSubmit}>
          Register
        </button>
      </div>
      </div>
      </div>
      </div>
    );
  };
  
  export default DoctorRegister;
  