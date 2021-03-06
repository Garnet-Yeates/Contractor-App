const express = require('express')
const app = express()

// Set up cors (has to be first or HTTP req's get blocked, idk why)
const cors = require('cors')
app.use(cors());

// Set up JSON body parsing
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Set up our custom middleware for login session
const attachUser = require('./api/middleware/attachUser')
app.use(attachUser);

// Load mongoose models
require('./api/models/UserModel')
require('./api/models/TemplateModel')

// Configure Routes
require('./api/routes/databaseRoute')(app)
require('./api/routes/authRoute')(app)

// Connect database
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();
const port = process.env.PORT || 4000;
mongoose.connect(process.env.DATABASE_ACCESS, () => console.log('[SERVER] MongoDB successfully connected'))

const TemplateSchema = require('./api/schema/TemplateSchema');

const BookkeepingController = require('./api/controllers/bookkeepingController')

let bookkeepingController = require('./api/controllers/bookkeepingController')

// Start
app.listen(4000, () => {
    console.log("Server is up and running")
    bookkeepingController.fakeCreate();

});