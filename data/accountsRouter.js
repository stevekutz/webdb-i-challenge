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
        console.log(">>>>>  errno is", error.errno)
        
        if(error.errno === 19) {
            res.status(451).json({
                error: `That account name has already been taken`
            })
        } else {
            res.status(500).json({
                error: 'There was an error while saving the account to the database',
              }); 
        }
      }   
});


// GET an account by Id
router.get('/:id', checkID, async(req, res) => {
    res.status(200).json(req.accountWithID)
});

// DELETE by id
router.delete('/:id', checkID, async(req, res) => {
    const {id} = req.params;

    try {
        const totalAccounts = await Accounts.remove(id);
        
        if(totalAccounts > 0) {
            res.status(200).json({
                message: ` Account with id ${id} has been removed`
            })
        } else {
            res.status(404).json({
                message: ` DELETE ERR - should never be seen`
            });
        }

    } catch (error) {
        console.log(error.errno);
         
        res.status(500).json({
          error: 'There was an error DELETING the account from the database',
        });
      } 

});


// UPDATED by id
router.put('/:id', checkID, async(req, res) => {
    const {id} = req.params;
    const updatedAccount = req.body;

    try {
        const accountUpdateAttempt = await Accounts.update(id, updatedAccount);

        if(accountUpdateAttempt) {
            res.status(200).json(updatedAccount);
        } else {
            res.status(404).json({
                message: "UPDATE ERR - should never be seen"
            })
        }

    } catch (error) {
        console.log(error.errno);
         
        res.status(500).json({
          error: 'There was an error UPDATING the account from the database',
        });
      } 

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