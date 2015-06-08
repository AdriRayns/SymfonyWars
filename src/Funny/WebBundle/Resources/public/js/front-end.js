
    //---------VARIABLES A PARTIR DEL DOM--------------//


var nif = document.getElementById("nif"),
    campoNombre = document.getElementById("name"),
    campoApellidos = document.getElementById("apellidos"),
    campoEmail = document.getElementById("email"),
    /*campoFecha = document.getElementById("fecha"),*/
    password  = document.getElementById('inputPass'),
    password2 = document.getElementById('inputPass2'),
/*    p1Dogtag = document.getElementById('p1Dogtag'),
    p2Dogtag = document.getElementById('p2Dogtag'),
    p3Dogtag = document.getElementById('p3Dogtag'),
    p4Dogtag = document.getElementById('p4Dogtag'),*/
    inputs = document.getElementsByName("registro")[0].getElementsByTagName("input");





        //-----------FUNCIONES--------------//


//Funciones GETERS de values de elementos del DOM
function getNombre() {
    "use strict";
    return campoNombre.value;
}

function getApellidos() {
    "use strict";
    return campoApellidos.value;
}

function getEmail() {
    "use strict";
    return campoEmail.value;
}

function getPasswords() {
    "use strict";
    var passwords = [];
    passwords[0] = password.value;
    passwords[1] = password2.value;
    return passwords;
}

function getDateValue () {
    "use strict";
    return campoFecha.value;
}

function getDate() {
    "use strict";
    var from = campoFecha.value.split("/");
    var date = new Date(from[2], from[1] - 1, from[0]);
    return date;
}

function getSex() { //NO USADA, LISTA DESPLEGABLE
    "use strict";
    return (document.getElementById("sexo").value);
}

function getTel() {
    "use strict";
    return campoTel.value;
}

function getNif() {
    "use strict";
    return nif.value;
}

function getPais() { //NO USADA, LISTA DESPLEGABLE
    "use strict";
    return (document.getElementById("pais").value);
}

function getCiudad() {
    "use strict";
    return campoCity.value;
}
function getDireccion() {
    "use strict";
    return campoAddress.value;
}

function getCP() {
    "use strict";
    return campoCP.value;
}



//Funciones relativas a CSS de elementos del DOM (recibirá los 'input')
function noValidaCampo(DOMelement) { //Función para dar estilo al campo que no valida
    "use strict";
    DOMelement.style.backgroundImage = "url('img/ticR.png')";
    DOMelement.style.backgroundRepeat = "no-repeat";
    DOMelement.style.backgroundPosition = "right center";
    DOMelement.style.borderColor = "red";
}
function validaCampo(DOMelement) {//Función para dar estilo al campo que valida
    "use strict";
    DOMelement.style.backgroundImage = "url('img/ticV.png')";
    DOMelement.style.backgroundRepeat = "no-repeat";
    DOMelement.style.backgroundPosition = "right center";
    DOMelement.style.borderColor = "green";
}
function limpiarEstiloCampo(DOMelement) {//Función para quitar estilo al campo
    "use strict";
    DOMelement.style.backgroundImage = null;
    DOMelement.style.borderColor = "rgb(238, 238, 238)";
}


function setDogtagName() {
    "use strict";
    p1Dogtag.innerHTML = campoNombre.value + " " +  campoApellidos.value;
}
function releaseDogtagName() {
    "use strict";
    p1Dogtag.innerHTML = "";
}
function setDogtagSex() {
    "use strict";
    p2Dogtag.innerHTML = campoSexo.value;
}
function releaseDogtagSex() {
    "use strict";
    p2Dogtag.innerHTML = "";
}
function setDogtagDate() {
    "use strict";
    p3Dogtag.innerHTML = campoFecha.value;
}
function releaseDogtagDate() {
    "use strict";
    p3Dogtag.innerHTML = "";
}
function setDogtagEmail() {
    "use strict";
    p4Dogtag.innerHTML = campoEmail.value;
}
function releaseDogtagEmail() { //no se usará sexo es una lista desplegable
    "use strict";
    p4Dogtag.innerHTML = "";
}

//Funciones para EventListener's
function correctName() {
    "use strict";
    if (!valida(getNombre(),RegExpName)) {
        if (campoNombre.value != "") {
            noValidaCampo(campoNombre);
        } else {
            limpiarEstiloCampo(campoNombre);
        }
        releaseDogtagName();
    } else {
        validaCampo(campoNombre);
        if (valida(getApellidos(),RegExpName)) {
            setDogtagName();
        }
    }

}
function correctLastName() {
    "use strict";
    if (!valida(getApellidos(),RegExpName)) {
        if (campoApellidos.value != "") {
            noValidaCampo(campoApellidos);
        } else {
            limpiarEstiloCampo(campoApellidos);
        }
        releaseDogtagName();
    } else {
        validaCampo(campoApellidos);
        if (valida(getNombre(),RegExpName)) {
            setDogtagName();
        }
    }
}

