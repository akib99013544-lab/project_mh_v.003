const uclaQuestions = [
  {
    id: 1,
    text: "How often do you feel that you lack companionship?",
    options: [
      { value: 1, label: "Hardly ever" },
      { value: 2, label: "Some of the time" },
      { value: 3, label: "Often" }
    ]
  },
  {
    id: 2,
    text: "How often do you feel left out?",
    options: [
      { value: 1, label: "Hardly ever" },
      { value: 2, label: "Some of the time" },
      { value: 3, label: "Often" }
    ]
  },
  {
    id: 3,
    text: "How often do you feel isolated from others?",
    options: [
      { value: 1, label: "Hardly ever" },
      { value: 2, label: "Some of the time" },
      { value: 3, label: "Often" }
    ]
  }
];

const sidasQuestions = [
  {
    id: 1,
    text: "In the last 4 weeks, did you think about deliberately killing yourself?",
    minLabel: "Never",
    maxLabel: "Always",
    gateQuestion: true
  },
  {
    id: 2,
    text: "In the last 4 weeks, how difficult was it to stop thinking about deliberately killing yourself?",
    minLabel: "Easy",
    maxLabel: "Hard"
  },
  {
    id: 3,
    text: "In the last 4 weeks, how close did you come to trying to deliberately kill yourself?",
    minLabel: "Not close at all",
    maxLabel: "Tried to kill myself"
  },
  {
    id: 4,
    text: "In the last 4 weeks, how often did you feel distressed or very unhappy because of thoughts of killing yourself?",
    minLabel: "Not at all",
    maxLabel: "All the time"
  },
  {
    id: 5,
    text: "In the last 4 weeks, have thoughts about killing yourself made it harder to do the things you normally do?",
    minLabel: "Not at all",
    maxLabel: "All the time"
  }
];

const bcopeQuestions = [
  { id: 1, text: "I've been turning to work or other activities to take my mind off things.", subscale: "Self-distraction" },
  { id: 2, text: "I've been concentrating my efforts on doing something about the situation I'm in.", subscale: "Active coping" },
  { id: 3, text: "I've been saying to myself \"this isn't real.\"", subscale: "Denial" },
  { id: 4, text: "I've been using alcohol or other drugs to make myself feel better.", subscale: "Substance use" },
  { id: 5, text: "I've been getting emotional support from others.", subscale: "Emotional support" },
  { id: 6, text: "I've been giving up trying to deal with it.", subscale: "Behavioral disengagement" },
  { id: 7, text: "I've been taking action to try to make the situation better.", subscale: "Active coping" },
  { id: 8, text: "I've been refusing to believe that it has happened.", subscale: "Denial" },
  { id: 9, text: "I've been saying things to let my unpleasant feelings escape.", subscale: "Venting" },
  { id: 10, text: "I've been getting help and advice from other people.", subscale: "Instrumental support" },
  { id: 11, text: "I've been using alcohol or other drugs to help me get through it.", subscale: "Substance use" },
  { id: 12, text: "I've been trying to see it in a different light, to make it seem more positive.", subscale: "Positive reframing" },
  { id: 13, text: "I've been criticizing myself.", subscale: "Self-blame" },
  { id: 14, text: "I've been trying to come up with a strategy about what to do.", subscale: "Planning" },
  { id: 15, text: "I've been getting comfort and understanding from someone.", subscale: "Emotional support" },
  { id: 16, text: "I've been giving up the attempt to cope.", subscale: "Behavioral disengagement" },
  { id: 17, text: "I've been looking for something good in what is happening.", subscale: "Positive reframing" },
  { id: 18, text: "I've been making jokes about it.", subscale: "Humor" },
  { id: 19, text: "I've been doing something to think about it less, such as going to movies, watching TV, reading, daydreaming, sleeping, or shopping.", subscale: "Self-distraction" },
  { id: 20, text: "I've been accepting the reality of the fact that it has happened.", subscale: "Acceptance" },
  { id: 21, text: "I've been expressing my negative feelings.", subscale: "Venting" },
  { id: 22, text: "I've been trying to find comfort in my religion or spiritual beliefs.", subscale: "Religion" },
  { id: 23, text: "I've been trying to get advice or help from other people about what to do.", subscale: "Instrumental support" },
  { id: 24, text: "I've been learning to live with it.", subscale: "Acceptance" },
  { id: 25, text: "I've been thinking hard about what steps to take.", subscale: "Planning" },
  { id: 26, text: "I've been blaming myself for things that happened.", subscale: "Self-blame" },
  { id: 27, text: "I've been praying or meditating.", subscale: "Religion" },
  { id: 28, text: "I've been making fun of the situation.", subscale: "Humor" }
];

const bcopeOptions = [
  { value: 1, label: "Not at all" },
  { value: 2, label: "A little bit" },
  { value: 3, label: "Medium amount" },
  { value: 4, label: "A lot" }
];

module.exports = {
  ucla: { questions: uclaQuestions },
  sidas: { questions: sidasQuestions, maxScore: 50 },
  bcope: { questions: bcopeQuestions, options: bcopeOptions }
};
