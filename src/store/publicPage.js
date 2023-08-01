import { publicTableData } from "@/config/index.js";

export const publicPage = {
  namespaced: true,
  state: {
    publicTableData: publicTableData
  },
  mutations: {
    // 更改 公共表格数据
    publicTableDataChange(state, data) {
      state.publicTableData.unshift(data);
    },
    publicTableDataDel(state, id) {
      state.publicTableData = state.publicTableData.filter(item => {
        return item.tid !== id;
      });
    }
  }
};
