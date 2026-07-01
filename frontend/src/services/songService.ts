import axios from 'axios'
import { Song, CreateSongDTO, UpdateSongDTO, SongFilter, SongListResponse } from '../types/song'

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/songs`

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para agregar token JWT si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const songService = {
  // Obtener todas las canciones con filtros
  getAllSongs: async (filters?: SongFilter): Promise<SongListResponse> => {
    try {
      const response = await api.get<SongListResponse>('/', { params: filters })
      return response.data
    } catch (error) {
      console.error('Error fetching songs:', error)
      throw error
    }
  },

  // Obtener canción por ID
  getSongById: async (id: string): Promise<Song> => {
    try {
      const response = await api.get<Song>(`/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching song ${id}:`, error)
      throw error
    }
  },

  // Crear nueva canción
  createSong: async (data: CreateSongDTO): Promise<Song> => {
    try {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('artist', data.artist)
      formData.append('album', data.album || '')
      formData.append('lyrics', data.lyrics)
      formData.append('chords', data.chords || '')
      formData.append('category', data.category)
      formData.append('tags', JSON.stringify(data.tags))
      formData.append('duration', String(data.duration || 0))
      formData.append('key', data.key || '')
      formData.append('tempo', String(data.tempo || 0))
      if (data.cover) {
        formData.append('cover', data.cover)
      }

      const response = await api.post<Song>('/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      console.error('Error creating song:', error)
      throw error
    }
  },

  // Actualizar canción
  updateSong: async (id: string, data: UpdateSongDTO): Promise<Song> => {
    try {
      const formData = new FormData()
      if (data.title) formData.append('title', data.title)
      if (data.artist) formData.append('artist', data.artist)
      if (data.album) formData.append('album', data.album)
      if (data.lyrics) formData.append('lyrics', data.lyrics)
      if (data.chords) formData.append('chords', data.chords)
      if (data.category) formData.append('category', data.category)
      if (data.tags) formData.append('tags', JSON.stringify(data.tags))
      if (data.duration) formData.append('duration', String(data.duration))
      if (data.key) formData.append('key', data.key)
      if (data.tempo) formData.append('tempo', String(data.tempo))
      if (data.cover) formData.append('cover', data.cover)

      const response = await api.patch<Song>(`/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      console.error(`Error updating song ${id}:`, error)
      throw error
    }
  },

  // Eliminar canción
  deleteSong: async (id: string): Promise<void> => {
    try {
      await api.delete(`/${id}`)
    } catch (error) {
      console.error(`Error deleting song ${id}:`, error)
      throw error
    }
  },

  // Buscar canciones
  searchSongs: async (query: string): Promise<Song[]> => {
    try {
      const response = await api.get<Song[]>('/search', { params: { q: query } })
      return response.data
    } catch (error) {
      console.error('Error searching songs:', error)
      throw error
    }
  },

  // Obtener canciones por categoría
  getSongsByCategory: async (category: string): Promise<Song[]> => {
    try {
      const response = await api.get<Song[]>('/category', { params: { category } })
      return response.data
    } catch (error) {
      console.error(`Error fetching songs by category ${category}:`, error)
      throw error
    }
  },

  // Obtener todas las etiquetas
  getAllTags: async (): Promise<string[]> => {
    try {
      const response = await api.get<string[]>('/tags')
      return response.data
    } catch (error) {
      console.error('Error fetching tags:', error)
      throw error
    }
  },
}

export default songService
