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
export function creaEdificio(): void {
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

export function deletePrenotazione(): void {
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
export function creaSala(): void {
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
export function doPrenotazione() {
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
    })
}