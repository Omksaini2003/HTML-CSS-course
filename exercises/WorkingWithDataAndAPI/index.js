
console.log('namaste');
const Datastore = require('nedb');

const express = require('express');
const { request, response } = require('express');
const app = express();
const PORT= 3000;

app.listen(PORT, ()=> console.log('listening at 3000'))

app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();
//database.insert({name: 'om', status: 0});

app.post('/api', (request, response) => {
    console.log('i got a request');
    const data = request.body;
    console.log(data);

    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    console.log(database);

    response.json({
        status: 'success',
        timestamp: data.timestamp,
        latitude: data.latitude,
        longitude: data.longitude
    });
});


app.get('/api', (request, response) => {
    database.find({},(err, data)=> {
        if(err){
            response.end();
            return;
        }
        response.json(data);
    })
});





