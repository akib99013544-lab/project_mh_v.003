const { bcope: { questions: bcopeQuestions } } = require('../config/scales');

// UCLA Score Calculation
const scoreUCLA = (answers) => {
  // answers is an array of 3 numbers (1-3)
  const total = answers.reduce((acc, val) => acc + val, 0);
  let interpretation = '';
  if (total >= 3 && total <= 5) {
    interpretation = 'Not lonely';
  } else if (total >= 6 && total <= 9) {
    interpretation = 'Lonely';
  } else {
    interpretation = 'Invalid score';
  }

  return { totalScore: total, interpretation };
};

// SIDAS-M Score Calculation
const scoreSIDAS = (answers) => {
  // answers is an array of 5 numbers (0-10)
  // Gate rule: if Q1 is 0, score is 0.
  let total = 0;
  let interpretation = '';
  let needsSupport = false;

  if (answers[0] === 0) {
    total = 0;
    interpretation = 'No reported ideation';
    needsSupport = false;
  } else {
    total = answers.reduce((acc, val) => acc + (val || 0), 0);
    needsSupport = true; // Any score > 0 means needs support for SIDAS
    
    if (total === 0) {
      interpretation = 'No reported ideation';
      needsSupport = false; // Just in case, though if they didn't answer 0 to Q1, total wouldn't be 0 if valid.
    } else if (total >= 1 && total <= 8) {
      interpretation = 'Some ideation reported';
    } else if (total >= 9 && total <= 20) {
      interpretation = 'Elevated — clinical follow-up recommended';
    } else if (total >= 21) {
      interpretation = 'High — prompt professional follow-up recommended';
    } else {
      interpretation = 'Invalid score';
    }
  }

  return { totalScore: total, interpretation, needsSupport };
};

// Brief COPE Score Calculation
const scoreBCOPE = (answers) => {
  // answers is an array of 28 numbers (1-4)
  const subscales = {};
  
  // Calculate subscales
  bcopeQuestions.forEach((q, index) => {
    const val = answers[index] || 1; // Default to 1 (Not at all) if missing
    if (!subscales[q.subscale]) {
      subscales[q.subscale] = 0;
    }
    subscales[q.subscale] += val;
  });

  // Calculate category totals
  const problemFocusedKeys = ['Active coping', 'Planning', 'Instrumental support'];
  const emotionFocusedKeys = ['Emotional support', 'Positive reframing', 'Acceptance', 'Religion', 'Humor'];
  const avoidantKeys = ['Self-distraction', 'Denial', 'Substance use', 'Behavioral disengagement', 'Self-blame', 'Venting'];

  const categoryTotals = {
    problemFocused: 0,
    emotionFocused: 0,
    avoidant: 0
  };

  problemFocusedKeys.forEach(k => { categoryTotals.problemFocused += (subscales[k] || 0); });
  emotionFocusedKeys.forEach(k => { categoryTotals.emotionFocused += (subscales[k] || 0); });
  avoidantKeys.forEach(k => { categoryTotals.avoidant += (subscales[k] || 0); });

  return { subscales, categoryTotals, interpretation: 'Profile calculated' };
};

module.exports = {
  scoreUCLA,
  scoreSIDAS,
  scoreBCOPE
};
