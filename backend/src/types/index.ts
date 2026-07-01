// API Request/Response Types

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface AuthPayload {
  userId: string
  email: string
  role: string
}

export interface JwtPayload extends AuthPayload {
  iat: number
  exp: number
}
