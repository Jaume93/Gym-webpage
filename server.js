const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { errorHandler, authRole } = require('./middleware');
require('dotenv').config();
const cors = require('cors');
const path = require("path");


//importar router
const ActivityRouter = require('./routes/ActivityRoutes');
const MembershipFeeRouter = require('./routes/MembershipFeeRoutes');
const MemberRouter = require('./routes/MemberRoutes');
const ServiceRouter = require('./routes/ServiceRoutes');


const { DB_URI, PORT } = process.env;

mongoose.connect(DB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => {
        console.log('DB connected');
    });

//para leer los datos del body
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rutas
//app.use(getAuth);
app.use('/activities', ActivityRouter);
app.use('/membershipFees', MembershipFeeRouter);
app.use('/members', MemberRouter);
app.use('/services', ServiceRouter);
app.get('*', (req, res) => {
    res.send('This was not found');
});
app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT || 5000, () => console.log(`Now listening for requests on port ${PORT}`));
