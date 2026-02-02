import { useState } from "react";

export default function Hijo({nombreInicial}){
    const [nombre, setNombre] = useState(nombreInicial);
    console.log("Soy el hijo");
        return (
            <>
                <h1>Soy el hijo {nombre}</h1>
                <button onClick={ ()=> {setNombre("Luis")} }>Cambia nombre hijo</button>
            </>
           
        );
}