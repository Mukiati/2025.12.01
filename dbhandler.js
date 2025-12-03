const {DataTypes,Sequelize} = require('sequelize')
const handler = new Sequelize("data","root","",{
    host:"localhost",
    dialect:"mysql"
})

const studentable = handler.define("students",{
    id:
    {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    name:
    { 
        type:DataTypes.STRING,
        allowNull:false
    },
    email:
    { 
        type:DataTypes.STRING,
        allowNull:false
    },
    class:
    {
        type:DataTypes.STRING,
        allowNull:false
    },
     password:
    { 
        type:DataTypes.STRING,
        allowNull:false
    },
    phone:
    {
        type:DataTypes.INTEGER,
        allowNull:false
    }
})


const gradestable = handler.define("grades",{
    id:
    {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    student_id:
    {
        type:DataTypes.INTEGER,
        allowNull:false
    },
    grade:
    { 
        type:DataTypes.INTEGER,
        allowNull:false
    },
    subject:
    { 
        type:DataTypes.STRING,
        allowNull:false
    }
})

exports.student = studentable
exports.grade = gradestable

studentable.hasMany(gradestable,{foreignKey:"student_id",sourceKey:"id"})
gradestable.belongsTo(studentable,{foreignKey:"student_id",targetKey:"id"})