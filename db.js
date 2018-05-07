var spicedPg = require("spiced-pg");

if (!process.env.DATABASE_URL) {
    var { dbUser, dbPass, sqlUser, sqlPassword } = require("./secrets");
}

var db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${sqlUser}:${sqlPassword}@parkadb.c5ydoo1vsjev.us-east-1.rds.amazonaws.com:5432/parkaRecords`
);

exports.signUp = function(...params) {
    return db.query(
        `INSERT INTO users (first, last, email, phone, access_code)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        params
    );
};

exports.checkLogin = function(...params) {
    return db.query(
        `
        SELECT email, access_code FROM users
        WHERE email = $1
        `,
        params
    );
};
