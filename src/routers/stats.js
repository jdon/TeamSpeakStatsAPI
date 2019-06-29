const express = require('express');
const statsRouter = express.Router();
const debug = require('debug')('TeamSpeakStats-statsRouter');
const cacheService = require('../cacheService');
const getStats = require('../database');
const cache = new cacheService(600); // Create a new cache service instance

statsRouter.get('/users', async (req, res) => {
	debug('Get stats');
	const cachedResponse = cache.get('stats');
	if (cachedResponse != null) {
		return res.send(cachedResponse);
	}
	try {
		let stats = await getStats();
		cache.set('stats', stats);
		return res.send(stats);
	} catch (err) {
		return res.send(err);
	}
});
module.exports = statsRouter;
