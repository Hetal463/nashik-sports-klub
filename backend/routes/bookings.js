const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// POST /bookings
router.post('/', async (req, res) => {
  const { name, phone, date, day, timeSlot, facility } = req.body;

  // 1. Check for duplicate slot
  const existing = await Booking.findOne({ date, timeSlot, facility });
  if (existing) {
    return res.status(409).json({ message: 'This slot is already booked.' });
  }

  // 2. Save booking
  const booking = new Booking({ name, phone, date, day, timeSlot, facility });
  await booking.save();

  res.status(201).json({ message: 'Booking confirmed!', booking });
});

// GET /bookings
router.get('/', async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.json(bookings);
});

module.exports = router;
