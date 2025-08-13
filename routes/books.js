import express from 'express'
import { Router } from 'express'
import getBooks from '../services/books/getBooks.js'
import createBook from '../services/books/createBook.js'
import getBookById from '../services/books/getBookById.js'
import updateBookById from '../services/books/updateBookById.js'
import deleteBook from '../services/books/deleteBook.js'

import authMiddleware from '../middleware/advancedAuth.js'



const router = express.Router()

router.get('/', async (req, res) => {
  const { genre, available } = req.query
  const books = await getBooks(genre, available)
  res.status(200).json(books)
})


router.post('/', authMiddleware, (req, res) => {
  //try {
    const { title, author, isbn, pages, available, genre } = req.body
    const newBook = createBook(title, author, isbn, pages, available, genre)
    res.status(201).json(newBook)
  //} catch (error) {
    //console.error(error)
    //res.status(500).send('Something went wrong while creating new book!')
  //}
})

router.get(
  '/:id',
  async (req, res, next) => {
    
      const { id } = req.params
      const book = await getBookById(id)

      res.status(200).json(book)
    
  },
  
)

router.put('/:id', authMiddleware, (req, res) => {
  try {
    const { id } = req.params
    const { title, author, isbn, pages, available, genre } = req.body
    const updatedBook = updateBookById(
      id,
      title,
      author,
      isbn,
      pages,
      available,
      genre
    )
    res.status(200).json(updatedBook)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong while updating book by id!')
  }
})

router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const { id } = req.params
    const deletedBookId = deleteBook(id)

    if (!deletedBookId) {
      res.status(404).send(`Book with id ${id} was not found!`)
    } else {
      res.status(200).json({
        message: `Book with id ${deletedBookId} was deleted!`
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong while deleting book by id!')
  }
})

export default router
