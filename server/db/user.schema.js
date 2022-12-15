const Schema = require('mongoose').Schema;

exports.UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: true
    },
    description: String,
    },{
        timestamps: {
            createdAt: 'created',
            updatedAt: 'updated'
        }
    }
    ,{collection: 'user'}
);