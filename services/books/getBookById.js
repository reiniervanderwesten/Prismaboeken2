import bookData from '../../data/books.json' with { type: 'json' }

const getBookById = (id) => {
  return bookData.books.find((book) => book.id === id)
}

export default getBookById
