import { NextApiRequest, NextApiResponse } from 'next'
import { storageService } from 'src/libs/storage'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { url } = req.body

    if (!url) {
      return res.status(400).json({ error: 'Image URL is required' })
    }

    if (!storageService.isEnabled()) {
      return res.status(400).json({ error: 'Storage service is not enabled' })
    }

    const success = await storageService.deleteFile(url)
    
    if (success) {
      res.status(200).json({ success: true, message: 'Image deleted successfully' })
    } else {
      res.status(500).json({ error: 'Failed to delete image' })
    }
  } catch (error) {
    console.error('Delete image API error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}