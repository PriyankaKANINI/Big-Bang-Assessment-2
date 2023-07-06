import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './deletedoctor.css';

const DeleteDoctor = () => {
  const [doctorId, setDoctorId] = useState('');
  const [message, setMessage] = useState('');
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5076/api/User/GetAllDoctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleDeleteDoctor = async () => {
    try {
      await axios.delete(`http://localhost:5076/api/User/DeleteDoctor?doctorID=${doctorId}`);
      setMessage('Doctor details deleted successfully');
      setDoctorId('');
      alert('Doctor details deleted successfully');
      fetchDoctors(); // Fetch the updated list of doctors
    } catch (error) {
      setMessage('Error: Please provide a Doctor ID');
    }
  };

  return (
    <div className="delete-main-container">
    <div className="delete-doc-container">
    <div className="delete-doc">
      <h2 className="delete-doc-head">Delete Doctor</h2>
      <input
        id="delete-input"
        type="number"
        placeholder="Enter Doctor ID"
        value={doctorId}
        onChange={(e) => setDoctorId(e.target.value)}
      />
      <button id="delete-button" onClick={handleDeleteDoctor}>Delete Doctor</button>
      {message && <p className="delete-message">{message}</p>}
      {doctors.length > 0 && (
        <div className="remaining-doctors">
          <h2 id="remain-doc">Doctor Details</h2>
          <table className="doctors-table-delete">
            <thead>
              <tr>
                <th>Doctor ID</th>
                <th>Doctor Name</th>
                <th>Date of Birth</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Specialization</th>
                <th>Experience</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.doctorID}>
                  <td>{doctor.doctorID}</td>
                  <td>{doctor.doctorName}</td>
                  <td>{doctor.dateOfBirth}</td>
                  <td>{doctor.age}</td>
                  <td>{doctor.gender}</td>
                  <td>{doctor.phone}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.specialization}</td>
                  <td>{doctor.experience}</td>
                  <td>{doctor.status ? 'Active' : 'Inactive'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
    </div>
  );
};

export default DeleteDoctor;
