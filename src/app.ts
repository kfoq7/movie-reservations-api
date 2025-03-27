import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { router } from './routes'
import { initDatabase } from './config/database'

const PORT = process.env.PORT ?? 8000

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api', router)

async function main() {
  await initDatabase()

  app.listen(PORT, () => {
    console.log(`Devoplment server is running on http://localhost:${PORT}`)
  })
}
main()
