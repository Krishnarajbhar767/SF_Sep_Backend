const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });



// Helper to upload video buffer
const uploadVideoToCloudinary = (buffer, folder = "home_videos") => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder, resource_type: "video" },
            (err, result) => {
                if (err) return reject(err);
                resolve(result.secure_url);
            }
        );
        stream.end(buffer);
    });
};




module.exports = {
    uploadVideoToCloudinary
}