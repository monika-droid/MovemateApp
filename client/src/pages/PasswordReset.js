import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, fetchSignInMethodsForEmail, sendPasswordResetEmail } from 'firebase/auth';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      // Check if the email is registered with Firebase
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      if (signInMethods.includes('password')) {
        // Email is valid and associated with the email/password sign-in method
        const resetLink = await sendPasswordResetEmail(auth, email);
        window.open(resetLink, '_blank'); // Open reset link in a new tab
        setMessage('Password reset link has been opened in a new tab.');
      } else if (signInMethods.length === 0) {
        throw new Error('No account found with this email address.');
      } else {
        throw new Error('This email is not associated with email/password login.');
      }
    } catch (err) {
      setError(err.message || 'Error resetting password. Please try again.');
    }
  };

  return (
    <div className="password-reset-container">
      <div className="reset-form">
        <h2>Reset Your Password</h2>
        <form onSubmit={handleResetPassword}>
          <div className="input-row">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-reset">
              Reset Password
            </button>
          </div>
        </form>
        {message && <p className="message">{message}</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default PasswordReset;
