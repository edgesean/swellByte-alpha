const express = require('express');
const router = require('./router');
const cors = require('cors');
const port = 3003;
const app = express();
require('dotenv').config();



app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => console.log('running on port localhost:' + port));