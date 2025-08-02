import React from 'react';

const About = () => {
  return (
    <div className="container" style={{ maxWidth: 600, margin: '0 auto', padding: '2.5rem 0' }}>
      <div
        style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: 'var(--shadow-lg)',
          padding: '2rem',
          color: 'var(--text-primary)'
          
        }}
      >
        <h1 className="text-gradient" style={{ marginBottom: '1.25rem', fontWeight: 700 }}>
          About This App
        </h1>
        <p style={{ fontSize: '1.07rem', marginBottom: '1.1rem' }}>
          <b>iNotebook – Modern Notes Manager</b>
          <br />
          Built with React, this app provides a clean, calming workspace for your ideas and todos.
        </p>
        <ul style={{ color: 'var(--text-secondary)', marginBottom: 0 }}>
          <li>Responsive and accessible UI for desktop and mobile</li>
          <li>Secure: authentication-ready and privacy focused</li>
          <li>Quick note creation, searching, tagging, and organization</li>
        </ul>
        <div style={{ marginTop: '1.25rem', color: 'var(--text-secondary)' }}>
          Made with <span style={{ color: 'var(--accent-color)', fontWeight: 500 }}>React</span> and custom CSS.
        </div>
      </div>
    </div>
  );
};

export default About;
