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
            const token = jwt.sign(cookie, "login_credential", {
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


router.post('/authenticate', (req, res) => {
    console.dir(req.body);
    UserModel.getUserByName(req.body.username)
        .then((user) => {
            if (bcrypt.compareSync(req.body.password, user.password)){
                const cookie = {
                    username: user.username
                }
                const token = jwt.sign(cookie, "login_credential", {
                    expiresIn: "2h"
                })

                return res.cookie('jwt_token', token, {httpOnly: true})
                    .status(200).send(user);
            } else {
                return res.status(401).send(user);
            }
        })
        .catch((err) => console.log("Error Authentication: " + err));
})


router.get("/isLoggedIn", (req, res) => {
    const jwt_token = req.cookies.jwt_token;

    if(!jwt_token){
        return res.status(401).send("No token present!");
    }

    return jwt.verify(jwt_token, "login_credential", (err, decoded) => {
        if (err) {
            return res.status(400).send("Invalid token")
        } else {
            const name = decoded.username;
            console.log(name);
            
            return res.status(200).send("All logged in!")
        }
    })
})



module.exports = router;
