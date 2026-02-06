import { useState } from "react";
import { useClock } from "../hooks/useClock"
import {formatDate} from "../utils/time"

export function Clock(){
    const currentDateTime = useClock();
    //constante para guardar alarma
    const [alarm, setAlarm] = useState();

    return (
        <>
            <h1>Reloj</h1>
            <h4>{formatDate(currentDateTime)}</h4>

            <h4>Seleccione una alarma</h4>
            <input type="time"  onChange={(e)=> {setAlarm(e.target.value),console.log(alarm);}}/>
        </>
    )
}