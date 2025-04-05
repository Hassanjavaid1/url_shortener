const db = require("../config/db");
const route = require("express").Router();

route.get("/linkify-shortener.vercel.app/:code/:user", (req, res) => {
  const { code, user } = req.params;
  console.log(code, user);

  if (code) {
    let selectQuery =
      "SELECT original_url FROM urls WHERE short_url=? AND user_id=?";
    db.query(selectQuery, [code, user], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send({
          status: "Error",
          description: "Internal server error occur",
        });
      }

      if (result.length == 0) {
        return res.status(404).json({
          status: "error - 404",
          description: "The URL you are looking for is not exist😭",
        });
      }
      // Update Clicks.

      let clicksQuery =
        "UPDATE urls SET clicks=clicks+1 WHERE short_url=? AND user_id=?";
      db.query(clicksQuery, [code, user], (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send({
            status: "Error",
            description: "Internal server error occur",
          });
        }
        return res.redirect(result[0]?.original_url);
      });
    });
  }
});

module.exports = route;
