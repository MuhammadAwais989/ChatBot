const express = require('express');
const webhook = require('../controller/webhook');
require('dotenv').config();


const router = express.Router();


router.post('/', webhook)



module.exports = router;