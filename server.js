const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./connection"); 
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "frontend"))); 

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM login WHERE username = ? AND password = ?",
    [username, password],
    (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
        res.sendFile(path.join(__dirname, "frontend", "index4.html"));
      } else {
        res.send("<h2>❌ Invalid username or password</h2>");
      }
    }
  );
});

app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM login WHERE username = ?",
    [username],
    (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
        res.send("<h2>⚠️ Username already exists. Try another.</h2>");
      } else {
        db.query(
          "INSERT INTO login (username, password) VALUES (?, ?)",
          [username, password],
          (err, result) => {
            if (err) throw err;
            console.log("✅ New user created:", username);

            res.sendFile(path.join(__dirname, "frontend", "index4.html"));
          }
        );
      }
    }
  );
});

app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
