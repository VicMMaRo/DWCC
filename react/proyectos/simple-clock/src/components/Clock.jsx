import { useState } from "react";
import { useClock } from "../hooks/useClock"
import {formatDate, countDown} from "../utils/time"

export function Clock(){
    const currentDateTime = useClock();
    //constante para guardar alarma del input y para guardar la alarma escogida al pulsar el botón
    const [alarmInPut, setAlarm] = useState("");
    const [selectedAlarm, setSelectedAlarm] = useState("");

    //Función para manejar formulario y setear la alarma escogida
    const handlSetAlarm = (e) => {
        e.preventDefault();
        //Asignamos la alarma escogida en el input a selectedAlarm
        setSelectedAlarm(alarmInPut);
    };

    //Llamamos a countDown y le pasamos la alarma seleccionada y la fecha de hoy
    let textoCuentaAtras = countDown(selectedAlarm, currentDateTime);
    
    return (
        <>
            <div>
                <h1>Reloj</h1>
                <h4>{formatDate(currentDateTime)}</h4>

                <h4>Seleccione una alarma</h4>
                <form onSubmit={handlSetAlarm}>
                    <input type="time"  onChange={(e)=> {setAlarm(e.target.value),console.log(alarmInPut);}} value={alarmInPut}/>
                    <button type="submit" >Activar</button>
                    <button type="button" onClick={()=>{setAlarm(""); setSelectedAlarm("")}}>Resetear</button>
                </form>

                {/* Si hay texto mostramos la cuenta atrás */}                
                {textoCuentaAtras && ( <p style={{ color: textoCuentaAtras === "Ring Ring Ring!!! 🔔🔔🔔" ? "red" : "green" }}>Tiempo restante: {textoCuentaAtras}</p> )}
            </div>
            
        </>
    )
}