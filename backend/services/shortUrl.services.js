const helper = require("../helpers/shortUrl.helpers");
require('dotenv').config();
const DEBUG = +process.env.DEBUG;

const service = {
  async createShortURL(req, res) {
    try {
      const data = await helper.checkForURL(req.body.fullURL);
      if (data) {
        res.status(200).send({ status: "Short URL exists", shortURL:`${process.env.DEPLOYED_URL}/${data.shortURL}`});
      } else {
        const data = await helper.createShortURL(req.body.fullURL);
        if (data) {
          const returnShortURl = await helper.checkForURL(req.body.fullURL);
          res.status(200).send({ status: "Short URL Created", shortURL:`${process.env.DEPLOYED_URL}/${returnShortURl.shortURL}`});
        } else {
          res
            .status(501)
            .send({ status: "error", error: "Error DB Creating Short URL" });
        }
      }
    } catch (err) {
      if(DEBUG) console.log(err);
      res
        .status(500)
        .send({ status: "error", error: "Short URL Creating failed" });
    }
  },

  async handleShortURL(req, res) {
    try {
      const data = await helper.getFullURL(req.params.shortURL);
      if (data == null) res.sendStatus(404);
      else {
        await helper.updateCounter(data._id, data.count);
        const fullURL = data.fullURL;
        if(fullURL.startsWith("https://")){
          res.status(301).redirect(data.fullURL)
        }
        else{
          res.status(301).redirect(`https://${data.fullURL}`)
        }
      }
    } catch (err) {
      if(DEBUG) console.log(err);
      res
        .status(500)
        .send({ status: "error", error: "Short URL Handle failed" });
    }
  },

  async getURLCreatedInWeek(req,res){
    const data = await helper.getURLCreatedInWeek();
    if(DEBUG) console.log(data);
    res.status(200).send(data);
  },
};
module.exports = service;
