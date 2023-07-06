import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './viewallpatients.css';

const ViewAllPatients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5076/api/User/GetAllPatients/GetAllPatients');
      setPatients(response.data);
      console.log(response.data); // Check the fetched data in the console
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  return (
    <div className="tableau-patient-container">
    <div className="patient-another-container">
      <h2 className="title">View All Patients</h2>
      <div className="patients-table-container">
        <table className="patients-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Patient Name</th>
              <th>Date of Birth</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Illness</th>
            </tr>
          </thead>
          <tbody>
  {patients.map((patient) => (
    <tr key={patient.patientID}>
      <td>{patient.patientID}</td>
      <td>{patient.patientName}</td>
      <td>{patient.dateOfBirth}</td>
      <td>{patient.age}</td>
      <td>{patient.gender}</td>
      <td>{patient.phone}</td>
      <td>{patient.email}</td>
      <td>{patient.illness}</td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
    </div>
  );
};

export default ViewAllPatients;
