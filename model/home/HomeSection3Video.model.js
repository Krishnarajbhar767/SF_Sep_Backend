const mongoose = require("mongoose");

const homeSection3VideoSchema = new mongoose.Schema(
    {
        heading: { type: String, required: true },
        subHeading: { type: String, required: true },
        video: { type: String, required: true } // store video URL
    },
);

module.exports = mongoose.model("HomeSection3Video", homeSection3VideoSchema);
