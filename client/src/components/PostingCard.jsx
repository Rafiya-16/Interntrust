function getScoreColor(score) {
  if (score === null || score === undefined) return '#999';
  if (score >= 70) return '#2e7d32';
  if (score >= 40) return '#f9a825';
  return '#c62828';
}

function getScoreLabel(score) {
  if (score === null || score === undefined) return 'Pending';
  if (score >= 70) return `Trust Score: ${score}`;
  if (score >= 40) return `Trust Score: ${score} — Caution`;
  return `Trust Score: ${score} — High Risk`;
}

function PostingCard({ posting }) {
  const badgeColor = getScoreColor(posting.legitimacyScore);

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
        <h3 style={{ margin: '0 0 0.25rem 0' }}>{posting.title}</h3>
        <span
          style={{
            background: badgeColor,
            color: '#fff',
            padding: '0.25rem 0.6rem',
            borderRadius: '999px',
            fontSize: '0.75rem',
            whiteSpace: 'nowrap',
          }}
        >
          {getScoreLabel(posting.legitimacyScore)}
        </span>
      </div>
      <p style={{ margin: '0 0 0.5rem 0', color: '#555' }}>{posting.company} · {posting.location}</p>
      <p style={{ margin: '0 0 0.5rem 0' }}>{posting.description}</p>
      <p style={{ margin: '0 0 0.5rem 0' }}>
        <strong>Skills:</strong> {posting.requiredSkills.join(', ')}
      </p>
      {posting.stipend && <p style={{ margin: '0 0 0.5rem 0' }}><strong>Stipend:</strong> {posting.stipend}</p>}
      {posting.legitimacyReason && (
        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', fontStyle: 'italic', color: '#666' }}>
          AI note: {posting.legitimacyReason}
        </p>
      )}
      <a href={posting.applyLink} target="_blank" rel="noopener noreferrer">Apply Link →</a>
    </div>
  );
}

export default PostingCard;