export const userPage = {
  namespaced: true,
  state: {
    userTableData: []
  },
  mutations: {
    // 更改 用户表格数据
    userTableDataAdd(state, data) {
      state.userTableData.unshift(data);
    },
    deleteUserTableData(state, id) {
      state.userTableData = state.userTableData.filter(item => {
        return item.tid !== id;
      });
    }
  },
  actions: {
    // 更改 用户表格数据
    userTableDataChange({ commit }, data) {
      commit("userTableDataAdd", data);
      commit("publicPage/publicTableDataChange", data, {
        root: true
      });
    },
    // 删除 用户表格数据 root申明不执行当前模块的mutations
    deluserTableData({ commit }, id) {
      console.log("xxxxxxxxxxxxxxxxx");
      commit("deleteUserTableData", id);
      commit("publicPage/publicTableDataDel", id, {
        root: true
      });
    }
  }
};
