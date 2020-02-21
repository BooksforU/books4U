const express = require("express")
const router = express.Router()
const bycrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const keys = require("../../config/key")


//Input Validation
const ValidateRegisterInput = require("../../validation/register")
const validateLoginInput = require("../../validation/login")

//User Model
const User = require("../../models/User")

// Register Route
router.post("/register",(req,res)=>{
     const {errors,isValid} = ValidateRegisterInput(req.body)

     if(!isValid){
         return res.status(400).json(errors);
     }
     //email Exists
     User.findOne({email:req.body.email}).then(
         user=>{
            if(user){
                return res.status(400).json({email:"Email already exists"})
            }
            else{
                const newUser =  new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                  });
            //Hash password before save data 
            bycrypt.genSalt(10,(err,salt) =>{
                bycrypt.hash(newUser.password,salt,(err,hash) =>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save().then(
                        user =>res.json(user)       
                    ).catch(err =>{
                        Console.log(err)
                    })
                })
            })
            }
         })
})

//login Routes
router.post("/login",(req,res)=>{
    //Form Validation
    const  {errors,isValid} = validateLoginInput(req.body)
    //check validation
    if(!isValid){
        return res.status(400).json(errors)

    }
    const email =req.body.email
    const password = req.body.password

    //Find user by email
    User.findOne({email}).then(
        user =>{
            if(!user){
                return res.status(400).json({
                    emailnotfound:"email not found"
                })
            }
            //check password
            bycrypt.compare(password,user.password).then(isMatch =>{
                if(isMatch){
                    //password matched
                    //Create jwt payload
                    const payload = {
                        id:user.id,
                        name:user.name
                    }
                    //sign token 
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        {
                            expiresIn:31556926
                        },
                        (err,token) =>{
                            res.json({
                                success:true,
                                token: "Bearer" + token
                            })
                        }
                    )
                }
                else{
                    return res.status(400).json({
                        passwordincorrect:"Password incorrect"
                    })
                }
            })
        })
})
module.exports = router;