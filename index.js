import express from 'express'
import booksRouter from './routes/books.js'
import recordsRouter from './routes/records.js'
import loginRouter from './routes/login.js'
import log from './middleware/logMiddleware.js'
import 'dotenv/config'
import errorHandler from './middleware/errorHandler.js'
import * as Sentry from '@sentry/node'
import { nodeProfilingIntegration } from '@sentry/profiling-node';



const app = express()
Sentry.init({
  dsn: 'https://7fa19397baaf433f919fbe02228d5470@o1137848.ingest.sentry.io/6625302',
  integratons: [nodeProfilingIntegration()],
  debug: true,
  tracesSampleRate: 1,
  profilesSampleRate: 1,
  
});

app.use(express.json())

app.use(log)

app.use('/books', booksRouter)
app.use('/records', recordsRouter)
app.use('/login', loginRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// The error handler must be before any other error middleware and after all controllers


app.use(errorHandler)

app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})