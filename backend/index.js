const express = require("express");
const app = express();
const mainRouter = require("./routes/index");

app.use('/api/v1',mainRouter);

app.listen(port,()=>{
    console.log('server is listening on port ${port}');
});