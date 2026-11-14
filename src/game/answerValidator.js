export const RATING = {
  GOOD: 'good',
  NEUTRAL: 'neutral',
  BAD: 'bad',
};

export function getChoice(node, choiceIndex) {
  return node?.choices?.[choiceIndex];
}

export function validateAnswer(node, choiceIndex) {
  const choice = getChoice(node, choiceIndex);
  if (!choice) {
    return { valid: false, choice: null, error: `Choice index ${choiceIndex} not found on node.` };
  }
  return { valid: true, choice, error: null };
}

export function rateChoice(choice) {
  if (!choice || typeof choice.points !== 'number') {
    console.error('rateChoice: choice is missing a numeric "points" value.', choice);
    return RATING.NEUTRAL;
  }
  if (choice.points > 0) return RATING.GOOD;
  if (choice.points < 0) return RATING.BAD;
  return RATING.NEUTRAL;
}

export function isCorrectChoice(choice) {
  return rateChoice(choice) === RATING.GOOD;
}

export function isRiskyChoice(choice) {
  return rateChoice(choice) === RATING.BAD;
}
