import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import expressValidator from "express-validator";
import routes from "./routes/index";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
require("dotenv").config();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

// deal with "Access control allow origin" error
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

/**
 * API routes.
 */
app.use("/api/v1", routes);

export default app;