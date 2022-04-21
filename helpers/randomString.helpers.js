const crypto = require("crypto");

const helper = {
    getRandomString(){
        //Generate random string
        const id = crypto.randomBytes(20).toString('hex');
        //store random string in db with corresponding email
        return id;
    }
}
module.exports = helper;