module.exports = {
    db: [],

    add(item, callback) {
        this.db.push(item);
        if (callback) {
            callback(undefined, "success");
        }
    },

    remove(id, callback) {
        let found = false;
        this.db.forEach(element => {
            if (!found && element.id === id) {
                found = true;
                callback(undefined, element.id);
            }
        });
        if (!found) {
            return callback("house-not-found", undefined);
        }
    },

    get(id, callback) {
        let found = false;
        this.db.forEach(element => {
            if (!found && element.id === id) {
                found = true;
                callback(undefined, element);
            }
        });
        if (!found) {
            return callback("house-not-found", undefined);
        }
    },

    update(id, data, callback) {
        let found = false;
        this.db.forEach(element => {
            if (!found && element.id === id) {
                element = data;
                found = element;
            }
        });
        if (found) {
            return callback(undefined, found);
        }
        return callback("house-not-found", undefined);
    },

    getAll(callback) {
        callback(undefined, this.db);
    },
};
