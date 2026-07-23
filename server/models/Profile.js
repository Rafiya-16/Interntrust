const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  name: { type: String, required: true },
  skills: { type: [String], required: true },
  experienceLevel: { type: String, enum: ['fresher', '0-1yr'], required: true },
  locationPref: { type: String, enum: ['remote', 'onsite', 'either'], required: true },
  domainInterest: { type: String, default: 'CS/General' },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Profile', profileSchema);