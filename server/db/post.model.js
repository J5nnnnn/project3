const mongoose = require('mongoose');

const PostSchema = require('./post.schema').PostSchema

const PostModel = mongoose.model("Post", PostSchema);

function createPost(post){
    return PostModel.create(post);
}

function getAllPost(){
    return PostModel.find().exec();
}

function getAllPostForUser(user){
    return PostModel.find({
        username: user
    }).exec();
}


module.exports = {
    createPost,
    getAllPost,
}