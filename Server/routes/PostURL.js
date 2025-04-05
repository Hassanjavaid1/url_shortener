const db = require("../config/db");
const crypto = require("crypto");

const route = require("express").Router();

route.post("/", (req, res) => {
  const { userId, url } = req?.body;
  //console.log("Data checked point", userId, url);
  //check request url.

  if (!url || JSON.stringify(url).startsWith("https") || !userId) {
    return res
      .status(400)
      .json({ status: "Error", description: "Invalid url." });
  }

  // Check duplicate url

  let duplicateQuery = "SELECT * FROM urls WHERE original_url=? AND user_id=?";
  let historyQuery = "SELECT * FROM urls WHERE user_id=?";

  db.query(duplicateQuery, [url, userId], (err, result) => {
    if (err) {
      return res.status(500).send({
        status: "Error",
        description: "Internal server error occur",
      });
    }

    // Get User History.

    db.query(historyQuery, [userId], (err, historyResult) => {
      if (err) {
        console.log(err);
        return res.status(500).send({
          status: "Error",
          description: "Internal server error occur",
        });
      }
      // console.log("USER IDs", userId, result[0].user_id);
      // console.log(
      //   "RESULT INDEX CHECKED",
      //   result,
      //   result[0].user_id,
      //   result[1].user_id
      // );

      if (result.length > 0) {
        //&& userId == result[0].user_id
        //  console.log("Duplicate result", userId, result[0].user_id);
        console.log("History result", historyResult);

        // Final response
        return res.status(200).json({
          status: "success",
          data: {
            original_url: url,
            short_url: `https://linkify-shortener.vercel.app/${result[0]?.short_url}/${result[0]?.user_id}`,
            // short_url: `http://localhost:3000/linkify/${result[0]?.short_url}/${userId}`,
            clicks: result[0]?.clicks,
            created_at: result[0]?.created_at,
            user_id: result[0]?.user_id,
            user_history: historyResult,
          },
        });
      }

      // Create short link.

      let shortURL_Hash = crypto
        .createHash("md5")
        .update(url)
        .digest("hex")
        .slice(0, 4);

      let createQuery =
        "INSERT INTO urls(original_url,short_url,user_Id) VALUES (?,?,?)";
      let getHistoryQuery = "SELECT * FROM urls WHERE user_id=?";

      db.query(createQuery, [url, shortURL_Hash, userId], (err) => {
        if (err) {
          console.log("Inserting data error", err);
          return res.status(500).send({
            status: "Error",
            description: "Internal server error occur",
          });
        }

        // Final History Query

        db.query(getHistoryQuery, [userId], (err, finalResult) => {
          if (err) {
            console.log("Inserting data error", err);
            return res.status(500).send({
              status: "Error",
              description: "Internal server error occur",
            });
          }

          if (finalResult.length > 0) {
            // Get inserted results.

            let getQuery = "SELECT * FROM urls WHERE original_url=?";
            db.query(getQuery, [url], (err, result) => {
              if (err) {
                console.log("Inserting data error", err);
                return res.status(500).send({
                  status: "Error",
                  description: "Internal server error occur",
                });
              }

              // Sent Final response.

              console.log("Final history", finalResult);
              //console.log("Final response", result);
              return res.status(201).json({
                status: "success",
                data: {
                  id: result[0]?.id,
                  original_url: result[0]?.original_url,
                  short_url: `https://linkify-shortener.vercel.app/${result[0]?.short_url}/${result[0]?.user_id}`,
                  //short_url: `http://localhost:3000/linkify/${result[0]?.short_url}/${userId}`,
                  clicks: result[0]?.clicks,
                  created_at: result[0]?.created_at,
                  user_id: result[0]?.user_id,
                  user_history: finalResult,
                },
              });
            });
          }
        });
      });
    });
  });
});

module.exports = route;
