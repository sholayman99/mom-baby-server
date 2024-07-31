const express = require("express");
const app = new express();


//importing security middlewares
const mongoose = require("mongoose");
const cors = require("cors");
const hpp = require("hpp");
const helmet= require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const { rateLimit } = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 1000,
    standardHeaders: "draft-7",
    legacyHeaders: false,

});

//implementing security middleware
app.use(cors());
app.use(hpp());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(limiter);
app.use(express.json({extended:"100Mb"}));
app.use(express.urlencoded({extended:"100Mb"}));
app.use(cookieParser());


//MongoDB database connection
async function connectToMongoDB() {
    try {
        const uri = `mongodb+srv://mombaby:mom&baby@team.by4qiin.mongodb.net/mom&baby`;
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");

        // Perform database operations here
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

// Call the async function to connect to MongoDB
connectToMongoDB();

module.exports = app;