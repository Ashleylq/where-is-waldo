import { createContext } from "react"

const GameContext = createContext({
    status : "not started",
    id : null,
    setStatus : () => {},
    setId : () => {}
})

export default GameContext