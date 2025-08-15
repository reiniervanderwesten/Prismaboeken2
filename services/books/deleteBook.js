import { PrismaClient } from '@prisma/client'


const deleteBook = async (id) => {
  const prisma = new PrismaClient()


  const deleteBook = await prisma.book.deleteMany({
    where: {
      id
    }
  })

  

  return id
}
export default deleteBook


