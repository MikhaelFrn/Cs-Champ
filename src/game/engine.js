import { getScenarioById } from "./scenarios";
import { states } from './states';

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
      const selectedAnswer = currentNode.choices?.[action.id];
      if (!selectedAnswer) {
        console.error(`Choice index ${action.id} not found on node "${nodeId}".`);
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