const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Commented out, will crash server until routes middleware is defined
// app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-media', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('debug', true);

app.listen(PORT, () => {
    console.log(`Server running and listening on ${PORT}`);
})