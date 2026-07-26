const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const Posting = require('../models/Posting');
const { scorePostingLegitimacy } = require('../services/aiScoring');

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function rescore() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected for rescoring');

    const unscored = await Posting.find({ legitimacyScore: null });
    console.log(`Found ${unscored.length} unscored postings.`);

    for (const posting of unscored) {
      const { score, reason } = await scorePostingLegitimacy(posting);
      posting.legitimacyScore = score;
      posting.legitimacyReason = reason;
      await posting.save();
      console.log(`✅ Scored: ${posting.title} @ ${posting.company} → ${score}`);
      await delay(5000); // 5s between postings to stay under free-tier rate limits
    }

    console.log('🌱 Rescoring complete.');
  } catch (err) {
    console.error('❌ Rescoring error:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

rescore();