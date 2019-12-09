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
    var p = { Cognome: "Bianchi", Email: "linda.rimoldi@reti.it", FlagPrenotazione: false, ID: 6, Nome: "Linda", Username: "lalalalala" };
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
function aggiornaRisorsa() {
    var id = 12;
    var p = { Cognome: "Ciao", Email: "linda.rimoldi@reti.it", FlagPrenotazione: 1, ID: 12, Nome: "Ciao", Username: "rimolli1" };
    $.ajax({
        type: "PUT",
        url: webApiUri + '/User/UpdateUserFlag?id=' + id,
        contentType: 'application/json',
        data: JSON.stringify(p)
    }).done(function (data) {
        console.log(JSON.stringify(data));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error occurred while creating UserTitle");
    });
}
function getRisorsa(id) {
    var id = 11;
    $.getJSON(webApiUri + '/User/GetUser/?id=' + id)
        .done(function (data) {
        console.log(JSON.stringify(data));
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('An error occurred while retrieving UserTitle details');
    });
}
function creaEdificio() {
    var p = { Nome: "Edificio", Indirizzo: "via verdi 465", Stato: "prenotabile" };
    $.ajax({
        type: "POST",
        url: webApiUri + '/Edificio/PostEdificio',
        contentType: 'application/json',
        data: JSON.stringify(p)
    }).done(function (data) {
        console.log(JSON.stringify(data));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error occurred while creating UserTitle");
    });
}
function creaSala() {
    var p = { ID_Edificio: 1, Nome: "bella sala", NumeroPostiDisponibili: 6, Stato: "Prenotabile" };
    $.ajax({
        type: "POST",
        url: webApiUri + '/Sala/PostSala',
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
