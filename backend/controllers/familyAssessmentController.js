const AssessmentResult = require('../models/AssessmentResult');
const { ucla, sidas, bcope } = require('../config/scales');
const { scoreUCLA, scoreSIDAS, scoreBCOPE } = require('../utils/scoring');

// @desc    Get scale configuration
// @route   GET /api/family-assessments/scales/:scaleType
// @access  Public (or Private depending on your setup)
const getScaleConfig = (req, res) => {
  const { scaleType } = req.params;
  
  if (scaleType === 'ucla') return res.status(200).json(ucla);
  if (scaleType === 'sidas') return res.status(200).json(sidas);
  if (scaleType === 'bcope') return res.status(200).json(bcope);

  return res.status(404).json({ message: 'Scale not found' });
};

// @desc    Submit an assessment
// @route   POST /api/family-assessments
// @access  Private
const submitAssessment = async (req, res) => {
  try {
    const { patientId, scaleType, completedBy, answers } = req.body;

    if (!patientId || !scaleType || !completedBy || !answers) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Hard requirement: SIDAS is self-report only
    if (scaleType === 'sidas' && completedBy === 'caregiver') {
      return res.status(400).json({ 
        message: 'The SIDAS-M scale is clinically validated for self-report only. It cannot be completed by a caregiver.' 
      });
    }

    let result;
    
    // Server-side scoring
    if (scaleType === 'ucla') {
      result = scoreUCLA(answers);
    } else if (scaleType === 'sidas') {
      result = scoreSIDAS(answers);
    } else if (scaleType === 'bcope') {
      result = scoreBCOPE(answers);
    } else {
      return res.status(400).json({ message: 'Invalid scale type' });
    }

    const assessmentResult = await AssessmentResult.create({
      patientId,
      scaleType,
      answers,
      completedBy,
      score: scaleType === 'bcope' ? { subscales: result.subscales, categoryTotals: result.categoryTotals } : result.totalScore,
      interpretation: result.interpretation,
      needsSupport: result.needsSupport || false,
    });

    res.status(201).json(assessmentResult);

  } catch (error) {
    console.error('Error submitting assessment:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get patient history
// @route   GET /api/family-assessments/patient/:patientId
// @access  Private
const getPatientHistory = async (req, res) => {
  try {
    const { patientId } = req.params;
    const history = await AssessmentResult.find({ patientId }).sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching patient history:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single result by ID
// @route   GET /api/family-assessments/:id
// @access  Private
const getResultById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await AssessmentResult.findById(id);
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching result:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getScaleConfig,
  submitAssessment,
  getPatientHistory,
  getResultById
};
