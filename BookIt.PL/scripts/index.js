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
    $.getJSON(webApiUri + '/User/GetAllEdifici')
        .done(function (edifici) {
        console.log(edifici);
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('Errore durante l estrazione degli edifici!');
    });
    $.getJSON(webApiUri + '/User/GetAllSale')
        .done(function (sale) {
        console.log(sale);
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('Errore durante l estrazione delle sale!');
    });
}
$(document).ready(function () {
    var p = new Risorsa();
});
//# sourceMappingURL=scripts.js.map
