function normalize(str) {
  return String(str).trim().toLowerCase();
}

function computeMatchScore(profile, posting) {
  if (!profile) {
    return { matchScore: 0, matchReasons: [] };
  }

  const profileSkills = (profile.skills || []).map(normalize);
  const postingSkills = (posting.requiredSkills || []).map(normalize);

  const overlappingSkills = postingSkills.filter((skill) => profileSkills.includes(skill));
  const skillScore = postingSkills.length > 0
    ? (overlappingSkills.length / postingSkills.length) * 70
    : 0;

  let experienceScore = 0;
  if (profile.experienceLevel === 'fresher') {
    experienceScore = 15;
  } else if (profile.experienceLevel === '0-1yr') {
    experienceScore = 15;
  }

  let locationScore = 0;
  const postingLocation = normalize(posting.location);
  const isRemotePosting = postingLocation.includes('remote');
  if (profile.locationPref === 'either') {
    locationScore = 15;
  } else if (profile.locationPref === 'remote' && isRemotePosting) {
    locationScore = 15;
  } else if (profile.locationPref === 'onsite' && !isRemotePosting) {
    locationScore = 15;
  } else {
    locationScore = 5;
  }

  const matchScore = Math.round(skillScore + experienceScore + locationScore);

  const matchReasons = [];
  if (overlappingSkills.length > 0) {
    const originalCasing = postingSkills
      .map((s, i) => (profileSkills.includes(s) ? posting.requiredSkills[i] : null))
      .filter(Boolean);
    matchReasons.push(`Matches: ${originalCasing.join(', ')}`);
  }
  if (profile.locationPref === 'remote' && isRemotePosting) {
    matchReasons.push('Remote — matches your preference');
  }
  if (profile.locationPref === 'onsite' && !isRemotePosting) {
    matchReasons.push('Onsite — matches your preference');
  }

  return { matchScore, matchReasons };
}

module.exports = { computeMatchScore };