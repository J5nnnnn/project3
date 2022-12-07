const express = require('express');

const PostModel = require('../db/post.model');

const router = express.Router();


router.get('/', (req, res)=>{
    return PostModel.getAllPost()
        .then((data)=>{
            res.send(data);
        })
        .catch((err)=>{
            res.status(400);
            res.send(err)
        })
})

router.post('/', (req, res)=>{
    const test = {
        content: "tested content",
        username: "admin"
    }

    return PostModel.createPost(test)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(400);
            res.send(err)
        })
})

module.exports = router;