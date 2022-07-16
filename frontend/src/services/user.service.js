import axios from 'axios'
export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  // getById,
  // getUsers,
  // removeUser
}

const STORAGE_KEY = 'toyUSER'

const BASE_URL =
  process.env.NODE_ENV !== 'development'
    ? '/api/auth/'
    : '//localhost:3030/api/auth/'

const instance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
})

async function login(credentials) {
  try {
    const res = await instance.post(BASE_URL + 'login', credentials)
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(res.data))
    return res.data
  } catch (err) {
    console.log('Cannot login', err)
  }
}

async function signup(signupInfo) {
  try {
    const res = await instance.post(BASE_URL + 'signup', signupInfo)
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(res.data))
    return res.data
  } catch(err) {
    console.log('cannot signup', err)
  }
}

async function logout() {
  try {
    const res = await instance.post(BASE_URL + 'logout')
    console.log(res.data)
    sessionStorage.removeItem(STORAGE_KEY)
    return res.data
  } catch(err) {
    console.log('cannot logout', err)
  }
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY))
}