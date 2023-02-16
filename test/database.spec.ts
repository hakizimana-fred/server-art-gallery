import 'dotenv/config'
import { connect, connection, set } from 'mongoose'
set('strictQuery', true)
// database connection tests
describe('Database connection', () => {
  beforeAll(async () => {
    await connect('mongodb://localhost/artgallery')
    await connection.db.dropDatabase()
  })

  it('Must connect to mongodb', async () => {
    const db = await connect('mongodb://localhost/artgallery')
    expect(db).toBeDefined()
  })

  afterAll(async () => {
    await connection.close()
  })
})
