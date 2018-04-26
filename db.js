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
        `INSERT INTO users (email, access_code, password)
        VALUES ($1, $2, $3) RETURNING *`,
        params
    );
};
