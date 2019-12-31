import { Risorsa, Edificio, Sala, Prenotazione } from "./model";
import { ViewRisorse } from "./risorse";
//import { populateUsernames, populateEdifici, populateSale } from "./index";

//#region Variables
const webApiUri: string = 'http://localhost:60398/api';
//#endregion

export function getAllUsersCanBook(): JQuery.jqXHR<Risorsa[]> {
    return $.getJSON(webApiUri + '/User/GetAllUsersCanBook')
}
export function getAllRisorse(): JQuery.jqXHR<Risorsa[]> {
    return $.getJSON(webApiUri + '/User/GetAllUsers');
}

export function getAllSaleByEdificio(id: any): JQuery.jqXHR<Sala[]> {
    return $.getJSON(webApiUri + '/Sala/GetAllSaleByEdificio/' + id);
}

export function getAllEdifici(): JQuery.jqXHR<Edificio[]> {
    return $.getJSON(webApiUri + '/Edificio/GetAllEdifici')
}
export function getAllSale(): JQuery.jqXHR<Sala[]> {
    return $.getJSON(webApiUri + '/Sala/GetAllSale');
}

export function getAllPrenotazioni(): JQuery.jqXHR<Prenotazione[]> {
    return $.getJSON(webApiUri + '/Prenotazione/GetAllPrenotazioni');
}
export function creaRisorsa(): void {
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
export function creaEdificio(edificio: any): void {
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
export function aggiornaRisorsa(id: number): void {
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
export function getSala(id: number): JQuery.jqXHR<Sala> {
    return $.getJSON(webApiUri + '/Sala/GetSala/?id=' + id);
}

export function getRisorsa(id: number): JQuery.jqXHR<Risorsa> {
    return $.getJSON(webApiUri + '/User/GetUser/?id=' + id);
}

export function deletePrenotazione(id: number): void {
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
export function creaSala(sala: any): void {
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
export function doPrenotazione() {
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
    })
}