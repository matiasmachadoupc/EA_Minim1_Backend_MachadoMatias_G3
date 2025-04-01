import { Request, Response } from 'express';
import { createRating, getRatingsByUser, updateRating, deleteRating } from './rating_service.js';

export const createRatingHandler = async (req: Request, res: Response) => {
    try {
        const rating = await createRating(req.body);
        res.status(201).json(rating);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getRatingsByUserHandler = async (req: Request, res: Response) => {
    try {
        const { page = 1, pageSize = 10 } = req.query;
        const ratings = await getRatingsByUser(req.params.userId, +page, +pageSize);
        res.status(200).json(ratings);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRatingHandler = async (req: Request, res: Response) => {
    try {
        const rating = await updateRating(req.params.id, req.body);
        res.status(200).json(rating);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteRatingHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedRating = await deleteRating(id);
        if (!deletedRating) {
            return res.status(404).json({ message: 'Rating no encontrado' });
        }
        res.status(204).send(); // Respuesta exitosa sin contenido
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};