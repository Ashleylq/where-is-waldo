import { useState } from "react";
import Game from "./components/game/Game.jsx";
import Start from "./components/start/Start.jsx";
import End from "./components/end/End.jsx"
import GameContext from "./GameContext.jsx";

function App(){
    // possible status : "not started", "started", "ended"
    const [status, setStatus] = useState("not started")
    const [id, setId] = useState(null)
    return (
        <GameContext.Provider value={{status, id, setStatus, setId}}>
            {status == "not started" && <Start/>}
            {status == "started" && <Game/>}
            {status == "ended" && <End/>}
        </GameContext.Provider>
    )
}

export default App;