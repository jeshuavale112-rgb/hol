import express, { Router, Request, Response } from 'express'
import prisma from '../lib/prisma'
import { authMiddleware } from '../middleware/auth'
import { asyncHandler } from '../middleware/error'

const router: Router = express.Router()

// GET - Obtener todas las presentaciones del usuario
router.get(
  '/',
  authMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const presentations = await prisma.presentation.findMany({
      orderBy: { createdAt: 'desc' },
    })

    res.json({ success: true, data: presentations })
  })
)

// GET - Obtener presentación por ID con sus slides
router.get(
  '/:id',
  authMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params

    const presentation = await prisma.presentation.findUnique({
      where: { id },
      include: {
        slides: {
          orderBy: { order: 'asc' },
        },
      },
    })

    if (!presentation) {
      return res.status(404).json({
        success: false,
        error: 'Presentation not found',
      })
    }

    res.json({ success: true, data: presentation })
  })
)

// POST - Crear presentación
router.post(
  '/',
  authMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const { title } = req.body

    if (!title) {
      return res.status(400).json({
        success: false,
        error: 'Title is required',
      })
    }

    const presentation = await prisma.presentation.create({
      data: { title },
    })

    res.status(201).json({ success: true, data: presentation })
  })
)

// PATCH - Actualizar presentación
router.patch(
  '/:id',
  authMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    const { title } = req.body

    const presentation = await prisma.presentation.update({
      where: { id },
      data: { title },
    })

    res.json({ success: true, data: presentation })
  })
)

// DELETE - Eliminar presentación
router.delete(
  '/:id',
  authMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params

    await prisma.presentation.delete({
      where: { id },
    })

    res.json({ success: true, message: 'Presentation deleted' })
  })
)

// POST - Agregar slide a presentación
router.post(
  '/:id/slides',
  authMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    const { order, type, content, backgroundColor, textColor } = req.body

    const slide = await prisma.slide.create({
      data: {
        presentationId: id,
        order: order || 1,
        type: type || 'text',
        content,
        backgroundColor: backgroundColor || '#000000',
        textColor: textColor || '#FFFFFF',
      },
    })

    res.status(201).json({ success: true, data: slide })
  })
)

export default router
