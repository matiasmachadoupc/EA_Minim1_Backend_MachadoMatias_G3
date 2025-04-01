import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IRating extends Document {
    user: Types.ObjectId; // Usuario que recibe la valoración
    rater: Types.ObjectId; // Usuario que realiza la valoración
    score: number; // Puntuación (1-5)
    comment?: string; // Comentario opcional
    createdAt: Date;
}

const ratingSchema = new Schema<IRating>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rater: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Rating = mongoose.model<IRating>('Rating', ratingSchema);
export default Rating;