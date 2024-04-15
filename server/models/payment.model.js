import {model,schema} from "mongoose";

const paymentSchema=new Schema({
 
    razorpay_payment_id:{
        type:String,
        required:true,
    },
    razorpay_subscription_id:{
        type:String,
        required:true,
    },
    razorpay_signature:{
        type:String,
        required:true,
    }
},{
    timestamp:true
});