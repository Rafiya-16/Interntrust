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
        setError('Could not load your profile. Try refreshing the page.');
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  function addSkill() {
    const trimmed = skillsInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
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
    return <div style={{ padding: '2rem' }}>Loading your profile...</div>;
  }

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '1rem' }}>
      <h1>Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Name</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Skills</label><br />
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              placeholder="Type a skill and press Enter"
              style={{ flex: 1, padding: '0.5rem' }}
            />
            <button type="button" onClick={addSkill} style={{ padding: '0.5rem 1rem' }}>
              Add
            </button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {skills.map((skill) => (
              <span
                key={skill}
                style={{
                  background: '#e0e0e0',
                  color: '#111',
                  padding: '0.25rem 0.6rem',
                  borderRadius: '999px',
                  fontSize: '0.85rem',
                }}
              >
                {skill}{' '}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Experience Level</label><br />
          {ALL_EXPERIENCE.map((opt) => (
            <label key={opt.value} style={{ marginRight: '1rem' }}>
              <input
                type="radio"
                name="experienceLevel"
                value={opt.value}
                checked={experienceLevel === opt.value}
                onChange={(e) => setExperienceLevel(e.target.value)}
              />{' '}
              {opt.label}
            </label>
          ))}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Location Preference</label><br />
          {ALL_LOCATION.map((opt) => (
            <label key={opt.value} style={{ marginRight: '1rem' }}>
              <input
                type="radio"
                name="locationPref"
                value={opt.value}
                checked={locationPref === opt.value}
                onChange={(e) => setLocationPref(e.target.value)}
              />{' '}
              {opt.label}
            </label>
          ))}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Domain Interest</label><br />
          <input
            type="text"
            value={domainInterest}
            onChange={(e) => setDomainInterest(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}

        <button type="submit" disabled={saving} style={{ padding: '0.5rem 1rem' }}>
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}

export default Profile;