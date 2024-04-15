import AppError from "../utils/error.util.js";
import jwt from "jsonwebtoken";

const isLoggedIn= async (req,res,next)=>{
    const {token}=req.cookies;

    if(!token){
        return next(new AppError('Unauthenticated,please login again',401));
    }

    const userDetails= await jwt.verify(token,process.env.JWT_SECRET);

    req.user=userDetails;
    
    next();

}

const authorizeRoles = (...roles) =>
  async (req, _res, next) => {




    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to view this route", 403)
      );
    }

    next();
  };

export{
    isLoggedIn,
    authorizeRoles,
}