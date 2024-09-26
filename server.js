const express = require('express');
const helmet = require('helmet');  // hides headers 
const logger = require('morgan');  // logger thingy

const AccountsRouter = require('./data/accountsRouter.js');

const server = express();

// ADD GOBAL middleware
server.use(express.json());

// ADD 3rd party middleware
server.use(helmet());
server.use(logger('dev'));

// ADD custom middleware
server.use(myLogger);

// router endpoint called
server.use('/accounts', AccountsRouter);




// DEFINE custom middleware
// myLogger
function myLogger(req, res, next){
  
    //  console.log('### req', req);
     console.log(
       ` >>> a ${req.method} method Requesteeee was made 
         >>> from url  ${req.url} 
         >>> at ${new Date().toISOString()}  from myLogger`);
     next(); // MUST be called in order to let "next" middlewqware(e.g. morgan) continue
   };

module.exports = server;