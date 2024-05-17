const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Open the database
const db = new sqlite3.Database("C:/Users/hp/model_data.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

// Query to fetch data
const query = 'SELECT Date, ActualAll, ActualSar, PredArima, ResArima, PredANN, ResANN, PredSar, ResSar, PredETS, ResETS, PredSVR, ResSVR, PredProphet, ResProphet, PredLTSM, ResLTSM, ActResHy, PredResHy, HyRes FROM All_Actual_Predictions_Residuals';

// Fetch data from the database
db.all(query, [], (err, rows) => {
    if (err) {
        console.error(err.message);
    }

    // Write the data to a JSON file
    fs.writeFile('All_Actual_Predictions_Residuals.json', JSON.stringify(rows, null, 2), 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Data has been saved to All_Actual_Predictions_Residuals.json');
    });

    // Close the database connection
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    });
});
