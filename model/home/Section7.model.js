const mongoose = require("mongoose");

const section7Schema = new mongoose.Schema(
    {
        heading: { type: String, required: true },
        paragraph: { type: String, required: true },
        slugText: { type: String, required: true },
        slug: { type: String, required: true },
        image: { type: String, required: true }
    }

);

module.exports = mongoose.model("HomeSection7", section7Schema);
