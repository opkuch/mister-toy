import { toyService } from '../../services/toy.service.js'

export default {
  state: {
    toys: [],
    filterBy: 'all',
  },
  mutations: {
    setToys(state, { toys }) {
      state.toys = toys
    },
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy
    },
    addToy(state, { toy }) {
      state.toys.push(toy)
    },
    updateToy(state, { toy }) {
      const idx = state.toys.findIndex((currToy) => currToy._id === toy._id)
      state.toys.splice(idx, 1, toy)
    },
    removeToy(state, { toyId }) {
      const idx = state.toys.findIndex((toy) => toy._id === toyId)
      state.toys.splice(idx, 1)
    },
  },
  getters: {
    toysForDisplay({ toys, filterBy }) {
      switch (filterBy) {
        case 'all':
          return JSON.parse(JSON.stringify(toys))
      }
    },
    getLabels({ labels }) {
      return JSON.parse(JSON.stringify(labels))
    },
  },
  actions: {
    loadToys({ commit }) {
      toyService.query().then((toys) => {
        commit({ type: 'setToys', toys })
      })
    },
    saveToy({ commit }, { toy }) {
      console.log(toy);
      const actionType = toy._id ? 'updateToy' : 'addToy'
      return toyService.save(toy).then((savedToy) => {
        commit({ type: actionType, toy: savedToy })
      })
    },
    removeToy({ commit }, { toyId }) {
      return toyService.remove(toyId).then(() => {
        commit({ type: 'removeToy', toyId })
      })
    },
    setFilterBy({commit}, {filterBy}) {
      return toyService.query(filterBy).then((toys => {
        commit({type: 'setToys', toys})
      }))
    }
  },
}
