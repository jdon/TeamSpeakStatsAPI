require('dotenv').config();
const port = process.env.port;
const bugSnagKey = process.env.bugsnagcode;

let bugSnagMiddleware

if (bugSnagKey) {
	const bugsnag = require('@bugsnag/js')
	const bugsnagExpress = require('@bugsnag/plugin-express')
	const bugsnagClient = bugsnag(bugSnagKey)
	bugsnagClient.use(bugsnagExpress)
	bugSnagMiddleware = bugsnagClient.getPlugin('express')
	bugsnagClient.notify(new Error('Test error'))
}

var cors = require('cors');
const express = require('express');
const app = express();
var router = express.Router();
const statsRouter = require('./routers/stats');
app.use(bugSnagMiddleware.requestHandler)
app.listen(port);

app.use(cors());

router.use('/stats', statsRouter);

app.use('/', router);


app.use(bugSnagMiddleware.errorHandler)

