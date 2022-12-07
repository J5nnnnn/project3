const Schema = require('mongoose').Schema

exports.PostSchema = new Schema({
    content: String,
    username: String
    },{
        timestamps: {
            createdAt: 'created',
            updatedAt: 'updated'
        }
    }
    ,{collection: 'post'}
);