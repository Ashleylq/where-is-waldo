import express from "express";
import characterRouter from "./routes/characterRoute.js";
import cors from "cors";

const app = express();

app.use(cors({
    origin : true
}))
app.use(express.json())

app.use("/character", characterRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if(err){
        throw(err)
    }
})