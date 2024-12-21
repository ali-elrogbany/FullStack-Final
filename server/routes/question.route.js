let mongoose = require("mongoose"),
    express = require("express"),
    router = express.Router();

let questionSchema = require("../models/Question");

router.route("/create-question").post((req, res, next) => {
    questionSchema
        .create(req.body)
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((error) => next(error));
});

router.route("/").get((req, res, next) => {
    questionSchema
        .find()
        .then((data) => {
            res.json(data);
        })
        .catch((error) => next(error));
});

module.exports = router;
