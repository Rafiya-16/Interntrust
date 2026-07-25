function PostingCard({ posting }) {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
      <h3 style={{ margin: '0 0 0.25rem 0' }}>{posting.title}</h3>
      <p style={{ margin: '0 0 0.5rem 0', color: '#555' }}>{posting.company} · {posting.location}</p>
      <p style={{ margin: '0 0 0.5rem 0' }}>{posting.description}</p>
      <p style={{ margin: '0 0 0.5rem 0' }}>
        <strong>Skills:</strong> {posting.requiredSkills.join(', ')}
      </p>
      {posting.stipend && <p style={{ margin: '0 0 0.5rem 0' }}><strong>Stipend:</strong> {posting.stipend}</p>}
      <a href={posting.applyLink} target="_blank" rel="noopener noreferrer">Apply Link →</a>
    </div>
  );
}

export default PostingCard;