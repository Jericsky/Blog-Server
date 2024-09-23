const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('./routes/user')
const blogRoutes = require('./routes/blog')
const commentRoutes = require('./routes/comment')

require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGODB_STRING);
mongoose.connection.once('open', () => {
    console.log('Now connected to MongoDB Atlas')
})

const corsOptions = {
    origin: [
        'http://localhost:3000', 
        'https://blogapi-santos.onrender.com'
    ],
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/users', userRoutes)
app.use('/blogs', blogRoutes)
app.use('/comments', commentRoutes)



if(require.main === module){
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Now connected to port ${process.env.PORT || 3000}`)
    })
}

module.exports = {app, mongoose}