const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const rootRouter  = require('./routes/index');
const cors = require('cors');


//cors
app.use(cors());
app.use(express.json());  

//routes
app.use('/api/v1/',rootRouter);





app.listen(port,()=>{
    console.log(`Listening on the port ${port}`);
})
