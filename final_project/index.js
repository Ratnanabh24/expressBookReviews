const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();
app.use(express.json());

app.use("/customer", session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}));

app.use("/customer/auth/*", function auth(req,res,next){
    if(req.session.authorization) {
        let token = req.session.authorization['accessToken'];
        jwt.verify(token, "access", (err,user)=>{
            if(!err){
                req.user = user;
                next();
            } else {
                return res.status(403).json({message:"User not authenticated"});
            }
         });
     } else {
         return res.status(403).json({message: "User not logged in"});
     }
});

app.use("/customer", customer_routes);
app.use("/", genl_routes);

// Explicitly link the register route from general.js or handle it here
app.post("/register", (req, res) => {
    const { username, password } = req.body;
    const auth_users = require('./router/auth_users.js');
    if (username && password) {
        if (!auth_users.isValid(username)) {
            auth_users.users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registred. Now you can login"});
        }
        return res.status(404).json({message: "User already exists!"});
    }
    return res.status(404).json({message: "Unable to register user."});
});

app.listen(5000,()=>console.log("Server is running"));
