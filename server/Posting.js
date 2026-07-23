const mongoose = require('mongoose');

const postingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  requiredSkills: { type: [String], required: true },
  stipend: { type: String },
  location: { type: String, required: true },
  applyLink: { type: String, required: true },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  legitimacyScore: { type: Number, default: null },
  legitimacyReason: { type: String, default: null },
  flaggedBy: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Posting', postingSchema);