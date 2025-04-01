import Rating, { IRating } from './rating_models.js';

export const createRating = async (ratingData: IRating) => {
    const rating = new Rating(ratingData);
    return await rating.save();
};

export const getRatingsByUser = async (userId: string, page: number = 1, pageSize: number = 10) => {
    const skip = (page - 1) * pageSize;
    const ratings = await Rating.find({ user: userId })
        .populate('rater', 'name email') // Incluye información del usuario que realiza la valoración
        .populate('user', 'name email') // Incluye información del usuario que recibe la valoración
        .skip(skip)
        .limit(pageSize);
    const totalRatings = await Rating.countDocuments({ user: userId });
    const totalPages = Math.ceil(totalRatings / pageSize);
    return { ratings, totalRatings, totalPages, currentPage: page };
};

export const updateRating = async (id: string, updateData: Partial<IRating>) => {
    return await Rating.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteRating = async (id: string) => {
    return await Rating.findByIdAndDelete(id);
};
