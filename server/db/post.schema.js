const Schema = require('mongoose').Schema

exports.PostSchema = new Schema({
    content: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    }
    },{
        timestamps: {
            createdAt: 'created',
            updatedAt: 'updated'
        }
    }
    ,{collection: 'post'}
);