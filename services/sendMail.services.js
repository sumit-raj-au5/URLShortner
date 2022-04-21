const nodemailer = require('nodemailer');
const {getRandomString} = require('../helpers/randomString.helpers');
const helper = require('../helpers/userAuth.helpers');

const service = {
    async sendMailService(toMail, actionWords, res){
        try{
            const transporter=nodemailer.createTransport({
                service:"outlook",
                auth:{
                    user:"hirajsumit@outlook.com",
                    pass:"sumittesting1234#"
                }
            });
            const randomString = await getRandomString();
            let text;
            if(actionWords==="Reset Password"){
                text = `${actionWords} with this link http://localhost:3500/userauth/password-reset/${randomString}`;
            }
            else if(actionWords==="Activate account"){
                text = `${actionWords} with this link http://localhost:3500/userauth/verification/${randomString}`
            }
            const options = {
                from:"hirajsumit@outlook.com",
                to:toMail,
                subject:`${actionWords} with NodeJs`,
                text:text
            };

            transporter.sendMail(options, (err, info)=>{
                if(err){
                    console.log(err);
                    res.status(500).send({status:"Error", Error:"Error sending mail"});
                }
                const data = helper.storeRandomString(toMail, randomString);
                console.log("sent" + info.response + "stored string" + data);
                res.status(200).send({status:"Mail sent"});
            });

        }
        catch(err){
            console.log(err);
            res.status(500).send({status:"Error", Error:"Error sending mail out"});
        }
    }
}

module.exports = service;


