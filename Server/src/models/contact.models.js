import mongoose, {Schema} from 'mongoose';

const contactSchema = new Schema({
    contactQuery : {
        type: String,
        required: true
    },
    personalEmail : {
        type: String,
        required: true
    }
},{timestamps : true});

export const Contact = mongoose.model('Contact', contactSchema);