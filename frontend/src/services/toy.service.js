import axios from 'axios'
const labels = [
  'On wheels',
  'Box game',
  'Art',
  'Baby',
  'Doll',
  'Puzzle',
  'Outdoor',
]
const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/api/toy/' : '//localhost:3030/api/toy/';
const instance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
})

export const toyService = {
  query,
  getById,
  remove,
  save,
  getEmptyToy,
  getLabels,
}

function query(filterBy) {
   return instance.get(BASE_URL, { params: filterBy }).then((res) => res.data)
}

function getById(toyId) {
  return instance.get(BASE_URL + toyId).then((res) => res.data);
}

function remove(toyId) {
    return instance.delete(BASE_URL + toyId).then((res) => res.data);
}

function save(toy) {
   if (toy._id) {
    return instance.put(BASE_URL + toy._id, toy).then((res) => res.data);
  } else {
    return instance.post(BASE_URL, toy).then((res) => res.data);
  }
}

function getEmptyToy() {
  return {
    name: '',
    price: null,
    labels: [],
    createdAt: Date.now(),
    imgUrl: '',
    inStock: true,
  }
}

function getLabels() {
  return labels
}