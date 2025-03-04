const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./Routes/UserRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json(), cors());
app.use('/', router);
mongoose.connect('mongodb+srv://lakshminarayana20118:1245@cluster0.86hgi.mongodb.net/assignment')
    .then(() => {
        console.log('connected to db ');
        app.listen(PORT, () => console.log(`server up and running at  ${PORT}`));
    })
    .catch((err) => { console.log(err); });
