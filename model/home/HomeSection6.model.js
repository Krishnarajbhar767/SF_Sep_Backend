const { Schema, model } = require("mongoose");

const HomeSection6Schema = new Schema({
    image: { type: String, required: true },
    slug: { type: String, required: true }
});

module.exports = model("HomeSection6", HomeSection6Schema);
