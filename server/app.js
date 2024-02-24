require('express-async-errors')
require('dotenv').config()
const bodyParser = require('body-parser');

const express = require('express')
const connectDB = require('./db/connect')
const app = express()
const urlRouter = require('./routes/urlRouter')
const cors = require('cors');
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

app.use('/api/v1/url', urlRouter)
app.use('/', urlRouter)
const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`Running on port ${port}...`))
    } catch (error) {
        console.log(error);
    }
}

start()
