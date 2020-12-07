const { Router } = require("express");
const router = Router();

const fileUploader = require("../configs/cloudinary.config");

router.post("/upload", fileUploader.single("imageURL"), (req, res, next) => {
console.log("file is", req.file);
});

module.exports = router;
