import { useNavigate } from "react-router-dom";

export default function Coches(){
    console.log("Soy componente coches");
    const nav = useNavigate();
    return (
        <div>
            <h2>Coches disponibles</h2>
            <ul>
                <li>Hyunday</li>
                <li>BMW</li>
                <li>Mercedes</li>
            </ul>
            <button onClick={()=> {nav("/")}}>Volver a Inicio</button>
        </div>
    )
}