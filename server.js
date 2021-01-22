const express = require('express');
const axios = require('axios')
const app = express();

app.use(express.static('public'))

const PORT = process.env.PORT || 5678;

app.get('/api/rates/', async (req, res) => {

  const { base, currency } = req.query;
  const uri = `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${currency}`

  try {
    const results = await axios.get(uri);
    return res.json({
      results: results.data
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
})



app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
});