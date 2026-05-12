import { createContext } from "react"

const GameContext = createContext({
    status : "not started",
    id : null,
    time : 0,
    setStatus : () => {},
    setId : () => {},
    setTime : () => {}
})

export default GameContext