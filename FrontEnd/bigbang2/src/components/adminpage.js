import React from 'react';
import { Link } from 'react-router-dom';
import './adminpage.css';

const AdminPage = () => {
  return (
    <div className="admin-container">
      <div className="approve-sidebar">
        <Link to="/viewdoctorbyid" className="sidebar-link">
          <button className="approve-sidebar-button">View Doctor by ID</button>
        </Link>
        <Link to="/viewalldoctors" className="sidebar-link">
          <button className="approve-sidebar-button">View All Doctors</button>
        </Link>
        <Link to="/viewallpatients" className="sidebar-link">
          <button className="approve-sidebar-button">View All Patients</button>
        </Link>
        <Link to="/approvedoc" className="sidebar-link">
          <button className="sidebar-button">Approve/Disapprove Doctor</button>
        </Link>
        <Link to="/deletedoctor" className="sidebar-link">
          <button className="approve-sidebar-button">Delete Doctor</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;













































// import React from 'react';
// import { Link } from 'react-router-dom';
// import './adminpage.css';

// const AdminPage = () => {
//   return (
//     <div>
//       <div className="viewdel">
//       <div className="viewdelete">
//         <Link to="/viewdoctorbyid" className="hello">
//           <div className="viewdelete">
//             <h3>View Doctor by ID</h3>
//           </div>
//         </Link>
//         <Link to="/viewalldoctors" className="hello">
//           <div className="viewdelete">
//             <h3>View All Doctors</h3>
//           </div>
//         </Link>
//         <Link to="/viewallpatients" className="hello">
//           <div className="viewdelete">
//             <h3>View All Patients</h3>
//           </div>
//         </Link>
//         <Link to="/approvedoc" className="hello">
//           <div className="viewdelete">
//             <h3>Approve Doctor</h3>
//           </div>
//         </Link>
//         <Link to="/deletedoctor" className="hello">
//           <div className="viewdelete">
//             <h3>Delete Doctor</h3>
//           </div>
//         </Link>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default AdminPage;
