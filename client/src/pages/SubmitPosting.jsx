import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';

function SubmitPosting() {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [skillsInput, setSkillsInput] = useState('');
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [stipend, setStipend] = useState('');
  const [location, setLocation] = useState('');
  const [applyLink, setApplyLink] = useState('');

  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  function addSkill() {
    const trimmed = skillsInput.trim();
    if (trimmed && !requiredSkills.includes(trimmed)) {
      setRequiredSkills([...requiredSkills, trimmed]);
    }
    setSkillsInput('');
  }

  function removeSkill(skill) {
    setRequiredSkills(requiredSkills.filter((s) => s !== skill));
  }

  function handleSkillKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!title || !company || !description || !location || !applyLink) {
      setError('Please fill in all required fields.');
      return;
    }
    if (requiredSkills.length === 0) {
      setError('Add at least one required skill.');
      return;
    }
    try {
      new URL(applyLink);
    } catch {
      setError('Apply link must be a valid URL (e.g. https://...).');
      return;
    }

    setSaving(true);
    try {
      await api.post('/postings', {
        title,
        company,
        description,
        requiredSkills,
        stipend,
        location,
        applyLink,
      });
      navigate('/feed');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit posting.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '1rem' }}>
      <h1>Submit an Internship</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Title</label><br />
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Company</label><br />
          <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Description</label><br />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Required Skills</label><br />
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              placeholder="Type a skill and press Enter"
              style={{ flex: 1, padding: '0.5rem' }}
            />
            <button type="button" onClick={addSkill} style={{ padding: '0.5rem 1rem' }}>Add</button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {requiredSkills.map((skill) => (
              <span key={skill} style={{ background: '#e0e0e0', color: '#111', padding: '0.25rem 0.6rem', borderRadius: '999px', fontSize: '0.85rem' }}>
                {skill}{' '}
                <button type="button" onClick={() => removeSkill(skill)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>×</button>
              </span>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Stipend (optional)</label><br />
          <input type="text" value={stipend} onChange={(e) => setStipend(e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Location</label><br />
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Apply Link</label><br />
          <input type="text" value={applyLink} onChange={(e) => setApplyLink(e.target.value)} placeholder="https://..." style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={saving} style={{ padding: '0.5rem 1rem' }}>
          {saving ? 'Submitting...' : 'Submit Posting'}
        </button>
      </form>
    </div>
  );
}

export default SubmitPosting;