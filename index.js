const mysql = require('mysql');
const { application } = require('express');
const path = require('path');
const express = require('express');
const encry = require('./encrypt');
const app = express();
const bodyParser = require('body-parser');
const otpGenerator = require('./otpGen');
const pushMail = require('./mailsend');

//date function 
let ts = Date.now();
let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();

// prints date & time in YYYY-MM-DD format
let present_date = year + "-" + month + "-" + date
console.log(present_date);

// loading  All the pages present in public 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

// intialising required variables for signin form
let searchTerm = '';
let givenPass = '';

// variables for signup form
let encryptedData = '';
let userName = '';
let email = '';
let base64data = '';

let flag = false;




// its the registration form validation
app.post('/signup-form', async (req, res) => {

    console.log(req.body);
    let message = req.body.password;
    userName = req.body.userName;
    email = req.body.email;
    // encryption mechanish works here from encypt.js
    let goodOne = encry.getEncrypt(message);
    encryptedData = goodOne.encryptedData;
    base64data = goodOne.base64date;
    //encryption mechanish ends 
    pushMail.sendMail(email, otpGenerator.otp);
    res.sendFile(path.join(__dirname, '/public', 'checker.html'));



})
//registration form ends here

//otp verification form  starts here
app.post('/auth', async (req, res) => {

    var finishRequest = function () {

        console.log('your account has been created');
        res.sendFile(path.join(__dirname, 'public', 'login.html'))
    }

    var catch_err = function () {
        console.log('an error occured');
        res.sendFile(path.join(__dirname, 'public', 'error.html'))
    }

    if (otpGenerator.otp == req.body.Myotp) {
        // database connection start here
        const db = mysql.createConnection({
            host: "sql6.freesqldatabase.com",
            user: "sql6581222",
            password: "XwnD4CQE8c",
            database: "sql6581222"
        });

        db.connect(function (err) {
            if (err) throw err;
            console.log('connected');
            db.query(`insert into usertable values('${userName}','${encryptedData}','${base64data}','${email}','${present_date}')`, function (err, res) {
                // if (err) return catch_err();
                if (err) throw err;
                finishRequest();
            });
        });
        db.end;

    }


    else {
        return catch_err();
    }

})
//otp verification form ends here


/// its login form in the system 
app.post('/form-submit', async (req, res) => {

    searchTerm = req.body.userName;
    givenPass = req.body.password;
    flag = false;
    lock = 1;
    //database connection 
    var finishRequest = function () {
        if (flag) {
            app.use(express.static('Block'))
            res.sendFile(path.join(__dirname, 'Block', 'index.html'))
        }
        else {
            res.sendFile(path.join(__dirname, 'public', 'error.html'))
            // res.send('<h1> wrong credentials</h1>');
        }
    }
    const db = mysql.createConnection({
        host: "sql6.freesqldatabase.com",
        user: "sql6581222",
        password: "XwnD4CQE8c",
        database: "sql6581222"
    });
    db.connect(function (err) {
        if (err) throw err;
        console.log('connected');
        db.query(`select * from usertable where datediff(convert(sysdate(),date),logindate)/30<1 and name='${searchTerm}'`, function (err, res) {
            if (err) throw finishRequest();

            if (Object.keys(res).length == 0) {
                return finishRequest();
            }
            let qPass = res[0].password;
            base64d = res[0].base64;
            qPass = encry.getdecrypt(qPass, base64d);
            // if password matches with the user password login activates
            if (givenPass == qPass)
                flag = true;
            lock = 0;
            if (lock == 0) {
                finishRequest();
            }
        });

    });
    db.end;

})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server started at : http://localhost:${PORT}/login.html`);

})


















// const db = mysql.createConnection({
//     host:"localhost",
//     user:"raki",
//     password:"abcd",
//     database:"karthikdb1"
// });



// db.connect(function(err){
//     if(err) throw err;
//     console.log('connected');
//     db.query(`select * from user where name='${}`,function(err,res){
//         if(err) throw err;
//         console.log(res)
//         if(givenPass==res[0].password)
//              console.log(true);
//         else
//             console.log(false);
//     });
// });

