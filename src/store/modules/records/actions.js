import { DateTime } from 'luxon';
// import { db } from '@/main';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc
} from 'firebase/firestore/lite';

import calculateDueDate from '../../../utilities/calculateDueDate';

const now = DateTime.now()
  .toISO()
  .split('T')[0];

export default {
  async loadRecords(context) {
    if (!context.getters.shouldUpdate) {
      return;
    }
    const userId = context.rootGetters.userId;

    const db = getFirestore();
    const querySnapshot = await getDocs(
      collection(db, `users/${userId}/records`)
    );
    const records = [];
    querySnapshot.forEach(doc => {
      const data = doc.data();
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
      };
      records.push(record);
    });
    // console.log(records1);

    // const response = await fetch(
    //   `https://tadhkirah-13575-default-rtdb.firebaseio.com/records/${userId}.json`
    // );
    // const responseData = await response.json();
    // if (!response.ok) {
    //   const error = new Error(responseData.message || 'Failed to fetch!');
    //   throw error;
    // }
    // const records = [];
    // for (const key in responseData) {
    //   const record = {
    //     id: key,
    //     name: responseData[key].name,
    //     level: responseData[key].level,
    //     description: responseData[key].description,
    //     revDate: responseData[key].revDate,
    //     doneDate: responseData[key].doneDate,
    //     dueDate: responseData[key].dueDate,
    //     counter: responseData[key].counter,
    //     dateAdded: responseData[key].dateAdded
    //   };
    //   console.log(records);
    //   records.push(record);
    // }
    context.commit('loadRecords', records);
    context.commit('setFetchTimestamp');
  },
  async addRecord(context, data) {
    const dueDate = calculateDueDate(data.level, now);
    const userId = context.rootGetters.userId;
    const db = getFirestore();

    const recordData = {
      name: data.name,
      level: data.level,
      description: data.description,
      revDate: now,
      doneDate: now,
      dueDate: dueDate,
      counter: 0,
      dateAdded: now
    };
    const docRef = await addDoc(
      collection(db, `users/${userId}/records`),
      recordData
    );
    // const response = await fetch(
    //   `https://tadhkirah-13575-default-rtdb.firebaseio.com/records/${userId}.json`,
    //   {
    //     method: 'POST',
    //     body: JSON.stringify(recordData)
    //   }
    // );
    // const responseData = await response.json();
    // if (!response.ok) {
    //   const error = new Error(responseData.message || 'Something went wrong!');
    //   throw error;
    // }
    context.commit('addRecord', {
      ...recordData,
      id: docRef.id
    });
  },
  async editRecord(context, data) {
    const dueDate = calculateDueDate(data.level, data.revDate);
    const userId = context.rootGetters.userId;
    const recId = data.id;
    const db = getFirestore();

    const recordData = {
      name: data.name,
      level: data.level,
      description: data.description,
      revDate: data.revDate,
      doneDate: data.doneDate,
      dueDate: dueDate,
      counter: data.counter,
      dateAdded: data.dateAdded
    };

    const docRef = doc(db, `users/${userId}/records`, recId);
    await setDoc(docRef, recordData, { merge: true });
    context.commit('editRecord', {
      ...recordData,
      id: data.id
    });
  },
  async makeLevelOne(context, id) {
    const userId = context.rootGetters.userId;
    const rec = context.getters.records.find(r => r.id === id);
    const dueDate = calculateDueDate(1, now);
    const db = getFirestore();

    const recordData = {
      name: rec.name,
      level: 1,
      description: rec.description,
      revDate: now,
      doneDate: now,
      dueDate: dueDate,
      counter: rec.counter + 1,
      dateAdded: rec.dateAdded
    };
    const docRef = doc(db, `users/${userId}/records`, id);
    await setDoc(docRef, recordData, { merge: true });

    context.commit('editRecord', {
      ...recordData,
      id: id
    });
  },
  async markRecDone(context, id) {
    const userId = context.rootGetters.userId;
    const rec = context.getters.records.find(r => r.id === id);
    const dueDate = calculateDueDate(rec.level, now);
    const newLevel = rec.level < 5 ? rec.level + 1 : 5;
    const db = getFirestore();

    const recordData = {
      name: rec.name,
      level: newLevel,
      description: rec.description,
      revDate: now,
      doneDate: now,
      dueDate: dueDate,
      counter: rec.counter + 1,
      dateAdded: rec.dateAdded
    };
    const docRef = doc(db, `users/${userId}/records`, id);
    await setDoc(docRef, recordData, { merge: true });

    context.commit('editRecord', {
      ...recordData,
      id: id
    });
  },
  async deleteRecord(context, id) {
    const userId = context.rootGetters.userId;
    const db = getFirestore();

    const docRef = doc(db, `users/${userId}/records`, id);
    await deleteDoc(docRef);

    context.commit('deleteRecord', id);
  }
};
