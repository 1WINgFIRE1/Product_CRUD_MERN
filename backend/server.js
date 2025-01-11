import express from "express"
import connectDB from "./db.js"
import productRoutes from "./routes/product.route.js"
import cors from "cors"
import path from "path"
import dotenv from "dotenv"
const app =express();
dotenv.config();
//this will allow only the frontend to access the backend
app.use(cors());

const __dirname = path.resolve()

app.use(express.json()) //parsing to json formate

app.use("/api/products",productRoutes)

const port = process.env.PORT || 9000

if(process.env.NODE_ENV === "production"){
    // making the frontend as static
    app.use(express.static(path.join(__dirname,"/frontend/ui/build")))

    //If anyone tries to access any other route then the above mentioned routes then it will redirect to the index.html
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","ui","build","index.html"))
    })
}

app.listen(port,()=>{
    connectDB()
    console.log("Server open")
})