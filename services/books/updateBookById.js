import { PrismaClient } from '@prisma/client'


const updateBookById = async (id, title, author, isbn, pages, available, genre) => {
  const prisma = new PrismaClient()
  const updatedBook = await prisma.book.updateMany({
    where: {
      id
    },
    data: {
      title,
      author,
      isbn,
      pages,
      available,
      genre
    }
  })

  

  return {
    message: `Book with id ${id} was updated!`
  }
}

export default updateBookById

