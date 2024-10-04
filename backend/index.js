const express = require("express");
const cors = require("cors");
const app = express();
const mainRouter = require("./routes/index");

app.use(cors());
app.use(express.json());
app.use('/api/v1',mainRouter);

app.listen(port,()=>{
    console.log('server is listening on port ${port}');
});