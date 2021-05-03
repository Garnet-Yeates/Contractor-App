const express = require('express')
const app = express()

// Set up cors (has to be first or HTTP req's get blocked, idk why)
const cors = require('cors')
app.use(cors());

// Set up JSON body parsing
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

// Configure Routes
require('./routes/databaseRoute')(app)

// Connect database
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();
const port = process.env.PORT || 4000;
mongoose.connect(process.env.DATABASE_ACCESS, () => console.log('[SERVER] MongoDB successfully connected'))

// Start
app.listen(4000, () => console.log("Server is up and running"));