const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/nsk', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const bookingRoutes = require('./routes/bookings');
app.use('/api/bookings', bookingRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
