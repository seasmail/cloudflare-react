import express from 'express';
import axios from 'axios';
import converter from 'hex2dec';

import { data, url } from './consts.js';

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api/block/latest", (req, res) => {
    const options = {
        headers: {'Content-Type': 'application/json'}
    };

    axios.post(url, {...data, "params":["latest", true]}, options)
        .then(r => res.json(r.data))
        .catch(err => res.send(err));
});

app.get("/api/block/:id", (req, res) => {
    const options = {
        headers: {'Content-Type': 'application/json'}
    };

    const paramId = req.params.id;
    const id = paramId.includes('0x') ? paramId : converter.decToHex(paramId);
    axios.post(`${url}`, {...data, "params":[id, true]}, options)
        .then(r => res.json(r.data))
        .catch(err => res.send(err));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});




