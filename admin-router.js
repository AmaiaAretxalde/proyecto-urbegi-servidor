const router = require('express').Router();
const Tea = require('./models/Tea')

router.post('/teas', async function(req,res){
    let datos = req.body;
    let tea = new Tea (datos);
    await tea.save();
    res.send('producto añadido');
  })
  module.exports = router;