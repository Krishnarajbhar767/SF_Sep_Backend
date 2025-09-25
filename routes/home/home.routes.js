const express = require('express');
const { createSlider, getSlider, updateSlider, deleteSlider } = require('../../controller/admin/home/slider.controller');
const { getSection2, createOrUpdateSection2 } = require('../../controller/admin/home/home3GridSection2.controller');
const { getSection3, createOrUpdateSection3 } = require('../../controller/admin/home/homeSection3Video.controller');

const homeRouter = express.Router();

homeRouter.post('/slider', createSlider);
homeRouter.get('/slider', getSlider);
homeRouter.put('/slider', updateSlider);
homeRouter.delete('/slider', deleteSlider);

// Section 2 Routes
homeRouter.get('/section2', getSection2)
homeRouter.patch('/section2', createOrUpdateSection2)

// Section  3 Vide Section  
homeRouter.get('/section3', getSection3)
homeRouter.post('/section3', createOrUpdateSection3)
module.exports = {
    homeRouter
}
