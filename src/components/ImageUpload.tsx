import React, { useState, useRef } from 'react'
import styled from '@emotion/styled'
import { BiCloudUpload, BiImage, BiX } from 'react-icons/bi'

interface ImageUploadProps {
  onUpload: (url: string) => void
  onError?: (error: string) => void
  accept?: string
  maxSize?: number // MB
  className?: string
}

interface UploadResponse {
  success: boolean
  uploadUrl?: string
  publicUrl?: string
  error?: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onUpload,
  onError,
  accept = 'image/*',
  maxSize = 10,
  className
}) => {
  const [isUploading, setIsUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (file.size > maxSize * 1024 * 1024) {
      onError?.(`文件大小不能超过 ${maxSize}MB`)
      return
    }

    if (!file.type.startsWith('image/')) {
      onError?.('只支持上传图片文件')
      return
    }

    uploadFile(file)
  }

  const uploadFile = async (file: File) => {
    setIsUploading(true)
    setPreview(URL.createObjectURL(file))

    try {
      // 1. 获取预签名上传URL
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
        }),
      })

      const uploadData: UploadResponse = await uploadResponse.json()

      if (!uploadData.success || !uploadData.uploadUrl) {
        throw new Error(uploadData.error || '获取上传地址失败')
      }

      // 2. 直接上传到R2
      const uploadResult = await fetch(uploadData.uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      })

      if (!uploadResult.ok) {
        throw new Error('文件上传失败')
      }

      // 3. 返回公共URL
      if (uploadData.publicUrl) {
        onUpload(uploadData.publicUrl)
      } else {
        throw new Error('无法获取文件公共地址')
      }
    } catch (error) {
      console.error('Upload error:', error)
      onError?.(error instanceof Error ? error.message : '上传失败')
      setPreview(null)
    } finally {
      setIsUploading(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const clearPreview = () => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Container className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />
      
      {preview ? (
        <PreviewContainer>
          <PreviewImage src={preview} alt="Preview" />
          <PreviewOverlay>
            <ClearButton onClick={clearPreview}>
              <BiX />
            </ClearButton>
          </PreviewOverlay>
          {isUploading && <UploadingOverlay>上传中...</UploadingOverlay>}
        </PreviewContainer>
      ) : (
        <DropZone
          dragOver={dragOver}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          <UploadIcon>
            {isUploading ? (
              <LoadingSpinner />
            ) : (
              <BiCloudUpload />
            )}
          </UploadIcon>
          <UploadText>
            {isUploading ? '上传中...' : '点击或拖拽图片到此处'}
          </UploadText>
          <UploadHint>
            支持 JPG、PNG、GIF、WebP、SVG 格式，最大 {maxSize}MB
          </UploadHint>
        </DropZone>
      )}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  max-width: 400px;
`

const DropZone = styled.div<{ dragOver: boolean; disabled: boolean }>`
  border: 2px dashed ${props => props.dragOver ? '#4dabf7' : '#e9ecef'};
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  background: ${props => props.dragOver ? 'rgba(77, 171, 247, 0.05)' : 'transparent'};
  
  &:hover {
    border-color: ${props => props.disabled ? '#e9ecef' : '#4dabf7'};
    background: ${props => props.disabled ? 'transparent' : 'rgba(77, 171, 247, 0.05)'};
  }
`

const UploadIcon = styled.div`
  font-size: 3rem;
  color: #adb5bd;
  margin-bottom: 1rem;
  
  svg {
    display: block;
    margin: 0 auto;
  }
`

const LoadingSpinner = styled.div`
  width: 3rem;
  height: 3rem;
  border: 3px solid #e9ecef;
  border-top: 3px solid #4dabf7;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const UploadText = styled.div`
  font-size: 1rem;
  color: #495057;
  margin-bottom: 0.5rem;
  font-weight: 500;
`

const UploadHint = styled.div`
  font-size: 0.875rem;
  color: #adb5bd;
`

const PreviewContainer = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

const PreviewImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: cover;
  display: block;
`

const PreviewOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5rem;
`

const ClearButton = styled.button`
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
  
  svg {
    font-size: 1.25rem;
  }
`

const UploadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 500;
`

export default ImageUpload