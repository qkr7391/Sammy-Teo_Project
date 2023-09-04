const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res, next) => {
    try {
        console.log(req.body);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
