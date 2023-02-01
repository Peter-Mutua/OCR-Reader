var express = require('express');
var router = express.Router();

var data = require('../controller/pdftext.controller');

router.post('/upload/pdf', data.create);

module.exports = router;