import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosInstance';
import PostingCard from '../components/PostingCard';
import { useAuth } from '../context/AuthContext';

function Feed() {
  const [postings, setPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hasProfile, setHasProfile] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function loadData() {
      try {
        const [postingsRes, profileRes] = await Promise.all([
          api.get('/postings'),
          api.get('/profile/me'),
        ]);
        setPostings(postingsRes.data.postings);
        setHasProfile(!!profileRes.data.profile);
      } catch (err) {
        setError(err.response?.data?.error || 'Could not load postings. Try refreshing the page.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="page-container" style={{ maxWidth: '700px' }}>
      <h1 style={{ fontSize: '1.7rem' }}>Internship Feed</h1>

      {!loading && !hasProfile && (
        <div
          className="card"
          style={{
            marginBottom: '1.25rem',
            borderColor: 'var(--color-primary)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <span style={{ fontSize: '0.9rem' }}>
            Complete your profile to see postings ranked by fit for you.
          </span>
          <Link to="/profile" className="btn-primary" style={{ textDecoration: 'none', fontSize: '0.85rem' }}>
            Complete Profile
          </Link>
        </div>
      )}

      {loading && (
        <div className="center-state">
          <span className="spinner" />
          <p>Loading postings...</p>
        </div>
      )}

      {!loading && error && <p className="error-text">{error}</p>}

      {!loading && !error && postings.length === 0 && (
        <div className="center-state">
          <p>No postings yet — be the first to submit one!</p>
        </div>
      )}

      {!loading && !error && postings.map((posting) => (
        <PostingCard key={posting._id} posting={posting} currentUserId={user?.id} />
      ))}
    </div>
  );
}

export default Feed;