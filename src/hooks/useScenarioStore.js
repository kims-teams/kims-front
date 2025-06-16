import { create } from "zustand";


const useScenarioStore = create((set) => ({
  // 시나리오 선택
  selectedScenarioId: null,
  setSelectedScenarioId: (id) => set({ selectedScenarioId: id }),

  // 🔥 BOM 데이터 전역 상태
  bomData: [],
  setBomData: (data) => set({ bomData: data }),
  resetBomData: () => set({ bomData: [] }),

  // 필요한 경우: 다른 테이블 데이터도 여기에 추가 가능
}));

export default useScenarioStore;