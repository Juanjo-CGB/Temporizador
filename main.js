/**
 * @fileoverview Interactividad Temporizador
 * @version 0.1
 * @author Juanjo Alonso Sánchez <jj.alonso@esla.com>
 * @copyright cgb@esla.com
 */

/**
  * Iniciamos la cuenta atrás
  * @param  {dia establecido como final, texto mostrado al finalizar la cuenta atrás}
  * @return  {}
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
  * @param  {dia establecido como final}
  * @return  {}
  */
function obtenerTiempoRestante(diaFinal) {
    const hoy = new Date();
    const total = Date.parse(diaFinal) - Date.parse(new Date());
    const dias = Math.floor(total / 86400000);
    const horas = Math.floor((total % 86400000) / 3600000);
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

let textoFinCuenta = "<div><p>FIN</p></div>";
inputFecha.addEventListener('change', function() {
    if(Date.parse(inputFecha.value) > Date.parse(new Date())){
        inputFecha.setAttribute("disabled", "");
        error.innerHTML = "";
        const arrFecha = inputFecha.value.split('-');
        const diaFinal = new Date(Number(arrFecha[0]),Number(arrFecha[1]) - 1,Number(arrFecha[2]),0,0,0);
        //const diaFinal = new Date("March 18, 2022 00:00:00");
        iniciarReloj(diaFinal, textoFinCuenta);
    }else{        
        error.innerHTML = "¡Error! Seleccione un día superior al actual.";
    }
});