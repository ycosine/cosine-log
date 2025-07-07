export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? process.env.NEXT_PUBLIC_API_URL || 'https://your-domain.com'
  : 'http://localhost:6789'