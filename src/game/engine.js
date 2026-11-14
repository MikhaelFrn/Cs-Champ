import { getScenarioById } from "./scenarios";
import { states } from './states';
import { validateAnswer } from './answerValidator';

export const initialState = {
  scenario: null, nodeId: null, score: 0, steps: 0,
  history: [], lastDelta: 0, status: 'picking',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case states[0]: { // START
      const scenario = getScenarioById(action.scenarioId);
      if (!scenario) {
        console.error(`Scenario with ID ${action.scenarioId} not found.`);
        return state;
      }
      const validationErrors = validateScenario(scenario);
      if (validationErrors.length) {
        console.error(`Scenario "${scenario.id}" failed validation:`, validationErrors);
        return state;
      }
      return { ...initialState, scenario, nodeId: scenario.start, status: 'playing' };
    }
    case states[1]: { // PICKING
      const { scenario, nodeId } = state;
      if (!scenario) {
        console.error('PICKING action dispatched with no active scenario.');
        return state;
      }
      const currentNode = scenario.nodes[nodeId];
      if (!currentNode) {
        console.error(`Current node "${nodeId}" not found in scenario "${scenario.id}".`);
        return state;
      }
      const { valid, choice: selectedAnswer, error } = validateAnswer(currentNode, action.id);
      if (!valid) {
        console.error(`PICKING: ${error} (node "${nodeId}")`);
        return state;
      }
      const nextNode = scenario.nodes[selectedAnswer.next];
      if (!nextNode) {
        console.error(`Next node "${selectedAnswer.next}" not found in scenario "${scenario.id}".`);
        return state;
      }
      return {
        ...state,
        nodeId: selectedAnswer.next,
        score: state.score + (selectedAnswer.points ?? 0),
        steps: state.steps + 1,
        history: [...state.history, { from: nodeId, label: selectedAnswer.label, points: selectedAnswer.points }],
        lastDelta: selectedAnswer.points ?? 0,
        status: nextNode.end ? 'ending' : 'playing',
      };
    }
    case states[2]: // ENDING
      return { ...state, status: 'ending' };
    case states[3]: // GAMEOVER
      return { ...state, status: 'gameover' };
    default:
      console.error(`Unknown action type: ${action.type}`);
      return state;
  }
};

export function maxScore(s, id = s.start, memo = {}, visiting = new Set()) {
  if (memo[id] !== undefined) return memo[id];
  const node = s.nodes[id];
  if (!node) {
    console.error(`maxScore: node "${id}" not found in scenario "${s.id}".`);
    return (memo[id] = -Infinity);
  }
  if (node.end) return (memo[id] = 0);
  if (visiting.has(id)) {
    console.error(`maxScore: cycle detected at node "${id}" in scenario "${s.id}".`);
    return -Infinity;
  }
  if (!node.choices?.length) {
    console.error(`maxScore: node "${id}" has no choices and is not an end node in scenario "${s.id}".`);
    return (memo[id] = -Infinity);
  }
  visiting.add(id);
  const best = Math.max(
    ...node.choices.map(c => (c.points ?? 0) + maxScore(s, c.next, memo, visiting)));
  visiting.delete(id);
  return (memo[id] = best);
}

export function validateScenario(s) {
  const errors = [];
  if (!s.nodes[s.start]) errors.push(`${s.id}: missing start node`);

  for (const [id, n] of Object.entries(s.nodes)) {
    if (!n.end && !n.choices?.length)
      errors.push(`${s.id}/${id}: non-end node has no choices (dead end)`);
    for (const c of n.choices ?? [])
      if (!s.nodes[c.next])
        errors.push(`${s.id}/${id}: "${c.label}" points to missing "${c.next}"`);
  }

  const cycle = findCycle(s);
  if (cycle) errors.push(`${s.id}: cycle detected (${cycle.join(' -> ')})`);

  return errors;
}

function findCycle(s) {
  const visited = new Set();
  const inPath = new Set();
  const path = [];

  const visit = (id) => {
    const node = s.nodes[id];
    if (!node) return null;
    if (inPath.has(id)) return [...path, id];
    if (visited.has(id)) return null;
    visited.add(id);
    inPath.add(id);
    path.push(id);
    for (const c of node.choices ?? []) {
      const found = visit(c.next);
      if (found) return found;
    }
    inPath.delete(id);
    path.pop();
    return null;
  };

  return s.nodes[s.start] ? visit(s.start) : null;
}