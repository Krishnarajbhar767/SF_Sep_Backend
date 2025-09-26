const NodeCache = require("node-cache");
const HomeSection6 = require("../../../model/home/HomeSection6.model");

const cache = new NodeCache();
const CACHE_KEY = "homeSection6";

// Get Section 6
exports.getSection6 = async (req, res, next) => {
    const cached = cache.get(CACHE_KEY);
    if (cached) return res.json(cached);

    try {
        const doc = await HomeSection6.findOne();
        if (!doc) return res.status(404).json({ message: "Section 6 not found" });

        cache.set(CACHE_KEY, doc);
        res.json(doc);
    } catch (err) {
        next(err);
    }
};

// Create or Update Section 6
exports.createOrUpdateSection6 = async (req, res, next) => {
    try {
        const { image, slug } = req.body;

        if (!image || !slug) {
            return res.status(400).json({ message: "Image and slug are required" });
        }

        let doc = await HomeSection6.findOne();

        if (doc) {
            doc.image = image;
            doc.slug = slug;
            await doc.save();
        } else {
            doc = new HomeSection6({ image, slug });
            await doc.save();
        }

        cache.set(CACHE_KEY, doc);
        res.json(doc);
    } catch (err) {
        next(err);
    }
};
