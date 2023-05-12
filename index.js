const express = require("express");
const route = require("./router/router")

const app = express();

const cors = require("cors");
app.use(express.json());
app.use(cors({
    origin:"*"
}))

app.use("/",route);

app.get("/home",(req,res)=>{
    res.send("Api is running fine!");
})

app.listen(5000,()=>{
    console.log("server is running at port 5000")
})