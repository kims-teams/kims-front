import { create } from "zustand";

const useCommunityViewStore = create((set) => ({
  selectedCommunityView: null,
  setSelectedCommunityView: (view) => set({ selectedCommunityView: view }),
}));

export default useCommunityViewStore;
