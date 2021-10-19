import { Schema, model, models } from 'mongoose';

const taskSchema = new Schema({
    title: {
        type: String,
        required: [ true, 'Titulo es requerido'],
        unique: true,
        trim: true,
        maxlength: [ 40, 'Titulo no debe ser más 40 caracteres' ],
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: [ 200, 'Descripción no debe ser más de 200 caracteres']
    }
}, {
    timestamps: true,
    versionKey: false
});

export default models.Task || model('Task', taskSchema);