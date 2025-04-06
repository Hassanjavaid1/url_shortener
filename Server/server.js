let express = require("express");
require("dotenv").config();

const db = require("./config/db");
const PostURL = require("./routes/PostURL");
const GetURL = require("./routes/GetURL");
const linkifyApi = require("./routes/linkifyApi");

let cors = require("cors");
let app = express();

const corsOptions = {
  origin: "https://linkify-shortener.vercel.app", // Allow only your specific frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"], // Customize based on your needs
  credentials: true, // Enable credentials if needed (cookies, auth headers, etc.)
};

app.use(cors(corsOptions));

app.use(express.json());

// app.get("/", async (req, res) => {
//   return res.send("Hello Wordl");
//   // db.connect((err) => {
//   //   if (err) {
//   //     return console.log("Database connection failed");
//   //   }
//   //   console.log("Database connection success.");
//   // });
// });

app.use("/", PostURL);
app.use("/", GetURL);
app.use("/", linkifyApi);

app.listen(
  process.env.PORT || 3000,
  console.log("Server running port:", process.env.PORT || 3000)
);
