require("dotenv").config();
const express = require('express');
const axios = require("axios");
const app = express();
const cors = require('cors')
// app.use(express.json());
const PORT = process.env.PORT || 5000;
let tmdbKey = process.env.TMDB_API;

// importing movie
const movie = require("./features/movie");

app.use(cors());
app.use('/movie', movie);


app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

app.get('/wake', (request, response) => {
    let status = {
        status: 'running'
    };

    response.send(status);
});

app.get('/search', async (req, res) => {
    // let query = req.params.query;
    let query = req.query.q;
    let searchData = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${tmdbKey}`);
    let searchObj = searchData.data.results;
    let totalRes = searchData.data.total_results;
    if (totalRes > 5) {
        searchObj = searchObj.slice(0, 5);
    }
    let resultsArr = [];
    searchObj.forEach(item => {
        resultsArr.push({
            title: item.title,
            id: item.id,
            year: String(item.release_date).split('-')[0],
            poster: `https://image.tmdb.org/t/p/original${item.poster_path}`,
            overview: item.overview
        });
    });
    res.send({
        body: resultsArr
    });
})


