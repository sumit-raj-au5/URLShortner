const {MongoClient} = require('mongodb');
require('dotenv').config();

const mongo = {
    //DB String
    db:null,

    //collections
    urlData:null,
    user:null,
    async connect(){
        //database connection
        const client = new MongoClient(process.env.MONGODB_URL);
        await client.connect();
        console.log(`MongoDB connected - ${process.env.MONGODB_URL}`);

        //selecting Database
        this.db = client.db(process.env.MONGODB_DBNAME);
        console.log(`Database selected - ${process.env.MONGODB_DBNAME}`);

        //initializing collections
        this.urlData = this.db.collection("urlData");
        this.user = this.db.collection("user");
    }
}


module.exports=mongo;