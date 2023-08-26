require("dotenv").config();
const express = require('express');
const app = express();
// app.use(express.json());
const PORT = process.env.PORT || 5000;
const vidAPI = process.env.VIDAPI;

// importing search
const search = require("./features/search");

app.use('/search', search);


app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

app.get('/test', (request, response) => {
    let status = {
        Status: 'running'
    };

    response.send(status);
});

app.get('/movie/:cid', (request, response) => {
    console.log(request.params);
    let payload = {
        link: `${vidAPI}/movie/${request.params.cid}`
    };

    response.send(payload);
});


