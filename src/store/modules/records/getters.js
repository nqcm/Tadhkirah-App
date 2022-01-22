import { DateTime } from 'luxon'

const today = DateTime.now()
const now = today.toISO().split('T')[0]

export default {
  records(state) {
    // return state.records;
    return state.records.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    )
  },
  hasRecords(state) {
    return state.records && state.records.length > 0
  },
  todaysRecords(_, getters) {
    const allRecs = getters.records
    const recs = allRecs.filter(rec => DateTime.fromISO(rec.dueDate) <= today)
    return recs
  },
  todayHasRecords(_, getters) {
    const recs = getters.todaysRecords
    return recs && recs.length > 0
  },
  doneRecords(_, getters) {
    const allRecs = getters.records
    const recs = allRecs.filter(rec => rec.doneDate === now)
    return recs
  },
  doneHasRecords(_, getters) {
    const recs = getters.doneRecords
    return recs && recs.length > 0
  }
  // shouldUpdate(state) {
  //   const lastFetch = state.lastFetch;
  //   if (!lastFetch) {
  //     return true;
  //   }
  //   const currentTimestamp = new Date().getTime();
  //   return (currentTimestamp - lastFetch) / 1000 > 900;
  // }
}
