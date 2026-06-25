const mongoose = require('mongoose');

const AssessmentResultSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    scaleType: {
      type: String,
      required: [true, 'Scale type is required'],
      enum: ['ucla', 'sidas', 'bcope'],
    },
    answers: {
      type: [Number],
      required: [true, 'Answers array is required'],
    },
    score: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, 'Computed score is required'],
    },
    interpretation: {
      type: String,
      required: [true, 'Interpretation is required'],
    },
    needsSupport: {
      type: Boolean,
      default: false,
    },
    completedBy: {
      type: String,
      enum: ['self', 'caregiver'],
      required: [true, 'completedBy is required'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('AssessmentResult', AssessmentResultSchema);
