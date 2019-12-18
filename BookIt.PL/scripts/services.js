define(["require", "exports", "./index", "./risorse", "./edifici"], function (require, exports, index_1, risorse_1, edifici_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //import { populateUsernames, populateEdifici, populateSale } from "./index";
    //#region Variables
    var webApiUri = 'http://localhost:60398/api';
    //#endregion
    function getAllUsernames() {
        $.getJSON(webApiUri + '/User/GetAllUsers')
            .done(function (risorse) {
            index_1.populateUsernames(risorse);
        })
            .fail(function (jqXHR, textStatus, err) {
            alert('Errore durante l estrazione delle risorse!');
        });
    }
    exports.getAllUsernames = getAllUsernames;
    // export function getAllEdificiNames(): Array<string> {
    //     var edificiArray: Array<string> = [];
    //     $.getJSON(webApiUri + '/Edificio/GetAllEdifici')
    //         .done((edifici: Edificio[]) => {
    //             $.each(edifici, (key, item: Edificio) => {
    //                 edificiArray.push(item.Nome);
    //             })
    //             console.log(edificiArray);
    //             //console.log(risorse);
    //             populateEdifici(edificiArray);
    //         })
    //         .fail(function (jqXHR, textStatus, err) {
    //             alert('Errore durante l estrazione delle risorse!');
    //         }
    //         );
    //     return edificiArray;
    // }
    function getAllSaleNames() {
        var saleArray = [];
        $.getJSON(webApiUri + '/Sala/GetAllSale')
            .done(function (sale) {
            $.each(sale, function (key, item) {
                saleArray.push(item.Nome);
            });
            console.log(saleArray);
            //console.log(risorse);
            index_1.populateSale(saleArray);
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
            risorse_1.populateRisorse(risorse);
        })
            .fail(function (jqXHR, textStatus, err) {
            alert('Errore durante l estrazione delle risorse!');
        });
    }
    exports.getAllRisorse = getAllRisorse;
    function getAllSaleByEdificio(id) {
        var saleArray = [];
        $.ajax({
            type: "GET",
            url: webApiUri + '/Sala/GetAllSaleByEdificio/' + id,
            contentType: 'application/json',
        }).done(function (sale) {
            $.each(sale, function (key, item) {
                saleArray.push(item.Nome);
            });
            console.log(saleArray);
            index_1.populateSale(saleArray);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("An error occurred while creating UserTitle");
        });
        return saleArray;
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
            data: JSON.stringify(p),
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
});
// export function doPrenotazione(): void {
//     $.ajax({
//         type: "POST",
//         url: webApiUri + '/Prenotazione/PostPrenotazione',
//         contentType: 'application/json',
//         data: JSON.stringify({
//             ID_Risorsa: $("#selectUsername").find(":selected").val(),
//             ID_Sala: $("#selectSala").find(":selected").val(),
//             Descrizione: $("#descrizione").val(),
//             DataInizioPrenotazione: $("#bookDate").val()
//         })
//     }).done(function (data) {
//         console.log(JSON.stringify(data));
//     }).fail(function (jqXHR, textStatus, errorThrown) {
//         alert("An error occurred while creating UserTitle");
//     });
// }
