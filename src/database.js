const { Pool } = require('pg');

const connectionString = process.env.dataBaseURI;

const pool = new Pool({
	connectionString: connectionString,
});

const getStatsQuery =
	'SELECT nickname, count(nickname), floor(extract(EPOCH from sum(getIdleTime(idletime)))) AS idleTime, floor(extract(EPOCH  from sum(getidletime(connectiontime)) - sum(getIdleTime(idletime)))) as liteime, floor(extract(EPOCH  from sum(getidletime(connectiontime)))) as connectionTime, floor(extract(EPOCH from sum(getIdleTime(idletime))) /  extract(EPOCH  from sum(getIdleTime(connectiontime))) *100) as idleRatio, floor(extract(EPOCH  from sum(getidletime(connectiontime)) - sum(getIdleTime(idletime))) /  extract(EPOCH  from sum(getIdleTime(connectiontime))) *100)  as liteimeRatio, floor(extract(EPOCH  from sum(getidletime(connectiontime))) /  (SELECT extract(EPOCH  from sum(getidletime(connectiontime))) from public.logs) *100) as connectionTimeRatio from public.logs group by nickname';
const getTotalStatsQuery =
	'SELECT sum(getIdleTime(idletime)) as totalIdle, sum(getidletime(connectiontime)) - sum(getIdleTime(idletime)) as totalliteime, sum(getidletime(connectiontime)) as totalconnectionTime  from public.logs';

const getStats = async () => {
	let results = await pool.query(getStatsQuery);
	let totalresults = await pool.query(getTotalStatsQuery);
	if (!results) {
		throw {
			status: 500,
			message: "Couldn't get results",
		};
	}
	return { rows: results.rows, total: totalresults.rows };
};

module.exports = getStats;
