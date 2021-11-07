require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const mainRouter = require("./routes/main")

//middleware errors require
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


// middleware to load frontEnd
app.use(express.static('./public'));

//middleware to load req.body data
app.use(express.json());

//to handle the routers
app.use("/api/v1",mainRouter)

//middleware errors
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
