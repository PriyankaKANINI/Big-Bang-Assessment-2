import React, { useState } from 'react';
import axios from 'axios';
import './viewdoctorbyid.css';

const ViewDoctorById = () => {
  const [doctorId, setDoctorId] = useState('');
  const [doctor, setDoctor] = useState(null);

  const handleViewDoctor = async () => {
    try {
      const response = await axios.get(`http://localhost:5076/api/User/GetDoctorById/GetById?doctorID=${doctorId}`);
      setDoctor(response.data);
    } catch (error) {
      console.error('Error fetching doctor:', error);
    }
  };

  const formatDOB = (dob) => {
    const date = new Date(dob);
    const formattedDOB = date.toISOString().split('T')[0];
    return formattedDOB;
  };

  return (
    <div className="viewdocbyid-con">
      <h2 id="view-id">View Doctor by ID</h2>
      <input
        type="number"
        placeholder="Enter Doctor ID"
        value={doctorId}
        onChange={(e) => setDoctorId(e.target.value)}
        className="doctor-id-input"
      />
      <button onClick={handleViewDoctor} className="view-id-button">
        View Doctor
      </button>

      {doctor && (
        <div className="doctor-id-card-container">
          <h3>{doctor.doctorName}</h3>
          <p><strong>Date of Birth:</strong> {formatDOB(doctor.dateOfBirth)}</p>
          <p><strong>Age:</strong> {doctor.age}</p>
          <p><strong>Gender:</strong> {doctor.gender}</p>
          <p><strong>Phone:</strong> {doctor.phone}</p>
          <p><strong>Email:</strong> {doctor.email}</p>
          <p><strong>Specialization:</strong> {doctor.specialization}</p>
          <p><strong>Experience:</strong> {doctor.experience}</p>
          <p><strong>Status:</strong> {doctor.status ? 'Active' : 'Inactive'}</p>
        </div>
      )}
    </div>
  );
};

export default ViewDoctorById;
