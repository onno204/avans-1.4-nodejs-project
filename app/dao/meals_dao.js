const database = require("./database");


exports.add = function (data, callback) {
    database.con.query('INSERT INTO `meals` (`name`, `description`, `price`, `allergies`, `ingredients`, `studenthouse_id`, `offered_since`, `user_id`) VALUES (?,?,?,?,?,?,?,?)',
        [data.name, data.description, data.price, data.allergies, data.ingredients, data.studenthouse_id, data.offered_since, data.user_id], function (error, results, fields) {
            if (error) return callback(error.sqlMessage, undefined);
            if (results.affectedRows === 0) return callback("no-rows-affected", undefined);
            exports.get(results.insertId, callback);
        });
}

exports.get = function (id, callback) {
    database.con.query('SELECT * FROM meals WHERE id = ?', [id], function (error, results, fields) {
        if (error) return callback(error.sqlMessage, undefined);
        if (results.length === 0) {
            return callback("house-not-found", undefined);
        }
        callback(undefined, results[0]);
    });
}

exports.update = function (id, data, callback) {
    database.con.query('UPDATE `meals` SET `name`=?, `description`=?, `price`=?, `allergies`=?, `ingredients`=?, `offered_since`=? WHERE id=?',
        [data.name, data.description, data.price, data.allergies, data.ingredients, data.offered_since, id], function (error, results, fields) {
            if (error) return callback(error.sqlMessage, undefined);
            if (results.affectedRows === 0) return callback("no-rows-affected", undefined);
            //Return updated house
            exports.get(id, callback);
        });
}

exports.checkIfUserIsAdmin = function (id, user_id, callback) {
    database.con.query('SELECT * FROM meals WHERE id = ? AND user_id = ?', [id, user_id], function (error, results, fields) {
        if (error) return callback(error.sqlMessage, undefined);
        if (results.length === 0) {
            return callback("meal-not-owned-by-user", undefined);
        }
        callback(undefined, results[0]);
    });
}