import { useContext } from "react";
import styles from "./End.module.css";
import GameContext from "../../GameContext.jsx"

function End(){
    const {setStatus} = useContext(GameContext);
    return (
        <>
           <h1 className={styles.title}>Where's Waldo</h1>
           <button className={styles.playAgain} onClick={() => setStatus("not started")}>Play Again</button>
        </>
    )
}

export default End