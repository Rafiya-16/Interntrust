const Posting = require('../models/Posting');
const Profile = require('../models/Profile');
const { scorePostingLegitimacy } = require('../services/aiScoring');
const { computeMatchScore } = require('../services/matching');

async function createPosting(req, res) {
  try {
    let { title, company, description, requiredSkills, stipend, location, applyLink } = req.body;

    title = (title || '').trim();
    company = (company || '').trim();
    description = (description || '').trim();
    stipend = (stipend || '').trim();
    location = (location || '').trim();
    applyLink = (applyLink || '').trim();

    if (!title || !company || !description || !location || !applyLink) {
      return res.status(400).json({ error: 'Title, company, description, location, and apply link are required' });
    }
    if (!Array.isArray(requiredSkills) || requiredSkills.length === 0) {
      return res.status(400).json({ error: 'At least one required skill is needed' });
    }
    requiredSkills = requiredSkills.map((s) => String(s).trim()).filter(Boolean);
    if (requiredSkills.length === 0) {
      return res.status(400).json({ error: 'At least one required skill is needed' });
    }
    try {
      new URL(applyLink);
    } catch {
      return res.status(400).json({ error: 'Apply link must be a valid URL' });
    }

    const { score, reason } = await scorePostingLegitimacy({ title, company, description, stipend, location });

    const posting = await Posting.create({
      title,
      company,
      description,
      requiredSkills,
      stipend,
      location,
      applyLink,
      submittedBy: req.userId,
      legitimacyScore: score,
      legitimacyReason: reason,
    });

    res.status(201).json({ posting });
  } catch (err) {
    console.error('Create posting error:', err.message);
    res.status(500).json({ error: 'Something went wrong creating the posting' });
  }
}

async function getAllPostings(req, res) {
  try {
    const postings = await Posting.find().sort({ createdAt: -1 });
    const profile = await Profile.findOne({ userId: req.userId });

    const rankedPostings = postings
      .map((posting) => {
        const { matchScore, matchReasons } = computeMatchScore(profile, posting);
        return { ...posting.toObject(), matchScore, matchReasons };
      })
      .sort((a, b) => b.matchScore - a.matchScore);

    res.status(200).json({ postings: rankedPostings });
  } catch (err) {
    console.error('Get postings error:', err.message);
    res.status(500).json({ error: 'Something went wrong fetching postings' });
  }
}

async function getPostingById(req, res) {
  try {
    const posting = await Posting.findById(req.params.id);
    if (!posting) {
      return res.status(404).json({ error: 'Posting not found' });
    }
    res.status(200).json({ posting });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({ error: 'Posting not found' });
    }
    console.error('Get posting error:', err.message);
    res.status(500).json({ error: 'Something went wrong fetching the posting' });
  }
}

async function flagPosting(req, res) {
  try {
    const posting = await Posting.findById(req.params.id);
    if (!posting) {
      return res.status(404).json({ error: 'Posting not found' });
    }

    const alreadyFlagged = posting.flaggedBy.some((id) => id.toString() === req.userId);
    if (alreadyFlagged) {
      return res.status(409).json({ error: 'You have already flagged this posting' });
    }

    posting.flaggedBy.push(req.userId);
    await posting.save();

    res.status(200).json({ posting });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({ error: 'Posting not found' });
    }
    console.error('Flag posting error:', err.message);
    res.status(500).json({ error: 'Something went wrong flagging the posting' });
  }
}

module.exports = { createPosting, getAllPostings, getPostingById, flagPosting };