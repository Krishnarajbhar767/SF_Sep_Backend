const NodeCache = require("node-cache");
const Home2BigGridSection4Model = require("../../../model/home/Home2BigGridSection4.model");


const cache = new NodeCache();
const CACHE_KEY = "home3BigGridSection4";

// Get the document
exports.getSection4 = async (req, res, next) => {
    const cached = cache.get(CACHE_KEY);
    if (cached) return res.json(cached);

    try {
        const doc = await Home2BigGridSection4Model.findOne();
        if (!doc) return res.status(404).json({ message: "Section not found" });

        cache.set(CACHE_KEY, doc);
        res.json(doc);
    } catch (err) {
        next(err);
    }
};

// Create or update the section
exports.createOrUpdateSection4 = async (req, res, next) => {
    try {
        const { heading, subHeading, items } = req.body;

        if (!heading || !subHeading || !items || !items.length) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (items.length > 2) {
            return res.status(400).json({ message: "Max 2 items allowed" });
        }

        // Ensure each item has required fields
        for (const item of items) {
            if (!item.image || !item.title || !item.slug) {
                return res.status(400).json({ message: "Each item must have image, title, and slug" });
            }
        }

        let doc = await Home2BigGridSection4Model.findOne();

        if (doc) {
            doc.heading = heading;
            doc.subHeading = subHeading;
            doc.items = items;
            await doc.save();
        } else {
            doc = new Home2BigGridSection4Model({ heading, subHeading, items });
            await doc.save();
        }

        cache.set(CACHE_KEY, doc);
        res.json(doc);
    } catch (err) {
        next(err);
    }
};
