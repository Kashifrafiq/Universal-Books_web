import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState(null);

  const location = useLocation();

  useEffect(() => {
    // Extract the token from the URL query parameters
    const tokenFromUrl = new URLSearchParams(location.search).get('token');
    setToken(tokenFromUrl);
  }, [location]);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (!token) {
      setMessage("Invalid reset link.");
      return;
    }

    // You would make an API call here in a real application.
    // For now, just update the password in the frontend and display a success message.

    localStorage.setItem('newPassword', newPassword); // Store the new password locally for demo
    setMessage("Password updated successfully!");
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Reset Your Password</h2>
      <form onSubmit={handlePasswordChange}>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <button type="submit">Update Password</button>
        </div>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
