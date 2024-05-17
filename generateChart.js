// Require necessary modules
const sqlite3 = require('sqlite3').verbose();
const Chart = require('chart.js');
const fs = require('fs');

// Connect to SQLite database
const db = new sqlite3.Database('C:/Users/hp/model_data.db');

// Fetch data from the database
db.all('SELECT RMSE, Model FROM RMSE_Forecast', (err, rows) => {
    if (err) {
        console.error(err.message);
        return;
    }

    // Arrays to store labels and RMSE values
    const labels = [];
    const rmseValues = [];

    // Extract RMSE and Model from fetched rows
    rows.forEach(row => {
        labels.push(row.Model);
        rmseValues.push(row.RMSE);
    });

    // Write data to a JSON file
    const data = {
        labels: labels,
        rmseValues: rmseValues
    };
    fs.writeFileSync('chartData.json', JSON.stringify(data));

    // Close the database connection
    db.close();
});

