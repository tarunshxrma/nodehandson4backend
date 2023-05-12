const {home,bollywood,technology,hollywood,fitness,food} = require("../controller/data");
const {register,login} = require("../controller/register")
const verifyUser = require("../middleware/middleware")

const route = require("express").Router();

route.get("/api/home",verifyUser,home)
route.get("/api/bollywood",verifyUser,bollywood)
route.get("/api/technology",verifyUser,technology)
route.get("/api/hollywood",verifyUser,hollywood)
route.get("/api/fitness",verifyUser,fitness)
route.get("/api/food",verifyUser,food)
route.post("/api/register",register)
route.post("/api/login",login)

module.exports = route;
