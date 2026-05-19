import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, default: 'distributor' },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
