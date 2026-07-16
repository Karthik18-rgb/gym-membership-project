import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => (
  <div className="auth-shell">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="auth-card glass" style={{ maxWidth: 480 }}>
      <div className="text-center py-4">
        <h1 className="display-1 fw-bold text-primary mb-0">404</h1>
        <p className="text-muted mb-4">Page not found</p>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn btn-primary">Go to Dashboard</Link>
      </div>
    </motion.div>
  </div>
);

export default NotFound;
