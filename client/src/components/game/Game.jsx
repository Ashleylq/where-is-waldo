import { useRef, useState } from "react";
import styles from "./Game.module.css"

function Game(){
    const imageRef = useRef(null);
    const [coordinates, setCoordinates] = useState(null)
    function getCoordinates(e){
        const bounds = imageRef.current.getBoundingClientRect();
        const x = (e.clientX - bounds.left) / bounds.width;
        const y = (e.clientY - bounds.top) / bounds.height
        setCoordinates({x : x, y : y})
    }
    return (
        <>
            <img ref={imageRef} className={styles.image} onClick={e => getCoordinates(e)} src="/beach.jpeg"/>
        </>
    )
}

export default Game