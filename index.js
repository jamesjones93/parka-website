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
var nodemailer = require("nodemailer");
var mysql = require("mysql");

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());

app.use(compression());

app.use(express.static("public"));

let secrets;

if (process.env.NODE_ENV != "production") {
    secrets = require("./secrets");

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

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "parkarecords",
        pass: process.env.EMAIL_PASS || require("./secrets").emailPass
    }
});

var connection = mysql.createConnection({
    host: process.env.RDS_HOSTNAME || require("./secrets").sqlHost,
    user: process.env.RDS_USERNAME || require("./secrets").sqlUser,
    password: process.env.RDS_PASSWORD || require("./secrets").sqlPassword,
    port: process.env.RDS_PORT || require("./secrets").sqlHostPort,
    timeout: 60000
});

function handleDisconnect() {
    connection.connect(function(err) {
        if (err) {
            console.log("error when connecting to db:", err);
            setTimeout(handleDisconnect, 3000);
        }
    });

    connection.on("error", function(err) {
        console.log("db error", err);
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

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
    if (!req.body.firstName || !req.body.lastName || !req.body.email) {
        res.json({
            error: "Looks like you missed something. Please try again."
        });
    } else {
        const accessCode = Math.floor(1000 + Math.random() * 9000);

        if (!req.body.phoneNumber) {
            req.body.phoneNumber = null;
        }

        db
            .signUp(
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
                sendMail(req.body.email, accessCode);
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

// ========================================================================
