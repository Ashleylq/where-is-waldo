import { useContext, useRef } from "react";
import styles from "./Start.module.css";
import GameContext from "../../GameContext.jsx"

function Start(){
    const {setStatus, setId} = useContext(GameContext)
    const usernameRef = useRef(null);
    const startGame = async (e) => {
        e.preventDefault();
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/game/start`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({username : usernameRef.current.value})
        })
        const result = await res.json();
        setId(result.id);
        setStatus("started")
    }
    return (
        <>
            <h1 className={styles.title}>Where's Waldo</h1>
            <form className={styles.form} onSubmit={startGame}>
                <label for="username">Enter your name big dawg</label>
                <input name="username" id="username" ref={usernameRef} required/>
                <button type="submit">Play</button>
            </form>
        </>
    )
}

export default Start