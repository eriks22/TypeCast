'use strict';

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const PORT = 9000;

// Setup 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

// Setup routes
const lobby = require('./Routes/lobby');
app.use("/lobby", lobby);

// Start server
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));