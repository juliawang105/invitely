const express = require("express");
const index = express();
const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

index.get("/", (req, res) => res.send("Hello World"));

const port = process.env.PORT || 5000;
index.listen(port, () => console.log(`Server is running on port ${port}`));
