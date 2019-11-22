const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const sgMail = require('@sendgrid/mail');

const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');

const users = require("./routes/api/users");
const events = require("./routes/api/events");
const posts = require("./routes/api/posts");
const chats = require("./routes/api/chats");
const reservations = require("./routes/api/reservations");

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello satin, a smooth fabric"));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/events", events);
app.use("/api/posts", posts);
app.use("/api/chats", chats);
app.use("/api/reservations", reservations);

io.on('connection', () =>{
 console.log('a user is connected');
});

app.post('/api/send_email', (req, res) => {
  // DEFINE API KEY FOR SENDGRID
  sgMail.setApiKey(
    ""
  );
  const msg = {
    to: 'juliawang105@gmail.com',
    from: 'isomdurm@gmail.com',
    subject: 'New Message From Portfolio',
    text: 'test',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };

  sgMail.send(msg);
});


// configure the keys for accessing AWS
AWS.config.update({
  region: "us-west-1",
  accessKeyId: "",
  secretAccessKey: "",
  ServerSideEncryption: "AES256",
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: "",
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};

// Define POST route
app.post('/test-upload', (request, response) => {
  const form = new multiparty.Form();
    form.parse(request, async (error, fields, files) => {
      if (error) throw new Error(error);
      try {
        const path = files.file[0].path;
        const buffer = fs.readFileSync(path);
        const type = fileType(buffer);
        const timestamp = Date.now().toString();
        const fileName = `bucketFolder/${timestamp}-lg`;
        const data = await uploadFile(buffer, fileName, type);
        return response.status(200).send(data);
      } catch (error) {
        return response.status(400).send(error);
      }
    });
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
