const nodemailer = require('nodemailer');
const {getRandomString} = require('../helpers/randomString.helpers');
const helper = require('../helpers/userAuth.helpers');
require('dotenv').config();

const DEBUG = +process.env.DEBUG;
const service = {
    async sendMailService(toMail, actionWords, res){
        try{
            const transporter=nodemailer.createTransport({
                service:"outlook",
                auth:{
                    user:process.env.email,
                    pass:process.env.password
                }
            });
            const randomString = await getRandomString();
            let text;
            if(actionWords==="Reset Password"){
                text = `${actionWords} with this link ${process.env.DEPLOYED_URL}/userauth/password-reset/${randomString}`;
            }
            else if(actionWords==="Activate account"){
                text = `${actionWords} with this link ${process.env.DEPLOYED_URL}/userauth/verification/${randomString}`
            }
            const options = {
                from:process.env.email,
                to:toMail,
                subject:`URL Shortner ${actionWords}`,
                text:text
            };

            transporter.sendMail(options, (err, info)=>{
                if(err){
                    if(DEBUG) console.log(err);
                    res.status(500).send({status:"Error", Error:"Error sending mail"});
                }
                const data = helper.storeRandomString(toMail, randomString);
                if(DEBUG) console.log("sent" + info.response + "stored string" + data);
                res.status(200).send({status:"Mail sent"});
            });

        }
        catch(err){
            if(DEBUG) console.log(err);
            res.status(500).send({status:"Error", Error:"Error sending mail out"});
        }
    }
}

module.exports = service;


