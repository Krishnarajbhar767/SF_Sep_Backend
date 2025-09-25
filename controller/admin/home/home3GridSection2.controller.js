
const NodeCache = require("node-cache");
const Home3GridSection2 = require("../../../model/home/Home3GridSection2.model");
const cache = new NodeCache();
const CACHE_KEY = "home3GridSection2";
// Get the document
exports.getSection2 = async (req, res, next) => {``
    const cached = cache.get(CACHE_KEY);
    if (cached) return res.json(cached);

    try {
        const doc = await Home3GridSection2.findOne();
        if (!doc) return res.status(404).json({ message: "Section not found" });
        cache.set(CACHE_KEY, doc);
        res.json(doc);
    } catch (err) {
        next(err);
    }
};

// Create or update the section
exports.createOrUpdateSection2 = async (req, res, next) => {
    try {
        const { heading, subHeading, items } = req.body;

        if (!heading || !subHeading || !items || !items.length) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (items.length > 3) {
            return res.status(400).json({ message: "Max 3 items allowed" });
        }

        // Ensure each item has image, title, and slug
        for (const item of items) {
            if (!item.image || !item.title || !item.slug) {
                return res.status(400).json({ message: "Each item must have image, title, and slug" });
            }
        }

        let doc = await Home3GridSection2.findOne();

        if (doc) {
            doc.heading = heading;
            doc.subHeading = subHeading;
            doc.items = items;
            await doc.save();
        } else {
            doc = new Home3GridSection2({ heading, subHeading, items });
            await doc.save();
        }

        cache.set(CACHE_KEY, doc);
        res.json(doc);
    } catch (err) {
        next(err);
    }
};