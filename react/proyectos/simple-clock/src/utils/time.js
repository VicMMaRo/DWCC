//Función para formatear fecha
export function formatDate(date){
            const options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }

            return date.toLocaleString("es-ES", options);
}

//Función para calcular cuenta atrás
export const countDown = (alarm, currentTime) => {
    //Si no hay alarma selecionada no hacemos nada y retornamos string vacío
    if(!alarm) return "";

    //Si hay alarma hacemos los cálculos
        //pasamos la hora de alarma a fecha real
        const[horas, minutos] = alarm.split(":");//separamos en hora y minutos
        const fechaAlarma = new Date(currentTime);//creamos fechaAlarma usando currentDateTime
        console.log("Fecha creada desde currentime: "+fechaAlarma);
        fechaAlarma.setHours(horas, minutos, 0,0);//modificamos la hora poniendo la desestructurada y segundos y milisegundos a 0

        //calculamos la diferencia entre la fechaAlarma y la fecha actual en milisegundos
        // Convertimos los milisegundos de la resta en un texto de hora (HH:mm:ss)
        // 1. new Date(diferencia): Crea una fecha desde el "tiempo cero" (1970).
        // 2. toISOString(): Lo convierte a texto estándar (ej: "1970-01-01T00:05:00.000Z").
        // 3. slice(11, 19): Corta el texto para quedarse SOLO con la parte de las horas, minutos y segundos.
        const diferencia = fechaAlarma.getTime() - currentTime.getTime();//getTime() -> devuelve el tiempo en milsegundos
        if(diferencia > 0){
            //mientrtas la diferencia sea mayor que 0 asignamos el texto para mostrar diferencia
            return new Date(diferencia).toISOString().slice(11,19);
        }else{
            return "Ring Ring Ring!!! 🔔🔔🔔"
        }

}