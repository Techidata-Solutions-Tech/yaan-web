import mongoose from 'mongoose';

const waitlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, match: /^\d{10}$/ },
  email: { type: String, required: true, match: /\S+@\S+\.\S+/ },
  appType: { type: String, required: true, enum: ['user', 'driver'] },
}, { timestamps: true });

const Waitlist = mongoose.models.Waitlist || mongoose.model('Waitlist', waitlistSchema);

export default Waitlist;