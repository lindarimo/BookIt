import { Risorsa, Edificio, Sala, Prenotazione } from "./model";
import { populateUsernames, populateSale, populateEdificiNames } from "./index";
import { populateRisorse } from "./risorse";
import { populateEdifici } from "./edifici";
//import { populateUsernames, populateEdifici, populateSale } from "./index";

//#region Variables
const webApiUri: string = 'http://localhost:60398/api';
//#endregion

export function getAllUsersCanBook() {
    $.getJSON(webApiUri + '/User/GetAllUsersCanBook')
        .done((risorse: Risorsa[]) => {
            populateUsernames(risorse);
        })
        .fail(function (jqXHR, textStatus, err) {
            alert('Errore durante l estrazione delle risorse!');
        }
        );
}
export function getAllEdificiNames() {
    $.getJSON(webApiUri + '/Edificio/GetAllEdifici')
        .done((edifici: Edificio[]) => {
            populateEdificiNames(edifici);
        })
        .fail(function (jqXHR, textStatus, err) {
            alert('Errore durante l estrazione delle risorse!');
        }
        );
}
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
export function getAllRisorse(): JQuery.jqXHR<Risorsa[]> {
    return $.getJSON(webApiUri + '/User/GetAllUsers')
        .done((risorse: Risorsa[]) => {
            populateRisorse(risorse);
        })
        .fail(function (jqXHR, textStatus, err) {
            alert('Errore durante l estrazione delle risorse!');
        });
}

export function getAllSaleByEdificio(id: any) {
    $.ajax({
        type: "GET",
        url: webApiUri + '/Sala/GetAllSaleByEdificio/' + id,
        contentType: 'application/json',
    }).done((sale: Sala[]) => {
        populateSale(sale);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error occurred while creating UserTitle");
    });
}

export function getAllEdifici() {
    $.getJSON(webApiUri + '/Edificio/GetAllEdifici')
        .done((edifici: Edificio[]) => {
            console.log(edifici);
            populateEdifici(edifici);
        })
        .fail(function (jqXHR, textStatus, err) {
            alert('Errore durante l estrazione degli edifici!');
        }
        );
}
export function getAllSale(): JQuery.jqXHR<Sala[]> {
    return $.getJSON(webApiUri + '/Sala/GetAllSale')
}

export function getAllPrenotazioni(): JQuery.jqXHR<Prenotazione[]> {
    return $.getJSON(webApiUri + '/Prenotazione/GetAllPrenotazioni')
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

export function creaSala(): void {
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