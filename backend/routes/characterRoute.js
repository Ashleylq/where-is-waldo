import { Router } from "express";
import { prisma } from "../lib/prisma.js"

const router = Router();

router.post("/:name", async (req, res) => {
    const x = parseFloat(req.body.x);
    const y = parseFloat(req.body.y)
    const id = parseInt(req.body.id)
    const {name} = req.params;
    try {
        const character = await prisma.character.findUniqueOrThrow({
            where : {name : name},
            select: {
                x : true,
                y : true
            }
        })
        const radius = 0.04;
        const xUpperLimit = character.x + radius;
        const xLowerLimit = character.x - radius;
        const yUpperLimit = character.y + radius;
        const yLowerLimit = character.y - radius;
        if(x < xUpperLimit && x > xLowerLimit && y < yUpperLimit && y > yLowerLimit){
            const game = await prisma.game.update({
                where : {id : id},
                data : {found : {
                    increment : 1
                }}
            })
            res.json({correct : true, foundAll : (game.found == 4)});
        }
        else {
            res.json({correct : false});
        }
    }
    catch(err){
        res.status(404).json({err : "Not found"})
    }
})

export default router;