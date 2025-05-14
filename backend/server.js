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
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error("MongoDB connection error: ", err);
  process.exit(1);
});
