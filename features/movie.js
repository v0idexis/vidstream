const express = require("express");
const router = express.Router();
const axios = require("axios");
let tmdbKey = process.env.TMDB_API;
const vidAPI = process.env.VIDAPI;
const vidAPI2 = process.env.VIDAPI2;

// router middleware
// router.use((req, res, next) => {
//     console.log('Time: ', Date.now())
//     next()
// })

// query route
router.get('/details/:cid', async (request, response) => {
    let movieId = request.params.cid;
    let movieObj = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${tmdbKey}`);
    let movieData = movieObj.data;
    console.log(movieData);
    let payload = {
        title: movieData.title,
        description: movieData.overview,
        year: String(movieData.release_date).split('-')[0],
        poster: `https://image.tmdb.org/t/p/original${movieData.poster_path}`,
        backdrop: `https://image.tmdb.org/t/p/original${movieData.backdrop_path}`
    };

    response.send(payload);
});

router.get('/stream/:cid', async (request, response) => {
    console.log(request.params);
    let query = request.query.server;
    let movieId = request.params.cid;
    let link = '';
    console.log(query);
    if (query === '2') {
        link = `${vidAPI2}${movieId}`;
    }
    else {
        link = `${vidAPI}/movie/${movieId}`;
    }
    let payload = {
        link: link
    };

    response.send(payload);
});

module.exports = router