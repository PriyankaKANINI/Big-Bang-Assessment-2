import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import loginImage from '../images/bgimg1-removebg.png';

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    userID: 0,
    password: '',
    userRole: '',
    token: '',
  });
  
  const handleLogin = () => {
    fetch('http://localhost:5076/api/User/Login', {
      method: 'POST',
      headers: {
        accept: 'text/plain',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...loginData }),
    })
      .then(async (response) => {
        if (response.ok) {
          alert('Logged In Successfully');
          var data = await response.json();
          console.log(data);
          localStorage.setItem('token', data.token);
          localStorage.setItem('id', data.userID);

          // Update userRole in the state based on the API response
          setLoginData((prevLoginData) => ({
            ...prevLoginData,
            userRole: data.userRole,
          }));
  
          // Redirect based on user role
          if (data.userRole === 'Admin') {
            navigate('/adminpage');
          } else if (data.userRole === 'Doctor') {
            navigate('/doccards');
          } else if (data.userRole === 'Patient') {
            navigate('/viewalldoctors');
          }
        } else {
          // Handle unsuccessful login
          const errorData = await response.json();
          if (response.status === 401) {
            alert(`Unauthorized: ${errorData.message}`);
          } else {
            alert(`Login failed: ${errorData.message}`);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        alert('An error occurred during login');
      });
  };

  return (
    
    <div className="container login-overlay">
       <div className="login-image-container">
          <img src={loginImage} alt="Login" className="login-image" />
        </div>
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card login-form">
          <div className="card-body">
            <div className="login-form-container">
              <h2 className="card-title text-center">Log In</h2>
                <p className="text-center">Login here using your username and password</p>
                <div className="form-group">
                  <span className="login-input-item">
                    <i className="fa fa-user-circle"></i>
                  </span>
                  <input
                    className="form-control"
                    id="txt-input"
                    type="number"
                    placeholder="UserID"
                    required
                    onChange={(event) => {
                      setLoginData((prevLoginData) => ({
                        ...prevLoginData,
                        userID: parseInt(event.target.value, 10),
                      }));
                    }}
                  />
                </div>
                <div className="form-group">
                  <span className="login-input-item">
                    <i className="fa fa-key"></i>
                  </span>
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    id="pwd"
                    name="password"
                    required
                    onChange={(event) => {
                      setLoginData((prevLoginData) => ({
                        ...prevLoginData,
                        password: event.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-block" onClick={handleLogin}>
                    Log In
                  </button>
                </div>
                <div className="form-group text-center">
                  <button className="btn btn-link login-frgt-pass">
                    Forgot Password
                  </button>
                  <Link to="/landingregister" className="btn btn-link login-sign-up">
                    Sign Up <i className="fa fa-user-plus" aria-hidden="true"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Login;










