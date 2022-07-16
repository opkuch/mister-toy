import axios from 'axios'
const BASE_URL =
  process.env.NODE_ENV !== 'development'
    ? '/api/toy/'
    : '//localhost:3030/api/toy/'
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
}

async function query(
  filterBy = {
    txt: '',
    sort: {
      by: '',
      direction: true
    }
  }
) {
  try {
    const res = await instance.get(BASE_URL, { params: filterBy })
    return res.data
  } catch (err) {
    console.log('cannot get toys', err)
  }
}

async function getById(toyId) {
  try {
    const res = await instance.get(BASE_URL + toyId)
    return res.data
  } catch (err) {
    console.log('cannot get toy', err)
  }
}

async function remove(toyId) {
  try {
    await instance.delete(BASE_URL + toyId)
  } catch (err) {
    console.log('cannot remove toy', err)
  }
}

async function save(toy) {
  try {
    let res
    if (toy._id) {
      res = await instance.put(BASE_URL + toy._id, toy)
      return res.data
    } else {
      res = await instance.post(BASE_URL, toy)
      console.log(res)
      return res.data
    }
  } catch (err) {
    console.log('cannot add/update toy', err)
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
