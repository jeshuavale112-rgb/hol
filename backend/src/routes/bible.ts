import express, { Router, Request, Response } from 'express'
import prisma from '../lib/prisma'
import { asyncHandler } from '../middleware/error'

const router: Router = express.Router()

// GET - Buscar versículos
router.get(
  '/search',
  asyncHandler(async (req: Request, res: Response) => {
    const { q, language = 'es' } = req.query

    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Search query required',
      })
    }

    const verses = await prisma.bibleVerse.findMany({
      where: {
        language: language as string,
        OR: [
          { book: { contains: q as string, mode: 'insensitive' } },
          { text: { contains: q as string, mode: 'insensitive' } },
        ],
      },
      take: 20,
    })

    res.json({ success: true, data: verses })
  })
)

// GET - Obtener versículo por referencia
router.get(
  '/:book/:chapter/:verse',
  asyncHandler(async (req: Request, res: Response) => {
    const { book, chapter, verse, language = 'es' } = req.query

    const bibleVerse = await prisma.bibleVerse.findFirst({
      where: {
        book: book as string,
        chapter: parseInt(chapter as string),
        verse: parseInt(verse as string),
        language: language as string,
      },
    })

    if (!bibleVerse) {
      return res.status(404).json({
        success: false,
        error: 'Verse not found',
      })
    }

    res.json({ success: true, data: bibleVerse })
  })
)

export default router
