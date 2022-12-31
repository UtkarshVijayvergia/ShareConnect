const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
connectDB();
const port = process.env.PORT ||  5000;

const app = express()



app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/usertry', require('./routes/userTryRoutes'))
app.use('/api/user/details', require('./routes/userDetailsRoutes'))


app.use(errorHandler)

app.get('/', (req, res) => {
    res.send("hello")
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});