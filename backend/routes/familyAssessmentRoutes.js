const express = require('express');
const router = express.Router();
const {
  getScaleConfig,
  submitAssessment,
  getPatientHistory,
  getResultById
} = require('../controllers/familyAssessmentController');

// Define routes
router.get('/scales/:scaleType', getScaleConfig);
router.post('/', submitAssessment);
router.get('/patient/:patientId', getPatientHistory);
router.get('/:id', getResultById);

module.exports = router;
