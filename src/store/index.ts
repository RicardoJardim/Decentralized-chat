import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      username: "",
    };
  },
  getters: {
    getUsername(state: { username: string }) {
      return state.username;
    },
  },
  mutations: {
    setUsername(state: { username: string }, name: string): void {
      state.username = name;
    },
  },
});

export default store;
