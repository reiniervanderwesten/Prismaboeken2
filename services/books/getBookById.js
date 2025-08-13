
import { PrismaClient } from '@prisma/client'

const getBookById = async (id) => {
  const prisma = new PrismaClient()
  const book = await prisma.book.findUnique({
    where: {
      id
    }
  })

  
  return book
}


export default getBookById    
