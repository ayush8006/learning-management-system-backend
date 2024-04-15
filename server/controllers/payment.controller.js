import User from '../models/user.model.js';
import AppError from '../utils/error.util.js';

export const getRazorpayApiKey = async(req,res,next)=>{

    res.status(200).json({
        success: true,
        message: 'Razorpay API key',
        key: process.env.RAZORPAY_KEY_ID,
      });

};

export const buySubscription = async(req,res,next)=>{

    // Extracting ID from request obj
  const { id } = req.user;

  // Finding the user based on the ID
  const user = await User.findById(id);

  if (!user) {
    return next(new AppError('Unauthorized, please login'));
  }

  // Checking the user role
  if (user.role === 'ADMIN') {
    return next(new AppError('Admin cannot purchase a subscription', 400));
  }

  
  // Creating a subscription using razorpay that we imported from the server
  const subscription = await razorpay.subscriptions.create({
    plan_id: process.env.RAZORPAY_PLAN_ID, // The unique plan ID
    customer_notify: 1, // 1 means razorpay will handle notifying the customer, 0 means we will not notify the customer
    total_count: 12, // 12 means it will charge every month for a 1-year sub.
  });

  // Adding the ID and the status to the user account
  user.subscription.id = subscription.id;
  user.subscription.status = subscription.status;

  // Saving the user object
  await user.save();

  res.status(200).json({
    success: true,
    message: 'subscribed successfully',
    subscription_id: subscription.id,
  });
    
};

export const verifySubscription = async(req,res,next)=>{
    
}  

export const cancelSubscription= async(req,res,next)=>{
    
}  

export const allPayments = async(req,res,next)=>{
    
}  