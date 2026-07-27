import { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import PostingCard from '../components/PostingCard';

function Feed() {
  const [postings, setPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadPostings() {
      try {
        const res = await api.get('/postings');
        setPostings(res.data.postings);
      } catch (err) {
        setError('Could not load postings. Try refreshing the page.');
      } finally {
        setLoading(false);
      }
    }
    loadPostings();
  }, []);

  return (
    <div className="page-container" style={{ maxWidth: '700px' }}>
      <h1 style={{ fontSize: '1.7rem' }}>Internship Feed</h1>

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
        <PostingCard key={posting._id} posting={posting} />
      ))}
    </div>
  );
}

export default Feed;