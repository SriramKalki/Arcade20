const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
  res.send('Order route test');
});

module.exports = router;
