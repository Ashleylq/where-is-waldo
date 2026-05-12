import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

router.post("/start", async (req, res) => {
    const {username} = req.body
    const game = await prisma.game.create({
        data : {
            username : username
        }
    })
    res.json({id : game.id});
})

router.post("/end/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const game = await prisma.game.findUniqueOrThrow({
            where : {id : id}
        })
        if(game.found != 4){
            res.status(401).json({err : "All characters not found"});
        }
        else {
            await prisma.game.delete({
                where : {id : id}
            })
            res.json({success : true})
        }
    }
    catch(err){
        res.status(404).json({err : "Not found"})
    }
})

export default router;