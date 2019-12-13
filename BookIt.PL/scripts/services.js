define(["require", "exports", "./index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //import { populateUsernames, populateEdifici, populateSale } from "./index";
    //#region Variables
    var webApiUri = 'http://localhost:60398/api';
    //#endregion
    function getAllUsernames() {
        var risorseArray = [];
        $.getJSON(webApiUri + '/User/GetAllUsers')
            .done(function (risorse) {
            $.each(risorse, function (key, item) {
                risorseArray.push(item.Username);
            });
            console.log(risorseArray);
            //console.log(risorse);
            index_1.populateUsernames(risorseArray);
        })
            .fail(function (jqXHR, textStatus, err) {
            alert('Errore durante l estrazione delle risorse!');
        });
        return risorseArray;
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
            index_1.populateEdifici(edifici);
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
            data: JSON.stringify(p),
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
            data: JSON.stringify(p),
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
