const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

const {Usermodel,Todomodel} = require('./db');
const {auth,JWT_SECRET} = require('./auth');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://prashantkarki:nHTQ99lLTXjSI6aI@cluster0.bc0zy5d.mongodb.net/');

app.use(express.json());

app.post('/signup',async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    try{
        await Usermodel.create({
        username: username,
        password: password,
        email: email
        });

        res.json({
        msg: "You are signed up!"
        });
    }
    catch(err){
        if(err.code===11000){
            res.json({
            msg: "Email already exists"
            });
        }
        else{
            res.json({
                msg:"Some error"
            });
        }

    }
});

app.post('/signin',async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const response = await Usermodel.findOne({
        email: email,
        password: password
    });
    if(response){
        const token = jwt.sign({
            id: response._id.toString()
        },JWT_SECRET);
        res.json({
            msg:"You are signed in!",
            token: token
        });
    }
    else{
        res.status(403).json({
            msg:"Wrong email or password!"
        });
    }
});

app.post('/todo',auth,async (req,res)=>{
    const userId = req.userId;
    const description = req.body.description;

    await Todomodel.create({
        userId: userId,
        description: description
    });
    res.json({
        msg:"Todo created"
    });
});

app.get('/todos',auth,async (req,res)=>{
    const userId = req.userId;

    const todos = await Todomodel.find({
        userId: userId
    });
    res.json({
        todos
    });
});

app.listen(3000);
