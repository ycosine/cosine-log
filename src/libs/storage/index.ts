import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { CONFIG } from '../../../site.config.js'

export interface StorageConfig {
  enable: boolean
  type: 'r2' | 'oss'
  r2: {
    accountId: string
    accessKeyId: string
    secretAccessKey: string
    bucket: string
    publicUrl: string
  }
  oss: {
    region: string
    accessKeyId: string
    accessKeySecret: string
    bucket: string
    baseUrl: string
  }
}

export interface UploadResult {
  success: boolean
  url?: string
  error?: string
}

class StorageService {
  private r2Client?: S3Client
  private config: StorageConfig

  constructor() {
    this.config = CONFIG.storageConfig as StorageConfig
    
    if (this.config.enable && this.config.type === 'r2') {
      this.initR2Client()
    }
  }

  private initR2Client() {
    if (!this.config.r2.accountId || !this.config.r2.accessKeyId || !this.config.r2.secretAccessKey) {
      console.warn('R2 configuration is incomplete')
      return
    }

    this.r2Client = new S3Client({
      region: 'auto',
      endpoint: `https://${this.config.r2.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: this.config.r2.accessKeyId,
        secretAccessKey: this.config.r2.secretAccessKey,
      },
    })
  }

  async uploadFile(file: File, path?: string): Promise<UploadResult> {
    if (!this.config.enable) {
      return { success: false, error: 'Storage is not enabled' }
    }

    if (this.config.type === 'r2') {
      return this.uploadToR2(file, path)
    } else if (this.config.type === 'oss') {
      return this.uploadToOSS(file, path)
    }

    return { success: false, error: 'Unsupported storage type' }
  }

  private async uploadToR2(file: File, path?: string): Promise<UploadResult> {
    if (!this.r2Client) {
      return { success: false, error: 'R2 client not initialized' }
    }

    try {
      const fileName = path || `${Date.now()}-${file.name}`
      const key = `images/${fileName}`
      
      const buffer = await file.arrayBuffer()
      
      const command = new PutObjectCommand({
        Bucket: this.config.r2.bucket,
        Key: key,
        Body: new Uint8Array(buffer),
        ContentType: file.type,
      })

      await this.r2Client.send(command)
      
      const url = `${this.config.r2.publicUrl}/${key}`
      return { success: true, url }
    } catch (error) {
      console.error('R2 upload error:', error)
      return { success: false, error: 'Failed to upload to R2' }
    }
  }

  private async uploadToOSS(file: File, path?: string): Promise<UploadResult> {
    // 保留OSS实现以向后兼容
    // 这里可以保持原有的OSS上传逻辑
    return { success: false, error: 'OSS upload not implemented in this version' }
  }

  async deleteFile(url: string): Promise<boolean> {
    if (!this.config.enable) {
      return false
    }

    if (this.config.type === 'r2') {
      return this.deleteFromR2(url)
    } else if (this.config.type === 'oss') {
      return this.deleteFromOSS(url)
    }

    return false
  }

  private async deleteFromR2(url: string): Promise<boolean> {
    if (!this.r2Client) {
      return false
    }

    try {
      const key = url.replace(`${this.config.r2.publicUrl}/`, '')
      
      const command = new DeleteObjectCommand({
        Bucket: this.config.r2.bucket,
        Key: key,
      })

      await this.r2Client.send(command)
      return true
    } catch (error) {
      console.error('R2 delete error:', error)
      return false
    }
  }

  private async deleteFromOSS(url: string): Promise<boolean> {
    // 保留OSS实现以向后兼容
    return false
  }

  async getUploadUrl(fileName: string, contentType: string): Promise<UploadResult> {
    if (!this.config.enable) {
      return { success: false, error: 'Storage is not enabled' }
    }

    if (this.config.type === 'r2') {
      return this.getR2UploadUrl(fileName, contentType)
    }

    return { success: false, error: 'Presigned URL not supported for this storage type' }
  }

  private async getR2UploadUrl(fileName: string, contentType: string): Promise<UploadResult> {
    if (!this.r2Client) {
      return { success: false, error: 'R2 client not initialized' }
    }

    try {
      const key = `images/${Date.now()}-${fileName}`
      
      const command = new PutObjectCommand({
        Bucket: this.config.r2.bucket,
        Key: key,
        ContentType: contentType,
      })

      const signedUrl = await getSignedUrl(this.r2Client, command, { expiresIn: 3600 })
      const publicUrl = `${this.config.r2.publicUrl}/${key}`

      return { 
        success: true, 
        url: signedUrl,
        // @ts-ignore - 添加公共URL供客户端使用
        publicUrl 
      }
    } catch (error) {
      console.error('R2 presigned URL error:', error)
      return { success: false, error: 'Failed to generate upload URL' }
    }
  }

  isEnabled(): boolean {
    return this.config.enable
  }

  getConfig(): StorageConfig {
    return this.config
  }
}

export const storageService = new StorageService()
export default storageService