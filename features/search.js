const express = require("express");
const router = express.Router();
const axios = require("axios");
let apiKey = process.env.TMDB_API;

// router middleware
// router.use((req, res, next) => {
//     console.log('Time: ', Date.now())
//     next()
// })

// query route
router.get('/:query', async (req, res) => {
    let query = req.params.query;
    let searchData = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`);
    let searchObj = searchData.data.results;
    let totalRes = searchData.data.total_results;
    if (totalRes > 5) {
        searchObj = searchObj.slice(0, 5);
    }
    let resultsArr = [];
    searchObj.forEach(item => {
        resultsArr.push({
            title: item.original_title,
            id: item.id
        });
    });
    res.send(resultsArr);
})

module.exports = router