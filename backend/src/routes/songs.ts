import express, { Router, Request, Response } from 'express'
import { songService } from '../services/songService'
import { authMiddleware } from '../middleware/auth'
import { asyncHandler } from '../middleware/error'
import multer from 'multer'

const router: Router = express.Router()
const upload = multer({ dest: 'uploads/covers' })

// Aplicar middleware de autenticación a todas las rutas
router.use(authMiddleware)

// GET - Obtener todas las canciones
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { category, tags, search, sortBy, sortOrder, page, limit } = req.query

    const filters = {
      category: category as string,
      tags: tags ? (Array.isArray(tags) ? tags : [tags]) : [],
      search: search as string,
      sortBy: (sortBy as 'title' | 'artist' | 'createdAt' | 'updatedAt') || 'title',
      sortOrder: (sortOrder as 'asc' | 'desc') || 'asc',
      page: page ? parseInt(page as string) : 1,
      limit: limit ? parseInt(limit as string) : 20,
    }

    const { songs, total } = await songService.getAllSongs(req.userId!, filters)

    const totalPages = Math.ceil(total / filters.limit)

    res.json({
      success: true,
      data: songs,
      total,
      page: filters.page,
      limit: filters.limit,
      totalPages,
    })
  })
)

// GET - Obtener canción por ID
router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    const song = await songService.getSongById(id, req.userId!)

    if (!song) {
      return res.status(404).json({ success: false, error: 'Song not found' })
    }

    res.json({ success: true, data: song })
  })
)

// POST - Crear canción
router.post(
  '/',
  upload.single('cover'),
  asyncHandler(async (req: Request, res: Response) => {
    const {
      title,
      artist,
      album,
      lyrics,
      chords,
      category,
      tags,
      duration,
      key,
      tempo,
    } = req.body

    if (!title || !artist || !lyrics) {
      return res.status(400).json({
        success: false,
        error: 'Title, artist, and lyrics are required',
      })
    }

    const parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags

    const song = await songService.createSong(req.userId!, {
      title,
      artist,
      album,
      lyrics,
      chords,
      category: category || 'other',
      tags: parsedTags || [],
      duration: duration ? parseInt(duration) : undefined,
      key,
      tempo: tempo ? parseInt(tempo) : undefined,
      cover: req.file?.path || undefined,
    })

    res.status(201).json({ success: true, data: song })
  })
)

// PATCH - Actualizar canción
router.patch(
  '/:id',
  upload.single('cover'),
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    const {
      title,
      artist,
      album,
      lyrics,
      chords,
      category,
      tags,
      duration,
      key,
      tempo,
    } = req.body

    const parsedTags = tags
      ? typeof tags === 'string'
        ? JSON.parse(tags)
        : tags
      : undefined

    const updateData: any = {}
    if (title) updateData.title = title
    if (artist) updateData.artist = artist
    if (album !== undefined) updateData.album = album
    if (lyrics) updateData.lyrics = lyrics
    if (chords !== undefined) updateData.chords = chords
    if (category) updateData.category = category
    if (parsedTags) updateData.tags = parsedTags
    if (duration) updateData.duration = parseInt(duration)
    if (key !== undefined) updateData.key = key
    if (tempo) updateData.tempo = parseInt(tempo)
    if (req.file?.path) updateData.cover = req.file.path

    const song = await songService.updateSong(id, req.userId!, updateData)

    if (!song) {
      return res.status(404).json({ success: false, error: 'Song not found' })
    }

    res.json({ success: true, data: song })
  })
)

// DELETE - Eliminar canción
router.delete(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    const deleted = await songService.deleteSong(id, req.userId!)

    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Song not found' })
    }

    res.json({ success: true, message: 'Song deleted successfully' })
  })
)

// GET - Buscar canciones
router.get(
  '/search',
  asyncHandler(async (req: Request, res: Response) => {
    const { q } = req.query

    if (!q || typeof q !== 'string') {
      return res.status(400).json({ success: false, error: 'Search query required' })
    }

    const songs = await songService.searchSongs(req.userId!, q)
    res.json({ success: true, data: songs })
  })
)

// GET - Obtener todas las etiquetas
router.get(
  '/tags',
  asyncHandler(async (req: Request, res: Response) => {
    const tags = await songService.getAllTags(req.userId!)
    res.json({ success: true, data: tags })
  })
)

export default router
