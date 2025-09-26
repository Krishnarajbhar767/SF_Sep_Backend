const mongoose = require("mongoose");

const section8Schema = new mongoose.Schema({
    heading: { type: String, required: true },
    subHeading: { type: String, required: true },
    title: { type: String, required: true },
    paragraph: { type: String, required: true },
    btnText: { type: String, required: true },
    btnUrl: { type: String, required: true },
    image: { type: String, required: true }
});

module.exports = mongoose.model("HomeSection8", section8Schema);
