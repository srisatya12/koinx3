require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Database connected successfully');
}).catch((error) => {
  console.error('Error connecting to the database:', error.message);
});


const priceSchema = new mongoose.Schema({
  coin: String,
  price: Number,
  timestamp: { type: Date, default: Date.now }
});

const Price = mongoose.model('Price', priceSchema);


function calculateStandardDeviation(prices) {
  const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
  const variance = prices.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / prices.length;
  return Math.sqrt(variance);
}


app.get('/deviation', async (req, res) => {
  try {
    const { coin } = req.query;
    if (!coin) {
      return res.status(400).json({ error: 'Coin is required' });
    }

    const prices = await Price.find({ coin })
      .sort({ timestamp: -1 })
      .limit(100)
      .select('price -_id');

    if (prices.length === 0) {
      return res.status(404).json({ error: 'No records found for the specified coin' });
    }

    const priceValues = prices.map(record => record.price);
    const deviation = calculateStandardDeviation(priceValues).toFixed(2);

    res.json({ deviation: parseFloat(deviation) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/insert-price', async (req, res) => {
    const { coin, price } = req.body;
    if (!coin || !price) {
      return res.status(400).json({ error: 'Coin and price are required' });
    }
    const newPrice = new Price({ coin, price });
    await newPrice.save();
    res.status(201).json({ message: 'Price record inserted' });
  });
  




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
