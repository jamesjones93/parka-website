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
var nodemailer = require("nodemailer");
var mysql = require("mysql");
const { dates } = require("./data/dates.json");
const { videos } = require("./data/videos.json");

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
    maxAge: 1000 * 60 * 60 * 12 * 7
});

app.use(cookieSessionMiddleware);

app.use(csrf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "parkarecords",
        pass: process.env.EMAIL_PASS
    }
});

// ======================================================================== Nodemailer

let sendMail = function(userEmail, accessCode) {
    var mailOptions = {
        from: "parkarecords@gmail.com",
        to: userEmail,
        subject: "Thank you for enrolling in Parka.World!",
        html: `
        <h2 style="font-size: 18px;">Thank you for enrolling in Parka.World!</h2>
        <p style="font-size: 13px;">Your access code is <strong>${accessCode}</strong></p>
        <p style="font-size: 13px;">We will be launching this coming June with free merchandise and exclusive content using your access code via the Parka.World website.</p>
`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};

// ======================================================================== Login SignUp

app.get("/check-for-cookie", (req, res) => {
    if (req.session.user) {
        res.json({
            cookie: true
        });
    } else {
        res.redirect("/");
    }
});

app.post("/register-user", (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.email) {
        res.json({
            error: "Looks like you missed something. Please try again."
        });
    } else {
        const accessCode = Math.floor(1000 + Math.random() * 9000);

        if (!req.body.phoneNumber) {
            req.body.phoneNumber = null;
        }

        db.signUp(
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.phoneNumber,
            accessCode
        )
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
    if (!req.body.email || !req.body.accessCode) {
        res.json({
            error: "Incorrect email / password."
        });
    } else {
        db.checkLogin(req.body.email)
            .then(results => {
                if (!results.rows[0]) {
                    res.json({
                        error: "Incorrect email / access code."
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
                            cookie: true
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

app.post("/resend-code", (req, res) => {
    console.log("req body", req.body);
});

// ======================================================================== checkout x cookie

app.get("/get-checkout", (req, res) => {
    if (req.session.checkoutId) {
        res.json({
            checkoutId: req.session.checkoutId
        });
    } else {
        res.json({
            cart: false
        });
    }
});

app.post("/save-checkout-to-cookie", (req, res) => {
    req.session.checkoutId = req.body.checkoutId;

    res.json({
        checkoutId: req.session.checkoutId
    });
});

// ======================================================================== dates

app.get("/get-dates", (req, res) => {
    res.json({
        dates: dates
    });
});

// ======================================================================== world

app.get("/world", (req, res) => {
    if (!req.session.user) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("/", (req, res) => {
    if (req.session.user) {
        res.redirect("/world");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("/world-videos", (req, res) => {
    res.json({
        videos: videos
    });
});

// ========================================================================

app.get("/check-for-cookie-accept", (req, res) => {
    if (req.session.cookieAccepted) {
        res.json({ cookieAccepted: true });
    }
});

app.post("/accepted-cookie-banner", (req, res) => {
    req.session.cookieAccepted = true;
    res.json({ cookieAccepted: true });
});

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT || 8080, () => console.log("Im listening"));

// ========================================================================
