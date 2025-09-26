const NodeCache = require("node-cache");
const HomeSection7 = require("../../../model/home/Section7.model");
const cache = new NodeCache();
const CACHE_KEY = "homeSection7";

// Get all docs
exports.getSection7 = async (req, res, next) => {
    const cached = cache.get(CACHE_KEY);
    if (cached) return res.json(cached);

    try {
        const docs = await HomeSection7.find().limit(2);
        cache.set(CACHE_KEY, docs);
        res.json(docs);
    } catch (err) {
        next(err);
    }
};

// Create new doc (max 2 allowed)
exports.createSection7 = async (req, res, next) => {
    try {
        const count = await HomeSection7.countDocuments();
        if (count >= 2) {
            return res.status(400).json({ message: "Only 2 documents allowed in Section 7" });
        }

        const { heading, paragraph, slugText, slug, image } = req.body;
        if (!heading || !paragraph || !slugText || !slug || !image) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const doc = await HomeSection7.create({ heading, paragraph, slugText, slug, image });
        cache.del(CACHE_KEY);
        res.json(doc);
    } catch (err) {
        next(err);
    }
};

// Update doc (id from body)
exports.updateSection7 = async (req, res, next) => {
    try {
        const { id, heading, paragraph, slugText, slug, image } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Document ID is required" });
        }

        const doc = await HomeSection7.findByIdAndUpdate(
            id,
            { heading, paragraph, slugText, slug, image },
            { new: true }
        );

        if (!doc) return res.status(404).json({ message: "Section not found" });

        cache.del(CACHE_KEY);
        res.json(doc);
    } catch (err) {
        next(err);
    }
};
