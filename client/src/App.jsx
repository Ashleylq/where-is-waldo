import { useState } from "react";
import Game from "./components/game/Game.jsx";
import Start from "./components/start/Start.jsx";
import End from "./components/end/End.jsx"
import GameContext from "./GameContext.jsx";

function App(){
    // possible status : "not started", "started", "ended"
    const [status, setStatus] = useState("not started")
    const [id, setId] = useState(null);
    const [time, setTime] = useState(0);
    return (
        <GameContext.Provider value={{status, id, time, setStatus, setId, setTime}}>
            {status == "not started" && <Start/>}
            {status == "started" && <Game/>}
            {status == "ended" && <End/>}
        </GameContext.Provider>
    )
}

export default App;