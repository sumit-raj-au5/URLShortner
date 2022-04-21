const express = require('express');
const app = express();
const mongo = require('./mongo');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();


//importing Routes
const shortURL = require('./routes/shortUrl.routes');
const userAuth = require('./routes/userAuth.routes');
(async () =>{
    //connecting mongo
    await mongo.connect();

    //Middleware
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors())
    app.use((req,res,next)=>{
        console.log('Request Received');
        next();
    });

    //Routes
    app.use('/', shortURL);
    app.use('/userauth', userAuth);

    //PORT
    app.listen(process.env.PORT||3500, ()=>{
        console.log(`Server running on ${process.env.PORT||3500}`);
    });
})();
