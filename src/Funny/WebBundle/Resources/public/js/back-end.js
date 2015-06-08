//Declaración de variables REGEXP
var RegExpName, RegExpEmail, RegExpAllTel, RegExpNif,
    RegExpCity, RegExpDireccion, RegExpCP;

//Definición de variables REGEXP
RegExpName = /^[a-z]+([ a-záéíóúñ]+)*$/i;///^[a-z]+( [a-z]+)*$/i
RegExpEmail = /(^.+@.+\..+$)/i;
RegExpAllTel = /^([0-9]{9})$/i;//https://www.regex101.com/#javascript
RegExpNif = /^([a-zñáéíóú]{2,30})$/i;//<======================MODIFICAR COPY OF NAME
RegExpCity = /^([a-z])+[\ñ a-z]*$/i;//>=====MISMA Q NAME
RegExpDireccion = /(^[a-z])+[\ñ\W\w]*$/i;
RegExpCP = /^([0-9]{5})$/i;//>=====MISMA Q NAME




//TRYYYYYY
function valida(campo,regExp){
    return regExp.test(campo);
}




//Funciones validación
function ValidaNombre(nombre) { //Validación Nombre
    "use strict";
    var isValid = false;
    if (RegExpName.test(nombre)) {
        isValid = true;
    }
    return isValid;
}

function ValidaApellidos(apellidos) { //Validación Apellidos
    "use strict";
    var isValid = false;
    if (RegExpName.test(apellidos)) {
        isValid = true;
    }
    return isValid;
}


function ValidaEmail(email) { //Validación Email
    "use strict";
    var isValid = false;
    if (RegExpEmail.test(email)) {
        isValid = true;
    }
}

function ValidaPass(arrayPasswords) { //Comprobación de que son === (enfocado a recibir passwords)
    "use strict";
    var isValid = false;
    if (arrayPasswords[0] === arrayPasswords[1]) {
        isValid = true;
    } 
    return isValid;
}

function ValidaTel(telephoneNumber) {
    "use strict";
    return RegExpAllTel.test(telephoneNumber);
}

function ValidaNif(NIF) {
    "use strict";
    var OK = true, numeros, letra,
        ComprobadorLetras = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"];
    //Comprobamos cantidad de caracteres correcta
    if (NIF.length > 9) {
        OK = false;
    }
    //Separamos el string recibido en números y letra del DNI
    numeros = NIF.slice(0, -1);
    letra = NIF.slice(-1).toUpperCase();
    
    if (ComprobadorLetras[numeros % 23] !== letra) {
        OK = false;
    }
    return OK;
}

function ValidaCiudad(ciudad) {
    "use strict";
    if (RegExpCity.test(ciudad)) {
        return true;
    } else {
        return false;
    }
}

function ValidaCP(cp) {
    "use strict";
    if (RegExpCP.test(cp)) {
        return true;
    } else {
        return false;
    }
}

function ValidaDireccion(direccion) {
    "use strict";
    if (RegExpDireccion.test(direccion)) {
        return true;
    } else {
        return false;
    }
}

function isAdult(userDateObject) { //Comprobación de usuario mayor de edad 
    "use strict";
    var today, todayYear, todayMonth, todayDay,
        userYear, userMonth, userDay, edad;
    
    today = new Date();
    todayYear = today.getYear();
    todayMonth = today.getMonth();
    todayDay = today.getDate();
    
    userYear = userDateObject.getYear();
    userMonth = userDateObject.getMonth();
    userDay = userDateObject.getDate();
    
    if (todayYear - userYear < 18) {
        return false;
    } else if (todayYear - userYear > 18) {
        return true;
    } else {
        if (todayMonth > userMonth) {
            return true;
        } else if (todayMonth < userMonth) {
            return false;
        } else {
            if (todayDay > userDay) {
                return true;
            } else if (todayDay < userDay) {
                return false;
            } else {
                return true;
            }
        }
    }
    
}

function ValidarFormatoFecha(date) {
    "use strict";
    var OK = true, bisiesto = false, maxDiasMes = 0, dia, mes, anio, fecha;
    if (date.indexOf('/') !== -1) {
      fecha = date.split("/");
      dia = parseInt(fecha[0]);
      mes = parseInt(fecha[1]);
      anio = parseInt(fecha[2]);
    } else return false;
    
    //Primera validación: Comprobamos que recibimos todas las variables
    if (!dia || !mes || !anio) {
        OK = false;
    }
    //Comprobamos que dia y año están en el rango correcto
    if (dia >= 31 || dia <= 0 || anio <= 0) {
        OK = false;
    }
    //Comprobación de formato de MES (MM ó MMM)
    if (OK && mes > 0 && mes < 13) {
        OK = true;
    } else {
        OK = false;
    }
    
    if (OK) {
        //COMPROBACION AÑO BISIESTO
        if (anio % 4 === 0) {
            if (anio % 100 === 0 && anio % 400 !== 0) {
                bisiesto = false;
            } else {
                bisiesto = true;
            }
        } else {
            bisiesto = false;
        }

        //ESTUDIO DEL MES PARA CALCULAR EL NUMERO MAX DE DIAS 
        switch (mes) {
        case 1:
            maxDiasMes = 31;
            break;
        case 2:
            if (bisiesto) {
                maxDiasMes = 29;
            } else {
                maxDiasMes = 28;
            }
            break;
        case 3:
            maxDiasMes = 31;
            break;
        case 4:
            maxDiasMes = 30;
            break;
        case 5:
            maxDiasMes = 31;
            break;
        case 6:
            maxDiasMes = 30;
            break;
        case 7:
            maxDiasMes = 31;
            break;
        case 8:
            maxDiasMes = 31;
            break;
        case 9:
            maxDiasMes = 30;
            break;
        case 10:
            maxDiasMes = 31;
            break;
        case 11:
            maxDiasMes = 30;
            break;
        case 12:
            maxDiasMes = 31;
            break;s
        default:
            OK = false;
            break;
        }
        if (dia > maxDiasMes) {
            OK = false;
        }
    }
    return OK;
}



function addEvent(element, eventName, callback) {
    if (element.addEventListener) {
        element.addEventListener(eventName, callback);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, callback);
    }
}



















