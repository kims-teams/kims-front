import { create } from "zustand";

export const useScenarioStore = create((set) => ({
  scenarioList: [],
  selectedScenario: null,

  setScenarioList: (list) => set({ scenarioList: list }),
  setSelectedScenario: (scenario) => set({ selectedScenario: scenario }),
  addScenario: (scenario) =>
    set((state) => ({
      scenarioList: [...state.scenarioList, scenario],
      selectedScenario: scenario,
    })),
}));
