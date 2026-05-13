import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

router.get("/", async (req, res) => {
    const scores = await prisma.score.findMany({
        orderBy : {
            time : 'desc'
        }
    })
    res.json(scores);
})

export default router;