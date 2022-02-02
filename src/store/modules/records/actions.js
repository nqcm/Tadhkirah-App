import { DateTime } from 'luxon'

import {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc
} from 'firebase/firestore/lite'

import calculateDueDate from '../../../utilities/calculateDueDate'

const dateWithTime = DateTime.now().toISO()

const now = dateWithTime.split('T')[0]

export default {
  async loadRecords(context) {
    const userId = context.rootGetters.userId
    const db = getFirestore()
    const querySnapshot = await getDocs(
      collection(db, 'users', userId, 'records')
    )
    const records = []
    querySnapshot.forEach(doc => {
      const data = doc.data()
      const record = {
        id: doc.id,
        name: data.name,
        level: data.level,
        description: data.description,
        revDate: data.revDate,
        doneDate: data.doneDate,
        dueDate: data.dueDate,
        counter: data.counter,
        dateAdded: data.dateAdded
      }
      records.push(record)
    })

    context.commit('loadRecords', records)
  },

  async addRecord(context, data) {
    const dueDate = calculateDueDate(data.level, now)
    const userId = context.rootGetters.userId
    const db = getFirestore()

    const recordData = {
      name: data.name,
      level: data.level,
      description: data.description,
      revDate: now,
      doneDate: dateWithTime,
      dueDate: dueDate,
      counter: 0,
      dateAdded: now
    }
    const docRef = await addDoc(
      collection(db, 'users', userId, 'records'),
      recordData
    )
    context.commit('addRecord', {
      ...recordData,
      id: docRef.id
    })
  },

  async editRecord(context, data) {
    const dueDate = calculateDueDate(data.level, data.revDate)
    const userId = context.rootGetters.userId
    const recId = data.id
    const db = getFirestore()

    const recordData = {
      name: data.name,
      level: data.level,
      description: data.description,
      revDate: data.revDate,
      doneDate: data.doneDate,
      dueDate: dueDate,
      counter: data.counter,
      dateAdded: data.dateAdded
    }

    const docRef = doc(db, `users/${userId}/records`, recId)
    await setDoc(docRef, recordData, { merge: true })
    context.commit('editRecord', {
      ...recordData,
      id: data.id
    })
  },

  async makeLevelOne(context, id) {
    const userId = context.rootGetters.userId
    const rec = context.getters.records.find(r => r.id === id)
    const dueDate = calculateDueDate(1, now)
    const db = getFirestore()

    const recordData = {
      name: rec.name,
      level: 1,
      description: rec.description,
      revDate: now,
      doneDate: dateWithTime,
      dueDate: dueDate,
      counter: rec.counter + 1,
      dateAdded: rec.dateAdded
    }
    const docRef = doc(db, `users/${userId}/records`, id)
    await setDoc(docRef, recordData, { merge: true })

    context.commit('editRecord', {
      ...recordData,
      id: id
    })
  },

  async markRecDone(context, id) {
    const userId = context.rootGetters.userId
    const rec = context.getters.records.find(r => r.id === id)
    const dueDate = calculateDueDate(rec.level, now)
    const newLevel = rec.level < 5 ? rec.level + 1 : 5
    const db = getFirestore()

    const recordData = {
      name: rec.name,
      level: newLevel,
      description: rec.description,
      revDate: now,
      doneDate: dateWithTime,
      dueDate: dueDate,
      counter: rec.counter + 1,
      dateAdded: rec.dateAdded
    }
    const docRef = doc(db, `users/${userId}/records`, id)
    await setDoc(docRef, recordData, { merge: true })

    context.commit('editRecord', {
      ...recordData,
      id: id
    })
  },

  async deleteRecord(context, id) {
    const userId = context.rootGetters.userId
    const db = getFirestore()
    const docRef = doc(db, `users/${userId}/records`, id)
    await deleteDoc(docRef)
    context.commit('deleteRecord', id)
  }
}
