import { createStore } from "vuex";

interface Store {
  username: string;
}

const store = createStore({
  state(): Store {
    return {
      username: "",
    };
  },
  getters: {
    getUsername(state: Store): string {
      return state.username;
    },
    checkAuth(state: Store): boolean {
      return state.username != "" ? true : false;
    },
  },
  mutations: {
    setUsername(state: Store, name: string): void {
      state.username = name;
    },
  },
});

export default store;
