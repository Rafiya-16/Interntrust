import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { token, logout } = useAuth();
  const location = useLocation();

  function linkStyle(path) {
    const isActive = location.pathname === path;
    return {
      color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
      fontWeight: isActive ? 600 : 400,
      textDecoration: 'none',
    };
  }

  return (
    <nav
      className="navbar"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        padding: '1rem 1.5rem',
        borderBottom: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
      }}
    >
      <Link to="/" style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-text)', textDecoration: 'none' }}>
        InternTrust
      </Link>
      <div style={{ display: 'flex', gap: '1.25rem', flex: 1 }}>
        {token ? (
          <>
            <Link to="/feed" style={linkStyle('/feed')}>Feed</Link>
            <Link to="/submit" style={linkStyle('/submit')}>Submit Posting</Link>
            <Link to="/profile" style={linkStyle('/profile')}>Profile</Link>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle('/login')}>Login</Link>
            <Link to="/signup" style={linkStyle('/signup')}>Signup</Link>
          </>
        )}
      </div>
      {token && (
        <button onClick={logout} className="btn-secondary" style={{ fontSize: '0.85rem' }}>
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;