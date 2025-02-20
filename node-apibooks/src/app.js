const express = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.use('/api', bookRoutes);
app.use(errorHandler);

module.exports = app; 