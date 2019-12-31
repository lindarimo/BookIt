define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //import { populateUsernames, populateEdifici, populateSale } from "./index";
    //#region Variables
    const webApiUri = 'http://localhost:60398/api';
    //#endregion
    function getAllUsersCanBook() {
        return $.getJSON(webApiUri + '/User/GetAllUsersCanBook');
    }
    exports.getAllUsersCanBook = getAllUsersCanBook;
    function getAllRisorse() {
        return $.getJSON(webApiUri + '/User/GetAllUsers');
    }
    exports.getAllRisorse = getAllRisorse;
    function getAllSaleByEdificio(id) {
        return $.getJSON(webApiUri + '/Sala/GetAllSaleByEdificio/' + id);
    }
    exports.getAllSaleByEdificio = getAllSaleByEdificio;
    function getAllEdifici() {
        return $.getJSON(webApiUri + '/Edificio/GetAllEdifici');
    }
    exports.getAllEdifici = getAllEdifici;
    function getAllSale() {
        return $.getJSON(webApiUri + '/Sala/GetAllSale');
    }
    exports.getAllSale = getAllSale;
    function getAllPrenotazioni() {
        return $.getJSON(webApiUri + '/Prenotazione/GetAllPrenotazioni');
    }
    exports.getAllPrenotazioni = getAllPrenotazioni;
    function creaRisorsa() {
        let p = {
            Cognome: $("#cognome").val(),
            Nome: $("#nome").val(),
        };
        $.ajax({
            type: "POST",
            url: webApiUri + '/User/PostUser',
            contentType: 'application/json',
            data: JSON.stringify(p),
        }).done(function (data) {
            alert("Hai inserito correttamente la nuova risorsa " + p.Nome + " " + p.Cognome);
            location.reload();
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("An error occurred while creating UserTitle");
        });
    }
    exports.creaRisorsa = creaRisorsa;
    function creaEdificio(edificio) {
        $.ajax({
            type: "POST",
            url: webApiUri + '/Edificio/PostEdificio',
            contentType: 'application/json',
            data: JSON.stringify(edificio),
        }).done(function (data) {
            alert("Hai inserito correttamente il nuovo edificio " + data.Nome);
            location.reload();
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("An error occurred while creating UserTitle");
        });
    }
    exports.creaEdificio = creaEdificio;
    function aggiornaRisorsa(id) {
        $.ajax({
            type: "PUT",
            url: webApiUri + '/User/UpdateUserFlag?id=' + id,
            contentType: 'application/json',
        }).done(function () {
            alert("Hai abilitato l'utente alla prenotazione!");
            location.reload();
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("An error occurred while creating UserTitle");
        });
    }
    exports.aggiornaRisorsa = aggiornaRisorsa;
    function getSala(id) {
        return $.getJSON(webApiUri + '/Sala/GetSala/?id=' + id);
    }
    exports.getSala = getSala;
    function getRisorsa(id) {
        return $.getJSON(webApiUri + '/User/GetUser/?id=' + id);
    }
    exports.getRisorsa = getRisorsa;
    function deletePrenotazione(id) {
        $.ajax({
            type: "DELETE",
            url: webApiUri + '/Prenotazione/DeletePrenotazione/?id=' + id,
            contentType: 'application/json',
        }).done(function (data) {
            console.log(JSON.stringify(data));
            alert("Hai eliminato la prenotazione!");
            location.reload();
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("An error occurred while creating UserTitle");
        });
    }
    exports.deletePrenotazione = deletePrenotazione;
    function creaSala(sala) {
        $.ajax({
            type: "POST",
            url: webApiUri + '/Sala/PostSala',
            contentType: 'application/json',
            data: JSON.stringify(sala),
        }).done(function (data) {
            alert("Sala inserita correttamente!");
            location.reload();
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("An error occurred while creating UserTitle");
        });
    }
    exports.creaSala = creaSala;
    function doPrenotazione() {
        let p = {
            ID_Risorsa: 2,
            ID_Sala: 1,
            Descrizione: "fdfd",
            DataInizioPrenotazione: "2019-12-03 00:38",
            DataFinePrenotazione: "2019-12-04 00:38"
        };
        $.ajax({
            type: "POST",
            url: webApiUri + '/Prenotazione/PostPrenotazione',
            contentType: 'application/json',
            data: JSON.stringify(p)
        }).done(function (data) {
            data !== null ? alert("Prenotazione inserita correttamente!") : alert("Impossibile inserire la prenotazione. Data e ora non disponibili per la sala selezionata. Riprova con altri parametri.");
            location.reload();
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("An error occurred while creating UserTitle");
        });
    }
    exports.doPrenotazione = doPrenotazione;
});
