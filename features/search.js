const express = require('express');
const router = express.Router()

// router middleware
// router.use((req, res, next) => {
//     console.log('Time: ', Date.now())
//     next()
// })

// query route
router.get('/:query', (req, res) => {
    res.send(`Testing query ${req.params.query}`)
})

module.exports = router