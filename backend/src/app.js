require('dotenv').config();

const express = require('express');
const app = express();
const mysql = require('mysql2/promise');
const cors = require('cors');

app.use(cors({
	origin: '*',
	maxAge: 1728000,
}));

const places = require('./routes/places');
app.use('/places.get', places.get);

const favorites = require('./routes/favorites');
app.use('/favorites.get', favorites.get);
app.use('/favorites.set', favorites.set);
app.use('/favorites.remove', favorites.remove);

const server = app.listen(process.env.SERVER_PORT, process.env.SERVER_ADDRESS, (err) => {
	if (err) {
		console.error(err);
		return;
	}
	console.debug(`Server running at http://${server.address().address}:${server.address().port}`);
});

/* DATABASE */
(async () => {
	// TODO
	global.db = await mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		connectionLimit: 10000,
		maxIdle: 10000,
		idleTimeout: 2592000000,
		enableKeepAlive: true,
		keepAliveInitialDelay: 2592000000,
	});
})();
/* DATABASE */
