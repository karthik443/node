const mysql = require('mysql');
const { application } = require('express');
const path = require('path');
const express = require('express');


let ts = Date.now();

let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();

// prints date & time in YYYY-MM-DD format
let present_date=year + "-" + month + "-" + date
console.log(present_date);


const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))

let searchTerm='';
let givenPass='';
let  qPass='';
let flag = false;

app.post('/signup-form',(req,res)=>{
    console.log(req.body);
    
    var finishRequest = function() {
      
            console.log('your account has been created');
            res.sendFile(path.join(__dirname,'public','login.html'))
    
    }
    var catch_err = function() {
        console.log('an error occured');
        res.sendFile(path.join(__dirname,'public','error.html'))

}

    const db = mysql.createConnection({
        host:"localhost",
        user:"raki",
        password:"abcd",
        database:"karthikdb1"
    });
    
    db.connect(function(err){
        if(err) throw err;
        
      
        console.log('connected');
        
        db.query(`insert into user values('${req.body.userName}','${req.body.password}','${req.body.phoneNumber}','${present_date}')`,function(err,res){
            
            if(err) return catch_err();
            finishRequest();
        });
        
    });
        db.end;
})

app.post('/form-submit',(req,res)=>{
    searchTerm = req.body.userName;
    givenPass = req.body.password;
    flag = false;
    lock=1;
    //database connection 

    var finishRequest = function() {
        if(flag){
            res.sendFile(path.join(__dirname,'public','index.html'))
        }
        else{
            res.sendFile(path.join(__dirname,'public','error.html'))
            // res.send('<h1> wrong credentials</h1>');
        }
    }

const db = mysql.createConnection({
    host:"localhost",
    user:"raki",
    password:"abcd",
    database:"karthikdb1"
});



db.connect(function(err){
    if(err) throw err;
    console.log('connected');
    db.query(`select * from user where datediff(convert(sysdate(),date),logindate)/30<1 and name='${searchTerm}'`,function(err,res){
        if(err) throw err;

    if(Object.keys(res).length==0){
       return finishRequest();

    }
        qPass = res[0].password;
        console.log(qPass+" "+givenPass);
        // console.log(givenPass==qPass);
        if(givenPass==qPass)
            flag=true;
        lock=0;
        if(lock==0){
            finishRequest();
        }
        
        
    });

});
    db.end;
    
})


const PORT  = process.env.PORT || 5000;
app.listen(PORT,()=>{
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

