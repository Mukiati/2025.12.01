const JWT = require('jsonwebtoken')
const Auth = require('./Auth')
const express = require('express')
const dbhandler = require('./dbhandler')
require('dotenv').config()
const secretkey = process.env.SECRET_KEY
const expire = process.env.EXPIRES_IN

const router = express.Router()
module.exports = routerererere

router.get('/grade',Auth(),async(req,res)=>{
    return res.json(await dbhandler.grade.findAll({where:{student_id:req.uid},attributes:['grade']}))
})

router.post('/grade',Auth(),async(req,res)=>{
    const onegrade = await dbhandler.grade.findOne({where:{grade:req.body.grade}})
    if(onegrade)
    {
        return res.status(409).json({message:"már létező  adat"})
    }
    await dbhandler.grade.create({
        grade:req.body.grade,
        subject:req.body.subject,
        student_id:req.uid
    })
    res.status(201).json({message:"sikeres létrehozás"}).end()
})

router.get('/grade/:subject',Auth(),async(req,res)=>{
    const subject = req.params.subject

    const grades = await dbhandler.grade.findAll({where:{
        student_id:req.uid,
        subject:subject
    }})
    if(grades.length == 0)
    {
        return res.json({message:"nincs átlag"})
    }
    let sum = 0
    for(const item of grades)
    {
        sum = item.grade
    }
    const avg = sum /grades.length
    console.log(avg)
    res.json({message:"átlag"+avg})
})