let mysql2 = require("mysql2");
let express = require("express");
let crypto = require("crypto");
let cors = require("cors");
let router = express.Router();
router.use(express.json());
router.use(cors());

let con = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "urlShortener",
});

// con.query(table,(err,result)=>{
//   if(err){
//     console.log('error:',err);
//   }else{
//     console.log("success:", result)
//   }
// })

router.get("/database", (req, res) => {


  con.connect((err) => {
    if (err) {
      return res.send("Connect was failed:", err);
    } else {
      return res.send("connect was successful");
    }
  });
});

router.post("/database", (req, res, next) => {
  let url = req.body.url;
  //   res.redirect("https://youtube.com")
  // return  next()
  if (url && url.startsWith("https://")) {
    generateShortURL(url, res);
    return console.log("url is correct");
  } else {
    return console.log("url is not correct");
  }
});

function generateShortURL(url, res) {
  if (!url) {
    return res.status(403).json({
      status: "error",
      description: "error occure while making url short",
    });
  }
  let hash = crypto.createHash("md5").update(url).digest("hex");
  databaseSaving(url, hash.slice(0, 4), res);
}

function databaseSaving(url, shortURL, res) {
  let isDuplicateURL = `SELECT * FROM urls WHERE original_url = ?`;
  con.query(isDuplicateURL, [url], (err, result) => {
    if (err) {
      return console.log("Error occure while chekcing duplicate query:", err);
    }
    if (result.length > 0) {
      return console.log("It's a duplicate URL Entery");
    }
  });

  let insertURL = "INSERT INTO urls(original_url,short_url) VALUES (?,?)";

  con.query(insertURL, [url, shortURL], (err, result) => {
    if (err) {
      return console.log("URLS could not send to database:", err);
    } else {
      return console.log("URLS has been send to database successfully");
    }
  });

  let selectURL = "SELECT short_url FROM urls WHERE original_url = ?";

  con.query(selectURL, [url], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Error",
        description: "Error Occure in URL",
      });
    } else {
      return res.status(200).json({
        status: "Success",
        description: result,
      });
    }
  });
}

module.exports = {
  router,
  con,
};
