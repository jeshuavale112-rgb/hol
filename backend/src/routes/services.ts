import express, { Router, Request, Response } from 'express'
import prisma from '../lib/prisma'
import { authMiddleware } from '../middleware/auth'
import { asyncHandler } from '../middleware/error'

const router: Router = express.Router()

// GET - Obtener todos los servicios del usuario
router.get(
  '/',
  authMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, limit = 20 } = req.query

    const services = await prisma.service.findMany({
      where: { userId: req.userId },
      orderBy: { date: 'desc' },
      take: parseInt(limit as string),
      skip: (parseInt(page as string) - 1) * parseInt(limit as string),
    })

    const total = await prisma.service.count({
      where: { userId: req.userId },
    })

    res.json({
      success: true,
      data: services,
      total,
      page: parseInt(page as string),
      limit: parseInt(limit as string),
    })
  })
)

// GET - Obtener servicio por ID
router.get(
  '/:id',
  authMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    const service = await prisma.service.findFirst({
      where: { id, userId: req.userId },
    })

    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found',
      })
    }

    res.json({ success: true, data: service })
  })
)

// POST - Crear servicio
router.post(
  '/',
  authMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const { title, date, startTime, endTime, type, songs, notes } = req.body

    if (!title || !date || !startTime) {
      return res.status(400).json({
        success: false,
        error: 'Title, date, and startTime are required',
      })
    }

    const service = await prisma.service.create({
      data: {
        title,
        date: new Date(date),
        startTime,
        endTime: endTime || null,
        type: type || 'Culto',
        songs: songs || [],
        notes: notes || null,
        userId: req.userId!,
      },
    })

    res.status(201).json({ success: true, data: service })
  })
)

// PATCH - Actualizar servicio
router.patch(
  '/:id',
  authMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    const { title, date, startTime, endTime, type, songs, status, notes } = req.body

    const service = await prisma.service.updateMany({
      where: { id, userId: req.userId },
      data: {
        ...(title && { title }),
        ...(date && { date: new Date(date) }),
        ...(startTime && { startTime }),
        ...(endTime && { endTime }),
        ...(type && { type }),
        ...(songs && { songs }),
        ...(status && { status }),
        ...(notes && { notes }),
      },
    })

    if (service.count === 0) {
      return res.status(404).json({
        success: false,
        error: 'Service not found',
      })
    }

    const updated = await prisma.service.findFirst({
      where: { id, userId: req.userId },
    })

    res.json({ success: true, data: updated })
  })
)

// DELETE - Eliminar servicio
router.delete(
  '/:id',
  authMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await prisma.service.deleteMany({
      where: { id, userId: req.userId },
    })

    if (result.count === 0) {
      return res.status(404).json({
        success: false,
        error: 'Service not found',
      })
    }

    res.json({ success: true, message: 'Service deleted' })
  })
)

export default router
