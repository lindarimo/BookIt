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
    function creaEdificio() {
        let p = {
            Nome: $("#nomeEdificio").val(),
            Indirizzo: $("#indirizzoEdificio").val(),
            Stato: $("#disponibilitaEdificio").val(),
        };
        $.ajax({
            type: "POST",
            url: webApiUri + '/Edificio/PostEdificio',
            contentType: 'application/json',
            data: JSON.stringify(p),
        }).done(function (data) {
            alert("Hai inserito correttamente il nuovo edificio " + p.Nome);
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
    function deletePrenotazione() {
        var id = 1;
        $.ajax({
            type: "DELETE",
            url: webApiUri + '/Prenotazione/DeletePrenotazione/?id=' + id,
            contentType: 'application/json',
        }).done(function (data) {
            console.log(JSON.stringify(data));
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("An error occurred while creating UserTitle");
        });
    }
    exports.deletePrenotazione = deletePrenotazione;
    function creaSala() {
        let p = {
            ID_Edificio: $("#selectEdificio").find(":selected").val(),
            Nome: $("#nomeSala").val(),
            NumeroPostiDisponibili: $("#postiSala").val(),
        };
        $.ajax({
            type: "POST",
            url: webApiUri + '/Sala/PostSala',
            contentType: 'application/json',
            data: JSON.stringify(p),
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
            ID_Risorsa: $("#selectUsername").find(":selected").val(),
            ID_Sala: $("#selectSala").find(":selected").val(),
            Descrizione: $("#descrizione").val(),
            DataInizioPrenotazione: $("#bookDateStart").val(),
            DataFinePrenotazione: $("#bookDateEnd").val()
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
