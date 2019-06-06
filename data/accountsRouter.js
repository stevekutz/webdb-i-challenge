const express = require('express');

const Accounts = require('./accounts-model');

const router = express.Router();

// GET all accounts
router.get('/', async (req, res) => {
    try {
        const accounts = await Accounts.find();
        res.status(200).json(accounts);
      } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the account info',
        });
      }
});

// ADD some account info
  router.post('/', async (req, res) => {
    
    const newAccount = req.body;  
      try {
        const post = await Accounts.add(newAccount);
        res.status(201).json(newAccount);
      } catch (error) {
        console.log(error);
        res.status(500).json({
          error: 'There was an error while saving the account to the database',
        });
      }   
});


// GET an account by Id
router.get('/:id', checkID, async(req, res) => {
    res.status(200).json(req.accountWithID)
});


// custom  Middleware for verifying id  !!!!
async function checkID(req, res, next) {
    const {id} = req.params;
    const accountWithID = await Accounts.findById(id);

    try {
        if(accountWithID) {
            req.accountWithID = accountWithID;
            next();
        } else {
            res.status(404).json({
                message: `The account with id ${id} is not registered in the database`
            })
        }
    } catch {
        res.status(500).json({
            message: 'Error retrieving the account info from CheckID custom middleware',
          });
    }
}



module.exports = router;