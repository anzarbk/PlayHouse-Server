const nodemailer = require("nodemailer");

const SendEmail = async (email) => {
  const min = 100000; // the minimum 6-digit number
  const max = 999999; // the maximum 6-digit number
  const otp = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(otp);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ansarzk4@gmail.com",
        pass: "uregpzeypvxtvmrk",
      },
    });

    const mailOptions = {
      from: "ansarzk4@gmail.com",
      to: email,
      subject: "OTP to Email verification",
      text: `Hello user, this is from the PLAYHOUSE ,${otp} is your One Time Password enter this OTP to verify your account`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        // throw new HttpException("something went wrong ", HttpStatus.FORBIDDEN);
      } else {
        console.log(info);
      }
    });
    return otp;
  } catch (err) {
    console.log(err);
    return res.json({
      status: "error",
      message: err?.message,
    });
  }
};
module.exports = { SendEmail };
