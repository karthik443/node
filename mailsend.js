var nodemailer = require('nodemailer');
const tarnsporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'karthiknallala31@gmail.com',
        pass: 'pjzbvqmxetiitzxy'
    }
});

module.exports.sendMail = async (gmail, otp) => {
    try {
        let info = await tarnsporter.sendMail({
            from: 'karthiknallala31@gmail.com',
            to: gmail,
            subject: 'Hello ✔',
            html: `
        <div
          class="container"
          style="max-width: 90%; margin: auto; padding-top: 20px"
        >
          <h2>Welcome to the BlockBuster :)</h2>
          <h4>You are officially In ✔</h4>
          <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
          <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${otp}</h1>
     </div>
      `,
        });
        console.log('mail sent succesfully!')
        return info;
    } catch (error) {
        console.log(error);
        return false;
    }
};