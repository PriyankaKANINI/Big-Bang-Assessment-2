import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './viewalldoctors.css';

const ViewAllDoctors = () => {
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

  return (
    <div className="tableau-container">
    <div className="another-container">
      <h2 className="title">View All Doctors</h2>
      <div class="doctors-table-container">
      <table className="doctors-table">
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
    </div>
    </div>
  );
};

export default ViewAllDoctors;
