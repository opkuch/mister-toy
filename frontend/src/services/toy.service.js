import { storageService } from './async-storage.service.js'
import { utilService } from './util-service.js'
import axios from 'axios'

const TOY_KEY = 'toysDB'
const labels = [
  'On wheels',
  'Box game',
  'Art',
  'Baby',
  'Doll',
  'Puzzle',
  'Outdoor',
]
const API = '//localhost:3030/api/toy/'

export const toyService = {
  query,
  getById,
  remove,
  save,
  getEmptyToy,
  getLabels,
}

// _createToys()

function query(filterBy) {
   return axios.get(API, { params: filterBy }).then((res) => res.data)
}

function getById(toyId) {
  return axios.get(API + toyId).then((res) => res.data);
  // return storageService.get(TOY_KEY, id).then((toy) => {
  //   toy.reviews = [
  //     'Recommended to all! my kid is super happy with this toy',
  //     'Liked it alot! a little fragile but works good for me',
  //   ]
  //   return toy
  // })
}

function remove(toyId) {
    return axios.delete(API + toyId).then((res) => res.data);
  // return storageService.remove(TOY_KEY, id)
}

function save(toy) {
  console.log(toy);
   if (toy._id) {
    return axios.put(API + toy._id, toy).then((res) => res.data);
  } else {
    return axios.post(API, toy).then((res) => res.data);
  }
  return todo._id
    ? storageService.put(TOY_KEY, todo)
    : storageService.post(TOY_KEY, todo)
}

function getEmptyToy() {
  return {
    name: '',
    price: null,
    labels: [],
    createdAt: Date.now(),
    inStock: true,
  }
}

function getLabels() {
  return labels
}

function _createToys() {
  var toys = JSON.parse(localStorage.getItem(TOY_KEY))
  if (!toys || !toys.length) {
    toys = [
      _createToy('Ferarri plastic car', 70, ['Doll', 'Baby']),
      _createToy('Talking Doll', 40, ['On wheels', 'Outdoor']),
    ]
    localStorage.setItem(TOY_KEY, JSON.stringify(toys))
  }
  return toys
}

function _createToy(name, price, labels) {
  return {
    _id: utilService.makeId(),
    name,
    price,
    labels,
    createdAt: 1631031801011,
    inStock: true,
  }
}
