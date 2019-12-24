define(["require", "exports", "./index", "./risorse", "./edifici"], function (require, exports, index_1, risorse_1, edifici_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //import { populateUsernames, populateEdifici, populateSale } from "./index";
    //#region Variables
    var webApiUri = 'http://localhost:60398/api';
    //#endregion
    function getAllUsersCanBook() {
        $.getJSON(webApiUri + '/User/GetAllUsersCanBook')
            .done(function (risorse) {
            index_1.populateUsernames(risorse);
        })
            .fail(function (jqXHR, textStatus, err) {
            alert('Errore durante l estrazione delle risorse!');
        });
    }
    exports.getAllUsersCanBook = getAllUsersCanBook;
    function getAllEdificiNames() {
        $.getJSON(webApiUri + '/Edificio/GetAllEdifici')
            .done(function (edifici) {
            index_1.populateEdificiNames(edifici);
        })
            .fail(function (jqXHR, textStatus, err) {
            alert('Errore durante l estrazione delle risorse!');
        });
    }
    exports.getAllEdificiNames = getAllEdificiNames;
    // export function getAllSaleNames(): Array<string> {
    //     var saleArray: Array<string> = [];
    //     $.getJSON(webApiUri + '/Sala/GetAllSale')
    //         .done((sale: Sala[]) => {
    //             $.each(sale, (key, item: Sala) => {
    //                 saleArray.push(item.Nome);
    //             })
    //             console.log(saleArray);
    //             //console.log(risorse);
    //             populateSale(saleArray);
    //         })
    //         .fail(function (jqXHR, textStatus, err) {
    //             alert('Errore durante l estrazione delle risorse!');
    //         }
    //         );
    //     return saleArray;
    // }
    function getAllRisorse() {
        return $.getJSON(webApiUri + '/User/GetAllUsers')
            .done(function (risorse) {
            risorse_1.populateRisorse(risorse);
        })
            .fail(function (jqXHR, textStatus, err) {
            alert('Errore durante l estrazione delle risorse!');
        });
    }
    exports.getAllRisorse = getAllRisorse;
    function getAllSaleByEdificio(id) {
        $.ajax({
            type: "GET",
            url: webApiUri + '/Sala/GetAllSaleByEdificio/' + id,
            contentType: 'application/json',
        }).done(function (sale) {
            index_1.populateSale(sale);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("An error occurred while creating UserTitle");
        });
    }
    exports.getAllSaleByEdificio = getAllSaleByEdificio;
    function getAllEdifici() {
        $.getJSON(webApiUri + '/Edificio/GetAllEdifici')
            .done(function (edifici) {
            console.log(edifici);
            edifici_1.populateEdifici(edifici);
        })
            .fail(function (jqXHR, textStatus, err) {
            alert('Errore durante l estrazione degli edifici!');
        });
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
        var p = {
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
        var p = {
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
    function creaSala() {
        var p = { ID_Edificio: 1, Nome: "bella sala", NumeroPostiDisponibili: 6, Stato: "Prenotabile" };
        $.ajax({
            type: "POST",
            url: webApiUri + '/Sala/PostSala',
            contentType: 'application/json',
            data: JSON.stringify(p),
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
            contentType: 'application/json',
        }).done(function (data) {
            console.log(JSON.stringify(data));
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("An error occurred while creating UserTitle");
        });
    }
    exports.deletePrenotazione = deletePrenotazione;
    function doPrenotazione() {
        var p = {
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
