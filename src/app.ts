import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

const app = express()

const main = async () => {
  try {
    // middlewares
    app.use(express.json())
    app.use(helmet())
    process.env.NODE_ENV === 'development' && app.use(morgan('dev'))

    app.listen(process.env.PORT, () => {
      console.log(`server started on http://localhost:${process.env.PORT}`)
    })
  } catch (err) {
    process.exit(1)
  }
}

main().catch((err) => console.log(err))
