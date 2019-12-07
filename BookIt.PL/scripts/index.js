"use strict";
exports.__esModule = true;
var Risorsa = /** @class */ (function () {
    function Risorsa() {
    }
    return Risorsa;
}());
exports.Risorsa = Risorsa;
var Edificio = /** @class */ (function () {
    function Edificio() {
    }
    return Edificio;
}());
exports.Edificio = Edificio;
var Sala = /** @class */ (function () {
    function Sala() {
    }
    return Sala;
}());
exports.Sala = Sala;
var Prenotazione = /** @class */ (function () {
    function Prenotazione() {
    }
    return Prenotazione;
}());
exports.Prenotazione = Prenotazione;
//#region Variables
var webApiUri = 'http://localhost:60398/api';
//#endregion
function getAllRisorse() {
    $.getJSON(webApiUri + '/User/GetAllUsers')
        .done(function (risorse) {
        console.log(risorse);
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('Errore durante l estrazione delle risorse!');
    });
    $.getJSON(webApiUri + '/Edificio/GetAllEdifici')
        .done(function (edifici) {
        console.log(edifici);
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('Errore durante l estrazione degli edifici!');
    });
    $.getJSON(webApiUri + '/Sala/GetAllSale')
        .done(function (sale) {
        console.log(sale);
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('Errore durante l estrazione delle sale!');
    });
    $.getJSON(webApiUri + '/Prenotazione/GetAllPrenotazioni')
        .done(function (prenotazioni) {
        console.log(prenotazioni);
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('Errore durante l estrazione delle prenotazioni!');
    });
}
function creaRisorsa() {
    var p = { Cognome: "Bianchi", Email: "linda.rimoldi@reti.it", FlagPrenotazione: true, ID: 6, Nome: "Linda", Username: "lalalalala" };
    $.ajax({
        type: "POST",
        url: webApiUri + '/User/PostUser',
        contentType: 'application/json',
        data: JSON.stringify(p)
    }).done(function (data) {
        console.log(JSON.stringify(data));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error occurred while creating UserTitle");
    });
}
$(document).ready(function () {
    var p = new Risorsa();
});
//# sourceMappingURL=scripts.js.map
