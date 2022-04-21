const router = require('express').Router();
const {createShortURL, handleShortURL, getURLCreatedInWeek} = require('../services/shortUrl.services');
const { requireAuth, checkUser } = require('../middlewares/authMiddleware');
router.get('/', (req,res)=>{
    res.send('Make a POST request with fullURl to get a short URL')
});

router.post('/',requireAuth, createShortURL);
router.get('/:shortURL', handleShortURL);
router.get('/data/geturlcreatedinweek', getURLCreatedInWeek);

module.exports = router;