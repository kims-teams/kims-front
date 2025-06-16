import { create } from "zustand";


const useScenarioStore = create((set) => ({

  selectedScenarioId: null,
  setSelectedScenarioId: (id) => set({ selectedScenarioId: id }),

  
  bomData: [],
  setBomData: (data) => set({ bomData: data }),
  resetBomData: () => set({ bomData: [] }),


}));

export default useScenarioStore;