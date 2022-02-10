/**
 * @fileoverview Interactividad Temporizador
 * @version 0.1
 * @author Juanjo Alonso Sánchez <jj.alonso@esla.com>
 * @copyright cgb@esla.com
 */

/**
 * Tipo de dato Tiempo
 * @typedef {Object} Tiempo
 * @property {number} total Tiempo total en ms
 * @property {number} dias Número de días
 * @property {number} horas Número de horas
 * @property {number} minutos Número de minutos
 */

/**
  * Inicia la cuenta atrás
  * @param {Date} diaFinal Día establecido como final
  * @param {string} textoFinal Texto mostrado al finalizar la cuenta atrás
  * @returns {void}
  */
function iniciarReloj(diaFinal, textoFinal) {                   
    function actualizarReloj() {
        const t = obtenerTiempoRestante(diaFinal);            
        diasTexto.innerHTML = ('0' + t.dias).slice(-2);
        horasTexto.innerHTML = ('0' + t.horas).slice(-2);
        minutosTexto.innerHTML = ('0' + t.minutos).slice(-2);            
        if (t.total <= 0) {
            clearInterval(timeinterval);
            reloj.innerHTML = textoFinal;
        }
    }            
    actualizarReloj();
    const timeinterval = setInterval(actualizarReloj, 1000);
}
/**
  * Obtiene el tiempo restante entre hoy y la fecha final
  * @param  {Date} diaFinal Día establecido como final
  * @returns  {Tiempo} Tiempo restante del temporizador en diferentes unidades
  */
function obtenerTiempoRestante(diaFinal) {
    /** @type {number} */
    const total = Date.parse(diaFinal) - Date.parse(new Date());
    /** @type {number} */
    const dias = Math.floor(total / 86400000);
    /** @type {number} */
    const horas = Math.floor((total % 86400000) / 3600000);
    /** @type {number} */
    const minutos = Math.round(((total % 86400000) % 3600000) / 60000);           
    return {
        total,
        dias,
        horas,      
        minutos
    };
}
// Iniciamos la cuenta atrás      
const reloj = document.querySelector('#contador');
const diasTexto = document.querySelector('.header__dias');
const horasTexto = document.querySelector('.header__horas');
const minutosTexto = document.querySelector('.header__minutos'); 
const inputFecha = document.querySelector('.calendario__input'); 
const error = document.querySelector('.calendario__error');
// Variables documentación
/**
  * Separa la fecha introducida en un array de números que contiene Año-Mes-Dia
  * @type {Array<Number>}
  */
let arrFecha = [];
/**
  * Día desde el que se inicia la cuenta atrás del temporizador
  * @type {Date}
  */
let diaFinal;

let textoFinCuenta = "<div><p>FIN</p></div>";
inputFecha.addEventListener('change', function() {
    if(Date.parse(inputFecha.value) > Date.parse(new Date())){
        inputFecha.setAttribute("disabled", "");
        error.innerHTML = "";
        arrFecha = inputFecha.value.split('-');
        diaFinal = new Date(Number(arrFecha[0]),Number(arrFecha[1]) - 1,Number(arrFecha[2]),0,0,0);
        //diaFinal = new Date("March 18, 2022 00:00:00");
        iniciarReloj(diaFinal, textoFinCuenta);
    }else{        
        error.innerHTML = "¡Error! Seleccione un día superior al actual.";
    }
});