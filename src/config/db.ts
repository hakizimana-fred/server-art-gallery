import { connect, set } from 'mongoose'
set('strictQuery', true)

export const dbConnection = async (url: string) => {
  try {
    await connect(url)
    console.log('DB connected successfully!')
  } catch (err) {
    process.exit(1)
  }
}
