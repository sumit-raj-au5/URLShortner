const db = require('../mongo');

const helper = {
    getUser(email){
        return db.user.findOne({"email":email});
    },

    createUser(email, password){
        return db.user.insertOne({"email":email, "password":password, "verified":false})
    },

    verifyUser(string){
        return db.user.findOneAndUpdate(
            { "string":string},
            { $set: {"verified":true, "string":""} },
            { returnDocument: "after" }
          );
    },

    storeRandomString(email, randomString){
        return db.user.findOneAndUpdate(
            { "email":email},
            { $set: {"string":randomString} },
            { returnDocument: "after" }
          );
    },

    resetPassword(email, password){
        return db.user.findOneAndUpdate(
            { "email":email},
            { $set: {"password":password, "string":""} },
            { returnDocument: "after" }
          );
    }
}
module.exports = helper;