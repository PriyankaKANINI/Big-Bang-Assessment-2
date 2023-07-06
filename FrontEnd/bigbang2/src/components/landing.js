import React from 'react';
import './landing.css';
import { Link } from 'react-router-dom';
import backgroundImage2 from '../images/Smileydoc.jpg';

const Landing = () => {
  return (
    <div className="landing-page-container">
      <div className="hero-section">
        <div className="background-overlay">
          <div className="bg-container">
            <div className="bg2" style={{ backgroundImage: `url(${backgroundImage2})` }}></div>
            <div className="color-overlay"></div>
          </div>
          <div className="hero-content">
            <h1>Aura Health Care</h1>
            <p>Your health, our priority. Experience exceptional care and support for your loved ones.</p>
            <div className="button-group">
              <Link to="/landingregister" className="cta-button" id="getset1">Get Started</Link>
              <Link to="/login" className="secondary-button" id="getset2">Login/Sign-in</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="features-section">
        <div className="feature">
          <i className="fa fa-user-md"></i>
          <h2>Doctors</h2>
          <p>Manage doctor profiles, appointments, and schedules.</p>
        </div>
        <div className="feature">
          <i className="fa fa-bed"></i>
          <h2>Wards</h2>
          <p>Track available beds, assign patients, and manage ward occupancy.</p>
        </div>
        <div className="feature">
          <i className="fa fa-medkit"></i>
          <h2>Medicines</h2>
          <p>Manage medicine inventory, prescriptions, and pharmacy operations.</p>
        </div>
      </div>

      <footer className="footer">
        <p>&copy; 2023 Hospital Management. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Landing;
