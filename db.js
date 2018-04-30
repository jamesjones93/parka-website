var spicedPg = require("spiced-pg");

if (!process.env.DATABASE_URL) {
    var { dbUser, dbPass } = require("./secrets");
}

var db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${dbUser}:${dbPass}@localhost:5432/parka`
);

exports.signUp = function(...params) {
    return db.query(
        `INSERT INTO users (email, access_code)
        VALUES ($1, $2) RETURNING *`,
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
