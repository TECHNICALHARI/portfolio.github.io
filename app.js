const express=require('express');
const hbs=require('hbs');
const path=require('path');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/portfolioContact",{useNewUrlParser:true, useUnifiedTopology: true });
const portfolioSchema=new mongoose.Schema({
    username:String,
    number:Number,
    email:String,
});
const contact=mongoose.model('contact',portfolioSchema);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/public',express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');
app.get('/',(req,res)=>{
    res.render('index');
})
app.post('/',(req,res)=>{
    console.log(req.body);
    let myData=new contact(req.body);
    myData.save().then(()=>{
        res.send('<h1>Thanks for contact me</h1>');
    }).catch(()=>{
        res.send("<h1>404 Error</h1>");
    });

});
app.listen(3000,()=>{
    console.log("The server is running on port 3000:");
});
