
const NodeCache = require("node-cache");
const HomeSection3VideoModel = require("../../../model/home/HomeSection3Video.model");
const cache = new NodeCache();
const CACHE_KEY = "homeSection3Video";

// Get single document
exports.getSection3 = async (req, res, next) => {
    const cached = cache.get(CACHE_KEY);
    if (cached) return res.json(cached);

    try {
        const doc = await HomeSection3VideoModel.findOne();
        if (!doc) return res.status(404).json({ message: "Section not found" });
        cache.set(CACHE_KEY, doc);
        res.json(doc);
    } catch (err) {
        next(err);
    }
};

// Create or update section
exports.createOrUpdateSection3 = async (req, res, next) => {
    try {
        const { heading, subHeading, video } = req.body;

        if (!heading || !subHeading || !video) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let doc = await HomeSection3VideoModel.findOne();

        if (doc) {
            doc.heading = heading;
            doc.subHeading = subHeading;
            doc.video = video;
            await doc.save();
        } else {
            doc = new HomeSection3VideoModel({ heading, subHeading, video });
            await doc.save();
        }

        cache.set(CACHE_KEY, doc);
        res.json(doc);
    } catch (err) {

        next(err);
    }
};
