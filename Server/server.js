let express = require("express");
require("dotenv").config();

const db = require("./config/db");
const PostURL = require("./routes/PostURL");
const GetURL = require("./routes/GetURL");
const linkifyApi = require("./routes/linkifyApi");

let cors = require("cors");
let app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  return res.send("Hello Wordl");
  // db.connect((err) => {
  //   if (err) {
  //     return console.log("Database connection failed");
  //   }
  //   console.log("Database connection success.");
  // });
});

app.use("/PostURL", PostURL);
app.use("/", GetURL);
app.use("/linkify", linkifyApi);

app.listen(
  process.env.PORT,
  console.log("Server running port:", process.env.PORT)
);
