const express = require('express');
const { createSlider, getSlider, updateSlider, deleteSlider } = require('../../controller/admin/home/slider.controller');
const { getSection2, createOrUpdateSection2 } = require('../../controller/admin/home/home3GridSection2.controller');
const { getSection3, createOrUpdateSection3 } = require('../../controller/admin/home/homeSection3Video.controller');
const { getSection4, createOrUpdateSection4 } = require('../../controller/admin/home/home2BigGridSection4.controller');
const { getSection6, createOrUpdateSection6 } = require('../../controller/admin/home/HomeSection6.controller');
const { getSection7, createSection7, updateSection7 } = require('../../controller/admin/home/section7.controller');
const { getSection8, createOrUpdateSection8 } = require('../../controller/admin/home/section8.controller');

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
homeRouter.post('/section3', createOrUpdateSection3);

// Section 2 Routes
homeRouter.get('/section4', getSection4)
homeRouter.patch('/section4', createOrUpdateSection4)
// Section 5 Are Included In SLider  Section1 & Section5
homeRouter.get('/section6', getSection6)
homeRouter.patch('/section6', createOrUpdateSection6)

// Section  7
homeRouter.get("/section7", getSection7);
homeRouter.post("/section7", createSection7);
homeRouter.patch("/section7", updateSection7);

// Section 8
homeRouter.get("/section8", getSection8);
homeRouter.patch("/section8", createOrUpdateSection8);
module.exports = {
    homeRouter
}
