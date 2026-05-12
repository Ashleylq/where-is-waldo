import { useRef, useState, useContext } from "react";
import styles from "./Game.module.css";
import Waldo from "../../assets/waldo.jpeg";
import Wenda from "../../assets/wenda.webp";
import Wizard from "../../assets/wizard.webp";
import Odlaw from "../../assets/odlaw.webp";
import GameContext from "../../GameContext.jsx";

function Game(){
    const imageRef = useRef(null);
    const [coordinates, setCoordinates] = useState(null);
    const [characters, setCharacters] = useState([
        {
            id : 1,
            name : "Waldo",
            image : Waldo,
            found : false
        }, {
            id : 2,
            name : "Wenda",
            image : Wenda,
            found : false
        }, {
            id : 3,
            name : "Wizard",
            image : Wizard,
            found : false
        }, {
            id : 4,
            name : "Odlaw",
            image : Odlaw,
            found : false
        }
    ])
    function getCoordinates(){
        const bounds = imageRef.current.getBoundingClientRect();
        const x = (coordinates.x - bounds.left) / bounds.width;
        const y = (coordinates.y - bounds.top) / bounds.height;
        return {x : x, y : y}
    }
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Where's Waldo</h1>
            <div className={styles.charContainer}>
                {characters.map((char) => (
                    <div>
                        <img src={char.image}/>
                        {char.found ? <p><s>{char.name}</s></p> : <p>{char.name}</p> }
                    </div>
                ))}
            </div>
            {coordinates && <div style={{left : coordinates.x, top : coordinates.y}} className={styles.selected}></div>}
            <DropDown coordinates={coordinates} characters={characters} setCharacters={setCharacters} setCoordinates={setCoordinates} getCoordinates={getCoordinates}/>
            <img ref={imageRef} className={styles.image} onClick={e => setCoordinates({x : e.clientX, y : e.clientY})} src="/beach.jpeg"/>
        </div>
    )
}

function DropDown({coordinates, characters, setCharacters, setCoordinates, getCoordinates}){
    const {id, setStatus} = useContext(GameContext);
    if(!coordinates){
        return null;
    }
    async function checkCoordinates(name){
        const data = getCoordinates();
        data.id = id
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/character/${name}`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        })
        const result = await res.json();
        if(result.correct){
            if(result.foundAll){
                await endGame(id);
                return;
            }
            const copy = characters.map(char => char.name == name ? {...char, found : true} : {...char})
            setCharacters(copy);
        }
        setCoordinates(null);
    }
    async function endGame(id){
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/game/end/${id}`, {
            method : "PATCH"
        })
        const result = await res.json()
        if(result.success){
            setStatus("ended");
        }
    }
    return (
        <div className={styles.dropDown} style={{left : coordinates.x - 2 , top : coordinates.y + 60}}>
            {characters.map((char) => {
                if(!char.found){
                    return <button key={char.id} onClick={async () => await checkCoordinates(char.name)}>{char.name}</button>
                }
            })}
        </div>
    )
}

export default Game