import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiMail, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setForm((current) => ({ ...current, [name]: value }));
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      await register({ username: form.username, email: form.email, password: form.password });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="auth-card glass">
        <div className="auth-header">
          <div className="auth-logo">
            <span className="logo-icon">G</span>
            <span className="logo-text">GymOS</span>
          </div>
          <h2>Create Account</h2>
          <p>Register for GymOS administrator access</p>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <div className="input-group">
              <span className="input-group-text"><FiUser /></span>
              <input type="text" name="username" className="form-control" placeholder="Choose a username" value={form.username} onChange={handleChange} />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text"><FiMail /></span>
              <input type="email" name="email" className="form-control" placeholder="your@email.com" value={form.email} onChange={handleChange} />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text"><FiLock /></span>
              <input type={showPassword ? 'text' : 'password'} name="password" className="form-control" placeholder="Min. 6 characters" value={form.password} onChange={handleChange} />
              <button type="button" className="input-group-text" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <div className="input-group">
              <span className="input-group-text"><FiLock /></span>
              <input type={showPassword ? 'text' : 'password'} name="confirmPassword" className="form-control" placeholder="Repeat password" value={form.confirmPassword} onChange={handleChange} />
            </div>
          </div>
          <button className="btn btn-primary w-100 py-2" disabled={loading}>
            {loading ? 'Creating Account...' : 'Register'}
          </button>
          <div className="auth-footer">
            <span>Already have an account? <Link to="/login">Sign In</Link></span>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
