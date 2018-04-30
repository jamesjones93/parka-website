const express = require("express");
const app = express();
const https = require("https");
const compression = require("compression");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const csrf = require("csurf");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const fs = require("fs");
const server = require("http").Server(app);
const db = require("./db");
const hash = require("./hash");
const releases = require("./data/releases");

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());

app.use(compression());

app.use(express.static("public"));

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

const cookieSessionMiddleware = cookieSession({
    secret: process.env.SECRET || require("./secrets").secret,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);

app.use(csrf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

// ======================================================================== Login SignUp

app.get("/check-login", (req, res) => {
    if (req.session.user) {
        res.json({
            user: req.session.user
        });
    } else {
        res.json({
            user: null
        });
    }
});

app.post("/register-user", (req, res) => {
    console.log(req.body.email);
    if (!req.body.email) {
        res.json({
            error: "Please enter your email address to sign up."
        });
    } else {
        const accessCode = Math.floor(1000 + Math.random() * 9000);

        db
            .signUp(req.body.email, accessCode)
            .then(result => {
                req.session.user = {
                    email: result.rows[0].email,
                    accessCode: result.rows[0].access_code
                };
            })
            .then(() => {
                res.json({
                    user: req.session.user
                });
            })
            .catch(error => {
                console.log("Error: " + error);
                res.json({
                    error:
                        "Something went wrong. You might be registered already."
                });
            });
    }
});

app.post("/user-login", (req, res) => {
    console.log("adfasfdsafsa", req.body.email);

    if (!req.body.email || !req.body.accessCode) {
        res.json({
            error: "Incorrect email / password."
        });
    } else {
        db
            .checkLogin(req.body.email)
            .then(results => {
                if (!results.rows[0]) {
                    res.json({
                        error: "Incorrect email / password."
                    });
                } else {
                    if (
                        req.body.email == results.rows[0].email &&
                        req.body.accessCode == results.rows[0].access_code
                    ) {
                        req.session.user = {
                            email: results.rows[0].email,
                            accessCode: results.rows[0].access_code
                        };

                        res.json({
                            user: req.session.user
                        });
                    } else {
                        res.json({
                            error: "Incorrect email / password."
                        });
                    }
                }
            })
            .catch(error => {
                console.log("Error: " + error);

                res.json({
                    error: "Incorrect email / password."
                });
            });
    }
});

// ========================================================================

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT || 8080, () => console.log("Im listening"));
