// app.js
const express = require('express');
const getOracleConnection = require('db');

const path = require('path');
const fs = require('fs');


const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.use(express.static(path.join(__dirname, 'public')));
const readSqlFile = (fileName) => {
    const filePath = path.join(__dirname, 'sql', fileName);
    return fs.readFileSync(filePath, 'utf8');
  };
// Route to fetch data and render the chart
app.get('/data', (req, res) => {
  //  const sql = 'SELECT * FROM your_table'; // Replace with your SQL query

  const connection = await getOracleConnection();
  //const sqlFileName = 'query.sql';

  // Read SQL query from file
  const sqlString = readSqlFile(sqlFileName);
console.log ( sqlString);
  
  const sqlFileName = 'query.sql';
  
  // Read SQL query from file
 // const sqlString = readSqlFile(sqlFileName);
console.log ( sqlString);
const conn = await database.getConnection();
  const results = await conn.execute(sqlString);

    database.query(sqlString, (err, results) => {
      if (err) throw err;
  
      // Convert results to JSON
      const jsonData = JSON.stringify(results);
  console.log (jsonData)
      // Render the HTML table with dynamic column names
      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Data Table</title>
        </head>
        <body>
          <table>
            <thead>
              <tr>
                ${results[0].map(key => `<th>${key}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${results.map(row => `<tr>${row.map(value => `<td>${value}</td>`).join('')}</tr>`).join('')}
            </tbody>
          </table>
        </body>
        </html>
      `);
    });
  });

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
