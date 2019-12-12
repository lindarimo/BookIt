"use strict";
exports.__esModule = true;
//#region Variables
var webApiUri = 'http://localhost:60398/api';
//#endregion
$(document).ready(function () {
    getAllUsernames();
    getAllEdificiNames();
    getAllSaleNames();
});
function populateUsernames(usernames) {
    for (var element in usernames) {
        console.log(usernames[element]);
        $('#selectUsername').append('<option>' + usernames[element] + '</option>');
    }
}
exports.populateUsernames = populateUsernames;
function populateEdifici(edifici) {
    for (var element in edifici) {
        console.log(edifici[element]);
        $('#selectEdificio').append("<option value = \"" + edifici[element] + "\"> " + edifici[element] + " </option>");
    }
}
exports.populateEdifici = populateEdifici;
function populateSale(sale) {
    for (var element in sale) {
        console.log(sale[element]);
        $('#selectSala').append('<option>' + sale[element] + '</option>');
    }
}
exports.populateSale = populateSale;
function getAllUsernames() {
    var risorseArray = [];
    $.getJSON(webApiUri + '/User/GetAllUsers')
        .done(function (risorse) {
        $.each(risorse, function (key, item) {
            risorseArray.push(item.Username);
        });
        console.log(risorseArray);
        //console.log(risorse);
        populateUsernames(risorseArray);
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('Errore durante l estrazione delle risorse!');
    });
    return risorseArray;
}
exports.getAllUsernames = getAllUsernames;
function getAllEdificiNames() {
    var edificiArray = [];
    $.getJSON(webApiUri + '/Edificio/GetAllEdifici')
        .done(function (edifici) {
        $.each(edifici, function (key, item) {
            edificiArray.push(item.Nome);
        });
        console.log(edificiArray);
        //console.log(risorse);
        populateEdifici(edificiArray);
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('Errore durante l estrazione delle risorse!');
    });
    return edificiArray;
}
exports.getAllEdificiNames = getAllEdificiNames;
function getAllSaleNames() {
    var saleArray = [];
    $.getJSON(webApiUri + '/Sala/GetAllSale')
        .done(function (sale) {
        $.each(sale, function (key, item) {
            saleArray.push(item.Nome);
        });
        console.log(saleArray);
        //console.log(risorse);
        populateSale(saleArray);
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('Errore durante l estrazione delle risorse!');
    });
    return saleArray;
}
exports.getAllSaleNames = getAllSaleNames;
function getAllRisorse() {
    $.getJSON(webApiUri + '/User/GetAllUsers')
        .done(function (risorse) {
        console.log(risorse);
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('Errore durante l estrazione delle risorse!');
    });
}
exports.getAllRisorse = getAllRisorse;
function getAllEdifici() {
    $.getJSON(webApiUri + '/Edificio/GetAllEdifici')
        .done(function (edifici) {
        console.log(edifici);
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('Errore durante l estrazione degli edifici!');
    });
}
exports.getAllEdifici = getAllEdifici;
function getAllSale() {
    $.getJSON(webApiUri + '/Sala/GetAllSale')
        .done(function (sale) {
        console.log(sale);
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('Errore durante l estrazione delle sale!');
    });
}
exports.getAllSale = getAllSale;
function getAllPrenotazioni() {
    $.getJSON(webApiUri + '/Prenotazione/GetAllPrenotazioni')
        .done(function (prenotazioni) {
        console.log(prenotazioni);
    })
        .fail(function (jqXHR, textStatus, err) {
        alert('Errore durante l estrazione delle prenotazioni!');
    });
}
exports.getAllPrenotazioni = getAllPrenotazioni;
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
exports.creaRisorsa = creaRisorsa;
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
exports.aggiornaRisorsa = aggiornaRisorsa;
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
exports.getRisorsa = getRisorsa;
function creaEdificio() {
    var p = { Nome: "Edificio 3", Indirizzo: "via verdi 465", Stato: "Disponibile" };
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
exports.creaEdificio = creaEdificio;
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
exports.creaSala = creaSala;
function deletePrenotazione() {
    var id = 1;
    $.ajax({
        type: "DELETE",
        url: webApiUri + '/Prenotazione/DeletePrenotazione/?id=' + id,
        contentType: 'application/json'
    }).done(function (data) {
        console.log(JSON.stringify(data));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error occurred while creating UserTitle");
    });
}
exports.deletePrenotazione = deletePrenotazione;
$("#selectEdificio").change(function () {
    alert($('option:selected', this).text());
});
