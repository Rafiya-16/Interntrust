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

  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading postings...</div>;
  }

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto', padding: '1rem' }}>
      <h1>Internship Feed</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!error && postings.length === 0 && <p>No postings yet.</p>}
      {postings.map((posting) => (
        <PostingCard key={posting._id} posting={posting} />
      ))}
    </div>
  );
}

export default Feed;