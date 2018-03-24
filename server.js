const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
require('dotenv').config();

const app = express();

massive(process.env.MASSIVE_IRL)
    .then(dbInstance => {
        console.log('Database has been connected. Woohoo!') || app.set('db', dbInstance);
    })
    .catch(err => {
        console.error(err);
    })

app.use(cors());
app.use(bodyParser.json());

app.get('/api/shelf/:id', (req, res) => {
    const bins = [null, null, null, null, null];
    const db = app.get('db');
    const id = req.params.id.toLowerCase();
    const shelf = `shelf_${ id }`;
    db[shelf].find()
        .then(dbBins => {
            for (let i = 0; i < 5; i++) {
                if (dbBins[i] !== undefined && dbBins[i] !== null) {
                    bins.splice((dbBins[i].id - 1), 1, dbBins[i]);
                }
            }
            res.send(bins);
        });
});

app.get('/api/bin/:id', (req, res) => {
    const db = app.get('db');
    const idFromFrontEnd = req.params.id;
    const shelfId = idFromFrontEnd.substr(0, 1).toLowerCase();
    const binId =  parseInt(idFromFrontEnd.substr(1, 1), 10);
    const shelf = `shelf_${ shelfId }`;

    db[shelf].findOne({ id: binId })
        .then(binProperties => {
            res.send(binProperties);
        });
});

app.put('/api/bin/:id', (req, res) => {
    const db = app.get('db');
    const putBin = {
        id: req.body.binId,
        bin_num: 'Bin ' + req.body.binId, 
        name: req.body.name,
        price: req.body.price
    };
    const idFromFrontEnd = req.params.id;
    const shelfId = idFromFrontEnd.substr(0, 1).toLowerCase();
    const binId =  parseInt(idFromFrontEnd.substr(1, 1), 10);
    const shelf = `shelf_${ shelfId }`;
    db[shelf].save(putBin)
        .then(newBin => {
            res.send(newBin);
        });
});

app.delete('/api/bin/:id', (req, res) => {
    const db = app.get('db');
    const idFromFrontEnd = req.params.id;
    const shelfId = idFromFrontEnd.substr(0, 1).toLowerCase();
    const binId =  parseInt(idFromFrontEnd.substr(1, 1), 10);
    const shelf = `shelf_${ shelfId }`;
    let bin

    db[shelf].findOne({ id: binId })
        .then(formerBin => {
            bin = formerBin;
            return db[shelf].destroy({ id: binId });
        })
        .then(() => {
            res.send(bin);
        });
});
app.post('/api/bin/:id', (req, res) => {
    const db = app.get('db');
    const postBin = {
        id: req.body.binId,
        bin_num: 'Bin ' + req.body.binId, 
        name: req.body.name,
        price: req.body.price
    };
    const idFromFrontEnd = req.params.id;
    const shelfId = idFromFrontEnd.substr(0, 1).toLowerCase();
    const binId =  parseInt(idFromFrontEnd.substr(1, 1), 10);
    const shelf = `shelf_${ shelfId }`;
    const binIndex = binId - 1;
    db[shelf].insert(postBin)
        .then(newBin => {
            res.send(newBin);
        });
});

const port = process.env.PORT;
app.listen(port, ()=>{console.log(`Listening on port ${port}`)});