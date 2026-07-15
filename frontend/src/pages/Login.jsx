import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setForm((current) => ({ ...current, [name]: value }));
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.username || !form.password) {
      setError('Please enter both your username and password.');
      return;
    }
    setLoading(true);
    try {
      await login(form);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="auth-card">
        <div className="auth-card__side">
          <div className="auth-brand">
            <div className="auth-brand__icon">G</div>
            <div>
              <h1>GymOS</h1>
              <p>Enterprise gym management</p>
            </div>
          </div>
          <h2>Welcome back</h2>
          <p>Securely access member insights, billing, and operations from one workspace.</p>
          <ul>
            <li>Protected member routes</li>
            <li>Modern operations dashboard</li>
            <li>Instant notifications</li>
          </ul>
        </div>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <h3>Sign in</h3>
          <p className="text-muted">Use your administrator credentials to continue.</p>
          {error ? <div className="alert alert-danger py-2">{error}</div> : null}
          <label className="form-label">Username</label>
          <div className="input-group mb-3">
            <span className="input-group-text"><FiUser /></span>
            <input name="username" value={form.username} onChange={handleChange} className="form-control" placeholder="admin" />
          </div>
          <label className="form-label">Password</label>
          <div className="input-group mb-3">
            <span className="input-group-text"><FiLock /></span>
            <input type="password" name="password" value={form.password} onChange={handleChange} className="form-control" placeholder="••••••••" />
          </div>
          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
          <div className="d-flex justify-content-between mt-3 small text-muted">
            <Link to="#">Forgot password?</Link>
            <span>Secure JWT session</span>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
