import { toyService } from '../../services/toy.service.js'

export default {
  state: {
    toys: [],
    labels: [
      'On wheels',
      'Box game',
      'Art',
      'Baby',
      'Doll',
      'Puzzle',
      'Outdoor',
    ]
  },
  getters: {
    toysForDisplay({ toys }) {
      return JSON.parse(JSON.stringify(toys))
    },
    getLabels({ labels }) {
      return JSON.parse(JSON.stringify(labels))
    },
    toyStockCount({toys}) {
      if (!toys) return
      let toysPerStock = []
      toysPerStock.push(toys.filter(toy => toy.inStock).length)
      toysPerStock.push(toys.filter(toy => !toy.inStock).length)
      console.log(toys.filter(toy => !toy.inStock).length)
    },
    getLabelsCount({ toys }) {
      if (!toys) return
      let labelsCountTmp = {}
      let labelsCount = {}
      toys.forEach((toy) => {
        toy.labels.forEach((label) => {
          if (!labelsCountTmp[label]) {
            labelsCountTmp[label] = {'sumPrice': 0, 'toyCount': 0}
          }
          labelsCountTmp[label]['sumPrice'] += +toy.price
          labelsCountTmp[label]['toyCount'] += 1
        })
        console.log(labelsCountTmp)
      })
      for (var label in labelsCountTmp) {
        labelsCount[label] = labelsCountTmp[label]['sumPrice'] / labelsCountTmp[label]['toyCount']
      }
      console.log(labelsCount)
      return labelsCount
    },

  },
  mutations: {
    setToys(state, { toys }) {
      state.toys = toys
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
  actions: {
    async loadToys({ commit }) {
      try {
        var toys = await toyService.query()
        commit({ type: 'setToys', toys })
        return toys
      } catch (err) {
        console.log('couldnt get toys for display', err)
      }
    },
    async saveToy({ commit }, { toy }) {
      const actionType = toy._id ? 'updateToy' : 'addToy'
      try {
        var savedToyId = await toyService.save(toy)
        var savedToy = await toyService.getById(savedToyId)
        commit({ type: actionType, toy: savedToy })
        return savedToy
      } catch (err) {
        console.log('couldnt save/update toy', err)
      }
    },
    async removeToy({ commit }, { toyId }) {
      try {
        await toyService.remove(toyId)
        commit({ type: 'removeToy', toyId })
      } catch (err) {
        console.log('couldnt remove toy', err)
      }
    },
    async setFilterBy({ commit }, { filterBy }) {
      try {
        var toys = await toyService.query(filterBy)
        commit({ type: 'setToys', toys })
        return toys
      } catch (err) {
        console.log('couldnt get toys', err)
      }
    },
  },
}
