import cors from 'cors'
import 'dotenv/config'
import express, { Application, Response } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './config/db'
import router from './routes'
import swaggerDocs from './swagger'

const app: Application = express()

const main = async () => {
  try {
    // start DB
    await dbConnection(process.env.MONGO_URI as string)
    // middlewares
    app.use(express.json())
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
  } catch (err) {
    process.exit(1)
  }
}

void main()
