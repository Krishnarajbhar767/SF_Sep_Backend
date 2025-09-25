// models/page.js (CommonJS)
const mongoose = require('mongoose');
const { Schema } = mongoose;


const sliderSchema = new Schema({
    heading: {
        type: String,
        required: [true, 'Heading is required'],
        trim: true,
        maxlength: 200,
    },
    paragraph: {
        type: String,
        required: [true, 'Paragraph is required'],
        trim: true,
    },
    slug: {
        type: String,
        required: [true, 'Slug is required'],
        trim: true,
        lowercase: true,

    },
    top: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,

        default: '',
    }
});


module.exports = mongoose.model('Slider', sliderSchema);
