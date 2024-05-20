import express from 'express';
const app = express();

// Example middleware functions
export  async function logger(req, res, next) {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
}

export  async  function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
}