import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = (props) => {
  const navigate = useNavigate();
  const [cred, setcred] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setcred({ ...cred, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: cred.email,
          password: cred.password,
        }),
      });

      const json = await response.json();

      if (response.ok && json.token) {
        localStorage.setItem('token', json.token);
        props.showAlert("Logged in successfully", "success");
        navigate("/");
      } else {
        props.showAlert("Invalid credentials", "danger");
      }
    } catch (error) {
      console.error("Network error:", error);
      props.showAlert("Network error", "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>
            <i className="fas fa-sign-in-alt me-2"></i>
            Welcome Back
          </h2>
          <p>Sign in to your account to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
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
                placeholder="Enter your password"
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
                Signing In...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt me-2"></i>
                Sign In
              </>
            )}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Don't have an account? 
            <Link to="/signup" className="auth-link"> Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;