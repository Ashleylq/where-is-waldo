import { useEffect, useRef, useState } from "react";
import styles from "./Leaderboard.module.css";

function Leaderboard(){
    const [scores, setScores] = useState([]);
    const leaderboardRef = useRef(null);
    useEffect(() => {
        async function fetchScores(){
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/leaderboard`)
            const scores = await res.json();
            setScores(scores);
        }
        fetchScores();
    }, [])
    return (
        <div>
            <button className={styles.button} onClick={() => leaderboardRef.current.showModal()}>Leaderboard</button>
            <dialog className={styles.dialog} ref={leaderboardRef}>
                <h2>Leaderboard</h2>
                <table>
                    <tr>
                        <th>Username</th>
                        <th>Time</th>
                    </tr>
                    {scores.map((score) => (
                        <tr>
                            <td>{score.username}</td>
                            <td>{parseInt(score.time)/1000}s</td>
                        </tr>
                    ))}
                </table>
                <div><button className={styles.button} onClick={() => leaderboardRef.current.close()}>Close</button></div>
            </dialog>
        </div>
    )
}

export default Leaderboard;