function correctNif() { //Comprobación de nif y llamada a función de cambio de estilo
    "use strict";
    if (!ValidaNif(getNif())) {
        if (nif.value != "") {
            noValidaCampo(nif);
        } else {
            limpiarEstiloCampo(nif);
        }
    } else {
        validaCampo(nif);
    }
}



function samePass() { //VALIDAR PASS
    "use strict";
    if (!ValidaPass(getPasswords())) {
        if (password2.value != "") {
            noValidaCampo(password2);
        } else {
            limpiarEstiloCampo(password2);
        }
    } else {
        if (password2.value === "") {
            limpiarEstiloCampo(password2);
        } else {
            validaCampo(password2);
        }
    }
}

function correctEmail() {
    "use strict";
    if (!valida(getEmail(),RegExpEmail)) {
        if (campoEmail.value != "") {
            noValidaCampo(campoEmail);
        } else {
            limpiarEstiloCampo(campoEmail);
        }
        releaseDogtagEmail();
    } else {
        validaCampo(campoEmail);
        setDogtagEmail();
    }
}
function correctDate() {
    "use strict";
    if (getDateValue() === ""){
      limpiarEstiloCampo(campoFecha);
      releaseDogtagDate();
    } else if (getDate() == "Invalid Date") {
      noValidaCampo(campoFecha);
      releaseDogtagDate();
    } else if (ValidarFormatoFecha(getDateValue())) {
      if (!isAdult(getDate())) {
        noValidaCampo(campoFecha);
        releaseDogtagDate();
      } else {
        validaCampo(campoFecha);
        setDogtagDate();
      }
    } else {
      noValidaCampo(campoFecha);
      releaseDogtagDate();
    }
}
function correctTel() {
    "use strict";
    if (!valida(getTel(),RegExpAllTel)){
        if (campoTel.value != "") {
            noValidaCampo(campoTel);
        } else {
            limpiarEstiloCampo(campoTel);
        }
    } else {
        validaCampo(campoTel);
    }
}
function correctCity() {
    "use strict";
    if (!valida(getCiudad(),RegExpCity)) {
        if (campoCity.value != "") {
            noValidaCampo(campoCity);
        } else {
            limpiarEstiloCampo(campoCity);
        }
    } else {
        validaCampo(campoCity);
    }
}
function correctAddress() {
    "use strict";
    if (!valida(getDireccion(),RegExpDireccion)) {
        if (campoAddress.value != "") {
            noValidaCampo(campoAddress);
        } else {
            limpiarEstiloCampo(campoAddress);
        }
    } else {
        validaCampo(campoAddress);
    }
}
function correctCP() {
    "use strict";
    if (!valida(getCP(),RegExpCP)) {
        if (campoCP.value != "") {
            noValidaCampo(campoCP);
        } else {
            limpiarEstiloCampo(campoCP);
        }
    } else {
        validaCampo(campoCP);
    }
}





//Funciones EventListener's para mejoras en DOGTAG


//Funcion de validación TOTAL
function AllValidations() {
    "use strict";
    var allValid = true;
    if (!ValidaNombre(getNombre())) {
        allValid = false;
    }
    if (!ValidaApellidos(getApellidos())) {
        allValid = false;
    }
    if (!ValidaEmail(getEmail())) {
        allValid = false;
    }
    if (!ValidaPass(getPasswords())) {
        allValid = false;
    }
    if (!isAdult(getDate())) {
        allValid = false;
    }
    if (!ValidaTel(getTel())) {
        allValid = false;
    }
    if (!ValidaNif(getNif())) {
        allValid = false;
    }
    if (!ValidaCiudad(getCiudad())) {
        allValid = false;
    }
    if (!ValidaCP(getCP())) {
        allValid = false;
    }
    return allValid;
}




//Añadimos los manejadores de eventos sobre las funciones de EventListener's
addEvent( campoNombre, "change", correctName);
addEvent( campoApellidos, "change", correctLastName);
addEvent( campoEmail, "change", correctEmail);
addEvent( password, "change", samePass);
addEvent( password2, "change", samePass);
/*addEvent( campoFecha, "change", correctDate);*/


/*
//Añadimos los manejadores de eventos sobre las funciones de EventListener's
campoNombre.addEventListener("change", correctName);
campoApellidos.addEventListener("change", correctLastName);
campoEmail.addEventListener("change", correctEmail);
password.addEventListener("change", samePass);
password2.addEventListener("change", samePass);
campoFecha.addEventListener("change", correctDate);
campoSexo.addEventListener("change", setDogtagSex);
campoTel.addEventListener("change", correctTel);
nif.addEventListener("change", correctNif);
campoCity.addEventListener("change", correctCity);
campoAddress.addEventListener("change", correctAddress);
campoCP.addEventListener("change", correctCP);
*/




















