import { useRef, useState } from "react";
import Hijo from "./Hijo";

export default function Padre(){
    console.log("Soy el padre");

    const[nombre, SetNombre] = useState("Victor");

    let nombre1 = useRef("Manolo");
    let nombre2 = useRef("Laura");

    return (
        <>
            <h1>Soy {nombre}</h1>
            <button onClick={()=> SetNombre("Victor Manuel")}>Cambia nombre padre</button>
            <Hijo key="1" id="1" nombre={nombre1}/>
            <Hijo key="2" id="2" nombre={nombre2}/>
        </>
       
    );
}