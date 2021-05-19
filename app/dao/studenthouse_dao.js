const database = require("./database");

exports.add = function (data, callback) {
    database.con.query('INSERT INTO `studenthouses` (`name`, `street`, `housenumber`, `postalcode`, `city`, `phonenumber`, `user_id`) VALUES (?,?,?,?,?,?,?)',
        [data.name, data.street, data.housenumber, data.postalcode, data.city, data.phonenumber, data.user_id], function (error, results, fields) {
            if (error) return callback(error.sqlMessage, undefined);
            if (results.affectedRows === 0) return callback("no-rows-affected", undefined);
            callback(undefined, results.insertId);
        });
}

exports.remove = function (id, callback) {
    id = parseInt(id);
    database.con.query('DELETE FROM `studenthouses` WHERE id=?',
        [id], function (error, results, fields) {
            if (error) return callback(error.sqlMessage, undefined);
            if (results.affectedRows === 0) return callback("no-rows-affected", undefined);
            callback(undefined, id);
        });
}

exports.get = function (id, callback) {
    database.con.query('SELECT * FROM studenthouses WHERE id = ?', [id], function (error, results, fields) {
        if (error) return callback(error.sqlMessage, undefined);
        if (results.length === 0) {
            return callback("house-not-found", undefined);
        }
        callback(undefined, results[0]);
    });
}

exports.checkIfUserIsAdmin = function (id, user_id, callback) {
    database.con.query('SELECT * FROM studenthouses WHERE id = ? AND user_id = ?', [id, user_id], function (error, results, fields) {
        if (error) return callback(error.sqlMessage, undefined);
        if (results.length === 0) {
            return callback("house-not-owned-by-user", undefined);
        }
        callback(undefined, results[0]);
    });
}

exports.update = function (id, data, callback) {
    database.con.query('UPDATE `studenthouses` SET `name`=?, `street`=?, `housenumber`=?, `postalcode`=?, `city`=?, `phonenumber`=? WHERE id=?',
        [data.name, data.street, data.housenumber, data.postalcode, data.city, data.phonenumber, id], function (error, results, fields) {
            if (error) return callback(error.sqlMessage, undefined);
            if (results.affectedRows === 0) return callback("no-rows-affected", undefined);
            //Return updated house
            exports.get(id, callback);
        });
}

exports.getAll = function (callback) {
    database.con.query('SELECT * FROM studenthouses', [], function (error, results, fields) {
        if (error) return callback(error.sqlMessage, undefined);
        callback(undefined, results);
    });
}

