import express from 'express';
import {
    createRatingHandler,
    getRatingsByUserHandler,
    updateRatingHandler,
    deleteRatingHandler
} from './rating_controller.js';

const router = express.Router();

/**
 * @openapi
 * /api/ratings:
 *   post:
 *     summary: Crea una nueva valoración
 *     description: Añade una valoración de confianza para un usuario.
 *     tags:
 *       - Rating
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: ID del usuario que recibe la valoración
 *               rater:
 *                 type: string
 *                 description: ID del usuario que realiza la valoración
 *               score:
 *                 type: number
 *                 description: Puntuación de la valoración (1-5)
 *               comment:
 *                 type: string
 *                 description: Comentario opcional
 *     responses:
 *       201:
 *         description: Valoración creada exitosamente
 */
router.post('/ratings', createRatingHandler);

/**
 * @openapi
 * /api/ratings/{userId}:
 *   get:
 *     summary: Obtiene las valoraciones de un usuario
 *     description: Retorna una lista paginada de valoraciones realizadas a un usuario.
 *     tags:
 *       - Rating
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: ID del usuario
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: pageSize
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista de valoraciones obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ratings:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user:
 *                         type: string
 *                       rater:
 *                         type: string
 *                       score:
 *                         type: number
 *                       comment:
 *                         type: string
 *                 totalRatings:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 */
router.get('/ratings/:userId', getRatingsByUserHandler);

/**
 * @openapi
 * /api/ratings/{id}:
 *   put:
 *     summary: Actualiza una valoración
 *     description: Modifica los detalles de una valoración existente.
 *     tags:
 *       - Rating
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: ID de la valoración
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: number
 *                 description: Nueva puntuación (1-5)
 *               comment:
 *                 type: string
 *                 description: Nuevo comentario
 *     responses:
 *       200:
 *         description: Valoración actualizada exitosamente
 */
router.put('/ratings/:id', updateRatingHandler);

/**
 * @openapi
 * /api/ratings/{id}:
 *   delete:
 *     summary: Elimina una valoración
 *     description: Borra una valoración existente.
 *     tags:
 *       - Rating
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: ID de la valoración
 *     responses:
 *       204:
 *         description: Valoración eliminada exitosamente
 */
router.delete('/ratings/:id', deleteRatingHandler);

export default router;