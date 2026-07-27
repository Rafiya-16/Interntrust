function getScoreColor(score) {
  if (score === null || score === undefined) return 'var(--color-text-muted)';
  if (score >= 70) return 'var(--color-success)';
  if (score >= 40) return 'var(--color-warning)';
  return 'var(--color-danger)';
}

function getScoreLabel(score) {
  if (score === null || score === undefined) return 'Pending';
  if (score >= 70) return `Trust Score: ${score}`;
  if (score >= 40) return `Trust Score: ${score} — Caution`;
  return `Trust Score: ${score} — High Risk`;
}

function PostingCard({ posting }) {
  const badgeColor = getScoreColor(posting.legitimacyScore);
  const hasMatchInfo = posting.matchReasons && posting.matchReasons.length > 0;

  return (
    <div className="card" style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
        <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>{posting.title}</h3>
        <span
          style={{
            background: badgeColor,
            color: '#04201a',
            padding: '0.25rem 0.65rem',
            borderRadius: '999px',
            fontSize: '0.72rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
        >
          {getScoreLabel(posting.legitimacyScore)}
        </span>
      </div>
      <p style={{ margin: '0 0 0.6rem 0', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
        {posting.company} · {posting.location}
      </p>
      <p style={{ margin: '0 0 0.6rem 0', fontSize: '0.95rem' }}>{posting.description}</p>
      <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>
        <strong>Skills:</strong> {posting.requiredSkills.join(', ')}
      </p>
      {posting.stipend && (
        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>
          <strong>Stipend:</strong> {posting.stipend}
        </p>
      )}
      {posting.legitimacyReason && (
        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.83rem', fontStyle: 'italic', color: 'var(--color-text-muted)' }}>
          AI note: {posting.legitimacyReason}
        </p>
      )}
      {hasMatchInfo && (
        <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.83rem', color: 'var(--color-primary)' }}>
          {posting.matchReasons.join(' · ')}
        </p>
      )}
      <a href={posting.applyLink} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem', fontWeight: 600 }}>
        Apply Link →
      </a>
    </div>
  );
}

export default PostingCard;