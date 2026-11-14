import data from '../data/scenarios.json';
export const scenarios = data;
export const getScenarioById = (id) => {
  return scenarios.find((scenario) => scenario.id === id);
}