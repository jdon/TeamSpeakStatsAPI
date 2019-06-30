require('dotenv').config();
var cors = require('cors');
const express = require('express');
const app = express();
var router = express.Router();
const statsRouter = require('./routers/stats');

app.use(cors());

router.use('/stats', statsRouter);

app.use('/', router);

app.listen(8080);
