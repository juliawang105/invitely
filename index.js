const express = require("express");
const index = express();
const db = require("./config/keys").mongoURI;
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const events = require("./routes/api/events");
mongoose

  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

index.get("/", (req, res) => res.send("Hello World"));

index.use(bodyParser.urlencoded({ extended: false }));
index.use(bodyParser.json());

index.use("/api/users", users);
index.use("/api/events", events);

const port = process.env.PORT || 5000;
index.listen(port, () => console.log(`Server is running on port ${port}`));
