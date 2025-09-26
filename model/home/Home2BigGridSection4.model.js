const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true }
});

const home2BigGridSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    subHeading: { type: String, required: true },
    items: {
        type: [itemSchema],
        validate: [
            arr => arr.length > 0 && arr.length <= 2,
            "Items must have 1 to 2 elements"
        ]
    }
}, { timestamps: true });

module.exports = mongoose.model("Home3BigGridSection4", home2BigGridSchema);
