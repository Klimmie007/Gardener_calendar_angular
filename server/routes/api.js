const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Preserve = require('../models/preserve')
const GardenPatch = require('../models/gardenPatch')
const Plant = require('../models/plant')
const Harvest = require('../models/harvest')
const SowedPlant = require('../models/sowedPlant')
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
    if(!req.headers.token)
        return res.status(401).send('Unauthorised access 1')
    let token = req.headers.token
    if(token == null)
        return res.status(401).send('Unauthorised access 2')
    let payload = jwt.verify(token, secretKey)
    if(!payload)
        return res.status(401).send('Unauthorised access 3')
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

router.post('/user', verifyToken,  (req, res) => {
    User.findById(req.userID, (error, user) => {
        if(!error && user != null)
        {
            user.password = "No password for you kek"
            res.status(200).send(user)
        }
        else
            res.status(401).send("No user with specified id found")
    })
})

router.put('/user/email', verifyToken, (req, res) => {
    let email = req.body
    User.findByIdAndUpdate({_id: req.userID}, {email: email.email}, {new: true}, (err, user) => {
        if(!err && user != null)
            res.status(204)
        else
            res.status(404).send("No user with specified ID found")

    })
})

router.put('/user/password', verifyToken, (req, res) => {
    let password = req.body.password
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if(err){
            console.log(err)
        }
        else{
            bcrypt.hash(password, salt, (err, hash) => {
                if(err)
                {
                    console.log(err)
                }
                else
                {
                    User.findByIdAndUpdate({_id: req.userID}, {password: hash}, {new: true}, (err, user) => {
                        if(!err && user != null)
                            res.status(204)
                        else
                            res.status(404).send("No user with specified ID found")

                    })
                }
            })
        }
    })

})

router.put('/user/nickname', verifyToken, (req, res) => {
    let nickname = req.body.nickname
    User.findByIdAndUpdate({_id: req.userID}, {email: nickname}, {new: true}, (err, user) => {
        if(!err && user != null)
            res.status(204)
        else
            res.status(404).send("No user with specified ID found")

    })
})

router.delete('/user/delete', verifyToken, (req, res) => {
    User.findByIdAndRemove({_id: req.userID}, (err, doc) =>{
        if(!err && doc != null)
            res.status(204)
        else
            res.status(404).send("no fucking clue")
    })
})

router.post('/preserves', (req, res) => {
  let preserveData = req.body;
  let preserve = new Preserve(preserveData);

  preserve.save((error, newPreserve) =>{
    if(error){
        console.error(error);
    }
    else{
        res.status(200).send({newPreserve});
    }
  });
});

router.get('/preserves', async (req, res) => {
  try {
    const data = await Preserve.find();
    res.json(data);
  }
  catch(error) {
    res.status(500).json({message: error.message});
  }
});

router.post('/gardenPatches', (req, res) => {
  let gardenPatchData = req.body;
  let gardenPatch = new GardenPatch(gardenPatchData);

  gardenPatch.save((error, newGardenPatch) => {
    if(error) {
      console.log(error);
    }
    else {
      res.status(200).send({newGardenPatch});
    }
  });
});

router.get('/gardenPatches', async (req, res) => {
  try {
    const data = await GardenPatch.find();
    res.json(data);
  }
  catch(error) {
    res.status(500).json({message: error.message});
  }
});

router.post('/plant', (req, res) => {
    let plantData = req.body
    let plant = new Plant(plantData)

    plant.save((error, newPlant) => {
        if(error || !newPlant){
            res.status(400).send("what the fuck")
        }
        else(
            res.status(200).send({newPlant})
        )
    })
})

router.get('/plant', async (req, res) => {
    try {
        const data = await Plant.find();
        res.json(data);
      }
      catch(error) {
        res.status(500).json({message: error.message});
      }
})

router.post('/plant/id', (req, res) => {
    reqBody = req.body
    Plant.findById({_id: reqBody.id}, (error, plant) => {
        if(error || !newPlant){
            res.status(404).send("no plant with specified ID found")
        } else {
            res.status(200).send({plant})
        }
    })
})

router.get('/plant/date/sow', (req, res) => {
    date = req.body.date
    Plant.find({sowingSeasonStart: {$lt: date}, sowingSeasonEnd: {$gt: date}}, (error, plants) =>{
        if(error || !plants){
            res.status(404).send(error.message)
        } else {
            res.status(500).json(plants)
        }
    })
})

router.put('/sowedPlant', (req, res) => {
    let sowedPlantData = req.body
    let sowedPlant = new SowedPlant(sowedPlantData)
    sowedPlant.save((error, newSowedPlant) => {
        if(error || !newSowedPlant){
            res.status(400).send("what the fuck")
        }
        else{
            res.status(204)
        }
    })
})

router.get('/sowedPlant', async (req, res) => {
    try {
        const data = await SowedPlant.find().populate("plantID").populate("gardenPatchID");
        res.json(data);
      }
      catch(error) {
        res.status(500).json({message: error.message});
      }
})

router.post('/sowedPlant/remove', (req, res) => {
    SowedPlant.findByIdAndRemove({_id: req.body.id}, (err, doc) =>{
        if(!err && doc != null)
            res.status(204)
        else
            res.status(404).send(req.body.id)
    })
})

router.put('/harvest', (req, res) => {
    let harvestData = req.body
    let harvest = new Harvest(harvestData)

    harvest.save((error, newSowedPlant) => {
        if(error || !newSowedPlant){
            res.status(400).send("what the fuck")
        }
        else{
            res.status(204)
        }
    })
})

router.get('/harvest', async (req, res) => {
    try {
        const data = await Harvest.find().populate("harvestedPlant");
        res.json(data);
      }
      catch(error) {
        res.status(500).json({message: error.message});
      }
})

module.exports = router
