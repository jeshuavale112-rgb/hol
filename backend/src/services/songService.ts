import prisma from '../lib/prisma'
import { Song } from '@prisma/client'
import { CreateSongDTO, UpdateSongDTO, SongFilter } from '../types/song'

export const songService = {
  // Obtener todas las canciones con filtros
  getAllSongs: async (
    userId: string,
    filters?: SongFilter
  ): Promise<{ songs: Song[]; total: number }> => {
    const where: any = { userId }

    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { artist: { contains: filters.search, mode: 'insensitive' } },
        { album: { contains: filters.search, mode: 'insensitive' } },
      ]
    }

    if (filters?.category) {
      where.category = filters.category
    }

    if (filters?.tags && filters.tags.length > 0) {
      where.tags = { hasSome: filters.tags }
    }

    const total = await prisma.song.count({ where })

    const sortBy = filters?.sortBy || 'title'
    const sortOrder = filters?.sortOrder || 'asc'
    const page = filters?.page || 1
    const limit = filters?.limit || 20

    const songs = await prisma.song.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      take: limit,
      skip: (page - 1) * limit,
    })

    return { songs, total }
  },

  // Obtener canción por ID
  getSongById: async (id: string, userId: string): Promise<Song | null> => {
    return prisma.song.findFirst({
      where: { id, userId },
    })
  },

  // Crear canción
  createSong: async (userId: string, data: CreateSongDTO): Promise<Song> => {
    return prisma.song.create({
      data: {
        ...data,
        userId,
      },
    })
  },

  // Actualizar canción
  updateSong: async (
    id: string,
    userId: string,
    data: UpdateSongDTO
  ): Promise<Song | null> => {
    return prisma.song.updateMany({
      where: { id, userId },
      data,
    }).then(async () => {
      return prisma.song.findFirst({
        where: { id, userId },
      })
    })
  },

  // Eliminar canción
  deleteSong: async (id: string, userId: string): Promise<boolean> => {
    const result = await prisma.song.deleteMany({
      where: { id, userId },
    })
    return result.count > 0
  },

  // Buscar canciones
  searchSongs: async (userId: string, query: string): Promise<Song[]> => {
    return prisma.song.findMany({
      where: {
        userId,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { artist: { contains: query, mode: 'insensitive' } },
          { lyrics: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: 20,
    })
  },

  // Obtener todas las etiquetas únicas
  getAllTags: async (userId: string): Promise<string[]> => {
    const songs = await prisma.song.findMany({
      where: { userId },
      select: { tags: true },
    })

    const allTags = new Set<string>()
    songs.forEach((song) => {
      song.tags.forEach((tag) => allTags.add(tag))
    })

    return Array.from(allTags).sort()
  },
}
