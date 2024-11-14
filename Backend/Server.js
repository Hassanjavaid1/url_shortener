let express = require("express");

let {router:database,con} = require("./database");
let me = require("./me")
let cors = require("cors");


let app = express();
let port = 3000;
app.use(cors());

app.get("/Server", (req, res) => {
  return res.send("Hello Wordl");
});

app.use("/", database);
app.use("/",me)
app.listen(port, console.log("app is running on port:", port));
