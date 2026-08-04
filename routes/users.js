const express = require('express');

const router = express.Router();


router.get('/', (req, res) => {

    res.json([
        {
            id: 1,
            name: "John"
        },
        {
            id: 2,
            name: "David"
        }
    ]);

});


module.exports = router;
