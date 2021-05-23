let express=require('express')
require('dotenv').config()
let mongoose=require('mongoose')
mongoose.connect(`mongodb+srv://${process.env.DATABASE_ADMIN}:${process.env.DATABASE_PASSWORD}@cluster0.czfmh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true},()=>{
    console.log('MongoDB connected successfully,Alhamdulillah');
});
let app=express()
let middleware=[
    express.urlencoded({extended:true}),
    express.json()
]
app.use(middleware)
app.listen('5000',()=>{
    console.log('Server is running successfully,Alhamdulillah');
})