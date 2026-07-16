import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiMail, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setForm((current) => ({ ...current, [name]: value }));
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.email || !form.password) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);
    try {
      await login({ email: form.email, password: form.password });
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
          <h2>Welcome Back</h2>
          <p>Sign in to your GymOS dashboard</p>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text"><FiMail /></span>
              <input type="email" name="email" className="form-control" placeholder="admin@gymos.com" value={form.email} onChange={handleChange} />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text"><FiLock /></span>
              <input type={showPassword ? 'text' : 'password'} name="password" className="form-control" placeholder="Enter password" value={form.password} onChange={handleChange} />
              <button type="button" className="input-group-text" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          <button className="btn btn-primary w-100 py-2" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          <div className="auth-footer">
            <a href="#forgot" className="text-muted">Forgot Password?</a>
            <span>Don't have an account? <Link to="/register">Register</Link></span>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
