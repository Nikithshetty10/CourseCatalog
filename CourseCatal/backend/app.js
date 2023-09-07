const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Course = require('./Models/Course');
const routes = require('./routes');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(routes);




// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://nikithshetty:Nikithshetty10@cluster0.n7zxofr.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Could not connect to MongoDB:', err);
});



app.listen(3005, () => {
    console.log('Server running on port 3005');
});
