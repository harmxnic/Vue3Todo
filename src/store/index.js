import { createStore } from 'vuex'

export default createStore({
  state: {
    todoList: JSON.parse(localStorage.getItem('todoList')),
    isModalVisible: false,
    isEditing: false
  },
  mutations: {
    changeChecked(state, {itemId, subItemId, checked}) {
      state.todoList.find(item => item.id === itemId).items.find(item => item.id === subItemId).checked = checked;
    },
    changeTitle(state, {itemId, subItemId, title}) {
      state.todoList.find(item => item.id === itemId).items.find(item => item.id === subItemId).title = title;
    },
    deleteItem(state, id) {
      state.todoList = state.todoList.filter(item => item.id !== id);
    },
    toggleModal(state) {
      state.isModalVisible = !state.isModalVisible;
    },
    setEdit(state, edit) {
      state.isEditing = edit;
    },
    addItem(state, item) {
      state.todoList.push(item);
    },
    changeItem(state, item) {
      state.todoList[state.todoList.indexOf(state.todoList.find(stateItem => stateItem.id === item.id))] = item;
    }
  }
})
