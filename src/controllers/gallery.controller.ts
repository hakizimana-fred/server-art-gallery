import { Request, Response } from 'express'
import { galleryService } from '../services/moment.service'

export const galleryController = {
  async saveMoment(req: Request, res: Response) {
    try {
      const userGallery = await galleryService.createMoment(req.body, req.user)
      return res.status(201).json({
        success: true,
        messge: 'Created moment',
        data: {
          moment: userGallery,
        },
      })
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message })
    }
  },
  async getMoments(_req: Request, res: Response) {
    try {
      const moments = await galleryService.fetchMoments()

      return res.status(201).json({
        success: true,
        messge: 'Fetched moments',
        data: {
          moments,
        },
      })
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message })
    }
  },
}
