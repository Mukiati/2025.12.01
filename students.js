const JWT = require('jsonwebtoken')
const Auth = require('./Auth')
const express = require('express')
const dbhandler = require('./dbhandler')
require('dotenv').config()
const secretkey = process.env.SECRET_KEY
const expire = process.env.EXPIRES_IN

const router = express.Router()
module.exports = router

router.post('/login',async (req,res)=>{
    const oneuser = await dbhandler.student.findOne({where:{email:req.body.email,password:req.body.password}})
    if(!oneuser)
    {
        return res.status(401).json({message:"sikertelen bejelentkezés nincs ilyen felhasználó jelszó páros"}).end()
    }
    if(oneuser.password != req.body.password)
    {
        return res.status(401).json({message:"sikertelen bejelentkezés rossz jelszó"}).end()
    }
    const encodedtoken = JWT.sign({uid:oneuser.id},secretkey,{expiresIn:expire+'h'})
    res.status(200).json({message:"sikeres bejelentkezés",token:encodedtoken}).end()
})


router.post('/register',async(req,res)=>{
    const oneuser = await dbhandler.student.findOne({where:{email:req.body.email}})
    if(oneuser)
    {
        return res.status(409).json({message:"már létező felhasználó"})
    }
    await dbhandler.student.create({
        name:req.body.name,
        password:req.body.password,
        class:req.body.class,
        email:req.body.email,
        phone:req.body.phone
    })
    res.status(201).json({message:"sikeres regisztráció"})
})


router.get('/student',Auth(),async(req,res)=>{
    return res.json(await dbhandler.student.findAll({where:{id:req.uid}}))
})

router.patch('/student',Auth(),async(req,res)=>{
    const onestudent = await dbhandler.student.findOne({
        where:{id:req.uid}
    })
    if(!onestudent)
    {
        return res.json({message:"nincs ilyne adat"}).end()
    }
    if(req.body.phone)
    {
        await dbhandler.student.update({
            phone:req.body.phone
        },{where:{
            id:req.uid
        }})
    }
    res.json({message:"sikeres modosítás"}).end()
})

router.put('/student',Auth(),async(req,res)=>{
    const onestudent = await dbhandler.student.findOne({
        where:{id:req.uid}
    })
    if(!onestudent)
    {
        return res.json({message:"nincs ilyne adat"}).end()
    }
    if(req.body.password)
    {
        await dbhandler.student.update({
            password:req.body.password
        },{where:{
            id:req.uid
        }})
    }
    res.json({message:"sikeres modosítás"}).end()
})