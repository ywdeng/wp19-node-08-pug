var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));

function makeResponse(res, userName, gender) {
    res.render('index', {
        title: "使用 PUG 做回應",
        userName: userName,
        isMale: (gender == "male"),
        appellation: ((gender == "male") ? "先生" : "小姐")
    });
}

app.all("/", function (req, res) {
    if (req.query.userName && req.query.gender) {
        makeResponse(res, req.query.userName, req.query.gender);
    } else if (req.body.userName && req.body.gender) {
        makeResponse(res, req.body.userName, req.body.gender);
    } else {
        res.status(400);
        res.render('form', {title: "使用 PUG 做回應"});
    }
});

var port = 3000;
app.listen(port, function () {
    console.log("Listening on port " + port);
});
