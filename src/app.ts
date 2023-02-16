import cors from 'cors'
import 'dotenv/config'
import express, { Application, Response } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './config/db'
import router from './routes'
import swaggerDocs from './swagger'
;(async () => {
  dbConnection(process.env.MONGO_URI as string)
})()

const app: Application = express()

// start DB
// middlewares
app.use(express.json({ limit: '1mb' }))
app.use(helmet())
app.use(cors({ origin: '*' }))
process.env.NODE_ENV === 'development' && app.use(morgan('dev'))
// routes
app.use('/api/v1/', router)

app.listen(process.env.PORT, () => {
  console.log(`server started on http://localhost:${process.env.PORT}`)
  swaggerDocs(app, Number(process.env.PORT))
  // Not found routes
  app.use((_, res: Response) => {
    res.status(404).json({
      status: 404,
      success: false,
      message: "Route doesn't exist. 😢",
    })
  })
})

export default app
