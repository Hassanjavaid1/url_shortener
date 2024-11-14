const { con, router } = require("./database");
let cors = require("cors");

router.use(cors());

router.get("/me/:code", (req, res) => {
  const { code } = req.params;
  if (code) {
    let findOrgUrl = "SELECT original_url FROM urls WHERE short_url = ?";

    con.query(findOrgUrl, [code], (err, result) => {
      if (result.length <= 0 || err) {
        return res.status(404).json({
          status: "Error",
          description: "The URL you are looking for is not exist😭",
        });
      }
console.log("Hello in the world of web development!")
      let originalURL = result[0].original_url;
      return res.redirect(originalURL);
    });
  }
});

module.exports = router;
