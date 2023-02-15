import Gallery, { IGallery } from '../models/Gallery'

export const galleryService = {
  async createMoment(input: IGallery, user: any) {
    try {
      console.log('...input', input)
      console.log('user', user)
      const newMoment = new Gallery({
        ...input,
        user: user.id,
      })
      await newMoment.save()
      return newMoment
    } catch (err) {
      throw new Error(err.message)
    }
  },
  async fetchMoments() {
    try {
      const moments = await Gallery.find({})
      return moments
    } catch (err) {
      throw new Error(err.message)
    }
  },
}
