// controllers/pageController.js

const SlidersModel = require("../../../model/home/Sliders.model");
const NodeCache = require('node-cache')
const cache = new NodeCache()
const cacheKey = 'slider'
exports.createSlider = async (req, res, next) => {
    const { heading, paragraph, slug, top, image } = req.body;

    if (!heading || !paragraph || !slug || !image) {
        return res.status(400).json({
            success: false,
            message: "All Fieald  Are required"
        })
    }
    try {

        const page = new SlidersModel(req.body);
        await page.save();
        cache.del(cacheKey)
        res.status(201).json(page);
    } catch (err) {
        next(err);
    }
};

exports.getSlider = async (req, res, next) => {
    const cachePage = cache.get(cacheKey);
    if (cachePage) {
        return res.json(cachePage);
    }
    try {
        const pages = await SlidersModel.find().sort({ createdAt: -1 });
        cache.set(cacheKey, pages)
        res.json(pages);
    } catch (err) {
        next(err);
    }
};

exports.getPageBySlug = async (req, res, next) => {
    try {
        const page = await SlidersModel.findOne({ slug: req.params.slug });
        if (!page) return res.status(404).json({ message: 'Not found' });
        res.json(page);
    } catch (err) {
        next(err);
    }
};

exports.updateSlider = async (req, res, next) => {
    try {
        const page = await SlidersModel.findByIdAndUpdate(req.body.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!page) return res.status(404).json({ message: 'Not found' });
        cache.del(cacheKey)
        res.json(page);
    } catch (err) {
        next(err);
    }
};

exports.deleteSlider = async (req, res, next) => {
    try {
        const page = await SlidersModel.findByIdAndDelete(req.body.id);
        if (!page) return res.status(404).json({ message: 'Not found' });
        cache.del(cacheKey)
        res.json({ message: 'Deleted', id: page._id });
    } catch (err) {
        next(err);
    }
};
