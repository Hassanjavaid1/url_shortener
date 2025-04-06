const db = require("../config/db");
const route = require("express").Router();
const cors = require("cors")

app.use(
  cors({
    origin: "https://linkify-shortener.vercel.app",
  })
);

route.get("/", (req, res) => {
  const { userId } = req.query;

  if (!userId || userId == "") {
    return res
      .status(400)
      .json({ status: "error", description: "Bad request." });
  }

  const getQuery =
    "SELECT * FROM urls WHERE user_id = ?";
  db.query(getQuery, [userId], (err, data) => {
    if (err) {
      console.log("Inserting data error", err);
      return res.status(500).send({
        status: "Error",
        description: "Internal server error occur",
      });
    }

    if (data.length > 0) {
      return res.status(200).json({ status: "success", data });
    }
  });
});

module.exports = route;
