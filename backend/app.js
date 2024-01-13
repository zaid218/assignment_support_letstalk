const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8800;
require('dotenv').config();
const mongoose = require('mongoose');
const route = require('./router/route');
const cookieParser = require('cookie-parser');
const authenticateUser = require('./middleware/authMiddleware'); // Import the middleware

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Use the authentication middleware before your routes
app.use(authenticateUser);

mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true }).then(() => {
  console.log('MongoDB is Connected..');
}).catch(err => {
  console.log('error is ' + err.message);
});

app.use('/', route);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
