import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectedCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// App config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectedCloudinary()

// middlewares
app.use(express.json())
// app.use(cors())  // real
app.use(cors({
  origin: 'http://localhost:4000', // Or your local URL
  credentials: true // Crucial for cookies
}))

// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);


app.get('/', (req,res) => {
    res.send("API Working")
})
//app.listen(port, ()=> console.log('Server started on PORT: '+ port))  real
app.listen(port, '0.0.0.0', ()=> console.log('Server started on PORT: '+ port))