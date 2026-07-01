export interface CreateSongDTO {
  title: string
  artist: string
  album?: string
  lyrics: string
  chords?: string
  category: string
  tags: string[]
  duration?: number
  key?: string
  tempo?: number
  cover?: string
}

export interface UpdateSongDTO {
  title?: string
  artist?: string
  album?: string
  lyrics?: string
  chords?: string
  category?: string
  tags?: string[]
  duration?: number
  key?: string
  tempo?: number
  cover?: string
}

export interface SongFilter {
  category?: string
  tags?: string[]
  search?: string
  sortBy?: 'title' | 'artist' | 'createdAt' | 'updatedAt'
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}
