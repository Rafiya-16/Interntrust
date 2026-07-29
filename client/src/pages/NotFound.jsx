import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="center-state" style={{ paddingTop: '5rem' }}>
      <h1 style={{ fontSize: '2rem', margin: 0 }}>404</h1>
      <p>This page doesn't exist.</p>
      <Link to="/" className="btn-primary" style={{ textDecoration: 'none', marginTop: '0.5rem' }}>
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;