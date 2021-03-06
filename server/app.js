let express = require('express')
let cors = require('cors')
require('dotenv').config()
let authRouter = require('./route/authRoute.js')
let productRouter = require('./route/productRoute.js')
let userRouter = require('./route/userRoute.js')
let addressRouter = require('./route/addressRoute.js')
let orederRouter = require('./route/orderRoute.js')
let reviewRouter = require('./route/reviewRoute.js')
let mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://${process.env.DATABASE_ADMIN}:${process.env.DATABASE_PASSWORD}@cluster0.czfmh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('MongoDB connected successfully,Alhamdulillah');
});
let app = express()
let middleware = [
    express.urlencoded({ extended: true }),
    express.json(),
    cors()
]
app.use(middleware)
app.use('/auth', authRouter)
app.use('/product', productRouter)
app.use('/user', userRouter)
app.use('/address', addressRouter)
app.use('/order', orederRouter)
app.use('/review', reviewRouter)
app.use('/', (req, res) => {
    return res.json({
        myCreator: 'Allah.Allah is Almighty',
        status: 'MERN STACK E-commerce'
    })
})
app.listen(process.env.PORT || '5000', () => {
    console.log('Server is running successfully,Alhamdulillah');
})
//chat functionalities https://crisp.chat
//forntEND  https://dcel.xyz