const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bookingsRoute = require('./routes/bookings');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/bookings', bookingsRoute);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected");
  app.listen(5000, () => console.log("Server running on port 5000"));
}).catch(err => console.error(err));
