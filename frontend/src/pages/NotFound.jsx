import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';

const NotFound = () => {
  useDocumentTitle('Page not found');
  return (
    <div className="not-found">
      <i className="bi bi-compass-fill" />
      <h1>404</h1>
      <h2>Page not found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">Return to Dashboard</Link>
    </div>
  );
};

export default NotFound;
