import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = (props) => {
  const navigate = useNavigate();
  const [cred, setcred] = useState({ name: "", email: "", password: "", cpassword: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setcred({ ...cred, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cred.password !== cred.cpassword) {
      props.showAlert("Passwords do not match", "danger");
      return;
    }

    if (cred.password.length < 6) {
      props.showAlert("Password must be at least 6 characters long", "danger");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cred.name,
          email: cred.email,
          password: cred.password,
        }),
      });

      const json = await response.json();

      if (response.ok && json.token) {
        localStorage.setItem('token', json.token);
        props.showAlert("Account created successfully", "success");
        navigate("/");
      } else {
        props.showAlert(json.message || "Failed to create account", "danger");
      }
    } catch (error) {
      console.error("Network error:", error);
      props.showAlert("Failed to connect to the server", "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>
            <i className="fas fa-user-plus me-2"></i>
            Create Account
          </h2>
          <p>Join iNotebook to start organizing your thoughts</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-user"></i>
              </span>
              <input
                type="text"
                className="form-control modern-input"
                id="name"
                name="name"
                value={cred.name}
                onChange={onChange}
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control modern-input"
                id="email"
                name="email"
                value={cred.email}
                onChange={onChange}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                className="form-control modern-input"
                id="password"
                name="password"
                value={cred.password}
                onChange={onChange}
                placeholder="Create a password"
                minLength={6}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                className="form-control modern-input"
                id="cpassword"
                name="cpassword"
                value={cred.cpassword}
                onChange={onChange}
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary auth-btn w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Creating Account...
              </>
            ) : (
              <>
                <i className="fas fa-user-plus me-2"></i>
                Create Account
              </>
            )}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Already have an account? 
            <Link to="/login" className="auth-link"> Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;