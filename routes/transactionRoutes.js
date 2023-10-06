const transaction = require ('../controllers/transactionCtr.js')
const router = require ('express').Router();

router.post('/all', transaction.createTransaction)

module.exports = router;