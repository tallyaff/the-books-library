import axios from 'axios';
import uniqid from 'uniqid'

const APP_KEY = 'AIzaSyCtsRwDXhLjdMOhIjGgh1hHpGz7cU8BDiI'


let books = [];

function loadBooks() {
    return books;
}

function getBooks() {
    if (books.length > 0) {
        return new Promise((resolve, reject) => {
            resolve(books)
        })
    } else {

        return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=intitle&key=${APP_KEY}`)
            .then(({ data }) => {
                books = data.items;

                return books.filter(book => book.volumeInfo.imageLinks)


            })

    }

}

function getBookById(id) {
    return new Promise((resolve, reject) => {
        const book = books.find(book => book.id === id)
        book ? resolve(JSON.parse(JSON.stringify(book))) : reject(`Book id ${id} not found!`)
    })
}



function deleteBook(id) {
    return new Promise((resolve, reject) => {
        const index = books.findIndex(book => book.id === id)
        if (index !== -1) {
            books.splice(index, 1)

        }

        resolve()
    })

}
function saveBook(book) {
    return book.id ? _updateBook(book) : _addBook(book)
}

function _updateBook(book) {
    return new Promise((resolve, reject) => {
        const index = books.findIndex(b => book.id === b.id)
        if (index !== -1) {
            books[index] = book
        }

        resolve(book)
    })
}

function _addBook(book) {
    return new Promise((resolve, reject) => {
        book.id = uniqid()
        book.volumeInfo.imageLinks.thumbnail = "http://books.google.com/books/content?id=GqTwl7-WZtUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        books.unshift(book)
        resolve(book)
    })
}


function isExistTitle(title) {
    const titleExist = books.filter(book => getTitleFormat(book.volumeInfo.title) === getTitleFormat(title))
    if (titleExist.length > 0) {
        return true
    } else {
        return false
    }
}

function getTitleFormat(title) {
    const regex = new RegExp('^[A-Za-z0-9 -]*$');
    return title = title.split('')
        .filter((char => char.match(regex)))
        .join('')
        .toLowerCase().split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

};


export default {
    getBooks,
    deleteBook,
    saveBook,
    getBookById,
    loadBooks,
    isExistTitle,
    getTitleFormat
} 