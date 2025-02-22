const User = require('../model/User')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
// @desc Register User
// @route GET /api/v1/auth/register
// @access Public
exports.signup=async(req,res,next)=>{
    try{ 
        const {name,email,password}=req.body;

        const user = await User.create({
            name,email,password
        });

        const token = user.getSignedJwtToken();

        res.status(200).json({success:true,token})

    }
    catch(e){
        res.status(400).json({success:false})

    }

}


// @desc Login User
// @route POST /api/v1/auth/login
// @access Public
exports.login=async(req,res,next)=>{
    try{ 
        const {email,password}=req.body;
        console.log(email,password)
        // Validate Email and Password
        if(!email || !password){
            return res.status(400).json({success:false,msg:`Please provide an email address`})
        }

        const user = await User.findOne({email}).select('+password');

        if(!user){
            return res.status(401).json({success:false,msg:`Invalid Credentials`})
        }

        // Check if password matches 
        const isMatch = await user.matchPassword(password);

        if(!isMatch){
            return res.status(401).json({success:false,msg:`Invalid Credentials`})
        }

        // Create Token
        const token = user.getSignedJwtToken();
        
        res.status(200).json({success:true,token})

    }
    catch(e){
        res.status(400).json({success:false})

    }

}


// @desc Get Current User
// @route POST /api/v1/auth/me
// @access Private
exports.getMe=async(req,res,next)=>{
    try{ 
        const user = await User.findById(req.user.id)

        res.status(200).json({success:true,data:user})

    }
    catch(e){
        res.status(400).json({success:false})

    }

}


// @desc Forgot Password
// @route POST /api/v1/auth/forgotPassword
// @access Public
exports.forgotPassword = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).json({ success: false, message: `User not found!` });
    }

    // Generate a 5-digit OTP
    const otp = Math.floor(10000 + Math.random() * 90000); // Generates a 5-digit number
    user.resetPasswordToken = otp;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    await user.save({ validateBeforeSave: false });

    // Send OTP via email
    const message = `Your password reset code is: ${otp}. It will expire in 10 minutes.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password Reset Code',
            message,
        });

        res.status(200).json({
            success: true,
            message: 'OTP sent to your email.',
        });
    } catch (e) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        console.log(e)
        return res.status(500).json({ success: false, message: `Email could not be sent` });
    }
};


// @desc Reset Password
// @route POST /api/v1/auth/resetPassword
// @access Public
exports.resetPassword=async(req,res,next)=>{
    const { email, otp, newPassword } = req.body;
    console.log(otp)
    const user = await User.findOne({ email, resetPasswordToken: otp, resetPasswordExpire: { $gt: Date.now() } });

    if (!user) {
        return res.status(400).json({ success: false, message: `Invalid or expired OTP` });
    }

    // Reset password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ success: true, message: 'Password has been reset successfully.' })

}
    