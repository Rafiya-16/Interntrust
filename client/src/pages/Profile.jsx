import { useState, useEffect } from 'react';
import api from '../api/axiosInstance';

const ALL_EXPERIENCE = [
  { value: 'fresher', label: 'Fresher' },
  { value: '0-1yr', label: '0-1 year' },
];
const ALL_LOCATION = [
  { value: 'remote', label: 'Remote' },
  { value: 'onsite', label: 'Onsite' },
  { value: 'either', label: 'Either' },
];

function Profile() {
  const [name, setName] = useState('');
  const [skillsInput, setSkillsInput] = useState('');
  const [skills, setSkills] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState('fresher');
  const [locationPref, setLocationPref] = useState('remote');
  const [domainInterest, setDomainInterest] = useState('CS/General');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await api.get('/profile/me');
        const profile = res.data.profile;
        if (profile) {
          setName(profile.name || '');
          setSkills(profile.skills || []);
          setExperienceLevel(profile.experienceLevel || 'fresher');
          setLocationPref(profile.locationPref || 'remote');
          setDomainInterest(profile.domainInterest || 'CS/General');
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Could not load your profile. Try refreshing the page.');
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  function addSkill() {
    const trimmed = skillsInput.trim();
    if (!trimmed) return;
    const alreadyExists = skills.some((s) => s.toLowerCase() === trimmed.toLowerCase());
    if (!alreadyExists) {
      setSkills([...skills, trimmed]);
    }
    setSkillsInput('');
  }

  function removeSkill(skillToRemove) {
    setSkills(skills.filter((s) => s !== skillToRemove));
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
    setSuccessMsg('');

    if (!name.trim()) {
      setError('Name is required.');
      return;
    }
    if (skills.length === 0) {
      setError('Add at least one skill.');
      return;
    }

    setSaving(true);
    try {
      const res = await api.put('/profile/me', {
        name: name.trim(),
        skills,
        experienceLevel,
        locationPref,
        domainInterest: domainInterest.trim() || 'CS/General',
      });
      setSuccessMsg('Profile saved successfully.');
      const profile = res.data.profile;
      setName(profile.name);
      setSkills(profile.skills);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save profile.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="center-state">
        <span className="spinner" />
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ maxWidth: '520px' }}>
      <h1 style={{ fontSize: '1.7rem' }}>Your Profile</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="field-group">
            <label className="field-label" htmlFor="profile-name">Name</label>
            <input id="profile-name" type="text" className="field-input" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="profile-skill-input">Skills</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <input
                id="profile-skill-input"
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
              {skills.map((skill) => (
                <span key={skill} className="tag-chip">
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)} aria-label={`Remove ${skill}`}>×</button>
                </span>
              ))}
              {skills.length === 0 && (
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>No skills added yet</span>
              )}
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">Experience Level</label>
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              {ALL_EXPERIENCE.map((opt) => (
                <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
                  <input
                    type="radio"
                    name="experienceLevel"
                    value={opt.value}
                    checked={experienceLevel === opt.value}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">Location Preference</label>
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              {ALL_LOCATION.map((opt) => (
                <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
                  <input
                    type="radio"
                    name="locationPref"
                    value={opt.value}
                    checked={locationPref === opt.value}
                    onChange={(e) => setLocationPref(e.target.value)}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="profile-domain">Domain Interest</label>
            <input
              id="profile-domain"
              type="text"
              className="field-input"
              value={domainInterest}
              onChange={(e) => setDomainInterest(e.target.value)}
            />
          </div>

          {error && <p className="error-text" role="alert">{error}</p>}
          {successMsg && <p className="success-text" role="status">{successMsg}</p>}

          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? <span className="spinner" /> : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;