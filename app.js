const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // For enabling CORS if needed

const app = express();
const port = process.env.PORT || 3000;

// Database configuration
const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

app.use(express.json());
app.use(cors()); // Enable CORS if required

// Endpoint to get all bookings
app.get('/bookings', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM bookings');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to add a new booking
app.post('/bookings', async (req, res) => {
  const { name, roomNumber, prnLast3Digits, date, time } = req.body;
  try {
    await pool.query(
      'INSERT INTO bookings (name, room_number, prn_last_3_digits, booking_date, time_slot) VALUES ($1, $2, $3, $4, $5)',
      [name, roomNumber, prnLast3Digits, date, time]
    );
    res.status(201).send('Booking created');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
