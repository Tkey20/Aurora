import { target } from "../config";

export const targetList = {
  namespaced: true,
  state: {
    targetList: target
  },
  mutations: {
    addTarget(state, payload) {
      state.targetList.push(payload);
    },
    deleteTarget(state, id) {
      state.targetList = state.targetList.filter(item => item.id !== id);
    }
  }
};
