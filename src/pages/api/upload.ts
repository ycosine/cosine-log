import { NextApiRequest, NextApiResponse } from 'next'
import { storageService } from 'src/libs/storage'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    if (!storageService.isEnabled()) {
      return res.status(400).json({ error: 'Storage service is not enabled' })
    }

    const { fileName, contentType } = req.body

    if (!fileName || !contentType) {
      return res.status(400).json({ error: 'fileName and contentType are required' })
    }

    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
    if (!allowedTypes.includes(contentType)) {
      return res.status(400).json({ error: 'Invalid file type. Only images are allowed.' })
    }

    // 获取预签名上传URL
    const result = await storageService.getUploadUrl(fileName, contentType)
    
    if (!result.success) {
      return res.status(500).json({ error: result.error || 'Failed to generate upload URL' })
    }

    res.status(200).json({
      success: true,
      uploadUrl: result.url,
      // @ts-ignore
      publicUrl: result.publicUrl,
    })
  } catch (error) {
    console.error('Upload API error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}