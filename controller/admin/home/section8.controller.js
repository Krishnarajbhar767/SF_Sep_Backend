const NodeCache = require("node-cache");
const HomeSection8Model = require("../../../model/home/HomeSection8.model");


const cache = new NodeCache();
const CACHE_KEY = "homeSection8";


exports.getSection8 = async (req, res, next) => {
    const cached = cache.get(CACHE_KEY);
    if (cached) return res.json(cached);

    try {
        const doc = await HomeSection8Model.findOne();
        if (!doc) return res.status(404).json({ message: "Section 8 not found" });

        cache.set(CACHE_KEY, doc);
        res.json(doc);
    } catch (err) {
        next(err);
    }
};

// ✅ Create or Update Section 8
exports.createOrUpdateSection8 = async (req, res, next) => {
    try {
        const { heading, subHeading, title, paragraph, btnText, btnUrl, image } = req.body;

        if (!heading || !subHeading || !title || !paragraph || !btnText || !btnUrl || !image) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let doc = await HomeSection8Model.findOne();

        if (doc) {
            doc.heading = heading;
            doc.subHeading = subHeading;
            doc.title = title;
            doc.paragraph = paragraph;
            doc.btnText = btnText;
            doc.btnUrl = btnUrl;
            doc.image = image;
            await doc.save();
        } else {
            doc = new HomeSection8Model({ heading, subHeading, title, paragraph, btnText, btnUrl, image });
            await doc.save();
        }

        cache.set(CACHE_KEY, doc);
        res.json(doc);
    } catch (err) {
        next(err);
    }
};
