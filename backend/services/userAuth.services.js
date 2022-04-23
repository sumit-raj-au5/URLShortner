const helper = require('../helpers/userAuth.helpers');
const {sendMailService} = require('./sendMail.services');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const DEBUG = +process.env.DEBUG;
const maxAge = 1*24*60*60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: maxAge
    });
  };

const service = {
    async signin(req,res){
        try{
            const data = await helper.getUser(req.body.email);
            if(DEBUG) console.log(data);
            if(data){
                const stored_password=data.password;
                const entered_password=req.body.password;
                const passwordMatch = await bcrypt.compare(entered_password, stored_password);
                if(passwordMatch && data.verified){
                    const token = createToken(data._id);
                    //res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                    res.status(200).send({status:"Login Success", token:token, user:data.email});
                }
                else{
                    res.status(401).send({status:"error", error:"Wrong Email or Password"});
                }
            }
            else{
                res.status(401).send({status:"error", error:"User doesn't exist"});
            }
        }
        catch(err){
            if(DEBUG) console.log(err);
            res.status(500).send({status:"error", error:"Error signing in"});
        }
    },

    async signup(req,res){
        try{
            const data = await helper.getUser(req.body.email);
            if(data)res.status(409).send({status:"error", error:"User Exist"});
            else{
            let entered_password = req.body.password;
            const salt = await bcrypt.genSalt();
            entered_password = await bcrypt.hash(entered_password, salt);
            const data = await helper.createUser(req.body.email, entered_password);
            if(data){
                const mailResponse = sendMailService(req.body.email, "Activate account");
                if(DEBUG) console.log(`mail response ${mailResponse}`);
                    res.status(200).send({status:"Signup Success"});  
            }
            else{
                res.status(501).send({status:"error", error:"Error Signining Up"});
            }
        }
        }
        catch(err){
            if(DEBUG) console.log(err);
            res.status(500).send({status:"error", error:"Error signing up"});
        }
    },

    async userVerification(req,res){
        try {
            
            const data = await helper.verifyUser(req.params.string);
            if(DEBUG) console.log(data);
            if (data.value == null) res.status(401).send({status:"error", error:"Verification failed due to wrong link"});
            else {
              //res.status(200).send({status:"Success", "userVerified":true});
              res.status(301).redirect(process.env.FRONTEND_SIGNIN_URL);
            }
          } catch (err) {
            if(DEBUG) console.log(err);
            res
              .status(500)
              .send({ status: "error", error: "user verification failed" });
          }
    },

    async sendResetPasswordLink(req,res){
        try{
            const data = await helper.getUser(req.body.email);
            if(data && data.verified){
               const mailResponse = sendMailService(req.body.email, "Reset Password");
               if(DEBUG) console.log(`mail response ${mailResponse}`);
                res.status(200).send({status:"Mail sent to reset password"});
            }
            else{
                res.status(401).send({status:"error", error:"User doesn't exist"});
            }
        }
        catch(err){
            if(DEBUG) console.log(err);
            res.status(500).send({status:"error", error:"Error resetting password"});
        }  
    },

    async resetPassword(req,res){
        try{
            const data = await helper.getUser(req.body.email);
            if(data){
                const stored_string=data.string;
                const entered_string=req.params.urlString;
                if(stored_string===entered_string & data.verified){
                    let new_password = req.body.password;
                    const salt = await bcrypt.genSalt();
                    new_password = await bcrypt.hash(entered_password, salt);
                    const resetPasswordData = await helper.resetPassword(data.email, new_password)
                    res.status(200).send({status:"Password reset successful", data:resetPasswordData});
                }
                else{
                    res.status(401).send({status:"error", error:"Wrong Email or Password"});
                }
        }
    }
        catch(err){
            if(DEBUG) console.log(err);
            res.status(500).send({status:"error", error:"Error resetting password"});
        }
    },

    // signOut(req,res){
    //     res.cookie('jwt', '', { maxAge: 1 });
    //     res.redirect('http://localhost:3000/');
    // }
}

module.exports = service;