const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyparser = require('body-parser')

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));
app.listen(5000,()=>console.log('server running on port 5000'));

const db = mysql.createConnection({
    host: "119.59.96.90",
    user: "projectoldhappy_admin",
    password: "ytAb49*72",
    database: "projectoldhappy_db",
    port: "3306" 
})

db.connect((err)=>{
    if(err){
        console.log("error connect database =",err)
        return;
    }
    console.log("mysql connect success");
})

app.post('/admin',(req,res)=>{
  const sqlAdmin = "SELECT * FROM admin WHERE emailAdmin = ? AND passwordAdmin = ?";

  db.query(sqlAdmin,[req.body.emailAdmin,req.body.passwordAdmin],(err,data)=>{
    if(err){
      console.log(err);
    }
    if(data.length>0){
      console.log("Login Success");
      res.send(data);
    }
    else{
      console.log("Wrong Email or Password");
        res.send(false);
    }
  })
})

app.get('/report',(req, res)=>{
  db.query("SELECT * FROM report", (err, result)=>{
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.get('/tour',(req, res)=>{
  db.query("SELECT * FROM tour", (err, result)=>{
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.get('/customer',(req, res)=>{
  db.query("SELECT * FROM customer", (err, result)=>{
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.get('/guide',(req, res)=>{
  db.query("SELECT * FROM guide", (err, result)=>{
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.get('/getblacklistname',(req,res)=>{
  db.query("SELECT * FROM user",(err,result)=>{
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.post('/postblacklistname',(req,res)=>{
  const blname = req.body.blname;
  db.query("INSERT INTO blacklist (blacklist_name) VALUES (?)",[blname],(err,result)=>{
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.delete('/blacklists',(req, res)=>{
  const userID = req.body.userID;
  console.log(userID)
  db.query("DELETE FROM blacklist WHERE blacklist.userID = ?",[userID] ,(err, result)=>{
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.get('/getblacklistname',(req, res)=>{
  db.query("SELECT * FROM blacklist", (err, result)=>{
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.get('/getcertificate',(req,res)=>{
  db.query("SELECT certificate FROM guide",(err,result)=>{
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.post('/postapproved',(req,res)=>{
  console.log("143")
  const approved = req.body.approved;
  const adminID = req.body.adminID;
  const userID = req.body.userID;
  db.query("UPDATE guide SET adminID = ? , approved= ? WHERE guide.userID = ?",
  [adminID,approved,userID],(err,result)=>{
    if (err) {

      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.post('/postreports',(req,res)=>{
  console.log("156")
  const statususer = req.body.statususer;
  const userID = req.body.userID;
  db.query("UPDATE user SET statususer = ? WHERE user.userID = ?",
  [statususer,userID],(err,result)=>{
    if (err) {

      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.post('/postblacklist',(req,res)=>{
  console.log("171")
  const statususer = req.body.statususer;
  const userID = req.body.userID;
  db.query("UPDATE user SET statususer = ? WHERE user.userID = ?",
  [statususer,userID],(err,result)=>{
    if (err) {

      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.get('/getapproved',(req,res)=>{
  db.query("SELECT approved FROM guide",(err,result)=>{
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    } 
  })
})
app.post('/getfnametobl',(req,res)=>{
  const adminID = req.body.adminID;
  const userID = req.body.userID;
  console.log(userID)
  db.query("INSERT INTO blacklist(adminID,userID) values (?,?)",[adminID,userID],(err,result)=>{
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})  

app.get('/blacklistname',(req,res)=>{
  db.query("SELECT * FROM blacklist INNER JOIN user ON blacklist.userID = user.userID",(err,result)=>{
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.get('/getreports',(req,res)=>{
  db.query("SELECT * FROM report INNER JOIN tour ON report.tourID= tour.tourID INNER JOIN user ON user.userID= tour.userID",(err,result)=>{
    if (err) {
      console.log(err); 
    } else {
      res.send(result);
    }
  })
})

app.get('/getapproveddetail',(req,res)=>{
  db.query("SELECT * FROM guide INNER JOIN user ON guide.userID = user.userID",(err,result)=>{
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
}) 

app.post('/postaction',(req,res)=>{
  console.log("238")
  const action = req.body.action;
  const adminID = req.body.adminID;
  const userID = req.body.userID;
  console.log("238")
  db.query("INSERT INTO admin_action(adminID,action,userID) values (?,?,?)",
  [adminID,action,userID],(err,result)=>{
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    } 
  })
})

app.post('/postactionnot',(req,res)=>{
  console.log("238")
  const actionnot = req.body.actionnot;
  const adminID = req.body.adminID;
  const userID = req.body.userID;
  console.log("238")
  db.query("INSERT INTO admin_action(adminID,action,userID) values (?,?,?)",
  [adminID,actionnot,userID],(err,result)=>{
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.delete('/deleteguide',(req, res)=>{
  const userID = req.body.userID;
  console.log(userID)
  db.query("DELETE FROM guide WHERE guide.userID = ?",[userID] ,(err, result)=>{
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.post('/poststatusguide',(req,res)=>{
  const statusguide = req.body.statusguide;
  const userID = req.body.userID;
  db.query("UPDATE user SET statusguide = ? WHERE user.userID = ?",
  [statusguide,userID],(err,result)=>{
    if (err) {

      console.log(err);
    } else {
      res.send(result);
    }
  })
})