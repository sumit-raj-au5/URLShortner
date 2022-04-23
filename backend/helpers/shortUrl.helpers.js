const db = require('../mongo');
const {nanoid} = require('nanoid');
const { ObjectId, Timestamp } = require("mongodb");
require('dotenv').config();
const DEBUG = +process.env.DEBUG;

const helper = {
    checkForURL(fullURL){
        return db.urlData.findOne({"fullURL":fullURL});
    },

    createShortURL(fullURL){
        const shortID = nanoid(8);
        if(DEBUG) console.log(shortID);
        var current_date=new Date();
        return db.urlData.insertOne({"fullURL":fullURL, "shortURL":shortID, "count":0, "timestamp":current_date});
    },

    getFullURL(shortURL){
        return db.urlData.findOne({"shortURL":shortURL});
    },

    updateCounter(id,count){
        return db.urlData.findOneAndUpdate(
            {_id:ObjectId(id)},
            {$set:{"count":++count}},
            {returnDocument:"after"}
        );
    },

    getURLCreatedInWeek(){
        return db.urlData.find({
            "timestamp": {
                $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000)
            }
        }).toArray();
    }
}
module.exports = helper;
  
 