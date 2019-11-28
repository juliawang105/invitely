const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const sgMail = require('@sendgrid/mail');
const path = require('path');
const keys = require('./config/keys');

const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');

const users = require("./routes/api/users");
const events = require("./routes/api/events");
const posts = require("./routes/api/posts");
const chats = require("./routes/api/chats");
const todos = require("./routes/api/todos");
const reservations = require("./routes/api/reservations");

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello darkness my old friend"));

app.use(passport.initialize());
require('./frontend/passport')(passport);

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/events", events);
app.use("/api/posts", posts);
app.use("/api/chats", chats);
app.use("/api/reservations", reservations);
app.use("/api/todos", todos);

io.on('connection', () =>{
 console.log('a user is connected');
});

app.post('/api/send_email', (req, res) => {
  // DEFINE API KEY FOR SENDGRID
  sgMail.setApiKey(
    keys.accessKey
  );

  const msg = {
    to: req.body.event_email,
    from: 'events@invite.ly',
    templateId: 'd-c91121327f2340e8b12e0905cae41c01',
    dynamicTemplateData: {
      subject: 'Save the Date - Join Us',
      event_name: req.body.event_name,
      event_location: req.body.event_location,
      event_time: req.body.event_time,
      event_url: req.body.event_url
    },
  };

  sgMail.send(msg);
});


// configure the keys for accessing AWS
AWS.config.update({
  region: "us-west-1",
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretKey,
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
    Bucket: process.env.bucketName,
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
app.listen(process.env.PORT || 5000);
