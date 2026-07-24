const Profile = require('../models/Profile');

async function getMyProfile(req, res) {
  try {
    const profile = await Profile.findOne({ userId: req.userId });
    res.status(200).json({ profile: profile || null });
  } catch (err) {
    console.error('Get profile error:', err.message);
    res.status(500).json({ error: 'Something went wrong fetching your profile' });
  }
}

async function upsertMyProfile(req, res) {
  try {
    const { name, skills, experienceLevel, locationPref, domainInterest } = req.body;

    if (!name || !Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({ error: 'Name and at least one skill are required' });
    }
    if (!['fresher', '0-1yr'].includes(experienceLevel)) {
      return res.status(400).json({ error: 'Invalid experience level' });
    }
    if (!['remote', 'onsite', 'either'].includes(locationPref)) {
      return res.status(400).json({ error: 'Invalid location preference' });
    }

    const profile = await Profile.findOneAndUpdate(
      { userId: req.userId },
      {
        userId: req.userId,
        name,
        skills,
        experienceLevel,
        locationPref,
        domainInterest: domainInterest || 'CS/General',
        updatedAt: new Date(),
      },
      { new: true, upsert: true }
    );

    res.status(200).json({ profile });
  } catch (err) {
    console.error('Upsert profile error:', err.message);
    res.status(500).json({ error: 'Something went wrong saving your profile' });
  }
}

module.exports = { getMyProfile, upsertMyProfile };