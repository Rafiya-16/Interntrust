import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Landing() {
  const { token } = useAuth();

  return (
    <div className="page-container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
      <h1 style={{ fontSize: '2.4rem', marginBottom: '0.75rem' }}>Welcome to InternTrust</h1>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', maxWidth: '480px', margin: '0 auto 2rem' }}>
        AI-verified, skill-matched internship discovery — built for CS students tired of guessing which listings are real.
      </p>
      {!token ? (
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/signup" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Get Started
          </Link>
          <Link to="/login" className="btn-secondary" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Log In
          </Link>
        </div>
      ) : (
        <Link to="/feed" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
          Go to Feed
        </Link>
      )}
    </div>
  );
}

export default Landing;