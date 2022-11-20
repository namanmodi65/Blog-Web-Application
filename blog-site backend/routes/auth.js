const express = require('express')
const User = require('../models/User')
const Post = require('../models/Post')
const bcrypt = require('bcrypt');
const { findOneAndUpdate, findByIdAndUpdate } = require('../models/User');


const router = express.Router()


//RESISTER
router.post('/resister',async(req,res)=>{
    try {
        const salt = await bcrypt.genSalt(10)
        const secretPass = await bcrypt.hash(req.body.password,salt)
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:secretPass
        })

        const user = await newUser.save()
        res.status(200).json(user)
    } catch (error) {
        // console.error(error)
        res.status(500).send("some error occured")
    }
})

// LOGIN
router.post('/login',async(req,res)=>{
    try {
        const user = await User.findOne({username:req.body.username})
        !user && res.status(200).json("Wrong credentials")
        
        const validated = await bcrypt.compare(req.body.password,user.password)
        !validated && res.status(200).json("Wrong credentials")
        const {password,...others} = user._doc

        res.status(200).json(others)

    } catch (error) {
        // console.error(error)
        res.status(500).send("some error occured")
    }
})
// UPDATE
router.put('/:id',async(req,res)=>{
    if(req.body.userId === req.params.id ){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password,salt)
        }
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id,{
                $set : req.body,
            },{new:true})

            res.status(200).json(updateUser)
        } catch (error) {
            res.status(500).send("some error occured")
        }
    }
    else{
        res.status(401).json("You can update only your account")
    }
    
})


// DELETE
router.delete('/:id',async(req,res)=>{
    if(req.body.userId === req.params.id ){
        try {  
            const user = await User.findById(req.params.id)
            try {
                await Post.deleteMany({username:user.username})
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("User has been deleted...")
            } catch (error) {
                res.status(500).send("some error occured")
            }
        } catch (error) {
            res.status(404).json("User not found!")
        }
    }
    else{
        res.status(401).json("You can delete only your account")
    }
    
})

//GET 
router.get('/:id',async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        const {password,...others} = user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500).send("some error occured")
    }
})

module.exports = router