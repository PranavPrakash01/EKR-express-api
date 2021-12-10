var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.post('/',async (req,res,next)=>{
    const { name,phone,description,appoinmentDate} = req.body

      //Empty checking
    if ( !name|| !phone || !description || !appoinmentDate ){
        return res.status(400).json({
        message: 'Appoinment date, name, email are all required',
        })
    }
    let appoinment_message = `Client Name  : ${name} \nPhone Number : ${phone} \nWork DEscription : ${description}\nAppoinment Date : ${appoinmentDate}`
    
    console.log(appoinment_message);
//----------------------------------------Mailing-System--------------------------------------
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'pranavpprakash7@gmail.com',
        pass: 'uccbtzfzlguzxtmi'
      }
    });
    
    var mailOptions = {
      from: 'EKR FILIMS WEBSITE',
      to: 'pranav_b201076me@nitc.ac.in',
      subject: 'NEW APPOINMENT',
      text: appoinment_message
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send(appoinmentDate)
      }
    }); 
//------------------------------------------------------------------------------------------
    
})



module.exports = router;
