const express=require("express");
const { v4: uuidv4 } = require('uuid');
const cors=require('cors')
const mongoose= require('mongoose')
const bodyParser=require('body-parser')
mongoose.connect("mongodb+srv://laukik2210:XOp0u5I4G4sODa1K@cluster0.jfqmg.mongodb.net/UserDB",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    

}).then(()=>{
    console.log("MONGO CONNECTION OPEN!!")
})
.catch(err=>{
    console.log(err)
})
const db= mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open",()=>{
    console.log("Database connected")
})
const app=express();

app.use(bodyParser.json())
app.use(cors())
const users={};
const User=require("./models/user")
app.get('/register',(req,res)=>{
    res.send(users);
})
app.post('/register',(req,res)=>{
    const id=uuidv4();
    const {title}=req.body
    users[id]={
        id,title
    }
    const user=new User({email:title})
    user.save()
    res.status(201).send(users[id])
})
app.listen(4000,()=>{
    console.log('Listening on 4000')
})