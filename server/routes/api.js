const express = require('express')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')
const db = "mongodb+srv://Klimmie:9ZIxkdcqbt3MTuUx@gardener.8ybqtxn.mongodb.net/test"
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const saltRounds = 10
const secretKey= "IHateJavaScript"

mongoose.connect(db, err => {
    if(err){
        console.error(err)
    } else {
        console.log('MongoDB works')
    }
})

function verifyToken(req, res, next)
{
    if(!req.header.token)
        return res.status(401).send('Unauthorised access')
    let token = req.headers.token
    if(token == null)
        return res.status(401).send('Unauthorised access')
    let payload = jwt.verify(token, secretKey)
    if(!payload)
        return res.status(401).send('Unauthorised access')
    req.userID = payload.subject
    next()
}

router.get('/', (req, res) => {
    res.send('General Kenobi')
})

router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    User.findOne({$or: [{email: user.email}, {nickname: user.nickname}]}, (error, userFound) =>{
        if(error){
            console.log(error)
        }
        else if(userFound)
        {
            if(userFound.email === user.email)
            {
                res.status(409).send("This email is taken")
            }
            else
            {
                res.status(409).send("This nickname is taken")
            }
        }
        else
        {
            bcrypt.genSalt(saltRounds, (err, salt) => {
                if(err){
                    console.log(err)
                }
                else{
                    bcrypt.hash(userData.password, salt, (err, hash) => {
                        if(err)
                        {
                            console.log(err)
                        }
                        else
                        {
                            user.password = hash;
                            user.save((error, registeredUser) =>{
                                if(error){
                                    console.error(error)
                                }
                                else{
                                    let payload = { subject: registeredUser.id }
                                    let token = jwt.sign(payload, secretKey)
                                    res.status(200).send({token})
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne({email: userData.email}, (error, user) => {
        if(error)
        {
            console.log(error)
        }
        else
        {
            if(!user){
                res.status(401).send('No user with specified email exists')
            }
            else
            {
                bcrypt.compare(userData.password, user.password, (error, result) => {
                    if(error)
                    {
                        console.log(error)
                    }
                    else if(!result)
                    {
                        res.status(401).send('The password is incorrect')
                    }
                    else
                    {
                        let payload = {subject: user.id}
                        let token = jwt.sign(payload, secretKey)
                        res.status(200).send({token})
                    }
                })
            }
        }
    })
})

router.post('/verify', verifyToken,  (req, res) => {
    console.log("?")
    User.findOne({id: req.userID}, (error, user) => {
        if(!error && user != null)
        {
            console.log("verified")
            res.status(200).send(true)
        }
        else
            res.status(200).send(false)
    })
})

module.exports = router