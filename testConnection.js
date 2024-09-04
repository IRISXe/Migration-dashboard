// testConnection.js
const oracledb = require('oracledb');

async function testConnection() {
    try {
        const connection = await oracledb.getConnection({
            user: 'harsha',          // Replace with your Oracle DB username
            password: 'Passw0rd',      // Replace with your Oracle DB password
            connectString: 'localhost:1521/orcl' // Replace with your Oracle DB connection string
        });

        console.log('Connection was successful!');
        await connection.close();
    } catch (err) {
        console.error('Error connecting to Oracle DB:', err.message);
    }
}
//testConnection.js

testConnection();
