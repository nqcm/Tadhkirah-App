export default {
  setUser(state, userId) {
    state.userId = userId;
  },
  logout(state) {
    state.userId = null;
  }
};
