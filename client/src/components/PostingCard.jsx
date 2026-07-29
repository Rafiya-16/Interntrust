import { useState } from 'react';
import api from '../api/axiosInstance';

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

function PostingCard({ posting, currentUserId }) {
  const [flagged, setFlagged] = useState(
    currentUserId ? (posting.flaggedBy || []).some((id) => id === currentUserId || id?.toString?.() === currentUserId) : false
  );
  const [flagCount, setFlagCount] = useState((posting.flaggedBy || []).length);
  const [flagging, setFlagging] = useState(false);
  const [flagError, setFlagError] = useState('');

  const badgeColor = getScoreColor(posting.legitimacyScore);
  const hasMatchInfo = posting.matchReasons && posting.matchReasons.length > 0;

  async function handleFlag() {
    if (flagged || flagging) return;
    setFlagging(true);
    setFlagError('');
    try {
      await api.post(`/postings/${posting._id}/flag`);
      setFlagged(true);
      setFlagCount((c) => c + 1);
    } catch (err) {
      if (err.response?.status === 409) {
        setFlagged(true);
      } else {
        setFlagError(err.response?.data?.error || 'Could not flag this posting.');
      }
    } finally {
      setFlagging(false);
    }
  }

  return (
    <div className="card" style={{ marginBottom: '1rem', borderColor: flagCount > 0 ? 'var(--color-danger)' : undefined }}>
      {flagCount > 0 && (
        <div
          style={{
            background: 'rgba(229, 72, 77, 0.12)',
            color: 'var(--color-danger)',
            fontSize: '0.78rem',
            fontWeight: 600,
            padding: '0.4rem 0.6rem',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '0.75rem',
          }}
        >
          ⚠ Flagged as suspicious by {flagCount} {flagCount === 1 ? 'student' : 'students'}
        </div>
      )}
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <a href={posting.applyLink} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem', fontWeight: 600 }}>
          Apply Link →
        </a>
        <button
          type="button"
          onClick={handleFlag}
          disabled={flagged || flagging}
          className="btn-secondary"
          style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
        >
          {flagged ? '✓ Flagged' : flagging ? 'Flagging...' : 'Flag as suspicious'}
        </button>
      </div>
      {flagError && <p className="error-text" style={{ marginTop: '0.5rem' }}>{flagError}</p>}
    </div>
  );
}

export default PostingCard;