//usaremos este archivo para definir las constantes que usamos en la app y asi modificarlas aqui facilmente

export const VIDA_INICIAL = 20;//constante para la vida inicial

//constante para el valor del daño de los botones
export const BOTONES_DANIO = [
    {label: "-1", value: -1},
    {label: "-5", value: -5},
    {label: "-10", value: -10},
    {label: "-20", value: -20},
];

//constante para el valor de curacion de los botones
export const BOTONES_CURACION = [
    {label: "+1", value: 1},
    {label: "+5", value: 5},
    {label: "+10", value: 10},
    {label: "+20", value: 20},
];

//constante para meter jugadores
export const JUGADORES = [
    {id: 1, nombre: "Victor", vidas: VIDA_INICIAL},
    {id: 2, nombre: "Sofia", vidas: VIDA_INICIAL},
];