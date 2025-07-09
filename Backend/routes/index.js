const express = require('express');
const router = express.Router();
const userRoute = require('./user.js');
const accountRouter = require('./account.js');

router.use('/user',userRoute); 
router.use('/account',accountRouter)


module.exports = router;