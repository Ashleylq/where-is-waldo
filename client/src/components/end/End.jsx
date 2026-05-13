import { useContext } from "react";
import styles from "./End.module.css";
import GameContext from "../../GameContext.jsx";
import Leaderboard from "../leaderboard/Leaderboard.jsx";

function End(){
    const {setStatus, time} = useContext(GameContext);
    return (
        <>
           <h1 className={styles.title}>Where's Waldo</h1>
           <p className={styles.msg}>Congrats!!! You finished the game in {time} seconds!! :D</p>
           <button className={styles.playAgain} onClick={() => setStatus("not started")}>Play Again</button>
           <Leaderboard/>
        </>
    )
}

export default End