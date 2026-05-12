import { prisma } from "../lib/prisma.js";

async function seed(){
    const characters = [
        {
            name : "Waldo",
            x : 0.61796875,
            y : 0.358125
        }, {
            name : "Wenda",
            x : 0.77265625,
            y : 0.393125

        }, {
            name : "Wizard",
            x : 0.2703125,
            y : 0.33625
        }, {
            name : "Odlaw",
            x : 0.10859375,
            y : 0.33625
        }
    ]
    for(const char of characters){
        await prisma.character.upsert({
            where : {name : char.name},
            update : {},
            create : {
                name : char.name,
                x : char.x,
                y : char.y
            }
        })
    }
}

seed()
.catch((err) => {
    console.error(err);
})
.finally(() => {
    prisma.$disconnect();
})