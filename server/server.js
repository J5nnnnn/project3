const express = require('express')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const PostRoute = require('./api/post');

const app = express()


app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/post', PostRoute);

app.get('/', (req, res) => {
    res.send("get from the main page")
})


const mongoEndpoint = 'mongodb+srv://proj3:project3@webdevneu.ozpcdcj.mongodb.net/twitterApp?retryWrites=true&w=majority'; 
mongoose.connect(mongoEndpoint, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

app.get('*', function (req, res) {

    res.sendFile(path.join(__dirname, 'build', 'index.html'));

});

app.listen(8000, ()=>{
    console.log("Starting server for project 3 ...")
})