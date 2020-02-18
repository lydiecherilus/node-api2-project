// implement your API here
//import express from 'express'; 
const express = require('express');
const welcomeRouter = require('./welcome/welcome-router')
const dbRouter = require('./data/db-router')

const cors = require('cors');
const Posts = require('./data/db.js');

const server = express();

server.use(cors());
server.use(express.json());
server.use('/', welcomeRouter)
server.use('/api/posts', dbRouter)




const port = 5000;
server.listen(port, () => console.log(`\n** API on port ${port}  \n`));