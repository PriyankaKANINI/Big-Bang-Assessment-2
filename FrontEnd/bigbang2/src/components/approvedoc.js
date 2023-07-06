import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './approvedoc.css';

const ApproveDoc = () => {
  const [doctorId, setDoctorId] = useState('');
  const [message, setMessage] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [showApproveSection, setShowApproveSection] = useState(false);
  const [displayedDoctors, setDisplayedDoctors] = useState([]);
  const [action, setAction] = useState('approve');

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5076/api/User/GetAllDoctors');
      const allDoctors = response.data;

      const responseApproved = await axios.get('http://localhost:5076/api/User/GetAllApproved/approved');
      const approvedDoctors = responseApproved.data;

      const responseDisapproved = await axios.get('http://localhost:5076/api/User/GetAllDisapproved/disapproved');
      const disapprovedDoctors = responseDisapproved.data;

      // Set the approval status based on the boolean value in the database
      const doctorsWithApprovalStatus = allDoctors.map((doctor) => ({
        ...doctor,
        approved: approvedDoctors.some((approvedDoctor) => approvedDoctor.doctorID === doctor.doctorID),
      }));

      setDoctors(doctorsWithApprovalStatus);
      setDisplayedDoctors(doctorsWithApprovalStatus); // Set displayedDoctors to all doctors
    } catch (error) {
       console.error('Error fetching doctors:', error);
     }
  };

  useEffect(() => {
    setAction('all'); // Set the initial action to 'all'
    fetchDoctors();
  }, []);


  const handleApproveDoctor = async (doctorId) => {
    try {
      const response = await axios.post(
        `http://localhost:5076/api/User/ApprovDoctor/api/Doctor/ApproveDoctor?doctorId=${doctorId}`,
        {
          doctorID: doctorId,
        }
      );
      alert(`Doctor ${doctorId} has been approved successfully.`);
      fetchDoctors();
    } catch (error) {
      setMessage(`Error approving doctor: ${error.response.data}`);
    }
  };

  const handleDisapproveDoctor = async (doctorId) => {
    try {
      const disapproveUrl = `http://localhost:5076/api/User/DisapproveDoctor/api/Doctor/DisapproveDoctor?doctorId=${doctorId}`;
      const response = await axios.post(disapproveUrl);
      alert(`Doctor ${doctorId} has been disapproved successfully.`);
      fetchDoctors();
    } catch (error) {
      setMessage(`Error disapproving doctor: ${error.response.data}`);
    }
  };

  // const handleViewAllDoctors = () => {
  //   setDisplayedDoctors(doctors);
  //   setAction('all'); // Set action to 'all'
  //   setShowApproveSection(false);
  // };

  return (
    <div className="approve-container">
      <div className="approve-content">
        <h2 id="ap-doc">View Doctor by ID</h2>
        {showApproveSection ? (
          <div>
            {action === 'approve' ? (
              <div>
                <input
                  id="approve-ino"
                  type="number"
                  placeholder="Enter Doctor ID"
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}
                />
                <button id="approve-button-small" onClick={() => handleApproveDoctor(doctorId)}>
                  Approve Doctor
                </button>
              </div>
            ) : (
              <div>
                <input
                  id="approve-ino"
                  type="number"
                  placeholder="Enter Doctor ID"
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}
                />
                <button id="approve-button-small" onClick={() => handleDisapproveDoctor(doctorId)}>
                  Disapprove Doctor
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {displayedDoctors.length > 0 ? (
              <table className="approve-table">
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedDoctors.map((doctor) => (
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
                      <td>{doctor.approved ? 'Approved' : 'Not Approved'}</td>
                      <td>
                        {doctor.approved ? (
                          <button onClick={() => handleDisapproveDoctor(doctor.doctorID)} id='disap-button'>Disapprove</button>
                        ) : (
                          <button onClick={() => handleApproveDoctor(doctor.doctorID)} id='ap-button'>Approve</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p></p>
            )}
          </>
        )}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default ApproveDoc;



















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './approvedoc.css';

// const ApproveDoc = () => {
//   const [doctorId, setDoctorId] = useState('');
//   const [message, setMessage] = useState('');
//   const [doctors, setDoctors] = useState([]);
//   const [showApproveSection, setShowApproveSection] = useState(false);
//   const [displayedDoctors, setDisplayedDoctors] = useState([]);
//   const [approvedDoctors, setApprovedDoctors] = useState([]);
//   const [notApprovedDoctors, setNotApprovedDoctors] = useState([]);
//   const [action, setAction] = useState('approve');
//   const [disapproveSection, setDisapproveSection] = useState(false);

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const fetchDoctors = async () => {
//     try {
//       const response = await axios.get('http://localhost:5076/api/User/GetAllApproved/approved');
//       const approvedDoctors = response.data;

//       const responseDisapproved = await axios.get('http://localhost:5076/api/User/GetAllDisapproved/disapproved');
//       const disapprovedDoctors = responseDisapproved.data;

//       setApprovedDoctors(approvedDoctors);
//       setNotApprovedDoctors(disapprovedDoctors);
//     } catch (error) {
//       console.error('Error fetching doctors:', error);
//     }
//   };

//   const handleApproveDoctor = async () => {
//     try {
//       const existingDoctor = doctors.find((doctor) => doctor.doctorId === parseInt(doctorId));
//       if (existingDoctor && existingDoctor.approved) {
//         setMessage(`Doctor ${doctorId} details are already updated.`);
//         setDoctorId('');
//         return;
//       }
  
//       const response = await axios.post(
//         `http://localhost:5076/api/User/ApprovDoctor/api/Doctor/ApproveDoctor?doctorId=${doctorId}`,
//         {
//           doctorID: doctorId,
//         }
//       );
//       alert(`Doctor ${doctorId} has been approved successfully.`);
//       setDoctorId('');
//       setShowApproveSection(false);
//       fetchDoctors();
//     } catch (error) {
//       setMessage(`Error approving doctor: ${error.response.data}`);
//     }
//   };
  
//   const handleDisapproveDoctor = async () => {
//     try {
//       const existingDoctor = doctors.find((doctor) => doctor.doctorId === parseInt(doctorId));
//       if (existingDoctor && !existingDoctor.approved) {
//         setMessage(`Doctor ${doctorId} details are already updated.`);
//         setDoctorId('');
//         return;
//       }
  
//       const disapproveUrl = `http://localhost:5076/api/User/DisapproveDoctor/api/Doctor/DisapproveDoctor?doctorId=${doctorId}`;
//       const response = await axios.post(disapproveUrl);
//       alert(`Doctor ${doctorId} has been disapproved successfully.`);
//       setDoctorId('');
//       setShowApproveSection(false);
//       fetchDoctors();
//     } catch (error) {
//       setMessage(`Error disapproving doctor: ${error.response.data}`);
//     }
//   };
  
  

//   const handleViewApprovedDoctors = () => {
//     setDisplayedDoctors(approvedDoctors);
//     setAction('approve'); // Set action to 'approve'
//     setShowApproveSection(false);
//     setDisapproveSection(false);
//   };

//   const handleViewNotApprovedDoctors = () => {
//     setDisplayedDoctors(notApprovedDoctors);
//     setAction('disapprove'); // Set action to 'disapprove'
//     setShowApproveSection(false);
//     setDisapproveSection(false);
//   };

//   return (
//     <div className="approve-container">
//       <div className="approve-sidebar">
//         <button onClick={handleViewApprovedDoctors}>View All Approved Doctors</button>
//         <button onClick={handleViewNotApprovedDoctors}>View All Not Approved Doctors</button>
//         <button onClick={() => { setAction('approve'); setShowApproveSection(true); setDisapproveSection(false); }}>Approve Doctor</button>
//         <button onClick={() => { setAction('disapprove'); setShowApproveSection(true); setDisapproveSection(true); }}>Disapprove Doctor</button>
//       </div>
//       <div className="approve-content">
//         {showApproveSection ? (
//           <div>
//             {action === 'approve' ? (
//               <div>
//                 <h2 id="approve-app">Approve Doctor</h2>
//                 <input
//                   id="approve-ino"
//                   type="number"
//                   placeholder="Enter Doctor ID"
//                   value={doctorId}
//                   onChange={(e) => setDoctorId(e.target.value)}
//                 />
//                 <button id="approve-button-small" onClick={handleApproveDoctor}>
//                   Approve Doctor
//                 </button>
//               </div>
//             ) : (
//               <div>
//                 <h2 id="approve-app">Disapprove Doctor</h2>
//                 <input
//                   id="approve-ino"
//                   type="number"
//                   placeholder="Enter Doctor ID"
//                   value={doctorId}
//                   onChange={(e) => setDoctorId(e.target.value)}
//                 />
//                 <button id="approve-button-small" onClick={handleDisapproveDoctor}>
//                   Disapprove Doctor
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <>
//             {displayedDoctors.length > 0 ? (
//               <table className="approve-table">
//                 <thead>
//                   <tr>
//                     <th>Doctor ID</th>
//                     <th>Doctor Name</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {displayedDoctors.map((doctor) => (
//                     <tr key={doctor.doctorID}>
//                       <td>{doctor.doctorID}</td>
//                       <td>{doctor.doctorName}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <p></p>
//             )}
//           </>
//         )}
//         {message && <p>{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default ApproveDoc;

