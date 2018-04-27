const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
require('dotenv').config();

const app = express();

app.use(express.static('./client/build'));

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
            res.status = 200;
            res.status(200).send(bins);
        })
        .catch(handleDbError(res));
});

app.get('/api/bin/:id', (req, res) => {
    const db = app.get('db');
    const idFromFrontEnd = req.params.id;
    const shelfId = idFromFrontEnd.substr(0, 1).toLowerCase();
    const binId =  parseInt(idFromFrontEnd.substr(1, 1), 10);
    const shelf = `shelf_${ shelfId }`;

    db[shelf].findOne({ id: binId })
        .then(binProperties => {
            res.status(200).send(binProperties);
        })
        .catch(handleDbError(res));
});

app.put('/api/bin/:id', (req, res) => {
    const db = app.get('db');
    const putBin = {
        id: parseInt(req.body.binId, 10),
        bin_num: 'Bin ' + req.body.binId, 
        name: req.body.name,
        price: parseInt(req.body.price, 10)
    };
    const idFromFrontEnd = req.params.id;
    const shelfId = idFromFrontEnd.substr(0, 1).toLowerCase();
    const binId =  parseInt(idFromFrontEnd.substr(1, 1), 10);
    const shelf = `shelf_${ shelfId }`;
    db[shelf].save(putBin)
        .then(newBin => {
            res.status(200).send(newBin);
        })
        .catch(handleDbError(res));
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
            res.status(200).send(bin);
        })
        .catch(handleDbError(res));
});
app.post('/api/bin/:id', (req, res) => {
    const db = app.get('db');
    const postBin = {
        id: parseInt(req.body.binId, 10),
        bin_num: 'Bin ' + req.body.binId, 
        name: req.body.name,
        price: parseInt(req.body.price, 10)
    };
    const idFromFrontEnd = req.params.id;
    const shelfId = idFromFrontEnd.substr(0, 1).toLowerCase();
    const binId =  parseInt(idFromFrontEnd.substr(1, 1), 10);
    const shelf = `shelf_${ shelfId }`;
    const binIndex = binId - 1;
    db[shelf].insert(postBin)
        .then(newBin => {
            res.status(200).send(newBin);
        })
        .catch(handleDbError(res));
});

const port = process.env.PORT || 4000 ;
app.listen(port, ()=>{console.log(`Listening on port ${port}`)});

function handleDbError(res) {
    return (err) => {
        console.warn('hit a snag');
        console.error(err);
        
        if (err.code == 'ECONNRESET') {
            return res.status(500).send({ message: 'something died again' });
        }
        if (err.code == '22P02') {
            res.status(422).send({ message: 'The request had incorrect or missing properties: ' + err.message });
        }
        res.status(500).send({ message: 'Internal Server Error' })
    };
}