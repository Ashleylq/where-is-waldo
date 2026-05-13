import express from "express";
import characterRouter from "./routes/characterRoute.js";
import gameRouter from "./routes/gameRoute.js";
import leaderboardRouter from "./routes/leaderboardRoute.js";
import cors from "cors";

const app = express();

app.use(cors({
    origin : true
}))
app.use(express.json())

app.use("/character", characterRouter)
app.use("/game", gameRouter)
app.use("/leaderboard", leaderboardRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if(err){
        throw(err)
    }
})