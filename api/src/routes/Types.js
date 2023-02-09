const { Router } = require('express');
const router = Router();
const { getApiType } = require('../controllers/TypesControllers');


router.get('/', async (req, res) => {
  const types = await getApiType();
  res.send(types);
});
module.exports = router;