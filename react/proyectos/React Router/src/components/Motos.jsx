import { useNavigate } from "react-router-dom";

export default function Motos(){
    console.log("Soy componente moto");
        const nav = useNavigate();
        const handlenReturn = () => {
            nav(-1);
        };

    return (
        <div>
            <h2>Motos disponibles</h2>
            <ul>
                <li>Yamaha</li>
                <li>Honda</li>
                <li>Ducati</li>
            </ul>
            <button onClick={handlenReturn}>Volver a inicio</button>
        </div>
    )
}