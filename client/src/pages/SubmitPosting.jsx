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
    if (!trimmed) return;
    const alreadyExists = requiredSkills.some((s) => s.toLowerCase() === trimmed.toLowerCase());
    if (!alreadyExists) {
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

    if (!title.trim() || !company.trim() || !description.trim() || !location.trim() || !applyLink.trim()) {
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
        title: title.trim(),
        company: company.trim(),
        description: description.trim(),
        requiredSkills,
        stipend: stipend.trim(),
        location: location.trim(),
        applyLink: applyLink.trim(),
      });
      navigate('/feed');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit posting.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="page-container" style={{ maxWidth: '560px' }}>
      <h1 style={{ fontSize: '1.7rem' }}>Submit an Internship</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="field-group">
            <label className="field-label" htmlFor="posting-title">Title</label>
            <input id="posting-title" type="text" className="field-input" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="field-group">
            <label className="field-label" htmlFor="posting-company">Company</label>
            <input id="posting-company" type="text" className="field-input" value={company} onChange={(e) => setCompany(e.target.value)} />
          </div>
          <div className="field-group">
            <label className="field-label" htmlFor="posting-description">Description</label>
            <textarea id="posting-description" className="field-input" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
          </div>
          <div className="field-group">
            <label className="field-label" htmlFor="posting-skill-input">Required Skills</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <input
                id="posting-skill-input"
                type="text"
                className="field-input"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                placeholder="Type a skill and press Enter"
                style={{ flex: 1 }}
              />
              <button type="button" onClick={addSkill} className="btn-secondary">Add</button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {requiredSkills.map((skill) => (
                <span key={skill} className="tag-chip">
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)} aria-label={`Remove ${skill}`}>×</button>
                </span>
              ))}
            </div>
          </div>
          <div className="field-group">
            <label className="field-label" htmlFor="posting-stipend">Stipend (optional)</label>
            <input id="posting-stipend" type="text" className="field-input" value={stipend} onChange={(e) => setStipend(e.target.value)} />
          </div>
          <div className="field-group">
            <label className="field-label" htmlFor="posting-location">Location</label>
            <input id="posting-location" type="text" className="field-input" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div className="field-group">
            <label className="field-label" htmlFor="posting-applylink">Apply Link</label>
            <input id="posting-applylink" type="text" className="field-input" value={applyLink} onChange={(e) => setApplyLink(e.target.value)} placeholder="https://..." />
          </div>
          {error && <p className="error-text" role="alert">{error}</p>}
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? <span className="spinner" /> : 'Submit Posting'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubmitPosting;