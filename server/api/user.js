const express = require('express');

const UserModel = require('../db/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post('/register', (req, res) => {
    const body = req.body;
    body.password = bcrypt.hashSync(body.password, 10);

    return UserModel.register(body)
        .then((data) => {
            const cookie = {
                currUser: data.username
            }
            const token = jwt.sign(cookie, "registerInfo", {
                expiresIn: "2h"
            })

            return res.cookie("jwt_token", token, {httpOnly: true})
                .status(200).send({username: data.username});
        })
        .catch((err) => {
            console.log("Unable to Sign Up: " + err)
            res.status(400);
            return res.send("Error: User cannot be created" + err);
        });
});



module.exports = router;
