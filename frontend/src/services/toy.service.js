import {storageService} from './async-storage.service.js'
import {utilService} from './util-service.js'

const KEY = 'toysDB'

export const toyService = {
    query,
    getById,
    remove,
    save,
}

_createToys()

function query() {
    return storageService.query(KEY)
}

function getById(id) {
    return storageService.get(KEY, id)
}

function remove(id) {
    return storageService.remove(KEY, id)
}

function save(todo) {
    return (todo._id) ? storageService.put(KEY, todo) : storageService.post(KEY, todo)
}

// function getEmptyToy() {
//     return {
//         _id: '',
//         txt: '',
//         isDone,
//         isMarked
//     }
// }


function _createToys() {
    var toys = JSON.parse(localStorage.getItem(KEY))
    if (!toys || !toys.length) {
        toys = [_createToy('Ferarri plastic car', 70, ['Doll', 'Baby']), _createToy('Talking Doll', 40, ['On wheels', 'Outdoor'])]
        localStorage.setItem(KEY, JSON.stringify(toys))
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
        inStock: true
    }
}
