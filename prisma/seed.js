import { PrismaClient } from '@prisma/client'
import bookData from '../data/books.json' with { type: 'json' }
import userData from '../data/users.json' with { type: 'json' }
import orderData from '../data/orders.json' with { type: 'json' }
import recordData from '../data/records.json' with { type: 'json' }




const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })


async function main () {
  const { books } = bookData
  const { users } = userData
  const { orders } = orderData;


  for (const book of books) {
    await prisma.book.upsert({
      where: { id: book.id },
      update: {},
      create: book
    })
  }

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user
    })
  }

  // First destructure recordData
const { records } = recordData;

// Then loop through records
for (const record of records) {
  await prisma.record.upsert({
    where: { id: record.id },
    update: {},
    create: record
  })
}

  
  for (const order of orders) {
    await prisma.order.upsert({
      where: { id: order.id },
      update: {},
      create: order
    })
  }  

  
}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

