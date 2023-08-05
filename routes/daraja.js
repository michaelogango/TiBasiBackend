import  express  from "express";
//import {access_token,register_url} from "../controllers/daraja.js";
import request from 'request';
import bodyParser from 'body-parser';
import asyncHandler from 'express-async-handler';
import Callback from "../models/mpesaModels.js";

const router = express.Router();
const consumer_key = 'l7GZAVBoZX1OXUZsC9wyGOn9pAFZOpou';
const consumer_secret  = 'Cm0AQLQxoHYQ8ur3';
const Backend_url = 'https://tibasi.uc.r.appspot.com';

router.get ('/access_token', getaccess_token, (req, res)=>{
    res.status (200).json({
        access_token: req.access_token
    })

});    
function getaccess_token(req, res,next){
 
    let url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
    let auth = "Basic " + new Buffer.from(consumer_key + ":" + consumer_secret).toString("base64");
    console.log(auth)
    request(
        {
            url: url,
            headers: {
                "Authorization": auth
            }
        },
         function (error, response, body) {
            if (error) {
                console.log('here is the error ',error);
            } else {
                console.log('here is the body ',body);
               req.access_token = JSON.parse(body).access_token;
               //console.log(req.IncomingMessage) 
               next()
                
            }
  
}
    )

}
function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const generateTimestamp = () => {
    const date = new Date()
    const timestamp =
      date.getFullYear() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + (date.getDate() + 1)).slice(-2) +
      ("0" + (date.getHours() + 1)).slice(-2) +
      ("0" + (date.getMinutes() + 1)).slice(-2) +
      ("0" + (date.getSeconds() + 1)).slice(-2)
    return timestamp
  }

  router.post('/stkpush', getaccess_token,asyncHandler(async (req, res)=>{
    let url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
    let auth = "Bearer "+ req.access_token;
    const {number,amount,id} = req.body;
    console.log(auth);
    console.log(req.body);
    console.log(number);

    request(
        
        {
            url :url,
            method : "POST",
            headers:{
                "Authorization":auth
                },
                json:{
                    "BusinessShortCode": "174379",    
                    "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTYwMjE2MTY1NjI3",    
                    "Timestamp":"20160216165627",    
                    "TransactionType": "CustomerPayBillOnline",    
                    "Amount": amount,    
                    "PartyA":number,    
                    "PartyB":"174379",    
                    "PhoneNumber":number,    
                    "CallBackURL": "https://mydomain.com/pat",    
                    "AccountReference":"Test",    
                    "TransactionDesc":"Test"
                 
                }
        },
        function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
                res.status(200).json(body);
                //console.log(response);
            }
        }
        
    )
        }))

        router.post('/stk_callback', asyncHandler(async (req, res) => {

            const { CheckoutRequestID, PhoneNumber, Amount, ResultDesc } = req.body.Body.stkCallback;
        
        
            const transactionId = req.body.Body.stkCallback.CheckoutRequestID;
            const existingCallback = await Callback.findOne({ transactionId });
        
            if (existingCallback) {
              console.log(`Duplicate callback received for transaction ID: ${transactionId}`);
              return res.status(200).end(); // Return a response to Safaricom without further processing
            }
            const newCallback = new Callback({
                transactionId: CheckoutRequestID,
                phoneNumber: PhoneNumber,
                amount: Amount,
                resultDesc: ResultDesc,
                // Add more fields as needed
              });
            
              await newCallback.save();
            }));
            export default router;