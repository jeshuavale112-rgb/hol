// Song Module Types

export interface Song {
  id: string
  title: string
  artist: string
  album?: string
  lyrics: string
  chords?: string
  category: SongCategory
  tags: string[]
  duration?: number // en segundos
  key?: string // Tonalidad (Do, Re, Mi, etc)
  tempo?: number // BPM
  createdAt: Date
  updatedAt: Date
  cover?: string // URL o base64 de portada
}

export enum SongCategory {
  HYMN = 'hymn',
  PRAISE = 'praise',
  WORSHIP = 'worship',
  CHILDREN = 'children',
  CHRISTMAS = 'christmas',
  EASTER = 'easter',
  SPECIAL = 'special',
  OTHER = 'other',
}

export interface CreateSongDTO {
  title: string
  artist: string
  album?: string
  lyrics: string
  chords?: string
  category: SongCategory
  tags: string[]
  duration?: number
  key?: string
  tempo?: number
  cover?: File
}

export interface UpdateSongDTO {
  title?: string
  artist?: string
  album?: string
  lyrics?: string
  chords?: string
  category?: SongCategory
  tags?: string[]
  duration?: number
  key?: string
  tempo?: number
  cover?: File
}

export interface SongFilter {
  category?: SongCategory
  tags?: string[]
  search?: string
  sortBy?: 'title' | 'artist' | 'createdAt' | 'updatedAt'
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export interface SongListResponse {
  data: Song[]
  total: number
  page: number
  limit: number
  totalPages: number
}
