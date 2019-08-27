var express = require("express");
var exphbs = require("express-handlebars")
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoNews";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.get("/", function (req, res) {
  db.Article.find({})
    .then(function (articles) {
      res.render("index", { articles: articles });
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.get("/scrape", function (req, res) {
  axios.get("http://www.mtv.com/news/music/").then(function (response) {
    var $ = cheerio.load(response.data);

    $("header.post-header").each(function (i, element) {
      var result = {};

      result.title = $(this).children("h1.headline").children().children().text().trim();
      result.summary = $(this).children("p.subhead").text().trim();
      result.link = $(this).children("h1.headline").children().attr("href");

      db.Article.create(result)
        .then(function (newArticle) {
          console.log(newArticle);
        })
        .catch(function (err) {
          console.log(err);
        })
    })
    db.Article.find({})
      .then(function (articles) {
        res.render("index", { articles: articles });
      })
      .catch(function (err) {
        res.json(err);
      });
  })
});

app.get("/clear", function (req, res) {
  db.Article.deleteMany({})
    .then(function (data) {
      res.render("index", { articles: articles });
    })
    .catch(function (err) {
      res.json(err)
    })
})

app.get("/articles/:id", function (req, res) {
  db.Article.findOne({ _id: req.params.id })
    .populate("comments")
    .then(function (article) {
      res.json(article);
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.post("/articles/:id", function (req, res) {
  db.Comment.create(req.body)
    .then(function (newComment) {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { comments: newComment._id } }, { new: true })
    })
    .then(function (article) {
      res.json(article)
    })
    .catch(function (err) {
      res.json(err)
    })
})

app.get("*", function (req, res) {
  res.sendStatus(404)
})

app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
