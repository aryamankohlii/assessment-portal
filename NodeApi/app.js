console.clear();

const express = require("express");
const app = express();
const auth = require('./auth');
const dotenv = require('dotenv');
dotenv.config();

var loginRoute = require('./routers/login-router')();
var userRoute = require('./routers/user-router')();
var roleRoute = require('./routers/role-router')();
var assesmentAreaRoute = require('./routers/assesmentArea-router')();

var subtrackRoute = require('./routers/subtrack-router')();

var controllsRoute = require('./routers/controlls-router')();

var questionRoute = require('./routers/question-router')();
var answersRoute = require('./routers/answers-router')();


var uploadRoute = require('./routers/upload-router')();


const port = process.env.port;
const cors = require('cors');


app.use(express.json());

app.use(cors());
app.use('/',loginRoute);
app.use('/',auth,userRoute);
app.use('/',auth,roleRoute);
app.use('/',auth,assesmentAreaRoute);
app.use('/',auth,subtrackRoute);
app.use('/',auth,controllsRoute);
app.use('/',auth,questionRoute);
app.use('/',auth,answersRoute);


app.use(express.static(__dirname + '/public'));
app.use('/',uploadRoute);

app.listen(port, ()=>{
    console.log("i am listening port ", port);
});

