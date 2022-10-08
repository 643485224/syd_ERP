import store from '../../store/index'
export default {
  state: {
    arrays: [],
    tagStatus: '',
    tagStatusName: ''
  },
  mutations: {
    // 添加
    addTagItem(state, tag) {
      state.tagStatus = tag.path
      state.tagStatusName = tag.name
      let a = false
      state.arrays.forEach(element => {
        if (element.name == tag.name) {
          return a = true
        }
      });
      if (a) {} else {
        state.arrays.push(tag)
        //默认顶部只显示10个，大于将从开头第一个删除
        if (state.arrays.length > 11) {
          state.arrays.splice(0, 1);
        }
      }
    },
    // 删除
    reduceTagItem(state, tag) {

      state.arrays.forEach((element, index) => {
        if (element.name == tag.name) {
          state.arrays.splice(index, 1);
          if (index - 1 < 0) {
            //点开头时
            if (state.arrays.length > 0) {
              state.tagStatus = state.arrays[0].path
              state.tagStatusName = state.arrays[0].name
            } else {
              state.arrays.push(store.state.vuex_menu[0])
              state.tagStatus = store.state.vuex_menu[0].path
              state.tagStatusName = store.state.vuex_menu[0].name
            }
          } else if (index == state.arrays.length - 1) {
            if (index == 0) {} else {
              state.tagStatus = state.arrays[index - 1].path
              state.tagStatusName = state.arrays[index - 1].name
            }
          } else {
            state.tagStatus = state.arrays[index - 1].path
            state.tagStatusName = state.arrays[index - 1].name
          }
        }
      });
    },
    // 点击
    clickTagItem(state, tag) {
      state.tagStatus = tag.path;
      state.tagStatusName = tag.name;
    },
    // 重置数据
    resetTagItem(state, tag) {
      state.arrays = [tag]
      state.tagStatus = tag.path
      state.tagStatusName = tag.name
    },

  },
  getters: {

  },
  actions: {

  }
}
