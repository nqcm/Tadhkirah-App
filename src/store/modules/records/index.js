import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  state() {
    return {
      lastFetch: null,
      records: [
        {
          id: 123456789,
          name: 'Portion 1',
          level: 3,
          description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, unde.',
          revDate: '2021-10-25',
          dueDate: '2021-11-10',
          counter: 5,
          dateAdded: '2021-08-05'
        },
        {
          id: 123456788,
          name: 'Portion 2',
          level: 1,
          description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, unde.',
          revDate: '2021-10-25',
          dueDate: '2021-10-25',
          counter: 2,
          dateAdded: '2021-10-25'
        },
        {
          id: 123456787,
          name: 'Portion 3',
          level: 4,
          description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, unde.',
          revDate: '2021-10-02',
          dueDate: '2021-11-24',
          counter: 2,
          dateAdded: '2021-10-25'
        }
      ]
    };
  },
  mutations,
  actions,
  getters
};
