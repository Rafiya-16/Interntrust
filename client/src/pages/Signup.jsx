import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/signup', { email, password });
      login(res.data.token, res.data.user);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-container" style={{ maxWidth: '400px' }}>
      <div className="card">
        <h1 style={{ marginTop: 0, fontSize: '1.6rem' }}>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="field-group">
            <label className="field-label">Email</label>
            <input
              type="email"
              className="field-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="field-group">
            <label className="field-label">Password</label>
            <input
              type="password"
              className="field-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%' }}>
            {loading ? <span className="spinner" /> : 'Sign Up'}
          </button>
        </form>
        <p style={{ marginBottom: 0, marginTop: '1rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;