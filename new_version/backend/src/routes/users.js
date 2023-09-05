const express = require("express");
const router = express.Router();
const User = require("../models/User");
const e = require("express");

router.post("/register", async (req, res, next) => {
    console.log(req.body);
    try {
        // body = {
        //     name: "test",
        //     email: "test@test.com",
        //     password: "123123",
        // };
        const user = new User(req.body);

        await user.save();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;
