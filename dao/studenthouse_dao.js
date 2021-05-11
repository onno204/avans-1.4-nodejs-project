module.exports = {
    db: [{
        name: "onno204",
        streetname: "onno204",
        housenumber: "onno204",
        postalcode: "onno204",
        city: "onno204",
        phonenumber: "onno204"
    }],

    add(item, callback) {
        this.db.push(item);
        if (callback) {
            callback(undefined, "success");
        }
    },

    get(index, callback) {
        callback(undefined, this.db[index]);
    },

    getAll(callback) {
        callback(undefined, this.db);
    },
};
