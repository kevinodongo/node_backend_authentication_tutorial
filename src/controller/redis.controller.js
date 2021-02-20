const client = require("../config/redis.config")

// save token
exports.savetoken = (item) => {
    client.set("userToken", `${item}`);
}

// get token
exports.gettoken = (item) => {
    client.get("userToken", `${item}`, (err, data) => {
        if(err) console.log(err)
        else savetoken(data)
    });
}

// delete token
exports.deletetoken = (item) => {
    client.set("userToken", `${item}`);
}