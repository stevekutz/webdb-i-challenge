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
  // ADD new post 
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





module.exports = router;