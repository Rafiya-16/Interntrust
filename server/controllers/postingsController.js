const Posting = require('../models/Posting');
const { scorePostingLegitimacy } = require('../services/aiScoring');

async function createPosting(req, res) {
  try {
    const { title, company, description, requiredSkills, stipend, location, applyLink } = req.body;

    if (!title || !company || !description || !location || !applyLink) {
      return res.status(400).json({ error: 'Title, company, description, location, and apply link are required' });
    }
    if (!Array.isArray(requiredSkills) || requiredSkills.length === 0) {
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
      stipend: stipend || '',
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
    res.status(200).json({ postings });
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
    console.error('Get posting error:', err.message);
    res.status(500).json({ error: 'Something went wrong fetching the posting' });
  }
}

module.exports = { createPosting, getAllPostings, getPostingById };