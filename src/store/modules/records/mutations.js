export default {
  loadRecords(state, payload) {
    state.records = payload;
  },
  addRecord(state, payload) {
    state.records.push(payload);
  },
  editRecord(state, payload) {
    const recIndex = state.records.findIndex(rec => rec.id === payload.id);
    state.records[recIndex] = payload;
  },
  deleteRecord(state, id) {
    const recIndex = state.records.findIndex(rec => rec.id === id);
    state.records.splice(recIndex, 1);
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
