if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const { Pool } = require('pg');
const connectionString = process.env.CONNECT_DB;


const pool = new Pool({
    connectionString,
});
pool.connect();

module.exports = pool;
