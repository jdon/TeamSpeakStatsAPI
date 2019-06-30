const { Pool } = require('pg');

const connectionString = process.env.dataBaseURI;

const pool = new Pool({
	connectionString: connectionString,
});

const getStatsQuery =
	'SELECT nickname, count(nickname), floor(extract(EPOCH from sum(getIdleTime(idletime)))) AS idleTime, floor(extract(EPOCH  from sum(getidletime(connectiontime)) - sum(getIdleTime(idletime)))) as liteime, floor(extract(EPOCH  from sum(getidletime(connectiontime)))) as connectionTime, floor(extract(EPOCH from sum(getIdleTime(idletime))) /  extract(EPOCH  from sum(getIdleTime(connectiontime))) *100) as idleRatio, floor(extract(EPOCH  from sum(getidletime(connectiontime)) - sum(getIdleTime(idletime))) /  extract(EPOCH  from sum(getIdleTime(connectiontime))) *100)  as liteimeRatio, floor(extract(EPOCH  from sum(getidletime(connectiontime))) /  (SELECT extract(EPOCH  from sum(getidletime(connectiontime))) from public.logs) *100) as connectionTimeRatio from public.logs group by nickname';
const getTotalStatsQuery =
	'SELECT sum(getIdleTime(idletime)) as totalIdle, sum(getidletime(connectiontime)) - sum(getIdleTime(idletime)) as totalliteime, sum(getidletime(connectiontime)) as totalconnectionTime  from public.logs';

const getTimeDataQuery =
	"select date_trunc('seconds',timestamp) AS time, array_agg(nickname) as nicknames, count(nickName) as nicknamecount from public.logs group by date_trunc('seconds',timestamp) HAVING count(nickName) >= 1 order by date_trunc('seconds',timestamp)";

const getLabelsQuery =
	"select date_trunc('seconds',timestamp)  from public.logs";

const getValidLabelsQuery =
	"select date_trunc('seconds',timestamp)  from public.logs group by date_trunc('seconds',timestamp) HAVING count(nickName) >= 1";

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

const getTimeData = async () => {
	let results = await pool.query(getTimeDataQuery);
	if (!results) {
		throw {
			status: 500,
			message: "Couldn't get results",
		};
	}
	return results.rows;
};

const getTimeLabels = async () => {
	let results = await pool.query(getLabelsQuery);
	if (!results) {
		throw {
			status: 500,
			message: "Couldn't get results",
		};
	}
	return results.rows;
};

const getValidTimeLabels = async () => {
	let results = await pool.query(getValidLabelsQuery);
	if (!results) {
		throw {
			status: 500,
			message: "Couldn't get results",
		};
	}
	return results.rows;
};

module.exports = {
	getStats: getStats,
	getTimeData: getTimeData,
	getTimeLabels: getTimeLabels,
	getValidTimeLabels: getValidTimeLabels,
};
