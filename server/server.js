const express = require("express");
//const path = require('path');
//const uuid = require('uuidv4');
const bodyParser = require("body-parser");
//const fileUpload = require('express-fileupload');
//const morgan = require('morgan');
const multer = require("multer");
const path = require('path');
//const fs = require('fs');
//const multiparty = require('connect-multiparty');
//const MultipartyMiddleware = multiparty({uploadDir:'./public'});
//var multipart = require('connect-multiparty');
//var multipartMiddleware = multipart({uploadDir: './public'});

//const multipartMiddleware = multipart({uploadDir:'./public'});
const cors = require("cors");

const app = express();
// middle ware
/*
app.use(express.static("public")); //to access the files in public folder
*/
/*
app.use(express.static(__dirname + '/public'));
*/
app.use(express.static("public"));

/*var corsOptions = {
  origin: "http://localhost:8080",
};
corsOptions
*/

app.use(cors());

//app.use(fileUpload());
const db = require("./models/");
const Role = db.role;

db.sequelize
  .sync({
    /*force: true,*/
    
  })
  .then(() => {
    console.log(
      //"Drop and Resync Db"
      "No Drop & Resync"
    );
    //initial();
  });

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });

}

/*

*/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage }).single("file");
var multiupload = multer({ storage: storage }).array("file");

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: "800kb" }));

// simple route
/*app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})*/

/*
app.get("/", (req, res) => {
  res.json({ message: "Welcome to DoanStack application." });
});*/

/*app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type, x-access-token, Origin, Accept');
  next();
});*/

/*
app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});*/




require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/product.routes")(app);
require("./routes/productimg.routes")(app);
require("./routes/productcom.routes")(app);
require("./routes/article.routes")(app);
require("./routes/articlecom.routes")(app);
require("./routes/articleimg.routes")(app);
require("./routes/productRating.routes")(app);

// file upload api
/*
app.post('/upload', (req, res) => {
  if (!req.files) {
      return res.status(500).send({ msg: "file is not found" })
  }
      // accessing the file
  const myFile = req.files.file;
  //  mv() method places the file inside public directory
  myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
      if (err) {
          console.log(err)
          return res.status(500).send({ msg: "Error occured" });
      }
      // returing the response with file path and name
      return res.send({name: myFile.name, path: `/${myFile.name}`});
  });
});

*/
app.post("/uploadfiles", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      url: res.req.file.filename,
      fileName: res.req.file.filename,
    });
  });
});

app.post("/upload", function (req, res) {
  console.log(req);
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    console.log(req.file);
    return res
      .status(200)
      .send({ name: req.file.filename, path: `/${req.file.filename}` });
  });
});

app.post("/multiupload", function (req, res) {
  console.log(req.files);
  multiupload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    //console.log(req);
    return res.status(200).send(req.files);
  });
});

app.post("/ckeditorupload", upload, function (req, res) {
  var html;
  var fs = require("fs");
  fs.readFile(req.file.path, function (err, data) {
    if (err) {
      res.send({ error: err });
    } else {
      var imageinfo = "";
      imageinfo =
        "{\n " +
        '    "uploaded": 1,\n' +
        '    "fileName": "' +
        req.file.filename +
        '",\n' +
        '    "url": "/' +
        req.file.filename +
        '"\n' +
        "}";

      console.log(imageinfo);

      res.send(imageinfo);
    }
  });

  // don't forget to delete all req.files when done
});

//console.log(req.files.upload);
/*
  var fs = require('fs');

    fs.readFile(req.files.upload.path, function (err, data) {
        var newPath = __dirname + '/../public/' + req.files.upload.name;
        fs.writeFile(newPath, data, function (err) {
            if (err) console.log({err: err});
            else {
                html = "";
                html += "<script type='text/javascript'>";
                html += "    var funcNum = " + req.query.CKEditorFuncNum + ";";
                html += "    var url     = \"/public/" + req.files.upload.name + "\";";
                html += "    var message = \"Uploaded file successfully\";";
                html += "";
                html += "    window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
                html += "</script>";

                res.send(html);
            }
        });
    });*/


    app.get('*', function(req, res) {
      res.sendFile( path.join(__dirname, 'public/index.html') );
    });

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
