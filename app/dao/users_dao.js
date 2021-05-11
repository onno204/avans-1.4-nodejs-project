module.exports = {
    db: [{
        firstname: "Onno",
        lastname: "van Helfteren",
        studentnumer: "2167988",
        emailadres: "o.vanhelfteren@student.avans.nl",
        wachtwoord: "1234",
        token: "123",
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
