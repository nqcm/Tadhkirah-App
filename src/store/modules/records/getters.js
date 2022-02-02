import { DateTime } from 'luxon'

const today = DateTime.now()
const now = today.toISO().split('T')[0]

function dateComparison(a, b) {
  const d1 = DateTime.fromISO(a.doneDate)
  const d2 = DateTime.fromISO(b.doneDate)

  return d1 - d2
}

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
  doneRecords(state) {
    const allRecs = state.records
    const recs = allRecs.filter(rec => rec.doneDate.split('T')[0] === now)
    recs.sort(dateComparison).slice(Math.max(recs.length - 10, 0))
    return recs
  },
  doneHasRecords(_, getters) {
    const recs = getters.doneRecords
    return recs && recs.length > 0
  }
}
