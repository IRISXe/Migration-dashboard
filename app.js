const express = require('express');
const getOracleConnection = require('db'); // Adjust the path as needed
const path = require('path');
const fs = require('fs');
const oracledb = require('oracledb'); // Correctly import oracledb

const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const readSqlFile = (fileName) => {
    const filePath = path.join(__dirname, 'sql', fileName);
    return fs.readFileSync(filePath, 'utf8');
};

const executeQuery = async (connection, sqlString) => {
    try {
        // Execute the SQL query
        const result = await connection.execute(sqlString, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
        console.log('Query Result:', result); // Debug output
        return result.rows; // Return rows
    } catch (err) {
        console.error('Error executing query:', err); // Debug output
        throw err;
    }
};

// Route to fetch data and render the chart
app.get('/data', async (req, res) => {
    let connection;
    try {
        connection = await getOracleConnection();
        const sqlFileName1 = 'query1.sql';
        const sqlFileName2 = 'query2.sql';
        const sqlString1 = readSqlFile(sqlFileName1);
        const sqlString2 = readSqlFile(sqlFileName2);

     //   console.log('SQL String 1:', sqlString1);
      //  console.log('SQL String 2:', sqlString2);

        // Execute both queries
        const [result1, result2] = await Promise.all([
            connection.execute(sqlString1),
            connection.execute(sqlString2)

        ]);

        // Process the data from both queries
        const data1 = result1.rows.map(row => ({
            ELEMENT: row[0], // Adjust based on your actual query result
            VALUE: row[1]
        
        }));

        const data2 = result2.rows.map(row => ({
            ELEMENT: row[0], // Adjust based on your actual query result
            VALUE: row[1]
        
        }));
        console.log('Data from Query 1:', data1);
        console.log('Data from Query 2:', data2);

        // Render the dashboard with the fetched data
        if (!res.headersSent) {
            res.render('dashboard', { data1, data2 });
        }

    } catch (err) {
        console.error('Error:', err);
        if (!res.headersSent) {
            res.status(500).send('Server Error');
        }
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Error closing connection:', err);
            }
        }
    }
});

// Route to fetch data as JSON
app.get('/data-json', async (req, res) => {
    let connection;
    try {
        connection = await getOracleConnection();
        const sqlFileName = 'query1.sql';
        const sqlString1 = readSqlFile(sqlFileName);

        // Execute the SQL query
       // const result = await connection.execute(sqlString, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
        const result = await     connection.execute(sqlString1);
        if (!result || !result.rows) {
            throw new Error('No data returned from the query');
        }

        // Process the data
        const data = result.rows.map(row => ({
            ELEMENT: row[0], // Adjust based on your actual query result
            VALUE: row[1]
        }));

        // Send the data as JSON
        res.setHeader('Content-Type', 'application/json');
        res.json(data);

    } catch (err) {
        console.error('Error:', err);
        if (!res.headersSent) {
            res.status(500).send('Server Error');
        }
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Error closing connection:', err);
            }
        }
    }
});

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001/data');
});
