import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    maxParticipants: { type: Number, required: true },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    category: {
      type: String,
      enum: ['Technical', 'Non-Technical'],
      required: true
    },
    paymentType: {
      type: String,
      enum: ['Free', 'Paid'],
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('hdhd',eventSchema)
